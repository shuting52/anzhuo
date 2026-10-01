import React from 'react';
import { Search, Plus, Star, Menu, Sparkles, FolderGit2 } from 'lucide-react';
import { SnippetCategory } from '../types/snippet';

interface Props {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onOpenCreateModal: () => void;
  onToggleFavorites: () => void;
  isFavoritesActive: boolean;
  favoriteCount: number;
  onQuickCategory: (cat: SnippetCategory | 'all') => void;
  onToggleMobileMenu: () => void;
  onOpenGitHubModal?: () => void;
  onTriggerCelebration?: () => void;
}

export const TopNav: React.FC<Props> = ({
  onSearchChange,
  searchQuery,
  onOpenCreateModal,
  onToggleFavorites,
  isFavoritesActive,
  favoriteCount,
  onQuickCategory,
  onToggleMobileMenu,
  onOpenGitHubModal,
  onTriggerCelebration,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/20 bg-slate-950/75 backdrop-blur-2xl px-4 lg:px-8 py-3 transition-all shadow-[0_4px_24px_rgba(220,38,38,0.15)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.08]"
            aria-label="展开导航抽屉"
          >
            <Menu className="w-5 h-5" />
          </button>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onQuickCategory('all');
            }}
            className="flex items-center gap-2.5 text-lg font-black tracking-tight text-white group"
          >
            <span className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-red-500/30 group-hover:scale-105 transition-transform font-mono text-base font-bold border border-amber-300/40">
              🇨🇳
            </span>
            <div className="flex flex-col">
              <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-white bg-clip-text text-transparent leading-none text-base font-black">
                安卓代码工坊
              </span>
              <span className="text-[10px] font-bold text-amber-400/90 tracking-widest mt-0.5">
                盛世华诞 · 国庆动态主题
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Fast Category Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-300 shrink-0">
          <button
            onClick={() => onQuickCategory('compose-national-day')}
            className="text-amber-300 hover:text-amber-200 font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-950/80 to-amber-950/80 border border-amber-400/50 shadow-sm"
          >
            <span>🇨🇳 国庆全套UI套件</span>
          </button>
          <button
            onClick={() => onQuickCategory('compose-update-dialogs')}
            className="hover:text-rose-300 text-rose-200/90 font-bold transition-colors whitespace-nowrap flex items-center gap-1"
          >
            <span>🚀 50+ 动效更新弹窗</span>
          </button>
          <button
            onClick={() => onQuickCategory('all')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            全部代码
          </button>
          <button
            onClick={() => onQuickCategory('compose-buttons')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            Compose 动效
          </button>
          <button
            onClick={() => onQuickCategory('kotlin-coroutine')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            协程与 Flow
          </button>
          <button
            onClick={() => onQuickCategory('android-arch')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            Room & DataStore
          </button>
        </nav>

        {/* Zone 3: Search + GitHub + Celebrations + Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Integrated Frosted Search Bar */}
          <div className="relative w-36 md:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="搜索安卓代码或组件..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 text-xs text-white placeholder:text-slate-400 focus:bg-white/[0.1] focus:border-amber-400 focus:outline-none transition-all"
            />
          </div>

          {/* GitHub Repository Connect Button */}
          {onOpenGitHubModal && (
            <button
              onClick={onOpenGitHubModal}
              title="对接 GitHub 仓库并配置精准定位修改"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/[0.06] hover:bg-white/[0.1] border border-amber-400/40 text-amber-300 transition-all"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">GitHub 仓库</span>
            </button>
          )}

          {/* Celebration Trigger */}
          {onTriggerCelebration && (
            <button
              onClick={onTriggerCelebration}
              title="放礼花庆祝盛世华诞"
              className="p-2 rounded-xl bg-red-950/60 border border-amber-400/40 text-amber-300 hover:bg-red-900/60 transition-transform active:scale-90"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Quick Favorites Action */}
          <button
            onClick={onToggleFavorites}
            title="查看收藏夹"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              isFavoritesActive
                ? 'bg-amber-400/20 border-amber-400/50 text-amber-200'
                : 'bg-white/[0.06] border-white/10 text-slate-300 hover:text-amber-300 hover:bg-white/[0.1]'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isFavoritesActive ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span className="hidden sm:inline">收藏</span>
            <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.2 rounded-full bg-white/10">
              {favoriteCount}
            </span>
          </button>

          {/* Primary Action Button: Add Custom Snippet */}
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 shadow-md shadow-red-900/30 border border-amber-300/40 active:scale-95 transition-all whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>新建代码</span>
          </button>
        </div>
      </div>
    </header>
  );
};
