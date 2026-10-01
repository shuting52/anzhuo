import React, { useState } from 'react';
import {
  Sparkles,
  Type,
  ToggleRight,
  Loader2,
  LayoutGrid,
  Compass,
  BellRing,
  FileText,
  Layers,
  Zap,
  Database,
  ShieldCheck,
  Wrench,
  BookmarkCheck,
  Star,
  PlusCircle,
  Download,
  Upload,
  FolderGit2,
  Rocket,
  ChevronDown,
  ChevronUp,
  PanelLeftClose,
  PanelLeftOpen,
  PanelLeft
} from 'lucide-react';
import { SnippetCategory } from '../types/snippet';
import { CATEGORIES } from '../data/categories';

interface Props {
  selectedCategory: SnippetCategory | 'all' | 'favorites';
  onSelectCategory: (cat: SnippetCategory | 'all' | 'favorites') => void;
  counts: Record<string, number>;
  favoriteCount: number;
  onOpenCreateModal: () => void;
  onExportJson: () => void;
  onImportJson: () => void;
  className?: string;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

// Icon helper map
const ICON_MAP: Record<string, React.ReactNode> = {
  Rocket: <Rocket className="w-4 h-4 text-rose-400" />,
  Sparkles: <Sparkles className="w-4 h-4 text-amber-300" />,
  Type: <Type className="w-4 h-4" />,
  ToggleRight: <ToggleRight className="w-4 h-4" />,
  Loader2: <Loader2 className="w-4 h-4" />,
  LayoutGrid: <LayoutGrid className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  BellRing: <BellRing className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4 text-amber-400" />,
  Database: <Database className="w-4 h-4 text-cyan-400" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
  Wrench: <Wrench className="w-4 h-4 text-indigo-400" />,
  BookmarkCheck: <BookmarkCheck className="w-4 h-4 text-pink-400" />,
};

export const CategorySidebar: React.FC<Props> = ({
  selectedCategory,
  onSelectCategory,
  counts,
  favoriteCount,
  onOpenCreateModal,
  onExportJson,
  onImportJson,
  className = '',
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  // Collapsible sub-sections
  const [sectionFolded, setSectionFolded] = useState<Record<string, boolean>>({
    nationalDay: false,
    updateDialogs: false,
    compose: false,
    kotlin: false,
    system: false,
  });

  const toggleSection = (sec: string) => {
    setSectionFolded((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const natCategory = CATEGORIES.find((c) => c.id === 'compose-national-day');
  const updateDialogCategory = CATEGORIES.find((c) => c.id === 'compose-update-dialogs');
  const composeCategories = CATEGORIES.filter(
    (c) => c.group === 'compose' && c.id !== 'compose-national-day' && c.id !== 'compose-update-dialogs'
  );
  const kotlinCategories = CATEGORIES.filter((c) => c.group === 'kotlin');
  const systemCategories = CATEGORIES.filter((c) => c.group === 'system');

  const handleSelect = (id: SnippetCategory | 'all' | 'favorites') => {
    onSelectCategory(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`flex flex-col h-full rounded-3xl border border-amber-500/20 bg-slate-900/70 backdrop-blur-2xl shadow-[0_12px_40px_0_rgba(220,38,38,0.15)] p-3 select-none transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-full'
      } ${className}`}
    >
      {/* Sidebar Top: Expand / Collapse Toggle Header */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.08]">
        {!isCollapsed && (
          <div className="flex items-center gap-2 pl-1">
            <span className="text-base select-none">🇨🇳</span>
            <span className="text-xs font-black text-amber-300 tracking-wide">
              代码分类导航库
            </span>
          </div>
        )}

        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            title={isCollapsed ? '展开完整分类侧边栏' : '收纳侧边栏 (极简图标模式)'}
            className={`flex items-center gap-1.5 p-1.5 rounded-xl border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-amber-300 hover:bg-white/[0.06] transition-all ${
              isCollapsed ? 'mx-auto' : ''
            }`}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-amber-400" />
            ) : (
              <>
                <PanelLeftClose className="w-4 h-4 text-amber-400" />
                <span className="text-[11px] font-bold text-amber-300">收纳侧边栏</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Top Action Buttons: All Snippets & My Favorites & New Snippet */}
      <div className="space-y-1.5 pb-3 border-b border-white/[0.08]">
        {/* All Snippets */}
        <button
          onClick={() => handleSelect('all')}
          title="全部代码大全"
          className={`w-full flex items-center ${
            isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3.5 py-2'
          } rounded-2xl text-xs font-semibold transition-all ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-red-600/30 to-amber-500/20 text-amber-200 border border-amber-400/50 shadow-sm'
              : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <FolderGit2 className="w-4 h-4 text-amber-400 shrink-0" />
            {!isCollapsed && <span>全部代码大全</span>}
          </div>
          {!isCollapsed && (
            <span className="text-[11px] font-mono tabular-nums px-2 py-0.5 rounded-full bg-white/[0.08] text-slate-300">
              {counts['all'] || 0}
            </span>
          )}
        </button>

        {/* My Favorites */}
        <button
          onClick={() => handleSelect('favorites')}
          title="我的收藏夹"
          className={`w-full flex items-center ${
            isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3.5 py-2'
          } rounded-2xl text-xs font-semibold transition-all ${
            selectedCategory === 'favorites'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-400/50 shadow-sm'
              : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400/30 shrink-0" />
            {!isCollapsed && <span>我的收藏夹</span>}
          </div>
          {!isCollapsed && (
            <span className="text-[11px] font-mono tabular-nums px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold">
              {favoriteCount}
            </span>
          )}
        </button>

        {/* User Custom Snippets */}
        <button
          onClick={() => handleSelect('custom')}
          title="我的私有代码片段"
          className={`w-full flex items-center ${
            isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3.5 py-2'
          } rounded-2xl text-xs font-semibold transition-all ${
            selectedCategory === 'custom'
              ? 'bg-rose-500/20 text-rose-200 border border-rose-400/50 shadow-sm'
              : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <BookmarkCheck className="w-4 h-4 text-rose-400 shrink-0" />
            {!isCollapsed && <span>自定义代码</span>}
          </div>
          {!isCollapsed && (
            <span className="text-[11px] font-mono tabular-nums px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
              {counts['custom'] || 0}
            </span>
          )}
        </button>

        {/* Add Snippet CTA */}
        <button
          onClick={onOpenCreateModal}
          title="添加自定义安卓代码片段"
          className={`w-full mt-2 flex items-center justify-center gap-2 ${
            isCollapsed ? 'p-2.5' : 'px-3 py-2'
          } rounded-2xl text-xs font-bold bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white border border-amber-300/40 shadow-md shadow-red-900/30 active:scale-95 transition-all`}
        >
          <PlusCircle className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>新建代码片段</span>}
        </button>
      </div>

      {/* Categories Scrollable List (With Accordion Folding for Each Section) */}
      <div className="flex-1 overflow-y-auto pr-1 py-2 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10">
        {/* ================= Special Section 1: National Day Full Suite ================= */}
        {natCategory && (
          <div>
            {!isCollapsed && (
              <div
                onClick={() => toggleSection('nationalDay')}
                className="px-2 py-1 flex items-center justify-between text-[11px] font-black tracking-wider text-amber-300 cursor-pointer hover:text-amber-200 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <span>🇨🇳</span>
                  <span>国庆庆典全套UI</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  {sectionFolded.nationalDay ? '▾ 展开' : '▴ 收纳'}
                </span>
              </div>
            )}
            {(!sectionFolded.nationalDay || isCollapsed) && (
              <button
                onClick={() => handleSelect(natCategory.id)}
                title={natCategory.name}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'
                } rounded-xl text-xs font-medium transition-all text-left ${
                  selectedCategory === natCategory.id
                    ? 'bg-gradient-to-r from-red-600/40 to-amber-500/30 text-amber-200 border border-amber-400/50 font-bold shadow-md'
                    : 'text-amber-200/90 hover:bg-white/[0.06] hover:text-white border border-amber-500/20'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-amber-400 shrink-0">🇨🇳</span>
                  {!isCollapsed && <span className="truncate font-bold">{natCategory.name}</span>}
                  {!isCollapsed && (
                    <span className="text-[9px] font-bold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-1 py-0.2 rounded shrink-0">
                      20款全套
                    </span>
                  )}
                </div>
                {!isCollapsed && (
                  <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">
                    {counts[natCategory.id] || 0}
                  </span>
                )}
              </button>
            )}
          </div>
        )}

        {/* ================= Special Section 2: 50+ Dynamic Update Dialogs ================= */}
        {updateDialogCategory && (
          <div>
            {!isCollapsed && (
              <div
                onClick={() => toggleSection('updateDialogs')}
                className="px-2 py-1 flex items-center justify-between text-[11px] font-bold tracking-wider text-rose-300 cursor-pointer hover:text-rose-200 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5 text-rose-400" />
                  <span>50+ 动效更新弹窗</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  {sectionFolded.updateDialogs ? '▾ 展开' : '▴ 收纳'}
                </span>
              </div>
            )}
            {(!sectionFolded.updateDialogs || isCollapsed) && (
              <button
                onClick={() => handleSelect(updateDialogCategory.id)}
                title={updateDialogCategory.name}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'
                } rounded-xl text-xs font-medium transition-all text-left ${
                  selectedCategory === updateDialogCategory.id
                    ? 'bg-rose-500/20 text-rose-200 border border-rose-400/40 font-bold shadow-md'
                    : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-rose-400 shrink-0">
                    <Rocket className="w-4 h-4" />
                  </span>
                  {!isCollapsed && <span className="truncate">{updateDialogCategory.name}</span>}
                  {!isCollapsed && (
                    <span className="text-[9px] font-bold text-rose-300 bg-rose-500/20 border border-rose-400/30 px-1 py-0.2 rounded shrink-0">
                      52款
                    </span>
                  )}
                </div>
                {!isCollapsed && (
                  <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-400">
                    {counts[updateDialogCategory.id] || 0}
                  </span>
                )}
              </button>
            )}
          </div>
        )}

        {/* ================= Section 3: Compose UI Components ================= */}
        <div>
          {!isCollapsed && (
            <div
              onClick={() => toggleSection('compose')}
              className="px-2 py-1 flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-400 cursor-pointer hover:text-slate-300 uppercase transition-colors"
            >
              <span>Compose 动效组件</span>
              <span className="text-[10px] text-slate-500">
                {sectionFolded.compose ? '▾ 展开' : '▴ 收纳'}
              </span>
            </div>
          )}
          {(!sectionFolded.compose || isCollapsed) && (
            <div className="space-y-0.5">
              {composeCategories.map((cat) => {
                const active = selectedCategory === cat.id;
                const count = counts[cat.id] || 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelect(cat.id)}
                    title={cat.name}
                    className={`w-full flex items-center ${
                      isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-1.5'
                    } rounded-xl text-xs font-medium transition-all text-left ${
                      active
                        ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 font-semibold shadow-sm'
                        : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={active ? 'text-amber-300' : 'text-slate-400'}>
                        {ICON_MAP[cat.icon] || <Sparkles className="w-4 h-4" />}
                      </span>
                      {!isCollapsed && <span className="truncate">{cat.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-400">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= Section 4: Kotlin Core & Coroutines ================= */}
        <div>
          {!isCollapsed && (
            <div
              onClick={() => toggleSection('kotlin')}
              className="px-2 py-1 flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-400 cursor-pointer hover:text-slate-300 uppercase transition-colors"
            >
              <span>Kotlin 协程与 Flow</span>
              <span className="text-[10px] text-slate-500">
                {sectionFolded.kotlin ? '▾ 展开' : '▴ 收纳'}
              </span>
            </div>
          )}
          {(!sectionFolded.kotlin || isCollapsed) && (
            <div className="space-y-0.5">
              {kotlinCategories.map((cat) => {
                const active = selectedCategory === cat.id;
                const count = counts[cat.id] || 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelect(cat.id)}
                    title={cat.name}
                    className={`w-full flex items-center ${
                      isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-1.5'
                    } rounded-xl text-xs font-medium transition-all text-left ${
                      active
                        ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 font-semibold'
                        : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={active ? 'text-amber-300' : 'text-slate-400'}>
                        {ICON_MAP[cat.icon] || <Zap className="w-4 h-4" />}
                      </span>
                      {!isCollapsed && <span className="truncate">{cat.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-400">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= Section 5: Architecture & System & Utils ================= */}
        <div>
          {!isCollapsed && (
            <div
              onClick={() => toggleSection('system')}
              className="px-2 py-1 flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-400 cursor-pointer hover:text-slate-300 uppercase transition-colors"
            >
              <span>架构、权限与工具类</span>
              <span className="text-[10px] text-slate-500">
                {sectionFolded.system ? '▾ 展开' : '▴ 收纳'}
              </span>
            </div>
          )}
          {(!sectionFolded.system || isCollapsed) && (
            <div className="space-y-0.5">
              {systemCategories.map((cat) => {
                const active = selectedCategory === cat.id;
                const count = counts[cat.id] || 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelect(cat.id)}
                    title={cat.name}
                    className={`w-full flex items-center ${
                      isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-1.5'
                    } rounded-xl text-xs font-medium transition-all text-left ${
                      active
                        ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 font-semibold'
                        : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={active ? 'text-amber-300' : 'text-slate-400'}>
                        {ICON_MAP[cat.icon] || <Wrench className="w-4 h-4" />}
                      </span>
                      {!isCollapsed && <span className="truncate">{cat.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-400">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Backup & Restore Action Bar */}
      <div className="pt-2.5 border-t border-white/[0.08] flex items-center justify-between px-1 text-[11px] text-slate-400">
        <button
          onClick={onExportJson}
          title="导出自定义代码与收藏备份 JSON"
          className={`flex items-center gap-1 hover:text-amber-300 transition-colors py-1 ${
            isCollapsed ? 'px-1 mx-auto' : 'px-2'
          } rounded-lg hover:bg-white/[0.06]`}
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          {!isCollapsed && <span>导出备份</span>}
        </button>
        {!isCollapsed && (
          <button
            onClick={onImportJson}
            title="从 JSON 导入代码"
            className="flex items-center gap-1 hover:text-emerald-300 transition-colors py-1 px-2 rounded-lg hover:bg-white/[0.06]"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>导入恢复</span>
          </button>
        )}
      </div>
    </aside>
  );
};
