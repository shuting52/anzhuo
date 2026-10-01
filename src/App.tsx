/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  Sparkles,
  Layers,
  Star,
  Plus,
  BookOpen,
  FolderGit2,
  Terminal,
  Zap,
  Tag,
  X,
  Code2,
  CheckCircle2,
  SlidersHorizontal,
  BookmarkCheck,
  Smartphone
} from 'lucide-react';
import { Snippet, SnippetCategory } from './types/snippet';
import { CATEGORIES } from './data/categories';
import { INITIAL_SNIPPETS } from './data/initialSnippets';
import { TopNav } from './components/TopNav';
import { CategorySidebar } from './components/CategorySidebar';
import { SnippetCard } from './components/SnippetCard';
import { CustomSnippetModal } from './components/CustomSnippetModal';
import { GitHubSyncModal } from './components/GitHubSyncModal';

const STORAGE_CUSTOM_KEY = 'droidfrost_custom_snippets_v1';
const STORAGE_FAVORITES_KEY = 'droidfrost_favorites_v1';
const STORAGE_SIDEBAR_COLLAPSED_KEY = 'droidfrost_sidebar_collapsed_v1';

export default function App() {
  // 1. Data States
  const [customSnippets, setCustomSnippets] = useState<Snippet[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FAVORITES_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set(['c01', 'c06', 'c09', 'nat-splash-screen', 'nat-home-screen']);
    } catch {
      return new Set(['c01', 'c06']);
    }
  });

  // 2. Navigation & Filtering States
  const [selectedCategory, setSelectedCategory] = useState<SnippetCategory | 'all' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // 3. Modal & UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [globalExpandCode, setGlobalExpandCode] = useState<boolean>(false);

  // 4. Sidebar Expand / Collapse State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_SIDEBAR_COLLAPSED_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // 5. GitHub Repository Integration State
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [selectedSnippetForGitHub, setSelectedSnippetForGitHub] = useState<Snippet | null>(null);

  // 6. Celebration Particle Burst State
  const [celebrateEffect, setCelebrateEffect] = useState<boolean>(false);

  // 7. Toast Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save sidebar collapse state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SIDEBAR_COLLAPSED_KEY, String(isSidebarCollapsed));
    } catch (e) {
      console.error(e);
    }
  }, [isSidebarCollapsed]);


  // Save custom snippets to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(customSnippets));
    } catch (err) {
      console.error('Failed to save custom snippets', err);
    }
  }, [customSnippets]);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    } catch (err) {
      console.error('Failed to save favorites', err);
    }
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 2400);
  };

  // Combine initial snippets and user custom snippets
  const allSnippets = useMemo(() => {
    return [...customSnippets, ...INITIAL_SNIPPETS];
  }, [customSnippets]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: allSnippets.length,
      custom: customSnippets.length,
    };
    allSnippets.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, [allSnippets, customSnippets]);

  // Filter snippets based on category, favorites, search query, and active tag
  const filteredSnippets = useMemo(() => {
    return allSnippets.filter((item) => {
      // 1. Category / Favorites filter
      if (selectedCategory === 'favorites') {
        if (!favorites.has(item.id)) return false;
      } else if (selectedCategory === 'custom') {
        if (!item.isCustom) return false;
      } else if (selectedCategory !== 'all') {
        if (item.category !== selectedCategory) return false;
      }

      // 2. Active tag filter
      if (activeTag && !item.tags.includes(activeTag)) {
        return false;
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = item.title.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q);
        const inCat = item.categoryName.toLowerCase().includes(q);
        const inCode = item.code.toLowerCase().includes(q);
        const inTags = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inCat && !inCode && !inTags) {
          return false;
        }
      }

      return true;
    });
  }, [allSnippets, selectedCategory, favorites, searchQuery, activeTag]);

  // Handlers
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSaveCustomSnippet = (
    data: Omit<Snippet, 'id' | 'createdAt'> & { id?: string }
  ) => {
    if (data.id) {
      // Update existing
      setCustomSnippets((prev) =>
        prev.map((s) => (s.id === data.id ? { ...s, ...data, id: s.id } : s))
      );
      showToast('已更新自定义代码片段');
    } else {
      // Create new
      const newSnippet: Snippet = {
        ...data,
        id: `custom-${Date.now()}`,
        isCustom: true,
        createdAt: Date.now(),
      };
      setCustomSnippets((prev) => [newSnippet, ...prev]);
      showToast('🎉 已成功添加自定义代码到个人库！');
    }
    setEditingSnippet(null);
  };

  const handleDeleteSnippet = (id: string) => {
    if (window.confirm('确认删除该自定义代码片段吗？')) {
      setCustomSnippets((prev) => prev.filter((s) => s.id !== id));
      setFavorites((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      showToast('已删除自定义代码片段');
    }
  };

  const handleEditSnippet = (snippet: Snippet) => {
    setEditingSnippet(snippet);
    setIsModalOpen(true);
  };

  const handleOpenGitHubSync = (snippet: Snippet) => {
    setSelectedSnippetForGitHub(snippet);
    setIsGitHubModalOpen(true);
  };

  const handleTriggerCelebration = () => {
    setCelebrateEffect(true);
    showToast('🇨🇳 盛世华诞 · 举国同庆！祝全国 Android 开发者节日快乐！');
    setTimeout(() => setCelebrateEffect(false), 3500);
  };


  // Export JSON Backup
  const handleExportJson = () => {
    try {
      const backupData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        customSnippets,
        favorites: Array.from(favorites),
      };
      const blob = new Blob([JSON.stringify(backupData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `droidfrost_snippets_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('已导出安卓代码备份文件');
    } catch (err) {
      console.error(err);
      showToast('导出备份失败');
    }
  };

  // Import JSON Backup
  const handleImportJson = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed.customSnippets && Array.isArray(parsed.customSnippets)) {
          setCustomSnippets(parsed.customSnippets);
        }
        if (parsed.favorites && Array.isArray(parsed.favorites)) {
          setFavorites(new Set(parsed.favorites));
        }
        showToast('🎉 成功恢复代码库与收藏记录！');
      } catch (err) {
        alert('导入失败，请检查 JSON 格式是否正确');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Current category metadata
  const currentCategoryInfo = useMemo(() => {
    if (selectedCategory === 'all') return { name: '全部安卓代码库', desc: '涵盖 Jetpack Compose 动效组件、Kotlin 协程架构、权限管理与高频工具扩展' };
    if (selectedCategory === 'favorites') return { name: '⭐ 我的收藏夹', desc: '您日常开发中最常调用与查阅的高频代码片段' };
    if (selectedCategory === 'custom') return { name: '我的私有代码库', desc: '您自主创建、整理与归档的个性化安卓代码实现' };
    const found = CATEGORIES.find((c) => c.id === selectedCategory);
    return found ? { name: found.name, desc: found.description } : { name: '安卓代码分类', desc: '' };
  }, [selectedCategory]);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden font-sans">
      {/* ================= 🇨🇳 盛世华诞·国庆动态主题流光与金星粒子 ================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Dynamic festive ambient orbs in Chinese Red & Imperial Gold */}
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-red-600/[0.16] blur-[160px]" />
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-amber-500/[0.14] blur-[170px]" />
        <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full bg-rose-700/[0.12] blur-[180px]" />
        <div className="absolute top-2/3 left-10 w-[500px] h-[500px] rounded-full bg-yellow-600/[0.1] blur-[150px]" />

        {/* Floating Celebratory Golden Stars */}
        {[
          { x: '8%', delay: 0, dur: 12, s: '⭐', size: 'text-xl' },
          { x: '24%', delay: 2.5, dur: 15, s: '✨', size: 'text-sm' },
          { x: '42%', delay: 5, dur: 14, s: '⭐', size: 'text-2xl' },
          { x: '68%', delay: 1.5, dur: 13, s: '✨', size: 'text-lg' },
          { x: '85%', delay: 4, dur: 16, s: '⭐', size: 'text-base' },
          { x: '94%', delay: 6.5, dur: 11, s: '🎈', size: 'text-xl' },
        ].map((star, idx) => (
          <div
            key={idx}
            style={{
              left: star.x,
              animation: `floatUp ${star.dur}s linear infinite`,
              animationDelay: `${star.delay}s`,
            }}
            className={`absolute -bottom-10 ${star.size} opacity-40 select-none pointer-events-none drop-shadow-[0_2px_8px_rgba(255,215,0,0.6)]`}
          >
            {star.s}
          </div>
        ))}

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #f59e0b 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Hidden File Input for JSON Backup Import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {/* ================= TOP NAVIGATION BAR ================= */}
      <TopNav
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCreateModal={() => {
          setEditingSnippet(null);
          setIsModalOpen(true);
        }}
        onToggleFavorites={() => {
          setSelectedCategory((cur) => (cur === 'favorites' ? 'all' : 'favorites'));
          setActiveTag(null);
        }}
        isFavoritesActive={selectedCategory === 'favorites'}
        favoriteCount={favorites.size}
        onQuickCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveTag(null);
          setSearchQuery('');
        }}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onOpenGitHubModal={() => {
          setSelectedSnippetForGitHub(filteredSnippets[0] || allSnippets[0]);
          setIsGitHubModalOpen(true);
        }}
        onTriggerCelebration={handleTriggerCelebration}
      />

      {/* ================= MAIN WORKSPACE LAYOUT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Desktop Left Sidebar: Categories Navigation with Expand/Collapse */}
          <div
            className={`hidden lg:block sticky top-[76px] max-h-[calc(100vh-100px)] transition-all duration-300 ${
              isSidebarCollapsed ? 'w-20 shrink-0' : 'w-72 shrink-0'
            }`}
          >
            <CategorySidebar
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setActiveTag(null);
              }}
              counts={categoryCounts}
              favoriteCount={favorites.size}
              onOpenCreateModal={() => {
                setEditingSnippet(null);
                setIsModalOpen(true);
              }}
              onExportJson={handleExportJson}
              onImportJson={handleImportJson}
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />
          </div>

          {/* Main Content Area: Snippets Viewport */}
          <main className="flex-1 min-w-0 space-y-6">
            {/* Header Hero Banner (Frosted Glass Panel with National Day Style) */}
            <div className="relative rounded-3xl border-2 border-amber-400/40 bg-gradient-to-r from-red-950/80 via-slate-900/80 to-amber-950/70 backdrop-blur-2xl p-6 md:p-8 shadow-[0_12px_40px_rgba(220,38,38,0.25)] overflow-hidden">
              {/* Corner celebration ribbons */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/20 to-transparent pointer-events-none rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-red-500/20 to-transparent pointer-events-none rounded-tr-full" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                    <span className="font-bold text-amber-400 flex items-center gap-1">
                      <span>🇨🇳</span> 盛世华诞 · 75周年国庆特别企划
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-300">安卓全套 1000+ UI组件工坊</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="font-mono text-amber-300 font-bold">
                      共 {filteredSnippets.length} 篇可用代码
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
                    <span>{currentCategoryInfo.name}</span>
                    <span className="text-xs font-bold text-amber-300 bg-amber-400/20 border border-amber-400/40 px-2 py-0.5 rounded-full">
                      国庆热推
                    </span>
                  </h1>
                  <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    {currentCategoryInfo.desc || '涵盖国庆特别版狐狸隐私弹窗v2、倒计时卡片、红旗飘扬FAB、52款动效更新弹窗与全套实战Android组件。'}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0 flex-wrap">
                  {/* GitHub Repository Sync Button */}
                  <button
                    onClick={() => {
                      setSelectedSnippetForGitHub(filteredSnippets[0] || allSnippets[0]);
                      setIsGitHubModalOpen(true);
                    }}
                    title="配置 GitHub 仓库并精准定位插入"
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold bg-white/[0.06] hover:bg-white/[0.12] text-amber-300 border border-amber-400/40 shadow-sm transition-all"
                  >
                    <FolderGit2 className="w-4 h-4 text-amber-400" />
                    <span>对接 GitHub 仓库</span>
                  </button>

                  {/* Global Expand / Collapse Code Toggle Button */}
                  <button
                    onClick={() => {
                      setGlobalExpandCode(!globalExpandCode);
                      showToast(globalExpandCode ? '已收纳所有代码片段' : '已展开所有代码片段');
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                      globalExpandCode
                        ? 'bg-amber-400/20 border-amber-400/60 text-amber-200'
                        : 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border-white/10'
                    }`}
                  >
                    <span>{globalExpandCode ? '收纳所有源码 ▴' : '展开所有源码 ▾'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingSnippet(null);
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
                  >
                    <Plus className="w-4 h-4 text-slate-950" />
                    <span>添加代码片段</span>
                  </button>
                </div>
              </div>

              {/* Active Search / Tag Filter Banner */}
              {(searchQuery || activeTag) && (
                <div className="relative z-10 mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span>过滤条件:</span>
                    {searchQuery && (
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-medium">
                        搜索: "{searchQuery}"
                      </span>
                    )}
                    {activeTag && (
                      <span className="px-2.5 py-1 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-400/30 font-medium">
                        标签: #{activeTag}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveTag(null);
                    }}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>清除全部过滤</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Segment Category Tabs (For fast one-click browsing directly in the main stream) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setActiveTag(null);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === 'all'
                    ? 'bg-amber-400/20 text-amber-200 border-amber-400/50 shadow-sm'
                    : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08]'
                }`}
              >
                全部代码 ({categoryCounts['all'] || 0})
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('compose-national-day');
                  setActiveTag(null);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === 'compose-national-day'
                    ? 'bg-gradient-to-r from-red-600/40 to-amber-500/30 text-amber-200 border-amber-400/60 shadow-md'
                    : 'bg-red-950/40 text-amber-300 border-amber-400/30 hover:bg-red-900/40'
                }`}
              >
                🇨🇳 国庆全套UI ({categoryCounts['compose-national-day'] || 0})
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('compose-update-dialogs');
                  setActiveTag(null);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === 'compose-update-dialogs'
                    ? 'bg-rose-500/20 text-rose-200 border-rose-400/50 shadow-sm'
                    : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08]'
                }`}
              >
                🚀 50+ 动效更新弹窗 ({categoryCounts['compose-update-dialogs'] || 0})
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('favorites');
                  setActiveTag(null);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                  selectedCategory === 'favorites'
                    ? 'bg-amber-500/20 text-amber-200 border-amber-400/50 shadow-sm'
                    : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08]'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/40" />
                <span>收藏夹 ({favorites.size})</span>
              </button>

              {CATEGORIES.filter(
                (c) => c.id !== 'custom' && c.id !== 'compose-update-dialogs' && c.id !== 'compose-national-day'
              ).slice(0, 7).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setActiveTag(null);
                  }}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedCategory === cat.id
                      ? 'bg-amber-400/20 text-amber-200 border-amber-400/50 shadow-sm'
                      : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08]'
                  }`}
                >
                  {cat.name} ({categoryCounts[cat.id] || 0})
                </button>
              ))}
            </div>

            {/* Snippets Feed */}
            {filteredSnippets.length > 0 ? (
              <div className="space-y-6">
                {filteredSnippets.map((snippet) => (
                  <SnippetCard
                    key={snippet.id}
                    snippet={snippet}
                    isFavorite={favorites.has(snippet.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onEdit={handleEditSnippet}
                    onDelete={handleDeleteSnippet}
                    onTagClick={(tag) => setActiveTag(tag)}
                    onShowToast={showToast}
                    forceExpandCode={globalExpandCode}
                    onOpenGitHubSync={handleOpenGitHubSync}
                  />
                ))}
              </div>
            ) : (
              /* Empty State (Frosted Glass Container) */
              <div className="rounded-3xl border border-white/[0.1] bg-slate-900/40 backdrop-blur-2xl p-12 text-center shadow-xl">
                <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-400/20 mx-auto flex items-center justify-center text-cyan-400 mb-4 text-3xl">
                  🐻
                </div>
                <h3 className="text-lg font-bold text-white mb-2">未找到符合条件的代码片段</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed">
                  {selectedCategory === 'favorites'
                    ? '您的收藏夹目前还是空的，在任意代码卡片右上角点击星标即可快速收藏常用代码！'
                    : '可以尝试更换关键词、重置分类筛选，或者创建您自己的自定义代码。'}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setActiveTag(null);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.08] hover:bg-white/[0.14] text-slate-200 transition-colors"
                  >
                    查看全部代码
                  </button>
                  <button
                    onClick={() => {
                      setEditingSnippet(null);
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-lg shadow-cyan-500/20"
                  >
                    + 添加我的代码
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ================= MOBILE DRAWER SIDEBAR ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] h-full bg-slate-900/95 border-r border-white/10 p-4 flex flex-col z-10 animate-slideRight">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
              <span className="font-bold text-sm text-white">分类速查目录</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <CategorySidebar
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setActiveTag(null);
                }}
                counts={categoryCounts}
                favoriteCount={favorites.size}
                onOpenCreateModal={() => {
                  setIsMobileMenuOpen(false);
                  setEditingSnippet(null);
                  setIsModalOpen(true);
                }}
                onExportJson={handleExportJson}
                onImportJson={handleImportJson}
                onCloseMobile={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= CUSTOM SNIPPET MODAL ================= */}
      <CustomSnippetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSnippet(null);
        }}
        onSave={handleSaveCustomSnippet}
        initialSnippet={editingSnippet}
      />

      {/* ================= GITHUB REPOSITORY SYNC MODAL ================= */}
      <GitHubSyncModal
        isOpen={isGitHubModalOpen}
        onClose={() => {
          setIsGitHubModalOpen(false);
          setSelectedSnippetForGitHub(null);
        }}
        snippet={selectedSnippetForGitHub || filteredSnippets[0] || allSnippets[0]}
        onShowToast={showToast}
      />

      {/* ================= CELEBRATION FIREWORKS / CONFETTI LAYER ================= */}
      {celebrateEffect && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-red-950/25 backdrop-blur-[2px]" />
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              style={{
                left: `${(i * 2.8) + 1.5}%`,
                top: `${(i % 5) * 18}%`,
                animation: `floatUp ${1.8 + (i % 3) * 0.4}s ease-out forwards`,
              }}
              className="absolute text-2xl select-none drop-shadow-[0_2px_8px_rgba(255,215,0,0.8)]"
            >
              {['🇨🇳', '⭐', '✨', '🎈', '🎆', '🎊', '🏮'][i % 7]}
            </div>
          ))}
        </div>
      )}

      {/* ================= FLOATING GLASS TOAST NOTIFICATION ================= */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/95 border border-amber-400/60 text-white shadow-[0_12px_40px_rgba(220,38,38,0.4)] backdrop-blur-2xl animate-bounceIn">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold text-amber-100">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

