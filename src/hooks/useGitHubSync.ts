import { useState, useEffect, useCallback } from 'react';
import { GitHubConfig, InsertionMode, RemoteFileCheckResult, CommitResult } from '../types/github';

const GITHUB_CONFIG_STORAGE_KEY = 'droidfrost_github_config_v2';

export function useGitHubSync() {
  const [config, setConfig] = useState<GitHubConfig>(() => {
    try {
      const saved = localStorage.getItem(GITHUB_CONFIG_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return {
      pat: '',
      owner: 'AndroidStudio-Craft',
      repo: 'my-android-nationalday-app',
      branch: 'main',
      isConfigured: false,
    };
  });

  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<{
    tested: boolean;
    valid: boolean;
    message: string;
    repoInfo?: any;
  }>({
    tested: false,
    valid: false,
    message: '',
  });

  // Save config changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(GITHUB_CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error(e);
    }
  }, [config]);

  const updateConfig = (partial: Partial<GitHubConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...partial,
      isConfigured: Boolean((partial.pat ?? prev.pat) && (partial.owner ?? prev.owner) && (partial.repo ?? prev.repo)),
    }));
    // Reset verify status on config change
    setVerifyStatus({ tested: false, valid: false, message: '' });
  };

  // Test GitHub Connection to the repo
  const testConnection = useCallback(async (customConfig?: GitHubConfig) => {
    const target = customConfig || config;
    setIsVerifying(true);

    // If no PAT provided, offer Demo / Sandbox mode
    if (!target.pat.trim()) {
      setIsVerifying(false);
      const res = {
        tested: true,
        valid: true,
        message: '演示沙箱模式生效（免配置 Token，支持本地精准定位差异对比与模拟提交）',
        repoInfo: {
          full_name: `${target.owner}/${target.repo}`,
          default_branch: target.branch || 'main',
          private: false,
          isMock: true,
        },
      };
      setVerifyStatus(res);
      return res;
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${target.owner.trim()}/${target.repo.trim()}`, {
        headers: {
          Authorization: `Bearer ${target.pat.trim()}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const res = {
          tested: true,
          valid: true,
          message: `连接成功！仓库: ${data.full_name} (${data.visibility || (data.private ? '私有' : '公开')})`,
          repoInfo: data,
        };
        setVerifyStatus(res);
        return res;
      } else {
        const err = await response.json().catch(() => ({}));
        const res = {
          tested: true,
          valid: false,
          message: `连接失败 (${response.status}): ${err.message || '请检查 Token 权限 (需要 repo 权限) 或 仓库名是否正确'}`,
        };
        setVerifyStatus(res);
        return res;
      }
    } catch (e: any) {
      const res = {
        tested: true,
        valid: false,
        message: `网络请求异常: ${e.message || '无法连接 GitHub API'}`,
      };
      setVerifyStatus(res);
      return res;
    } finally {
      setIsVerifying(false);
    }
  }, [config]);

  // Check if a remote file exists at the given path in the repository
  const checkRemoteFile = useCallback(async (filePath: string): Promise<RemoteFileCheckResult> => {
    if (!config.pat.trim()) {
      // In demo mode, simulate file checking
      return {
        exists: false, // allows creating new file
        content: '',
      };
    }

    const cleanPath = filePath.replace(/^\/+/, '');
    const branch = config.branch.trim() || 'main';

    try {
      const res = await fetch(
        `https://api.github.com/repos/${config.owner.trim()}/${config.repo.trim()}/contents/${cleanPath}?ref=${branch}`,
        {
          headers: {
            Authorization: `Bearer ${config.pat.trim()}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        // GitHub API returns Base64 encoded content
        let decodedContent = '';
        if (data.content && data.encoding === 'base64') {
          try {
            decodedContent = decodeURIComponent(
              atob(data.content.replace(/\s/g, ''))
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );
          } catch {
            decodedContent = atob(data.content.replace(/\s/g, ''));
          }
        }
        return {
          exists: true,
          sha: data.sha,
          content: decodedContent,
          size: data.size,
          encoding: data.encoding,
        };
      } else if (res.status === 404) {
        return {
          exists: false,
        };
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }
    } catch (err: any) {
      console.warn('Error checking remote file:', err);
      return {
        exists: false,
      };
    }
  }, [config]);

  // Commit and write code into the GitHub repository at the exact file location
  const commitFileToRepo = useCallback(async ({
    filePath,
    code,
    commitMessage,
    insertionMode,
    targetLine,
    existingSha,
    existingContent,
  }: {
    filePath: string;
    code: string;
    commitMessage: string;
    insertionMode: InsertionMode;
    targetLine?: number;
    existingSha?: string;
    existingContent?: string;
  }): Promise<CommitResult> => {
    const cleanPath = filePath.replace(/^\/+/, '');
    const branch = config.branch.trim() || 'main';

    // Compute the final content based on insertion mode
    let finalContent = code;
    if (existingContent && insertionMode === 'append') {
      finalContent = `${existingContent.trimEnd()}\n\n// ==================== 插入组件代码 ====================\n${code}`;
    } else if (existingContent && insertionMode === 'custom-position' && targetLine && targetLine > 0) {
      const lines = existingContent.split('\n');
      const idx = Math.min(Math.max(1, targetLine), lines.length + 1) - 1;
      lines.splice(idx, 0, `\n// ==================== 准确定位插入代码 ====================\n${code}\n`);
      finalContent = lines.join('\n');
    }

    // If in Demo Mode (no token provided)
    if (!config.pat.trim()) {
      // Simulate real commit
      await new Promise((r) => setTimeout(r, 800));
      const mockSha = Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      return {
        success: true,
        commitSha: mockSha.slice(0, 7),
        commitUrl: `https://github.com/${config.owner}/${config.repo}/commit/${mockSha}`,
        fileUrl: `https://github.com/${config.owner}/${config.repo}/blob/${branch}/${cleanPath}`,
      };
    }

    // Encode content to Base64 (supporting UTF-8 characters)
    const utf8Bytes = new TextEncoder().encode(finalContent);
    let binary = '';
    utf8Bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    const base64Content = btoa(binary);

    try {
      const payload: any = {
        message: commitMessage || `feat(android): 插入代码至 ${cleanPath}`,
        content: base64Content,
        branch: branch,
      };

      if (existingSha) {
        payload.sha = existingSha;
      }

      const res = await fetch(
        `https://api.github.com/repos/${config.owner.trim()}/${config.repo.trim()}/contents/${cleanPath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${config.pat.trim()}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        const data = await res.json();
        return {
          success: true,
          commitSha: data.commit?.sha?.slice(0, 7) || 'latest',
          commitUrl: data.commit?.html_url || `https://github.com/${config.owner}/${config.repo}/commits/${branch}`,
          fileUrl: data.content?.html_url || `https://github.com/${config.owner}/${config.repo}/blob/${branch}/${cleanPath}`,
        };
      } else {
        const err = await res.json().catch(() => ({}));
        return {
          success: false,
          errorMessage: err.message || `提交失败: HTTP ${res.status}`,
        };
      }
    } catch (err: any) {
      return {
        success: false,
        errorMessage: err.message || '网络请求错误，无法提交到 GitHub',
      };
    }
  }, [config]);

  return {
    config,
    updateConfig,
    testConnection,
    isVerifying,
    verifyStatus,
    checkRemoteFile,
    commitFileToRepo,
  };
}
