import React, { useState } from 'react';
import { Copy, Check, ZoomIn, ZoomOut, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
  onCopied?: () => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'kotlin',
  fileName,
  onCopied,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('sm');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (onCopied) onCopied();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Ultra-lightweight, robust regex syntax highlighter for Kotlin & Compose
  const renderHighlightedCode = (rawCode: string) => {
    const lines = rawCode.split('\n');

    const keywords = new Set([
      'fun', 'val', 'var', 'by', 'if', 'else', 'when', 'return', 'for', 'while',
      'class', 'object', 'enum', 'import', 'package', 'private', 'public',
      'internal', 'protected', 'data', 'sealed', 'interface', 'this', 'it', 'in',
      'is', 'as', 'null', 'true', 'false', 'repeat', 'inline', 'override',
      'companion', 'suspend', 'let', 'apply', 'also', 'run', 'with'
    ]);

    const types = new Set([
      'Modifier', 'Color', 'Dp', 'String', 'Int', 'Float', 'Boolean', 'List',
      'Unit', 'Offset', 'Size', 'Stroke', 'TextStyle', 'Shadow', 'Brush',
      'SolidColor', 'VisualTransformation', 'PasswordVisualTransformation',
      'RoundedCornerShape', 'CircleShape', 'BorderStroke', 'Quad', 'Animatable',
      'LaunchedEffect', 'remember', 'mutableStateOf', 'mutableFloatStateOf',
      'rememberInfiniteTransition', 'infiniteRepeatable', 'tween', 'RepeatMode',
      'FastOutSlowInEasing', 'LinearEasing', 'StateFlow', 'SharedFlow', 'Flow',
      'ViewModel', 'Context', 'BoxScope', 'Shape', 'NetworkObserver', 'NetworkStatus',
      'Entity', 'Dao', 'Database', 'RoomDatabase', 'CoroutineScope'
    ]);

    return lines.map((line, lineIndex) => {
      // Tokenize line
      const tokens = line.split(/(\/\/.*|"[^"]*"|\/\*[\s\S]*?\*\/|@\w+|\.\w+\b|\b\d+(?:\.\d+)?(?:dp|sp|f|L)?\b|\b[a-zA-Z_]\w*\b|\s+|[^\w\s@.\/"]+)/g);

      return (
        <div key={lineIndex} className="table-row group hover:bg-white/[0.04] transition-colors">
          <span className="table-cell pr-4 text-right select-none text-slate-400 font-mono text-[11px] tabular-nums w-8 border-r border-white/[0.06]">
            {lineIndex + 1}
          </span>
          <span className="table-cell pl-4 whitespace-pre font-mono leading-relaxed">
            {tokens.map((token, tIdx) => {
              if (!token) return null;
              if (token.startsWith('//') || token.startsWith('/*')) {
                return (
                  <span key={tIdx} className="text-slate-400 italic">
                    {token}
                  </span>
                );
              }
              if (token.startsWith('"') && token.endsWith('"')) {
                return (
                  <span key={tIdx} className="text-emerald-300 font-normal">
                    {token}
                  </span>
                );
              }
              if (token.startsWith('@')) {
                return (
                  <span key={tIdx} className="text-amber-300 font-semibold">
                    {token}
                  </span>
                );
              }
              if (/^\d/.test(token)) {
                return (
                  <span key={tIdx} className="text-sky-300">
                    {token}
                  </span>
                );
              }
              if (keywords.has(token)) {
                return (
                  <span key={tIdx} className="text-pink-400 font-bold">
                    {token}
                  </span>
                );
              }
              if (types.has(token) || /^[A-Z]/.test(token)) {
                return (
                  <span key={tIdx} className="text-cyan-300 font-medium">
                    {token}
                  </span>
                );
              }
              return (
                <span key={tIdx} className="text-slate-100">
                  {token}
                </span>
              );
            })}
          </span>
        </div>
      );
    });
  };

  const fontClasses = {
    sm: 'text-xs',
    base: 'text-sm',
    lg: 'text-base',
  }[fontSize];

  return (
    <div className="relative rounded-2xl border border-white/[0.12] bg-[#0c1322]/85 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Code Window Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/60 border-b border-white/[0.08] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-400/40"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-400/40"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-400/40"></span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-200 font-semibold">{fileName || 'AndroidSnippet.kt'}</span>
            <span className="text-[11px] text-cyan-400/80 uppercase px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
              {language}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Font zoom buttons */}
          <div className="flex items-center bg-white/[0.06] rounded-lg p-0.5 border border-white/[0.08]">
            <button
              onClick={() => setFontSize((s) => (s === 'lg' ? 'base' : 'sm'))}
              title="缩小字体"
              className="p-1 hover:text-cyan-300 text-slate-400 transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setFontSize((s) => (s === 'sm' ? 'base' : 'lg'))}
              title="放大字体"
              className="p-1 hover:text-cyan-300 text-slate-400 transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              copied
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-white/[0.08] hover:bg-white/[0.14] text-slate-200 border border-white/[0.1]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>已复制</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>复制代码</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Viewport with Line Numbers */}
      <div className={`p-4 overflow-x-auto max-h-[580px] scrollbar-thin scrollbar-thumb-white/10 ${fontClasses}`}>
        <div className="table w-full border-collapse">{renderHighlightedCode(code)}</div>
      </div>
    </div>
  );
};
