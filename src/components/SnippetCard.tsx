import React, { useState } from 'react';
import { Star, Edit3, Trash2, Lightbulb, Tag, Check, Copy, Code2, ChevronDown, ChevronUp, FolderGit2 } from 'lucide-react';
import { Snippet } from '../types/snippet';
import { CodeBlock } from './CodeBlock';
import { InteractiveWidgetPreview } from './InteractiveWidgetPreview';

interface Props {
  snippet: Snippet;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit?: (snippet: Snippet) => void;
  onDelete?: (id: string) => void;
  onTagClick?: (tag: string) => void;
  onShowToast: (msg: string) => void;
  forceExpandCode?: boolean;
  onOpenGitHubSync?: (snippet: Snippet) => void;
}

export const SnippetCard: React.FC<Props> = ({
  snippet,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
  onTagClick,
  onShowToast,
  forceExpandCode = false,
  onOpenGitHubSync,
}) => {

  const [isCodeExpanded, setIsCodeExpanded] = useState<boolean>(forceExpandCode);
  const [quickCopied, setQuickCopied] = useState<boolean>(false);

  // Sync with forceExpandCode if prop changes
  React.useEffect(() => {
    setIsCodeExpanded(forceExpandCode);
  }, [forceExpandCode]);

  const lineCount = snippet.code.split('\n').length;

  const handleQuickCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(snippet.code);
      setQuickCopied(true);
      onShowToast(`已复制「${snippet.title}」的代码`);
      setTimeout(() => setQuickCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <article className="group relative rounded-3xl border border-amber-500/20 bg-slate-900/50 backdrop-blur-2xl p-6 shadow-[0_12px_40px_0_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-amber-400/40 hover:shadow-[0_16px_48px_0_rgba(220,38,38,0.2)]">
      {/* Top subtle festive rim highlight */}
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none" />

      {/* Card Header Zone */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="space-y-1.5 flex-1 min-w-0">
          {/* Metadata line (Clean unboxed text, no pills) */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium flex-wrap">
            <span className="text-amber-400 font-semibold">{snippet.categoryName}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300 uppercase tracking-wider font-mono text-[11px]">
              {snippet.language}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400 font-mono text-[11px]">{lineCount} 行代码</span>
            {snippet.isCustom && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-rose-400 font-medium">我的私有片段</span>
              </>
            )}
          </div>

          {/* Title */}
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-white leading-snug">
            {snippet.title}
          </h2>

          {/* Accurate Android Package File Path */}
          {snippet.filePath && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-300/90 bg-black/40 border border-amber-400/30 px-2.5 py-1 rounded-xl w-fit shadow-inner">
              <span className="text-amber-400 font-bold">📁 精准工程路径:</span>
              <span className="text-slate-200">{snippet.filePath}</span>
            </div>
          )}
        </div>


        {/* Action Controls: Favorite, Edit, Delete */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              onToggleFavorite(snippet.id);
              onShowToast(isFavorite ? '已取消收藏' : '⭐ 已成功加入收藏夹');
            }}
            title={isFavorite ? '取消收藏' : '加入收藏夹'}
            className={`p-2.5 rounded-2xl border transition-all ${
              isFavorite
                ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 shadow-sm shadow-amber-500/20'
                : 'bg-white/[0.06] border-white/10 text-slate-400 hover:text-amber-300 hover:bg-white/[0.1]'
            }`}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>

          {snippet.isCustom && onEdit && (
            <button
              onClick={() => onEdit(snippet)}
              title="编辑该片段"
              className="p-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-slate-400 hover:text-cyan-300 hover:bg-white/[0.1] transition-all"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}

          {snippet.isCustom && onDelete && (
            <button
              onClick={() => onDelete(snippet.id)}
              title="删除该片段"
              className="p-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-300 leading-relaxed mb-4">
        {snippet.description}
      </p>

      {/* Tips / Notes Notice (if present) */}
      {snippet.tips && (
        <div className="mb-4 flex items-start gap-2.5 p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-xs text-amber-200 leading-relaxed backdrop-blur-md">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300">开发要点提示：</span>
            <span>{snippet.tips}</span>
          </div>
        </div>
      )}

      {/* Interactive Live Preview (EVERY snippet has an interactive preview!) */}
      {snippet.interactivePreviewKey && (
        <div className="mb-4">
          <InteractiveWidgetPreview previewKey={snippet.interactivePreviewKey} />
        </div>
      )}

      {/* ================= 展开收纳式代码呈现模块 ================= */}
      <div className="mb-4 rounded-2xl border border-white/10 bg-slate-950/60 overflow-hidden">
        {/* Accordion Header Bar */}
        <div
          onClick={() => setIsCodeExpanded(!isCodeExpanded)}
          className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/[0.04] transition-colors select-none"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>查看完整源码</span>
            <span className="font-mono text-[11px] text-slate-400">
              ({lineCount} 行 · {snippet.language})
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onOpenGitHubSync && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenGitHubSync(snippet);
                }}
                title="直接定位并插入到 GitHub 仓库对应文件"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-red-600/30 to-amber-500/20 hover:from-red-600/50 hover:to-amber-500/40 text-amber-300 border border-amber-400/40 shadow-sm transition-all"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
                <span>插入 GitHub 仓库</span>
              </button>
            )}

            <button
              onClick={handleQuickCopy}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                quickCopied
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 border border-white/10'
              }`}
            >
              {quickCopied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-cyan-400" />
                  <span>快速复制代码</span>
                </>
              )}
            </button>

            <button
              className="flex items-center gap-1 text-xs text-amber-400 font-semibold hover:text-amber-300 px-2 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20"
            >
              <span>{isCodeExpanded ? '收起源码' : '展开源码'}</span>
              {isCodeExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expandable Code Content */}
        {isCodeExpanded && (
          <div className="border-t border-white/10 animate-fadeIn">
            <CodeBlock
              code={snippet.code}
              language={snippet.language}
              fileName={`${snippet.id}.kt`}
              onCopied={() => onShowToast(`已复制「${snippet.title}」的代码`)}
            />
          </div>
        )}
      </div>

      {/* Footer Tags & Quick search tags */}
      {snippet.tags && snippet.tags.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-white/[0.06] text-xs">
          <span className="text-slate-400 flex items-center gap-1 text-[11px] mr-1">
            <Tag className="w-3 h-3 text-amber-400" /> 标签:
          </span>
          {snippet.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick && onTagClick(tag)}
              className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-amber-300 transition-colors text-[11px] font-mono border border-white/[0.06]"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </article>
  );
};
