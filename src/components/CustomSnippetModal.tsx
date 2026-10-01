import React, { useState, useEffect } from 'react';
import { X, Sparkles, Code2, Tag, BookOpen, Layers } from 'lucide-react';
import { Snippet, SnippetCategory } from '../types/snippet';
import { CATEGORIES } from '../data/categories';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (snippet: Omit<Snippet, 'id' | 'createdAt'> & { id?: string }) => void;
  initialSnippet?: Snippet | null;
}

export const CustomSnippetModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  initialSnippet,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<SnippetCategory>('custom');
  const [language, setLanguage] = useState<'kotlin' | 'compose' | 'xml' | 'gradle'>('kotlin');
  const [description, setDescription] = useState('');
  const [tips, setTips] = useState('');
  const [code, setCode] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialSnippet) {
      setTitle(initialSnippet.title);
      setCategory(initialSnippet.category);
      setLanguage(initialSnippet.language);
      setDescription(initialSnippet.description);
      setTips(initialSnippet.tips || '');
      setCode(initialSnippet.code);
      setTagsInput(initialSnippet.tags.join(', '));
    } else {
      resetForm();
    }
  }, [initialSnippet, isOpen]);

  const resetForm = () => {
    setTitle('');
    setCategory('custom');
    setLanguage('kotlin');
    setDescription('');
    setTips('');
    setCode('');
    setTagsInput('');
    setErrorMsg('');
  };

  const insertTemplate = (type: 'compose' | 'ext' | 'flow') => {
    if (type === 'compose') {
      setTitle('自定义 Compose 组件');
      setCategory('compose-buttons');
      setLanguage('compose');
      setDescription('可复用的 Jetpack Compose 自定义 UI 组件');
      setCode(`import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun CustomCard(
    title: String,
    modifier: Modifier = Modifier,
    onClick: () -> Unit = {}
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(Color(0xFF1E293B))
            .clickable(onClick = onClick)
            .padding(16.dp),
        contentAlignment = Alignment.CenterStart
    ) {
        Text(
            text = title,
            color = Color.White,
            fontSize = 15.sp,
            fontWeight = FontWeight.Bold
        )
    }
}`);
      setTagsInput('Compose, UI, Component');
    } else if (type === 'ext') {
      setTitle('Kotlin 高频工具扩展函数');
      setCategory('android-utils');
      setLanguage('kotlin');
      setDescription('针对常用对象的便捷 Extension 集合');
      setCode(`import android.view.View

// 快速设置 View 可见性
fun View.visible() {
    visibility = View.VISIBLE
}

fun View.gone() {
    visibility = View.GONE
}

// 快速防抖点击
fun View.setOnSingleClickListener(debounceTime: Long = 600L, action: () -> Unit) {
    var lastClickTime = 0L
    setOnClickListener {
        val currentTime = System.currentTimeMillis()
        if (currentTime - lastClickTime > debounceTime) {
            lastClickTime = currentTime
            action()
        }
    }
}`);
      setTagsInput('Extensions, View, Utils');
    } else if (type === 'flow') {
      setTitle('协程冷流 Flow 数据拉取封装');
      setCategory('kotlin-coroutine');
      setLanguage('kotlin');
      setDescription('标准 Flow 数据流轮询与异常捕获');
      setCode(`import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.flow

fun <T> fetchStreamData(requestAction: suspend () -> T): Flow<Result<T>> = flow {
    while (true) {
        val data = requestAction()
        emit(Result.success(data))
        delay(5000L) // 每隔 5 秒刷新
    }
}.catch { e ->
    emit(Result.failure(e))
}`);
      setTagsInput('Coroutines, Flow, Poll');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('请输入片段标题');
      return;
    }
    if (!code.trim()) {
      setErrorMsg('请输入代码内容');
      return;
    }

    const tags = tagsInput
      .split(/[,，\s]+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const selectedCategoryObj = CATEGORIES.find((c) => c.id === category);

    onSave({
      id: initialSnippet?.id,
      title: title.trim(),
      category,
      categoryName: selectedCategoryObj?.name || '自定义代码',
      language,
      description: description.trim() || '用户自定义安卓代码片段',
      tips: tips.trim() || undefined,
      code: code.trim(),
      tags: tags.length ? tags : ['自定义', '安卓'],
      isCustom: true,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xl animate-fadeIn">
      {/* Frosted Glass Container */}
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl border border-white/20 bg-slate-900/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl overflow-hidden text-slate-100">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 backdrop-blur-md relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">
                {initialSnippet ? '编辑代码片段' : '新建自定义代码片段'}
              </h2>
              <p className="text-xs text-slate-400">
                持久化保存在当前设备，方便随时在安卓项目中复制使用
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 scrollbar-thin scrollbar-thumb-white/10">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Quick template buttons */}
          {!initialSnippet && (
            <div className="flex items-center gap-2 pb-1 overflow-x-auto">
              <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 快速填入模板:
              </span>
              <button
                type="button"
                onClick={() => insertTemplate('compose')}
                className="px-2.5 py-1 rounded-lg text-xs bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-cyan-300 transition-colors shrink-0"
              >
                Compose 卡片组件
              </button>
              <button
                type="button"
                onClick={() => insertTemplate('ext')}
                className="px-2.5 py-1 rounded-lg text-xs bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-emerald-300 transition-colors shrink-0"
              >
                Kotlin 常用扩展
              </button>
              <button
                type="button"
                onClick={() => insertTemplate('flow')}
                className="px-2.5 py-1 rounded-lg text-xs bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-pink-300 transition-colors shrink-0"
              >
                Flow 异步数据流
              </button>
            </div>
          )}

          {/* Title & Language */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                代码标题 <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例如: 常用沉浸式状态栏工具 StatusBarUtils"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 focus:border-cyan-400 focus:bg-white/[0.1] text-sm text-white outline-none transition-all placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">开发语言 / 类型</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/15 focus:border-cyan-400 text-sm text-white outline-none"
              >
                <option value="kotlin">Kotlin 核心</option>
                <option value="compose">Jetpack Compose</option>
                <option value="xml">Android View (XML)</option>
                <option value="gradle">Gradle 依赖脚本</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">所属分类</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SnippetCategory)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 focus:border-cyan-400 text-sm text-white outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.description.slice(0, 24)}...)
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">简要功能说明</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="简述该代码片段解决的问题、应用场景"
              className="w-full px-4 py-2 rounded-xl bg-white/[0.06] border border-white/15 focus:border-cyan-400 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          {/* Code Body */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                代码实现 (Kotlin / Compose) <span className="text-rose-400">*</span>
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {code.split('\n').length} 行代码
              </span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={12}
              placeholder="// 粘贴完整的可编译 Kotlin / Compose 代码..."
              className="w-full p-4 rounded-xl bg-slate-950/80 border border-white/15 focus:border-cyan-400 font-mono text-xs text-cyan-200 outline-none leading-relaxed placeholder:text-slate-600 resize-y"
            />
          </div>

          {/* Tips and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                使用注意事项 / 依赖提示 (可选)
              </label>
              <input
                type="text"
                value={tips}
                onChange={(e) => setTips(e.target.value)}
                placeholder="例如: 需要导入 androidx.compose.material3"
                className="w-full px-3 py-2 rounded-xl bg-white/[0.06] border border-white/15 focus:border-cyan-400 text-xs text-white outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                搜索标签 (用逗号或空格隔开)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Compose, 悬浮球, 动画, 工具"
                className="w-full px-3 py-2 rounded-xl bg-white/[0.06] border border-white/15 focus:border-cyan-400 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 text-xs font-semibold transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
            >
              {initialSnippet ? '保存更改' : '加入代码库'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
