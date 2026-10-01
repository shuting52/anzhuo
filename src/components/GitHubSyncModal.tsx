import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  X,
  Check,
  AlertCircle,
  ExternalLink,
  GitBranch,
  FileCode2,
  Key,
  HelpCircle,
  Sparkles,
  RefreshCw,
  GitCommit,
  CheckCircle2,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Snippet } from '../types/snippet';
import { InsertionMode, RemoteFileCheckResult, CommitResult } from '../types/github';
import { useGitHubSync } from '../hooks/useGitHubSync';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  snippet: Snippet | null;
  onShowToast: (msg: string) => void;
}

export const GitHubSyncModal: React.FC<Props> = ({
  isOpen,
  onClose,
  snippet,
  onShowToast,
}) => {
  const {
    config,
    updateConfig,
    testConnection,
    isVerifying,
    verifyStatus,
    checkRemoteFile,
    commitFileToRepo,
  } = useGitHubSync();

  // Local form states
  const [targetPath, setTargetPath] = useState('');
  const [commitMessage, setCommitMessage] = useState('');
  const [insertionMode, setInsertionMode] = useState<InsertionMode>('overwrite');
  const [targetLine, setTargetLine] = useState<number>(1);
  const [showConfigSettings, setShowConfigSettings] = useState(false);
  const [showToken, setShowToken] = useState(false);

  // Status states
  const [isCheckingFile, setIsCheckingFile] = useState(false);
  const [fileCheckResult, setFileCheckResult] = useState<RemoteFileCheckResult | null>(null);
  const [isCommitting, setIsCommitting] = useState(false);
  const [commitSuccess, setCommitSuccess] = useState<CommitResult | null>(null);

  // Reset or initialize states when snippet changes
  useEffect(() => {
    if (snippet) {
      const defaultPath = snippet.filePath || `app/src/main/java/com/nationalday/ui/${snippet.id}.kt`;
      setTargetPath(defaultPath);
      setCommitMessage(`feat(ui): 插入国庆全套组件「${snippet.title}」至 ${defaultPath}`);
      setCommitSuccess(null);
      setFileCheckResult(null);
    }
  }, [snippet]);

  if (!isOpen || !snippet) return null;

  // Handle Check File
  const handleCheckFile = async () => {
    setIsCheckingFile(true);
    try {
      const res = await checkRemoteFile(targetPath);
      setFileCheckResult(res);
      if (res.exists) {
        onShowToast(`检测到该文件已存在于仓库中 (${(res.content || '').split('\n').length} 行)`);
      } else {
        onShowToast('仓库中暂无该文件，将为您新建该文件并自动创建目录');
      }
    } catch (e: any) {
      onShowToast(`检查文件失败: ${e.message}`);
    } finally {
      setIsCheckingFile(false);
    }
  };

  // Handle Commit & Push
  const handleCommit = async () => {
    setIsCommitting(true);
    setCommitSuccess(null);
    try {
      const result = await commitFileToRepo({
        filePath: targetPath,
        code: snippet.code,
        commitMessage: commitMessage,
        insertionMode: insertionMode,
        targetLine: targetLine,
        existingSha: fileCheckResult?.sha,
        existingContent: fileCheckResult?.content,
      });

      if (result.success) {
        setCommitSuccess(result);
        onShowToast(`🎉 成功推送到 GitHub 仓库！Commit: ${result.commitSha}`);
      } else {
        alert(result.errorMessage || '提交失败，请检查配置和网络');
      }
    } catch (e: any) {
      alert(`提交出错: ${e.message}`);
    } finally {
      setIsCommitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl border-2 border-amber-400/40 bg-slate-900/95 shadow-[0_24px_64px_rgba(220,38,38,0.35)] backdrop-blur-2xl text-slate-100 overflow-hidden my-auto">
        {/* Top Celebration Ribbon Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-amber-500 border border-amber-300/40 flex items-center justify-center text-white shadow-lg">
              <FolderGit2 className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white flex items-center gap-1.5">
                  <span>对接 GitHub 仓库 · 精准定位修改</span>
                  <span className="text-[11px] font-bold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 rounded-full">
                    🇨🇳 直连推送
                  </span>
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                将当前代码片段准确定位并直接插入到您 Android 项目的对应文件与目录中
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[calc(85vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
          {/* Target Snippet Info */}
          <div className="p-3.5 rounded-2xl bg-red-950/40 border border-amber-400/30 flex items-start justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold text-amber-300">当前选定插入的代码组件</div>
              <div className="text-sm font-bold text-white mt-0.5">{snippet.title}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">
                分类: {snippet.categoryName} · {snippet.code.split('\n').length} 行代码 · {snippet.language}
              </div>
            </div>
            <span className="text-2xl select-none">🇨🇳</span>
          </div>

          {/* GitHub Connection Settings (Collapsible or Quick Status) */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
            <div
              onClick={() => setShowConfigSettings(!showConfigSettings)}
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                <Key className="w-4 h-4 text-amber-400" />
                <span>GitHub 仓库连接凭证</span>
                <span className="font-mono text-[11px] text-amber-300 font-normal">
                  ({config.owner}/{config.repo} · {config.branch})
                </span>
                {verifyStatus.tested && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      verifyStatus.valid
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                    }`}
                  >
                    {verifyStatus.valid ? '已就绪' : '未就绪'}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{showConfigSettings ? '收起配置' : '修改配置'}</span>
                {showConfigSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {showConfigSettings && (
              <div className="p-4 border-t border-white/[0.08] space-y-3.5 bg-black/20 text-xs">
                {/* PAT Token */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-bold text-slate-300 flex items-center gap-1.5">
                      <span>GitHub Personal Access Token (PAT)</span>
                    </label>
                    <a
                      href="https://github.com/settings/tokens/new?scopes=repo&description=Android%20Studio%20Craft%20Sync"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 underline"
                    >
                      <span>前往 GitHub 生成 Token (需勾选 repo 权限)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={showToken ? 'text' : 'password'}
                      value={config.pat}
                      onChange={(e) => updateConfig({ pat: e.target.value })}
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx (可留空体验演示沙箱模式)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-100 placeholder:text-slate-500 font-mono text-xs outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-[11px]"
                    >
                      {showToken ? '隐藏' : '显示'}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    🔒 安全提示：Token 仅在您的本地浏览器端缓存，直连 GitHub 官方 REST API，绝不上报任何私有服务器。
                  </p>
                </div>

                {/* Owner & Repo & Branch */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">GitHub 组织/用户名</label>
                    <input
                      type="text"
                      value={config.owner}
                      onChange={(e) => updateConfig({ owner: e.target.value })}
                      placeholder="例如: octocat"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-slate-100 text-xs outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Android 仓库名 (Repo)</label>
                    <input
                      type="text"
                      value={config.repo}
                      onChange={(e) => updateConfig({ repo: e.target.value })}
                      placeholder="例如: MyAndroidApp"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-slate-100 text-xs outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1 flex items-center gap-1">
                      <GitBranch className="w-3.5 h-3.5 text-amber-400" />
                      <span>目标分支 (Branch)</span>
                    </label>
                    <input
                      type="text"
                      value={config.branch}
                      onChange={(e) => updateConfig({ branch: e.target.value })}
                      placeholder="main / master"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-slate-100 text-xs outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Test Connection Button */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => testConnection()}
                    disabled={isVerifying}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 font-bold hover:bg-amber-400/30 transition-all text-xs"
                  >
                    {isVerifying ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    <span>测试仓库连接状态</span>
                  </button>

                  {verifyStatus.tested && (
                    <div
                      className={`text-xs flex items-center gap-1.5 ${
                        verifyStatus.valid ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {verifyStatus.valid ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0" />
                      )}
                      <span>{verifyStatus.message}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Target File Location Input & Precision Positioning */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-amber-400" />
                <span>准确定位文件位置 (Android 项目工程路径)</span>
              </label>
              <button
                type="button"
                onClick={handleCheckFile}
                disabled={isCheckingFile}
                className="text-[11px] font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1"
              >
                {isCheckingFile ? (
                  <RefreshCw className="w-3 h-3 animate-spin" />
                ) : (
                  <RefreshCw className="w-3 h-3" />
                )}
                <span>检查远端文件状态</span>
              </button>
            </div>

            <input
              type="text"
              value={targetPath}
              onChange={(e) => setTargetPath(e.target.value)}
              placeholder="例如: app/src/main/java/com/nationalday/ui/splash/SplashScreen.kt"
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-amber-400/40 text-amber-200 font-mono text-xs outline-none focus:ring-2 focus:ring-amber-400/30"
            />

            {/* Remote File Status Notification */}
            {fileCheckResult && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                  fileCheckResult.exists
                    ? 'bg-amber-500/10 border-amber-400/30 text-amber-200'
                    : 'bg-emerald-500/10 border-emerald-400/30 text-emerald-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    {fileCheckResult.exists
                      ? `该文件已存在于 GitHub 仓库中 (共 ${(fileCheckResult.content || '').split('\n').length} 行)`
                      : '该文件在仓库中尚不存在，将为您完整创建该文件与上级包目录'}
                  </span>
                </div>
                {fileCheckResult.exists && (
                  <span className="font-mono text-[10px] opacity-75">
                    SHA: {fileCheckResult.sha?.slice(0, 7)}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Insertion Mode Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>选择插入与修改模式</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              {[
                {
                  id: 'overwrite',
                  title: '完全覆盖 / 创建新文件',
                  desc: '将当前完整组件写入目标文件',
                },
                {
                  id: 'append',
                  title: '追加至文件末尾',
                  desc: '保留原代码，在文件尾部新增本组件',
                },
                {
                  id: 'custom-position',
                  title: '精准指定行号插入',
                  desc: '在原文件指定行号处插入组件',
                },
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setInsertionMode(m.id as InsertionMode)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    insertionMode === m.id
                      ? 'bg-amber-400/20 border-amber-400 text-white shadow-md'
                      : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="font-bold text-amber-300">{m.title}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{m.desc}</div>
                </div>
              ))}
            </div>

            {insertionMode === 'custom-position' && (
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs text-slate-300">插入目标行号:</span>
                <input
                  type="number"
                  min="1"
                  value={targetLine}
                  onChange={(e) => setTargetLine(Math.max(1, Number(e.target.value)))}
                  className="w-24 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/20 text-center font-mono text-xs font-bold outline-none"
                />
                <span className="text-[11px] text-slate-400">将在指定行之前精准插入新代码</span>
              </div>
            )}
          </div>

          {/* Commit Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <GitCommit className="w-3.5 h-3.5 text-amber-400" />
              <span>Git Commit 提交日志说明</span>
            </label>
            <input
              type="text"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="feat(ui): 插入国庆主题组件"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-slate-100 text-xs outline-none focus:border-amber-400 font-mono"
            />
          </div>

          {/* Success Banner if already committed */}
          {commitSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border-2 border-emerald-400 text-emerald-200 space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>已成功插入并推送到 GitHub 仓库！</span>
                </div>
                <span className="text-xs font-mono bg-emerald-400/20 px-2 py-0.5 rounded">
                  Commit: {commitSuccess.commitSha}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs pt-1">
                {commitSuccess.fileUrl && (
                  <a
                    href={commitSuccess.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-amber-300 hover:underline font-bold"
                  >
                    <span>在 GitHub 浏览修改后的文件 ›</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {commitSuccess.commitUrl && (
                  <a
                    href={commitSuccess.commitUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-slate-300 hover:underline"
                  >
                    <span>查看 Commit 提交详情 ›</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.08] bg-black/30">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span>目标:</span>
            <span className="font-mono text-amber-300">{config.owner}/{config.repo}</span>
            <span>:</span>
            <span className="font-mono text-white">{config.branch}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 text-xs font-bold transition-colors"
            >
              关闭
            </button>

            <button
              type="button"
              onClick={handleCommit}
              disabled={isCommitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold text-xs shadow-lg shadow-red-900/40 active:scale-95 transition-all border border-amber-300/40 disabled:opacity-50"
            >
              {isCommitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>正在精准定位并推送到 GitHub...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>🚀 立即插入到 GitHub 仓库对应位置</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
