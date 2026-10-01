import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Search,
  Check,
  AlertTriangle,
  Play,
  Music,
  Sparkles,
  Download,
  Wifi,
  WifiOff,
  Database,
  ShieldCheck,
  Sliders,
  Camera,
  Image as ImageIcon,
  Zap,
  MousePointerClick,
  Copy,
  Terminal,
  ExternalLink,
  RotateCcw,
  Smartphone
} from 'lucide-react';
import { UPDATE_DIALOG_THEMES, UpdateDialogTheme } from '../data/updateDialogSnippets';

interface Props {
  previewKey: string;
}

export const InteractiveWidgetPreview: React.FC<Props> = ({ previewKey }) => {
  // State variables for general interactive controls
  const [btnClicked, setBtnClicked] = useState<string>('');
  const [wobbleKey, setWobbleKey] = useState<number>(0);
  const [inputText, setInputText] = useState<string>('Android Developer');
  const [searchQuery, setSearchQuery] = useState<string>('Compose');
  const [password, setPassword] = useState<string>('123456');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [switchChecked, setSwitchChecked] = useState<boolean>(true);
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(true);
  const [radioSelected, setRadioSelected] = useState<number>(0);
  const [sliderVal, setSliderVal] = useState<number>(68);
  const [navSelected, setNavSelected] = useState<number>(1);
  const [tabSelected, setTabSelected] = useState<number>(0);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('已保存到收藏夹');
  const [loginForm, setLoginForm] = useState({ user: 'Dev_Novax', email: 'dev@android.studio', pass: 'secret99' });

  // List & Badges preview state
  const [activeBadges, setActiveBadges] = useState<string[]>(['Kotlin 2.0', 'Compose UI', 'Flow 异步', 'Material 3']);

  // Flow State emulator
  const [flowCount, setFlowCount] = useState<number>(1);
  const [flowLoading, setFlowLoading] = useState<boolean>(false);
  const [flowLogs, setFlowLogs] = useState<string[]>(['[00:00] Initialized UserUiState(isLoading=false)']);

  // Debounce click emulator
  const [rawClicks, setRawClicks] = useState<number>(0);
  const [debouncedClicks, setDebouncedClicks] = useState<number>(0);
  const debounceTimerRef = React.useRef<any>(null);

  // Room DB emulator
  const [roomData, setRoomData] = useState([
    { id: 1, title: 'Coroutines Flow 异步流', category: 'Kotlin', fav: true },
    { id: 2, title: 'Room SQLite 事务读写', category: 'Storage', fav: false },
    { id: 3, title: 'PhotoPicker 免权限相册', category: 'System', fav: true },
  ]);

  // DataStore KV emulator
  const [dsTheme, setDsTheme] = useState<'dark-frost' | 'aurora-frost'>('dark-frost');
  const [dsAutoCopy, setDsAutoCopy] = useState<boolean>(true);

  // Permission emulator
  const [permState, setPermState] = useState<'idle' | 'prompt' | 'granted' | 'denied'>('idle');

  // PhotoPicker emulator
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(0);

  // Dp/Px unit converter emulator
  const [dpInput, setDpInput] = useState<number>(16);

  // Network Observer emulator
  const [networkOnline, setNetworkOnline] = useState<boolean>(true);

  // ================= NATIONAL DAY SPECIAL EMULATOR =================
  const [foxExpanded, setFoxExpanded] = useState<boolean>(false);
  const [foxCookie, setFoxCookie] = useState<boolean>(true);
  const [foxAnalytics, setFoxAnalytics] = useState<boolean>(true);
  const [foxPersonalized, setFoxPersonalized] = useState<boolean>(false);
  const [foxSharing, setFoxSharing] = useState<boolean>(false);
  const [foxClosed, setFoxClosed] = useState<boolean>(false);

  const [wheelSpinning, setWheelSpinning] = useState<boolean>(false);
  const [wheelAngle, setWheelAngle] = useState<number>(0);

  const [natCheckIn, setNatCheckIn] = useState<boolean[]>([true, true, true, false, false, false, false]);
  const [fireworkParticles, setFireworkParticles] = useState<boolean>(false);
  const [couponClaimed, setCouponClaimed] = useState<boolean>(false);

  // Comprehensive Suite States
  const [splashSeconds, setSplashSeconds] = useState<number>(3);
  const [splashFinished, setSplashFinished] = useState<boolean>(false);
  const [homeBannerTab, setHomeBannerTab] = useState<number>(0);
  const [subCatActiveIdx, setSubCatActiveIdx] = useState<number>(0);
  const [accordionOpen, setAccordionOpen] = useState<{ [key: string]: boolean }>({ s1: true, s2: false, s3: false });
  const [settingsPushNotify, setSettingsPushNotify] = useState<boolean>(true);
  const [settingsDarkMode, setSettingsDarkMode] = useState<boolean>(true);
  const [cacheSize, setCacheSize] = useState<string>('12.8 MB');
  const [loginPhone, setLoginPhone] = useState<string>('13800138000');
  const [loginCode, setLoginCode] = useState<string>('888666');
  const [loginSmsSeconds, setLoginSmsSeconds] = useState<number>(0);
  const [bottomNavIndex, setBottomNavIndex] = useState<number>(0);
  const [redPacketModalOpen, setRedPacketModalOpen] = useState<boolean>(true);
  const [redPacketOpened, setRedPacketOpened] = useState<boolean>(false);


  // ================= 50+ UPDATE DIALOG EMULATOR =================
  const isUpdateDialogPreview = previewKey.startsWith('update-preview-');
  const updateDialogTheme: UpdateDialogTheme | undefined = isUpdateDialogPreview
    ? UPDATE_DIALOG_THEMES.find((t) => `update-preview-${t.id}` === previewKey)
    : undefined;

  const [updateDownloading, setUpdateDownloading] = useState<boolean>(false);
  const [updateProgress, setUpdateProgress] = useState<number>(0);
  const [updateInstalled, setUpdateInstalled] = useState<boolean>(false);
  const [showFullUpdateModal, setShowFullUpdateModal] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const handleDebounceClick = () => {
    setRawClicks((c) => c + 1);
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedClicks((c) => c + 1);
    }, 500);
  };

  const handleSimulateUpdate = () => {
    setUpdateDownloading(true);
    setUpdateProgress(0);
    setUpdateInstalled(false);
    let curr = 0;
    const interval = setInterval(() => {
      curr += 4;
      if (curr >= 100) {
        setUpdateProgress(100);
        setUpdateDownloading(false);
        setUpdateInstalled(true);
        clearInterval(interval);
        triggerToast('🎉 APK 下载完成并完成校验！');
      } else {
        setUpdateProgress(curr);
      }
    }, 60);
  };

  return (
    <div className="rounded-2xl border border-white/[0.1] bg-slate-900/60 backdrop-blur-xl p-5 text-slate-200">
      <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-xs font-semibold tracking-wider text-cyan-300 uppercase">
            {isUpdateDialogPreview ? '50+ 动效更新弹窗实时模拟' : '组件动态效果实时预览'}
          </span>
        </div>
        <span className="text-xs text-slate-400">支持点击交互 / 手势体验</span>
      </div>

      <div className="flex flex-wrap items-center justify-center min-h-[140px] py-4 bg-slate-950/40 rounded-xl border border-white/[0.04]">
        {/* ==================== 50+ UPDATE DIALOGS ==================== */}
        {isUpdateDialogPreview && updateDialogTheme && (
          <div className="w-full max-w-md px-2 flex flex-col items-center">
            {/* Themed Update Dialog Card Display */}
            <div
              className={`relative w-full rounded-3xl p-6 border-2 border-white/20 bg-gradient-to-br ${updateDialogTheme.bgGradient} shadow-2xl overflow-hidden`}
            >
              {/* Dynamic Animated Glow / Particle Orb */}
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                style={{
                  backgroundColor: updateDialogTheme.primaryColor,
                }}
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none"
              />

              {/* Header Zone: Icon with CSS/motion animation */}
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  animate={
                    updateDialogTheme.animationType.includes('spin')
                      ? { rotate: 360 }
                      : updateDialogTheme.animationType.includes('fly')
                      ? { y: [0, -10, 0], x: [0, 4, 0] }
                      : updateDialogTheme.animationType.includes('glitch')
                      ? { skewX: [0, -8, 8, 0], scale: [1, 1.05, 0.95, 1] }
                      : { scale: [1, 1.15, 1], rotate: [-4, 4, -4] }
                  }
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  style={{
                    background: `linear-gradient(135deg, ${updateDialogTheme.primaryColor}, ${updateDialogTheme.secondaryColor})`,
                  }}
                  className="w-16 h-16 rounded-2xl border-2 border-white/40 flex items-center justify-center text-3xl shadow-lg shrink-0"
                >
                  {updateDialogTheme.icon}
                </motion.div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-white">{updateDialogTheme.name}</span>
                    <span
                      style={{ color: updateDialogTheme.primaryColor, borderColor: updateDialogTheme.primaryColor }}
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border bg-black/40"
                    >
                      {updateDialogTheme.version}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    包体体积: <b className="text-white font-mono">{updateDialogTheme.size}</b> · 动效:{' '}
                    <span className="text-cyan-300 font-mono">{updateDialogTheme.animationType}</span>
                  </div>
                </div>
              </div>

              {/* Changelog Items */}
              <div className="bg-black/35 rounded-2xl p-3 border border-white/10 mb-4 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> 本次更新重点内容:
                </div>
                {updateDialogTheme.features.map((log, i) => (
                  <div key={i} className="text-xs text-slate-200 flex items-start gap-1.5 leading-relaxed">
                    <span style={{ color: updateDialogTheme.primaryColor }} className="font-bold">
                      {i + 1}.
                    </span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>

              {/* Progress or Actions */}
              {updateDownloading ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-cyan-300 animate-pulse">正在极速拉取增量包...</span>
                    <span className="text-white font-bold">{updateProgress}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-black/50 border border-white/20 p-0.5 overflow-hidden">
                    <motion.div
                      style={{
                        width: `${updateProgress}%`,
                        background: `linear-gradient(90deg, ${updateDialogTheme.primaryColor}, ${updateDialogTheme.secondaryColor})`,
                      }}
                      className="h-full rounded-full transition-all duration-150"
                    />
                  </div>
                </div>
              ) : updateInstalled ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>安装包已准备就绪，点击重启应用即可生效</span>
                  </div>
                  <button
                    onClick={() => {
                      setUpdateInstalled(false);
                      setUpdateProgress(0);
                    }}
                    className="p-1 hover:text-white"
                    title="重置"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => triggerToast('已设置稍后在 WiFi 下自动提醒')}
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold transition-colors"
                  >
                    以后再说
                  </button>
                  <button
                    onClick={handleSimulateUpdate}
                    style={{
                      background: `linear-gradient(135deg, ${updateDialogTheme.primaryColor}, ${updateDialogTheme.secondaryColor})`,
                    }}
                    className="flex-[1.5] py-2.5 rounded-xl text-white text-xs font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>立即升级体验</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY 1: SPLASH SCREEN ==================== */}
        {previewKey === 'preview-nat-splash' && (
          <div className="w-full flex flex-col items-center justify-center p-2">
            {!splashFinished ? (
              <div className="relative w-full max-w-[320px] h-[400px] rounded-3xl border-2 border-amber-400/60 bg-gradient-to-b from-[#7F1D1D] via-[#991B1B] to-[#450A0A] p-5 flex flex-col justify-between shadow-2xl overflow-hidden text-center text-white">
                {/* Top Right Skip Button */}
                <div className="flex justify-end relative z-10">
                  <button
                    onClick={() => {
                      setSplashFinished(true);
                      triggerToast('已跳过开屏页');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 border border-amber-300/60 text-xs font-bold hover:bg-black/60 transition-colors"
                  >
                    <span>跳过</span>
                    <span className="text-amber-300 font-mono">{splashSeconds}s</span>
                  </button>
                </div>

                {/* Center Mascot & Big Title */}
                <div className="space-y-2 relative z-10 my-auto">
                  <motion.div
                    animate={{ scale: [0.96, 1.04, 0.96] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="text-6xl select-none drop-shadow-[0_4px_12px_rgba(255,215,0,0.5)]"
                  >
                    🇨🇳
                  </motion.div>
                  <div className="text-2xl font-black text-amber-300 tracking-wider drop-shadow-md">
                    盛世华章 · 举国同庆
                  </div>
                  <p className="text-xs text-amber-100/90 leading-relaxed px-4">
                    祝全国 Android 开发者节日快乐 · 愿祖国繁荣昌盛
                  </p>
                </div>

                {/* Bottom Branding */}
                <div className="space-y-0.5 relative z-10 text-[10px] text-amber-200/70">
                  <div className="font-bold text-amber-300">国庆全套移动应用客户端</div>
                  <div>Copyright © 2026 Android Studio Craft</div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-slate-900 border border-amber-400/40 text-center space-y-3">
                <div className="text-3xl">🎉</div>
                <div className="text-xs font-bold text-amber-300">开屏倒计时结束，已自动载入主界面！</div>
                <button
                  onClick={() => {
                    setSplashFinished(false);
                    setSplashSeconds(3);
                    triggerToast('已重置开屏启动演示');
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold text-xs"
                >
                  重新测试开屏启动页 ↻
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY 2: HOME SCREEN ==================== */}
        {previewKey === 'preview-nat-home' && (
          <div className="w-full max-w-[340px] rounded-3xl border-2 border-amber-400/50 bg-[#0F172A] overflow-hidden shadow-2xl text-white">
            {/* Top Red-Gold Status & Search Bar */}
            <div className="bg-gradient-to-b from-[#991B1B] via-[#7F1D1D] to-[#0F172A] p-3.5 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xl">🇨🇳</span>
                <div className="flex-1 h-8 rounded-full bg-black/40 border border-amber-400/40 flex items-center px-3 gap-2">
                  <Search className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[11px] text-slate-300">搜索国庆活动 / 代码 / 特权</span>
                </div>
                <span
                  onClick={() => triggerToast('点击了首页通知铃铛')}
                  className="text-base cursor-pointer hover:scale-110 transition-transform"
                >
                  🔔
                </span>
              </div>
            </div>

            {/* Carousel Banner */}
            <div className="px-3">
              <div className="h-28 rounded-2xl bg-gradient-to-r from-[#DC2626] to-[#B45309] border border-amber-400 p-3.5 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="text-xs font-black text-amber-200">⭐ 盛世华诞 · 全民盛典</div>
                  <div className="text-[11px] text-white/90 mt-0.5">万份开发者好礼每日领 · 连签必得锦鲤徽章</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-amber-400 text-[#7F1D1D] font-black text-[10px]">
                    立即参与 ›
                  </span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        onClick={() => setHomeBannerTab(i)}
                        className={`w-2 h-1 rounded-full cursor-pointer transition-all ${
                          homeBannerTab === i ? 'w-4 bg-amber-300' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Five Blessings Icons Grid */}
            <div className="grid grid-cols-5 gap-1 p-3 text-center">
              {[
                { icon: '🎁', title: '盛典礼包' },
                { icon: '🎯', title: '幸运转盘' },
                { icon: '🚩', title: '足迹打卡' },
                { icon: '🎟️', title: '立减神券' },
                { icon: '📦', title: '功能库' },
              ].map((item) => (
                <div
                  key={item.title}
                  onClick={() => triggerToast(`点击了金刚区: ${item.title}`)}
                  className="flex flex-col items-center gap-1 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7F1D1D] border border-amber-400/60 flex items-center justify-center text-lg group-hover:scale-110 transition-transform shadow-md">
                    {item.icon}
                  </div>
                  <span className="text-[10px] text-slate-300 font-medium">{item.title}</span>
                </div>
              ))}
            </div>

            {/* Featured Product Mini Cards */}
            <div className="px-3 pb-3">
              <div className="text-xs font-bold text-amber-300 mb-2 flex items-center justify-between">
                <span>🔥 盛典特惠爆款展台</span>
                <span className="text-[10px] text-slate-400">更多特惠 ›</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div
                  onClick={() => triggerToast('加购了 VIP年度特权')}
                  className="p-2.5 rounded-xl bg-white/[0.04] border border-amber-400/30 cursor-pointer hover:border-amber-400/60 transition-colors"
                >
                  <div className="text-xs font-bold text-white">VIP年度特权</div>
                  <div className="text-sm font-black text-amber-300 mt-1 font-mono">¥ 199</div>
                  <span className="text-[9px] text-rose-400 bg-rose-500/20 px-1 py-0.2 rounded font-semibold">
                    立省 ¥75
                  </span>
                </div>
                <div
                  onClick={() => triggerToast('加购了 UI组件合辑')}
                  className="p-2.5 rounded-xl bg-white/[0.04] border border-amber-400/30 cursor-pointer hover:border-amber-400/60 transition-colors"
                >
                  <div className="text-xs font-bold text-white">UI组件合辑</div>
                  <div className="text-sm font-black text-amber-300 mt-1 font-mono">¥ 49</div>
                  <span className="text-[9px] text-amber-400 bg-amber-500/20 px-1 py-0.2 rounded font-semibold">
                    国庆特价
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY 3: CATEGORY SCREEN ==================== */}
        {previewKey === 'preview-nat-subcat' && (
          <div className="w-full max-w-[340px] h-[320px] rounded-3xl border-2 border-amber-400/50 bg-[#0F172A] overflow-hidden shadow-2xl flex text-white">
            {/* Left 1st level tabs */}
            <div className="w-24 bg-[#1E293B] border-r border-white/10 flex flex-col py-2">
              {['庆典特辑', '动效组件', '网络存储', '系统权限', '工具拓展'].map((cat, idx) => (
                <div
                  key={cat}
                  onClick={() => {
                    setSubCatActiveIdx(idx);
                    triggerToast(`切换到一级分类: ${cat}`);
                  }}
                  className={`px-2 py-3 text-xs text-center cursor-pointer transition-colors font-medium ${
                    subCatActiveIdx === idx
                      ? 'bg-[#7F1D1D] text-amber-300 font-bold border-l-3 border-amber-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </div>
              ))}
            </div>

            {/* Right 2nd level list */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              <div className="text-xs font-bold text-amber-300 pb-1">
                🇨🇳 {['庆典特辑', '动效组件', '网络存储', '系统权限', '工具拓展'][subCatActiveIdx]} · 子细项
              </div>
              {(subCatActiveIdx === 0
                ? ['狐狸隐私弹窗', '75周年倒计时', '喜迎国庆转盘', '红旗迎风FAB', '庆典跑马灯']
                : subCatActiveIdx === 1
                ? ['主按钮组件', '粗边框输入框', '摇摆按键', '唱片音乐卡', '双色加载器']
                : subCatActiveIdx === 2
                ? ['Room数据库', 'DataStore偏好', 'Retrofit封装', 'Flow数据流']
                : subCatActiveIdx === 3
                ? ['Android14权限', 'PhotoPicker相册', '系统剪贴板', '通知管理']
                : ['尺寸换算DpPx', '网络状态监听', '键盘弹起适配', '防抖连击']
              ).map((item) => (
                <div
                  key={item}
                  onClick={() => triggerToast(`进入功能: ${item}`)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] border border-amber-400/20 hover:border-amber-400/60 cursor-pointer transition-colors"
                >
                  <span className="text-xs font-medium text-slate-200">{item}</span>
                  <span className="text-[10px] text-amber-300 font-bold">进入 ›</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY 4: ACCORDION DRAWER ==================== */}
        {previewKey === 'preview-nat-accordion' && (
          <div className="w-full max-w-sm space-y-2">
            {[
              { id: 's1', title: '🎆 国庆盛典模块', items: ['开屏跳过组件', '盛世华诞大转盘', '7天签到日历', '节日礼券卡'] },
              { id: 's2', title: '⚙️ 核心架构与存储', items: ['Room SQLite表', 'DataStore偏好', 'ViewModel封装'] },
              { id: 's3', title: '🔒 权限与系统服务', items: ['Android14权限', '免权限相册', '网络状态监听器'] },
            ].map((sec) => {
              const isOpen = accordionOpen[sec.id];
              return (
                <div
                  key={sec.id}
                  className="rounded-2xl bg-[#1E293B] border border-amber-400/30 overflow-hidden shadow-lg"
                >
                  <div
                    onClick={() => setAccordionOpen({ ...accordionOpen, [sec.id]: !isOpen })}
                    className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-white/[0.04] transition-colors"
                  >
                    <span className="text-xs font-bold text-amber-300">{sec.title}</span>
                    <span className="text-[11px] text-slate-400">
                      {isOpen ? '▴ 收纳' : '▾ 展开'}
                    </span>
                  </div>
                  {isOpen && (
                    <div className="p-3 pt-1 border-t border-white/[0.06] bg-black/20 space-y-1.5 animate-fadeIn">
                      {sec.items.map((it) => (
                        <div
                          key={it}
                          onClick={() => triggerToast(`触发: ${it}`)}
                          className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/[0.05] cursor-pointer text-xs"
                        >
                          <span className="text-slate-300">{it}</span>
                          <span className="text-[10px] text-amber-400">测试 ›</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY 5: SETTINGS SCREEN ==================== */}
        {previewKey === 'preview-nat-settings' && (
          <div className="w-full max-w-[340px] rounded-3xl border-2 border-amber-400/50 bg-[#0F172A] p-4 text-white space-y-3 shadow-2xl">
            {/* VIP Card */}
            <div className="rounded-2xl bg-gradient-to-r from-[#991B1B] via-[#D97706] to-[#7F1D1D] border-2 border-amber-400 p-3.5 flex items-center gap-3 shadow-lg">
              <div className="w-11 h-11 rounded-full bg-[#450A0A] border border-amber-400 flex items-center justify-center text-xl">
                👑
              </div>
              <div>
                <div className="text-xs font-black text-amber-300">盛世华诞 · 尊贵开发者</div>
                <div className="text-[10px] text-white/80">特权至 2027-10-01 有效</div>
              </div>
            </div>

            {/* Toggles */}
            <div className="rounded-2xl bg-[#1E293B] border border-white/10 p-2 text-xs divide-y divide-white/[0.08]">
              <div className="flex items-center justify-between p-2">
                <span className="text-slate-200">节日消息与喜报通知</span>
                <input
                  type="checkbox"
                  checked={settingsPushNotify}
                  onChange={(e) => {
                    setSettingsPushNotify(e.target.checked);
                    triggerToast(`通知已${e.target.checked ? '开启' : '关闭'}`);
                  }}
                  className="accent-amber-400 cursor-pointer w-4 h-4"
                />
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-slate-200">国庆深红暗夜主题</span>
                <input
                  type="checkbox"
                  checked={settingsDarkMode}
                  onChange={(e) => {
                    setSettingsDarkMode(e.target.checked);
                    triggerToast(`深红暗夜主题已${e.target.checked ? '启用' : '停用'}`);
                  }}
                  className="accent-amber-400 cursor-pointer w-4 h-4"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="rounded-2xl bg-[#1E293B] border border-white/10 p-2 text-xs divide-y divide-white/[0.08]">
              <div
                onClick={() => triggerToast('进入狐狸隐私政策 v2')}
                className="flex items-center justify-between p-2 cursor-pointer hover:bg-white/[0.04]"
              >
                <span>狐狸隐私政策 v2</span>
                <span className="text-amber-300 font-bold">›</span>
              </div>
              <div
                onClick={() => {
                  setCacheSize('0.0 KB');
                  triggerToast('已清理临时缓存！');
                }}
                className="flex items-center justify-between p-2 cursor-pointer hover:bg-white/[0.04]"
              >
                <span>清理本地临时缓存</span>
                <span className="text-[10px] font-mono text-amber-300">{cacheSize}</span>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={() => triggerToast('已模拟退出登录')}
              className="w-full py-2 rounded-xl bg-[#7F1D1D] border border-rose-500/50 text-white font-bold text-xs"
            >
              安全退出当前账号
            </button>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY 6: BOTTOM NAV BAR ==================== */}
        {previewKey === 'preview-nat-bottom-nav' && (
          <div className="w-full max-w-[340px] rounded-2xl border-2 border-amber-400/60 bg-[#0F172A] p-2 text-white shadow-2xl">
            <div className="h-16 rounded-xl bg-[#1E293B] border border-amber-400/30 flex items-center justify-around px-3">
              {[
                { icon: '🏠', label: '首页' },
                { icon: '📦', label: '分类' },
                { icon: '⭐', label: '盛典', isCenter: true },
                { icon: '👤', label: '我的' },
              ].map((tab, idx) => {
                const isSelected = bottomNavIndex === idx;
                return (
                  <div
                    key={tab.label}
                    onClick={() => {
                      setBottomNavIndex(idx);
                      triggerToast(`切换导航: ${tab.label}`);
                    }}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    {tab.isCenter ? (
                      <div className="w-11 h-11 -mt-5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 border-2 border-[#7F1D1D] flex items-center justify-center text-xl shadow-lg group-hover:scale-105 transition-transform">
                        {tab.icon}
                      </div>
                    ) : (
                      <span className="text-base">{tab.icon}</span>
                    )}
                    <span
                      className={`text-[10px] mt-0.5 ${
                        isSelected ? 'text-amber-300 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {tab.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="text-center text-[10px] text-slate-400 mt-2">
              当前激活: {['首页', '分类', '盛典主场', '个人中心'][bottomNavIndex]}
            </div>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY 7: TOP APP BAR ==================== */}
        {previewKey === 'preview-nat-app-bar' && (
          <div className="w-full max-w-[340px] rounded-2xl border-2 border-amber-400/60 bg-gradient-to-r from-[#991B1B] via-[#7F1D1D] to-[#991B1B] p-3 text-white shadow-xl flex items-center justify-between">
            <button
              onClick={() => triggerToast('点击了返回按键')}
              className="w-8 h-8 rounded-full bg-black/30 border border-amber-400/50 flex items-center justify-center text-amber-300 font-black text-lg"
            >
              ‹
            </button>
            <div className="text-xs font-black text-amber-300 tracking-wide">
              盛世华章 · 国庆专区
            </div>
            <div
              onClick={() => triggerToast('查看未读节日喜报')}
              className="w-8 h-8 rounded-full bg-black/30 border border-amber-400/50 flex items-center justify-center relative cursor-pointer"
            >
              <span className="text-sm">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
            </div>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY 8: LOGIN AUTH ==================== */}
        {previewKey === 'preview-nat-login' && (
          <div className="w-full max-w-[320px] rounded-3xl border-2 border-amber-400/60 bg-gradient-to-b from-[#7F1D1D] to-[#0F172A] p-5 text-white shadow-2xl text-center space-y-3">
            <div className="text-4xl">🇨🇳</div>
            <div className="text-base font-black text-amber-300">盛世华诞 · 账号登录</div>
            <div className="space-y-2 text-left">
              <div>
                <label className="text-[10px] text-slate-300">手机号码</label>
                <input
                  type="text"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/20 text-xs text-white outline-none focus:border-amber-400 font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-300">验证码</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={loginCode}
                    onChange={(e) => setLoginCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-black/40 border border-white/20 text-xs text-white outline-none focus:border-amber-400 font-mono"
                  />
                  <button
                    onClick={() => {
                      setLoginSmsSeconds(60);
                      triggerToast('验证码已发送至 138****8000');
                    }}
                    disabled={loginSmsSeconds > 0}
                    className="px-2.5 py-1.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold"
                  >
                    {loginSmsSeconds > 0 ? `${loginSmsSeconds}s` : '获取验证码'}
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => triggerToast(`🎉 登录成功: ${loginPhone} 已领取国庆特权礼包`)}
              className="w-full py-2.5 rounded-xl bg-amber-400 text-[#7F1D1D] font-black text-xs shadow-md active:scale-95 transition-transform"
            >
              立即登录并领取国庆礼包 🎁
            </button>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY 9: SHARE POSTER ==================== */}
        {previewKey === 'preview-nat-poster' && (
          <div className="w-full max-w-[300px] rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-[#7F1D1D] via-[#991B1B] to-[#450A0A] p-5 text-center text-white shadow-2xl space-y-3">
            <div className="text-3xl">🇨🇳</div>
            <div className="text-lg font-black text-amber-300 tracking-wider">
              盛世华诞 · 锦绣中华
            </div>
            <div className="p-3 rounded-2xl bg-black/30 border border-amber-400/30 text-xs space-y-1">
              <div className="text-amber-200 font-bold">开发者专属祝福长图</div>
              <div className="text-[10px] text-white/80">代码如诗 · 愿祖国山河锦绣</div>
            </div>
            {/* Stamp Seal */}
            <div className="w-16 h-16 mx-auto rounded-full border-2 border-dashed border-amber-400 flex items-center justify-center text-amber-300 text-[10px] font-black rotate-[-12deg]">
              国庆印章
            </div>
            <button
              onClick={() => triggerToast('📸 已模拟生成并保存长图到相册')}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-red-950 font-bold text-xs"
            >
              保存高清分享海报到相册 📸
            </button>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY 10: CELEBRATION RED PACKET DIALOG ==================== */}
        {previewKey === 'preview-nat-dialog' && (
          <div className="w-full max-w-[320px] rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-[#DC2626] to-[#7F1D1D] p-6 text-center text-white shadow-2xl space-y-3 relative overflow-hidden">
            <div className="text-4xl">🇨🇳</div>
            <div className="text-base font-black text-amber-300">盛世华诞 · 专属开门红</div>
            <div className="text-xs text-white/90">送您 750 算力点 + VIP 会员月卡</div>
            <div className="py-2">
              <motion.button
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                onClick={() => {
                  setRedPacketOpened(true);
                  triggerToast('🎉 恭喜拆开盛典开门红！获得750算力点！');
                }}
                className="w-18 h-18 rounded-full bg-gradient-to-tr from-amber-300 via-amber-400 to-yellow-500 border-2 border-white text-red-950 font-black text-3xl shadow-xl active:scale-95 transition-transform"
              >
                {redPacketOpened ? '✓' : '開'}
              </motion.button>
            </div>
            <div className="text-[11px] text-amber-200">
              {redPacketOpened ? '已领入您的开发者账户！' : '点击“開”拆开国庆大礼包'}
            </div>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY 11: EMPTY STATE ==================== */}
        {previewKey === 'preview-nat-empty' && (
          <div className="w-full max-w-sm rounded-2xl bg-white/[0.04] border border-amber-400/30 p-6 text-center space-y-2.5">
            <div className="text-5xl animate-bounce">🚩</div>
            <div className="text-sm font-black text-amber-300">暂无匹配盛典内容</div>
            <div className="text-xs text-slate-300">客官别急，正在为您从云端装配最新国庆福利</div>
            <button
              onClick={() => triggerToast('重新加载盛典列表成功 ↻')}
              className="mt-2 px-4 py-2 rounded-xl bg-[#7F1D1D] border border-amber-400/60 text-amber-300 text-xs font-bold hover:bg-[#991B1B] transition-colors"
            >
              重新加载 ↻
            </button>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY 12: BADGE SUITE ==================== */}
        {previewKey === 'preview-nat-badge' && (
          <div className="w-full max-w-sm p-4 rounded-2xl bg-slate-900 border border-amber-400/40 space-y-3">
            <div className="text-xs font-bold text-amber-300">国庆金色星徽角标与标签套件</div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#7F1D1D] text-amber-300 border border-amber-400/60 text-xs font-bold">
                ⭐ 盛典特推
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#DC2626] text-white border border-red-400/60 text-xs font-bold">
                国庆特惠
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#B45309] text-amber-200 border border-amber-400/60 text-xs font-bold">
                限免福利
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#1E293B] text-amber-300 border border-amber-400/60 text-xs font-bold">
                👑 VIP专享
              </span>
            </div>
          </div>
        )}

        {/* ==================== 🇨🇳 FOX PRIVACY DIALOG V2 (USER CLASSIC COMPONENT) ==================== */}
        {(previewKey === 'preview-fox-privacy-v2' || previewKey === 'preview-nat-fox-privacy-v2') && (

          <div className="w-full flex flex-col items-center justify-center p-2">
            {!foxClosed ? (
              <div className="relative w-full max-w-[360px] rounded-3xl p-6 text-center overflow-hidden border border-white/40 shadow-2xl bg-white/95 text-slate-800">
                {/* 3 Animated wandering blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
                  <motion.div
                    animate={{ x: [-80, 80, 80, -80, -80], y: [-100, -100, 100, 100, -100] }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                    className="absolute w-28 h-28 rounded-full bg-[#ff2d78] blur-2xl opacity-45"
                  />
                  <motion.div
                    animate={{ x: [80, 80, -80, -80, 80], y: [100, -100, -100, 100, 100] }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'linear', delay: 2 }}
                    className="absolute w-28 h-28 rounded-full bg-[#6c63ff] blur-2xl opacity-45"
                  />
                  <motion.div
                    animate={{ x: [-80, -80, 80, 80, -80], y: [100, 100, -100, -100, 100] }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'linear', delay: 4 }}
                    className="absolute w-28 h-28 rounded-full bg-[#00e5ff] blur-2xl opacity-45"
                  />
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setFoxClosed(true);
                    triggerToast('已关闭弹窗');
                  }}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs font-bold transition-all z-10"
                >
                  ✕
                </button>

                {/* Floating Fox Mascot (SVG) */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="w-16 h-12 mx-auto mb-3 relative z-10 drop-shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 65 46" className="w-full h-full">
                    <path stroke="#000" fill="#EAB789" d="M49.157 15.69L44.58.655l-12.422 1.96L21.044.654l-8.499 2.615-6.538 5.23-4.576 9.153v11.114l4.576 8.5 7.846 5.23 10.46 1.96 7.845-2.614 9.153 2.615 11.768-2.615 7.846-7.846 1.96-5.884.655-7.191-7.846-1.308-6.537-3.922z"></path>
                    <path fill="#9C6750" d="M32.286 3.749c-6.94 3.65-11.69 11.053-11.69 19.591 0 8.137 4.313 15.242 10.724 19.052a20.513 20.513 0 01-8.723 1.937c-11.598 0-21-9.626-21-21.5 0-11.875 9.402-21.5 21-21.5 3.495 0 6.79.874 9.689 2.42z" clipRule="evenodd" fillRule="evenodd"></path>
                    <path fill="#634647" d="M64.472 20.305a.954.954 0 00-1.172-.824 4.508 4.508 0 01-3.958-.934.953.953 0 00-1.076-.11c-.46.252-.977.383-1.502.382a3.154 3.154 0 01-2.97-2.11.954.954 0 00-.833-.634 4.54 4.54 0 01-4.205-4.507c.002-.23.022-.46.06-.687a.952.952 0 00-.213-.767 3.497 3.497 0 01-.614-3.5.953.953 0 00-.382-1.138 3.522 3.522 0 01-1.5-3.992.951.951 0 00-.762-1.227A22.611 22.611 0 0032.3 2.16 22.41 22.41 0 0022.657.001a22.654 22.654 0 109.648 43.15 22.644 22.644 0 0032.167-22.847z"></path>
                  </svg>
                </motion.div>

                <h2 className="text-base font-bold text-slate-800 text-left mb-1.5 relative z-10">
                  您的隐私对我们很重要
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed text-left mb-2 relative z-10">
                  我们处理您的个人信息以改进服务并支持国庆庆典。更多信息请查看{' '}
                  <span
                    onClick={() => triggerToast('打开隐私政策')}
                    className="text-[#634647] font-bold underline cursor-pointer hover:text-amber-600"
                  >
                    隐私政策
                  </span>
                  。
                </p>

                {/* Collapsible More Options Button */}
                <div className="text-left relative z-10 mb-2">
                  <button
                    onClick={() => setFoxExpanded(!foxExpanded)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-black/5 hover:bg-black/10 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <span className={`inline-block transition-transform ${foxExpanded ? 'rotate-180' : ''}`}>▾</span>
                    <span>更多授权选项</span>
                  </button>
                </div>

                {/* Expandable Options Panel */}
                <AnimatePresence>
                  {foxExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-slate-50/90 rounded-xl p-3 border border-slate-200 text-left text-xs text-slate-700 space-y-2 mb-3 relative z-10 shadow-inner"
                    >
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={foxCookie}
                          disabled
                          className="accent-[#6c63ff] cursor-pointer"
                        />
                        <span className="font-semibold text-slate-800">必要 Cookie（始终开启）</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={foxAnalytics}
                          onChange={(e) => setFoxAnalytics(e.target.checked)}
                          className="accent-[#6c63ff] cursor-pointer"
                        />
                        <span>分析与性能监控</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={foxPersonalized}
                          onChange={(e) => setFoxPersonalized(e.target.checked)}
                          className="accent-[#6c63ff] cursor-pointer"
                        />
                        <span>个性化内容与活动推送</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={foxSharing}
                          onChange={(e) => setFoxSharing(e.target.checked)}
                          className="accent-[#6c63ff] cursor-pointer"
                        />
                        <span>第三方生态共享</span>
                      </label>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Gradient Confirm Button */}
                <button
                  onClick={() => {
                    const opts = [];
                    if (foxCookie) opts.push('必要Cookie');
                    if (foxAnalytics) opts.push('分析性能');
                    if (foxPersonalized) opts.push('个性化');
                    if (foxSharing) opts.push('第三方');
                    triggerToast(`已接受并继续 (勾选: ${opts.join(', ')})`);
                  }}
                  className="w-full py-3 rounded-xl text-white font-bold text-sm shadow-lg shadow-purple-500/25 active:scale-95 transition-all relative z-10 bg-gradient-to-r from-[#6c63ff] to-[#ff2d78] hover:shadow-rose-500/30"
                >
                  接受并继续
                </button>
                <div className="text-[10px] text-slate-400 mt-2 relative z-10">仅用于演示 · 数据不出本页</div>
              </div>
            ) : (
              <button
                onClick={() => setFoxClosed(false)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6c63ff] to-[#ff2d78] text-white text-xs font-bold shadow-md"
              >
                🦊 重新唤起狐狸隐私弹窗 v2
              </button>
            )}
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY COUNTDOWN ==================== */}
        {(previewKey === 'preview-nat-countdown' || previewKey === 'preview-nat-75-countdown') && (
          <div className="w-full max-w-sm rounded-3xl p-5 border-2 border-amber-400/50 bg-gradient-to-b from-[#7F1D1D] to-[#450A0A] text-center text-white shadow-2xl">
            <div className="flex items-center justify-center gap-2 text-amber-300 font-black text-base">
              <span>⭐</span>
              <span>盛世华诞 · 75周年庆典倒计时</span>
              <span>⭐</span>
            </div>
            <div className="text-xs text-amber-100/80 mt-1 mb-4">全场开发组件与工具特权免费领</div>
            <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto mb-4">
              {[
                { n: '03', u: '天' },
                { n: '14', u: '时' },
                { n: '28', u: '分' },
                { n: '56', u: '秒' },
              ].map((c) => (
                <div key={c.u} className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-black/40 border border-amber-400/40 flex items-center justify-center text-xl font-mono font-black text-amber-300 shadow-inner">
                    {c.n}
                  </div>
                  <span className="text-[10px] text-amber-200 mt-1">{c.u}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => triggerToast('🎁 成功领取国庆专属特权代码礼包！')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-red-950 font-black text-xs shadow-lg active:scale-95 transition-all"
            >
              立即领取国庆特权礼包 🎁
            </button>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY LUCKY WHEEL ==================== */}
        {(previewKey === 'preview-nat-wheel' || previewKey === 'preview-nat-lucky-wheel') && (
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-56 h-56 rounded-full border-4 border-amber-400 shadow-2xl overflow-hidden flex items-center justify-center bg-[#450A0A]">
              <motion.div
                animate={{ rotate: wheelAngle }}
                transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full rounded-full relative"
                style={{
                  background: 'conic-gradient(#DC2626 0deg 45deg, #F59E0B 45deg 90deg, #DC2626 90deg 135deg, #F59E0B 135deg 180deg, #DC2626 180deg 225deg, #F59E0B 225deg 270deg, #DC2626 270deg 315deg, #F59E0B 315deg 360deg)',
                }}
              />
              <button
                onClick={() => {
                  if (!wheelSpinning) {
                    setWheelSpinning(true);
                    const turns = 4 * 360 + Math.floor(Math.random() * 360);
                    setWheelAngle((prev) => prev + turns);
                    setTimeout(() => {
                      setWheelSpinning(false);
                      triggerToast('🎉 恭喜抽中【国庆至尊开发者勋章】！');
                    }, 3600);
                  }
                }}
                className="absolute w-16 h-16 rounded-full bg-[#7F1D1D] border-3 border-amber-300 text-amber-300 font-black text-sm flex items-center justify-center shadow-2xl active:scale-95 transition-transform z-10"
              >
                {wheelSpinning ? '...' : 'GO!'}
              </button>
            </div>
            <span className="text-xs text-amber-300 font-semibold">点击中央“GO!”开启国庆大转盘</span>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY FLAG FAB ==================== */}
        {(previewKey === 'preview-nat-fab' || previewKey === 'preview-nat-flag-fab') && (
          <div className="flex flex-col items-center gap-3">
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut' }}
                className="absolute w-16 h-16 rounded-full border-2 border-amber-400"
              />
              <motion.button
                animate={{ rotate: [-6, 6, -6] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                onClick={() => triggerToast('🇨🇳 祝祖国繁荣昌盛，同庆盛世华诞！')}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-700 to-rose-500 border-3 border-amber-300 flex items-center justify-center text-3xl shadow-xl active:scale-95 transition-transform"
              >
                🇨🇳
              </motion.button>
            </div>
            <span className="text-xs text-slate-300">迎风飘扬红旗 FAB 悬浮球</span>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY TICKER ==================== */}
        {previewKey === 'preview-nat-ticker' && (
          <div className="w-full max-w-sm rounded-xl bg-red-950/80 border border-amber-400/40 p-3 flex items-center gap-2 overflow-hidden shadow-lg">
            <span className="text-base animate-bounce">📢</span>
            <div className="flex-1 overflow-hidden whitespace-nowrap">
              <motion.div
                animate={{ x: ['100%', '-100%'] }}
                transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                className="inline-block text-xs font-bold text-amber-300"
              >
                热烈庆祝中华人民共和国成立75周年！祝全国开发者节日快乐，代码零Bug！🎉
              </motion.div>
            </div>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY FIREWORKS BUTTON ==================== */}
        {previewKey === 'preview-nat-firework-btn' && (
          <div className="flex flex-col items-center gap-3 relative">
            <button
              onClick={() => {
                setFireworkParticles(true);
                triggerToast('🎆 礼花绽放！普天同庆！');
                setTimeout(() => setFireworkParticles(false), 1200);
              }}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-amber-200 font-black text-sm border-2 border-amber-300 shadow-[0_8px_24px_rgba(220,38,38,0.5)] active:scale-95 transition-transform flex items-center gap-2"
            >
              <span>点赞盛世华诞 🎆</span>
            </button>
            {fireworkParticles && (
              <div className="absolute -top-6 flex gap-3 text-lg animate-bounce pointer-events-none">
                <span>✨</span><span>🎉</span><span>⭐</span><span>🎊</span>
              </div>
            )}
            <span className="text-xs text-slate-400">点击喷射金色礼花粒子</span>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY CHECKIN CARD ==================== */}
        {previewKey === 'preview-nat-checkin' && (
          <div className="w-full max-w-sm rounded-2xl bg-red-950/70 border border-amber-400/40 p-4 text-white space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-300">🚩 国庆 7 天足迹打卡</span>
              <span className="text-slate-300">已连续打卡 3 天</span>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {natCheckIn.map((checked, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => {
                      const next = [...natCheckIn];
                      next[idx] = !next[idx];
                      setNatCheckIn(next);
                      triggerToast(`第 ${idx + 1} 天打卡状态更新`);
                    }}
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center text-xs font-bold transition-all ${
                      checked
                        ? 'bg-amber-400 border-amber-300 text-red-950 font-black shadow-md'
                        : 'bg-black/30 border-white/20 text-slate-300'
                    }`}
                  >
                    {checked ? '✓' : idx + 1}
                  </button>
                  <span className="text-[9px] text-amber-200/80">Day{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 🇨🇳 NATIONAL DAY COUPON ==================== */}
        {previewKey === 'preview-nat-coupon' && (
          <div className="w-full max-w-sm rounded-2xl bg-gradient-to-r from-red-900 to-rose-900 border-2 border-amber-400/60 p-4 flex items-center justify-between shadow-xl">
            <div>
              <div className="text-2xl font-black text-amber-300 font-mono">¥ 75</div>
              <div className="text-[10px] text-amber-100">满 100 元即可抵扣</div>
            </div>
            <div className="px-3 border-l border-amber-400/30">
              <div className="text-xs font-bold text-white">国庆开发者专属立减券</div>
              <div className="text-[10px] text-amber-300/80">全套组件通用 · 假期专享</div>
            </div>
            <button
              onClick={() => {
                setCouponClaimed(true);
                triggerToast('已成功存入您的卡包！');
              }}
              disabled={couponClaimed}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                couponClaimed
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                  : 'bg-amber-400 text-red-950 font-black shadow-md active:scale-95'
              }`}
            >
              {couponClaimed ? '已领取' : '立即领取'}
            </button>
          </div>
        )}

        {/* ==================== COMMON PALETTE ==================== */}
        {previewKey === 'preview-common' && (
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {[
              { name: 'Blue 招牌深蓝', hex: '#006AAA', bg: 'bg-[#006AAA]' },
              { name: 'Yellow 亮黄', hex: '#FFBF6A', bg: 'bg-[#FFBF6A]' },
              { name: 'Pink 活力玫粉', hex: '#FF7C90', bg: 'bg-[#FF7C90]' },
              { name: 'Ink 墨蓝实线', hex: '#0A3D63', bg: 'bg-[#0A3D63]' },
              { name: 'Paper 纸张底色', hex: '#FFF6EC', bg: 'bg-[#FFF6EC]' },
            ].map((col) => (
              <div
                key={col.hex}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => triggerToast(`已复制色值: ${col.hex}`)}
              >
                <div
                  className={`w-16 h-16 rounded-xl border-4 border-[#0A3D63] shadow-[4px_4px_0_#0A3D63] ${col.bg} transition-transform active:translate-x-1 active:translate-y-1`}
                />
                <span className="mt-2 text-xs font-medium text-slate-300">{col.name}</span>
                <span className="text-[11px] font-mono text-slate-400">{col.hex}</span>
              </div>
            ))}
          </div>
        )}

        {/* ==================== 01 BUTTONS ==================== */}
        {previewKey === 'preview-c01' && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[14px] bg-[#006AAA]"></div>
              <button
                onClick={() => triggerToast('点击了 Primary 主按钮')}
                className="relative px-6 py-3 bg-[#FF7C90] text-white font-bold text-sm rounded-[14px] border-4 border-[#006AAA] active:translate-x-1 active:translate-y-1 transition-transform"
              >
                立即下载 (Primary)
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[14px] bg-[#0A3D63]"></div>
              <button
                onClick={() => triggerToast('点击了 Alt 按钮')}
                className="relative px-6 py-3 bg-[#FFBF6A] text-[#0A3D63] font-bold text-sm rounded-[14px] border-4 border-[#0A3D63] active:translate-x-1 active:translate-y-1 transition-transform"
              >
                开始使用 (Alt)
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[14px] bg-[#FF7C90]"></div>
              <button
                onClick={() => triggerToast('点击了 Ghost 按钮')}
                className="relative px-6 py-3 bg-slate-900/80 text-[#006AAA] font-bold text-sm rounded-[14px] border-4 border-[#006AAA] active:translate-x-1 active:translate-y-1 transition-transform"
              >
                了解更多 (Ghost)
              </button>
            </div>
          </div>
        )}

        {/* ==================== 02 ICON BUTTON ==================== */}
        {previewKey === 'preview-c02' && (
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-full bg-[#FF7C90]"></div>
              <button
                onClick={() => triggerToast('点了喜欢收藏 ♥')}
                className="relative w-14 h-14 rounded-full bg-[#FFBF6A] text-[#0A3D63] font-black text-2xl border-4 border-[#006AAA] flex items-center justify-center active:translate-x-1 active:translate-y-1 transition-transform"
              >
                ♥
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-full bg-[#006AAA]"></div>
              <button
                onClick={() => triggerToast('点了添加 ✚')}
                className="relative w-14 h-14 rounded-full bg-[#FF7C90] text-white font-black text-2xl border-4 border-[#0A3D63] flex items-center justify-center active:translate-x-1 active:translate-y-1 transition-transform"
              >
                ✚
              </button>
            </div>
          </div>
        )}

        {/* ==================== 03 FAB ==================== */}
        {previewKey === 'preview-c03' && (
          <div className="flex flex-col items-center gap-2">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-full bg-[#FF7C90]"></div>
              <button
                onClick={() => triggerToast('点击了悬浮 FAB 球！')}
                className="relative w-16 h-16 rounded-full bg-[#006AAA] text-white font-bold text-3xl border-4 border-[#FFBF6A] flex items-center justify-center active:translate-x-1 active:translate-y-1 transition-transform"
              >
                +
              </button>
            </motion.div>
            <span className="text-xs text-slate-400 mt-2">自带匀速上下浮动动画</span>
          </div>
        )}

        {/* ==================== 04 LINK BUTTON ==================== */}
        {previewKey === 'preview-c04' && (
          <div className="flex items-center gap-6">
            <button
              onClick={() => triggerToast('查看详情')}
              className="text-[#38bdf8] font-bold text-base border-b-4 border-[#FFBF6A] pb-1 hover:text-white transition-colors"
            >
              查看详情指南 ›
            </button>
            <button
              onClick={() => triggerToast('跳转文档')}
              className="text-[#FF7C90] font-bold text-base border-b-4 border-[#006AAA] pb-1 hover:text-white transition-colors"
            >
              在线 Android 文档 ›
            </button>
          </div>
        )}

        {/* ==================== 05 WOBBLE BUTTON ==================== */}
        {previewKey === 'preview-c05' && (
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[14px] bg-[#006AAA]"></div>
              <motion.button
                key={wobbleKey}
                animate={wobbleKey ? { rotateZ: [0, -9, 9, -5, 5, 0] } : {}}
                transition={{ duration: 0.45 }}
                onClick={() => {
                  setWobbleKey((prev) => prev + 1);
                  triggerToast('摇摆中 ~');
                }}
                className="relative px-7 py-3.5 bg-[#FF7C90] text-white font-bold text-base rounded-[14px] border-4 border-[#006AAA] cursor-pointer"
              >
                点我摇摆 Wobble! 🎪
              </motion.button>
            </div>
            <span className="text-xs text-slate-400">点击触发连续微旋转阻尼回弹</span>
          </div>
        )}

        {/* ==================== 06 TEXT FIELD ==================== */}
        {previewKey === 'preview-c06' && (
          <div className="w-full max-w-sm px-4">
            <div className="relative w-full">
              <div className="relative bg-[#006AAA] rounded-lg p-3 overflow-hidden border-2 border-transparent">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="请输入内容..."
                  className="w-full bg-transparent text-[#FF7C90] font-bold text-base outline-none pr-8 placeholder:text-[#8FC3E8]"
                />
                <div className="absolute right-0 bottom-0 w-8 h-8 pointer-events-none border-b-4 border-r-4 border-[#FF7C90] rounded-br-2xl"></div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">
              实时值: <span className="text-cyan-300 font-mono">{inputText || '空'}</span>
            </p>
          </div>
        )}

        {/* ==================== 07 SEARCH BAR ==================== */}
        {previewKey === 'preview-c07' && (
          <div className="w-full max-w-md px-4">
            <div className="flex items-center bg-[#006AAA] border-4 border-[#FFBF6A] rounded-2xl p-1.5 pl-3">
              <Search className="w-5 h-5 text-white mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索组件或代码..."
                className="w-full bg-transparent text-white font-bold outline-none placeholder:text-white/60 text-sm"
              />
              <button
                onClick={() => triggerToast(`搜索关键词: "${searchQuery}"`)}
                className="px-4 py-2 bg-[#FF7C90] text-white text-xs font-bold rounded-xl shrink-0 active:scale-95 transition-transform"
              >
                搜索
              </button>
            </div>
          </div>
        )}

        {/* ==================== 08 PASSWORD FIELD ==================== */}
        {previewKey === 'preview-c08' && (
          <div className="w-full max-w-sm px-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-[#006AAA] rounded-lg p-3 border border-blue-400/40">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="输入密码..."
                  className="w-full bg-transparent text-[#FF7C90] font-bold text-base outline-none"
                />
              </div>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="w-11 h-11 rounded-full bg-[#FFBF6A] text-[#0A3D63] flex items-center justify-center font-bold text-lg active:scale-95 transition-transform"
              >
                {showPassword ? '🙈' : '👀'}
              </button>
            </div>
          </div>
        )}

        {/* ==================== 09 SWITCH ==================== */}
        {previewKey === 'preview-c09' && (
          <div className="flex flex-col items-center gap-3">
            <div
              onClick={() => setSwitchChecked(!switchChecked)}
              className={`w-20 h-11 rounded-full p-1 cursor-pointer transition-colors border-4 border-[#0A3D63] flex items-center ${
                switchChecked ? 'bg-[#006AAA]' : 'bg-[#D6E4ED]'
              }`}
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`w-7 h-7 rounded-full border-2 border-[#0A3D63] ${
                  switchChecked ? 'ml-auto bg-[#FF7C90]' : 'mr-auto bg-[#FFBF6A]'
                }`}
              />
            </div>
            <span className="text-xs text-slate-300">
              当前状态: <b className="text-cyan-300">{switchChecked ? '开启 (ON)' : '关闭 (OFF)'}</b>
            </span>
          </div>
        )}

        {/* ==================== 10 CHECKBOX ==================== */}
        {previewKey === 'preview-c10' && (
          <div
            onClick={() => setCheckboxChecked(!checkboxChecked)}
            className="flex items-center gap-3 cursor-pointer select-none bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
          >
            <motion.div
              animate={{ rotate: checkboxChecked ? -6 : 0, scale: checkboxChecked ? [0.8, 1.1, 1] : 1 }}
              className={`w-8 h-8 rounded-xl border-4 border-[#0A3D63] flex items-center justify-center ${
                checkboxChecked ? 'bg-[#006AAA] text-white' : 'bg-white text-transparent'
              }`}
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </motion.div>
            <span className="font-bold text-white text-sm">记住账号与开发配置 (可点击)</span>
          </div>
        )}

        {/* ==================== 11 RADIO BUTTON ==================== */}
        {previewKey === 'preview-c11' && (
          <div className="flex items-center gap-6">
            {['社区开源版', '专业开发者版'].map((plan, idx) => {
              const selected = radioSelected === idx;
              return (
                <div
                  key={plan}
                  onClick={() => setRadioSelected(idx)}
                  className="flex items-center gap-2.5 cursor-pointer select-none"
                >
                  <motion.div
                    animate={selected ? { scale: [0.75, 1.15, 1] } : { scale: 1 }}
                    className={`w-8 h-8 rounded-full border-4 border-[#0A3D63] flex items-center justify-center ${
                      selected ? 'bg-[#FF7C90]' : 'bg-white'
                    }`}
                  >
                    {selected && <div className="w-3 h-3 rounded-full bg-white" />}
                  </motion.div>
                  <span className="text-sm font-bold text-slate-200">{plan}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* ==================== 12 SLIDER ==================== */}
        {previewKey === 'preview-c12' && (
          <div className="w-full max-w-sm px-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">滑动进度调节</span>
              <span className="text-sm font-black text-amber-300 font-mono">{sliderVal}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="w-full h-4 bg-white rounded-full appearance-none cursor-pointer border-2 border-[#0A3D63] accent-[#FF7C90]"
            />
          </div>
        )}

        {/* ==================== 13 SPINNER ==================== */}
        {previewKey === 'preview-c13' && (
          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
              className="w-16 h-16 rounded-full border-6 border-[#D6E4ED] border-t-[#006AAA] border-r-[#FF7C90]"
            />
            <span className="text-xs text-slate-400">双色弧度无限旋转动画</span>
          </div>
        )}

        {/* ==================== 14 DOTS LOADER ==================== */}
        {previewKey === 'preview-c14' && (
          <div className="flex items-center gap-3">
            {['#FF7C90', '#FFBF6A', '#006AAA', '#FF7C90'].map((col, idx) => (
              <motion.div
                key={idx}
                animate={{ y: [0, -18, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: idx * 0.12, ease: 'easeInOut' }}
                style={{ backgroundColor: col }}
                className="w-5 h-5 rounded-full border-2 border-[#0A3D63]"
              />
            ))}
          </div>
        )}

        {/* ==================== 15 PROGRESS BAR ==================== */}
        {previewKey === 'preview-c15' && (
          <div className="w-full max-w-sm px-4">
            <div className="relative w-full h-8 rounded-full border-4 border-[#0A3D63] bg-white overflow-hidden p-0.5">
              <div
                style={{ width: `${sliderVal}%` }}
                className="h-full rounded-full bg-[#FF7C90] relative overflow-hidden transition-all duration-300"
              >
                <motion.div
                  animate={{ backgroundPositionX: ['0px', '40px'] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, #FFBF6A, #FFBF6A 12px, transparent 12px, transparent 24px)',
                    backgroundSize: '34px 34px',
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
              <span>动态斜条纹流动</span>
              <span className="font-mono text-cyan-300">{sliderVal}%</span>
            </div>
          </div>
        )}

        {/* ==================== 16 SKELETON ==================== */}
        {previewKey === 'preview-c16' && (
          <div className="w-full max-w-sm px-4 space-y-3">
            <div className="h-10 rounded-xl bg-slate-800/80 animate-pulse border border-white/10" />
            <div className="h-4 w-3/4 rounded-lg bg-slate-800/60 animate-pulse" />
            <div className="h-4 w-1/2 rounded-lg bg-slate-800/40 animate-pulse" />
          </div>
        )}

        {/* ==================== 17 STAT CARD ==================== */}
        {previewKey === 'preview-c17' && (
          <div className="relative">
            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-[#FF7C90]" />
            <div className="relative w-64 p-5 rounded-2xl bg-[#006AAA] border-4 border-[#0A3D63] text-white">
              <div className="text-4xl font-black text-[#FFBF6A] drop-shadow-[2px_2px_0_#FF7C90]">
                128.5K
              </div>
              <div className="text-xs text-white/80 mt-1">代码片段月查询量</div>
              <div className="mt-3 inline-block px-2.5 py-1 rounded-full bg-[#FFBF6A] border-2 border-[#0A3D63] text-[#0A3D63] text-xs font-black">
                ▲ +38.2% 活跃激增
              </div>
            </div>
          </div>
        )}

        {/* ==================== 18 USER CARD ==================== */}
        {previewKey === 'preview-c18' && (
          <div className="flex items-center gap-4 bg-white text-[#0A3D63] border-4 border-[#0A3D63] rounded-2xl p-4 w-72 shadow-[4px_4px_0_#0A3D63]">
            <div className="w-14 h-14 rounded-full bg-[#006AAA] border-4 border-[#FF7C90] flex items-center justify-center text-white text-2xl font-black">
              🐼
            </div>
            <div>
              <div className="font-black text-base">小明同学</div>
              <div className="text-xs text-slate-500">android.dev@example.com</div>
              <div className="text-[11px] text-[#006AAA] font-bold mt-1">Compose 架构师</div>
            </div>
          </div>
        )}

        {/* ==================== 19 PRODUCT CARD ==================== */}
        {previewKey === 'preview-c19' && (
          <div className="w-56 bg-white border-4 border-[#0A3D63] rounded-2xl overflow-hidden shadow-[4px_4px_0_#0A3D63]">
            <div className="h-28 bg-gradient-to-tr from-[#006AAA] to-[#FF7C90] flex items-center justify-center text-5xl">
              🎧
            </div>
            <div className="p-3 text-[#0A3D63]">
              <div className="font-black text-sm">降噪无线耳机 Pro</div>
              <div className="text-[#FF7C90] font-black text-lg mt-0.5">¥ 299</div>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#FFBF6A] text-[#0A3D63] text-[11px] font-bold">
                🔥 爆款热卖
              </span>
            </div>
          </div>
        )}

        {/* ==================== 20 MUSIC CARD ==================== */}
        {previewKey === 'preview-c20' && (
          <div className="w-64 bg-white border-4 border-[#0A3D63] rounded-2xl p-4 flex flex-col items-center shadow-[4px_4px_0_#0A3D63] text-[#0A3D63]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="w-20 h-20 rounded-full bg-[#0A3D63] border-4 border-[#006AAA] flex items-center justify-center relative shadow-inner"
            >
              <div className="w-14 h-14 rounded-full border border-white/20" />
              <div className="w-6 h-6 rounded-full bg-[#FFBF6A] absolute" />
            </motion.div>
            <div className="font-black text-sm mt-3">小小星球 · Jetpack</div>
            <div className="text-xs text-slate-400">小熊乐队</div>
            <div className="flex items-end gap-1.5 h-6 mt-3">
              {[0.4, 0.9, 0.6, 0.8, 0.3].map((val, idx) => (
                <motion.div
                  key={idx}
                  animate={{ height: [6, 22, 10, 20, 8] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: idx * 0.15, ease: 'easeInOut' }}
                  className="w-2 bg-[#FF7C90] rounded-sm"
                />
              ))}
            </div>
          </div>
        )}

        {/* ==================== 21 BOTTOM NAV ==================== */}
        {previewKey === 'preview-c21' && (
          <div className="w-full max-w-sm">
            <div className="relative rounded-2xl bg-white border-4 border-[#006AAA] shadow-[4px_4px_0_#006AAA] overflow-hidden">
              <div className="flex">
                {[
                  { icon: '⌂', label: '首页' },
                  { icon: '▦', label: '组件' },
                  { icon: '♥', label: '收藏' },
                  { icon: '⚙', label: '设置' },
                ].map((item, idx) => {
                  const on = navSelected === idx;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setNavSelected(idx)}
                      className={`flex-1 py-3 flex flex-col items-center transition-colors ${
                        on ? 'bg-[#006AAA] text-white' : 'text-[#0A3D63]'
                      }`}
                    >
                      <span className="text-lg leading-none">{item.icon}</span>
                      <span className="text-[11px] font-bold mt-1">{item.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="flex h-1.5 w-full bg-slate-200">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`flex-1 ${i === navSelected ? 'bg-[#FF7C90]' : 'bg-transparent'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 22 TAB BAR ==================== */}
        {previewKey === 'preview-c22' && (
          <div className="w-full max-w-sm">
            <div className="flex bg-white border-4 border-[#0A3D63] rounded-2xl p-1 shadow-[3px_3px_0_#0A3D63]">
              {['热门组件', '核心协程', '权限存储'].map((tab, idx) => {
                const on = tabSelected === idx;
                return (
                  <button
                    key={tab}
                    onClick={() => setTabSelected(idx)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
                      on ? 'bg-[#FFBF6A] text-[#0A3D63]' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== 23 APP BAR ==================== */}
        {previewKey === 'preview-c23' && (
          <div className="w-full max-w-sm">
            <div className="flex items-center justify-between bg-[#006AAA] border-4 border-[#FFBF6A] rounded-2xl px-4 py-3 shadow-[3px_3px_0_#0A3D63]">
              <button
                onClick={() => triggerToast('点击了汉堡菜单')}
                className="w-8 h-8 rounded-lg bg-[#FFBF6A] text-[#0A3D63] font-black text-sm flex items-center justify-center border-2 border-[#0A3D63] active:scale-95"
              >
                ☰
              </button>
              <span className="font-black text-white text-base drop-shadow-[1px_2px_0_#FF7C90]">
                安卓代码手册
              </span>
              <button
                onClick={() => triggerToast('点击了设置')}
                className="w-8 h-8 rounded-lg bg-[#FFBF6A] text-[#0A3D63] font-black text-sm flex items-center justify-center border-2 border-[#0A3D63] active:scale-95"
              >
                ⚙
              </button>
            </div>
          </div>
        )}

        {/* ==================== 24 LIST ITEM ==================== */}
        {previewKey === 'preview-c24' && (
          <div className="w-full max-w-sm space-y-2">
            {[
              { icon: '📄', title: 'MainActivity.kt', sub: '刚刚更新 · 12 KB', bg: 'bg-[#006AAA]' },
              { icon: '⚙️', title: 'build.gradle.kts', sub: '构建脚本 · 4 KB', bg: 'bg-[#FF7C90]' },
              { icon: '📦', title: 'RoomDatabase.db', sub: '本地缓存 · 1.2 MB', bg: 'bg-[#0A3D63]' },
            ].map((item) => (
              <div
                key={item.title}
                onClick={() => triggerToast(`点击了列表项: ${item.title}`)}
                className="flex items-center bg-white text-[#0A3D63] border-3 border-[#0A3D63] rounded-xl px-3.5 py-2.5 cursor-pointer hover:bg-slate-100 transition-colors shadow-[2px_2px_0_#0A3D63]"
              >
                <div className={`w-9 h-9 rounded-lg ${item.bg} text-white flex items-center justify-center text-base shrink-0 mr-3`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs truncate">{item.title}</div>
                  <div className="text-[10px] text-slate-400">{item.sub}</div>
                </div>
                <span className="text-slate-400 text-xs font-bold">›</span>
              </div>
            ))}
          </div>
        )}

        {/* ==================== 25 BADGES ==================== */}
        {previewKey === 'preview-c25' && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-xs">
              {activeBadges.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006AAA] text-white border-2 border-[#0A3D63] shadow-[2px_2px_0_#0A3D63] text-xs font-bold"
                >
                  <span>{badge}</span>
                  <button
                    onClick={() => {
                      setActiveBadges((list) => list.filter((b) => b !== badge));
                      triggerToast(`已关闭标签: ${badge}`);
                    }}
                    className="hover:text-[#FF7C90] transition-colors ml-1 font-black"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            {activeBadges.length < 4 && (
              <button
                onClick={() => setActiveBadges(['Kotlin 2.0', 'Compose UI', 'Flow 异步', 'Material 3'])}
                className="text-xs text-cyan-300 hover:underline"
              >
                恢复全部标签
              </button>
            )}
          </div>
        )}

        {/* ==================== 26 DIALOG ==================== */}
        {previewKey === 'preview-c26' && (
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => setShowDialog(true)}
              className="px-5 py-2.5 rounded-xl bg-[#006AAA] border-2 border-[#FFBF6A] text-white font-bold text-sm shadow-[3px_3px_0_#FF7C90] active:translate-x-0.5 active:translate-y-0.5"
            >
              点击弹出 Dialog 测试 ⚠️
            </button>
            <AnimatePresence>
              {showDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                  <motion.div
                    initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    className="relative w-80 rounded-2xl bg-[#006AAA] p-6 text-white border-4 border-[#0A3D63] shadow-[8px_8px_0_#FF7C90]"
                  >
                    <div className="text-lg font-black text-[#FFBF6A] flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" /> 确认删除代码片段？
                    </div>
                    <p className="text-xs text-white/80 mt-2 leading-relaxed">
                      删除后该条目将无法找回。如需继续保留，请点击取消。
                    </p>
                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        onClick={() => setShowDialog(false)}
                        className="px-4 py-2 rounded-xl bg-[#D6E4ED] text-[#0A3D63] font-bold text-xs"
                      >
                        取消
                      </button>
                      <button
                        onClick={() => {
                          setShowDialog(false);
                          triggerToast('已模拟执行确认操作！');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#FF7C90] text-white font-bold text-xs border-2 border-white shadow-[2px_2px_0_white]"
                      >
                        确定删除
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ==================== 27 TOAST ==================== */}
        {previewKey === 'preview-c27' && (
          <button
            onClick={() => triggerToast('已成功复制 Kotlin 代码到剪贴板！')}
            className="px-5 py-2.5 rounded-xl bg-[#FF7C90] border-2 border-[#006AAA] text-white font-bold text-sm shadow-[3px_3px_0_#006AAA] active:translate-x-0.5 active:translate-y-0.5"
          >
            点击触发 Toast 飘窗提示 🚀
          </button>
        )}

        {/* ==================== 28 EMPTY STATE ==================== */}
        {previewKey === 'preview-c28' && (
          <div className="flex flex-col items-center py-2 text-center">
            <motion.div
              animate={{ rotate: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="text-5xl select-none"
            >
              🐻
            </motion.div>
            <div className="font-black text-amber-200 text-sm mt-2">暂无匹配代码片段</div>
            <button
              onClick={() => triggerToast('点击了去逛逛')}
              className="mt-2.5 px-3 py-1.5 rounded-xl bg-[#006AAA] text-white font-bold text-xs border-2 border-[#FFBF6A]"
            >
              去逛逛 🚀
            </button>
          </div>
        )}

        {/* ==================== 29 LOGIN FORM ==================== */}
        {previewKey === 'preview-c29' && (
          <div className="relative w-64 bg-[#006AAA] border-4 border-[#FFBF6A] shadow-[6px_6px_0_#0A3D63] overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFBF6A] rounded-bl-3xl pointer-events-none" />
            <div className="h-12 bg-[#FFBF6A] flex items-center justify-end px-4">
              <span className="font-black text-[#006AAA] text-base drop-shadow-[0_2px_0_#FF7C90]">
                登录表单
              </span>
            </div>
            <div className="p-3 space-y-2">
              <input
                type="text"
                value={loginForm.user}
                onChange={(e) => setLoginForm({ ...loginForm, user: e.target.value })}
                placeholder="用户名"
                className="w-full bg-[#006AAA] text-[#FF7C90] text-xs font-bold p-1.5 border-r-4 border-b-4 border-[#FF7C90] rounded-br-xl outline-none"
              />
              <input
                type="text"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                placeholder="邮箱地址"
                className="w-full bg-[#006AAA] text-[#FF7C90] text-xs font-bold p-1.5 border-r-4 border-b-4 border-[#FF7C90] rounded-br-xl outline-none"
              />
              <input
                type="password"
                value={loginForm.pass}
                onChange={(e) => setLoginForm({ ...loginForm, pass: e.target.value })}
                placeholder="密码"
                className="w-full bg-[#006AAA] text-[#FF7C90] text-xs font-bold p-1.5 border-r-4 border-b-4 border-[#FF7C90] rounded-br-xl outline-none"
              />
            </div>
            <button
              onClick={() => triggerToast(`登录模拟: ${loginForm.user}`)}
              className="w-full h-9 bg-[#FF7C90] text-white font-bold text-xs px-4 flex items-center justify-start rounded-br-2xl active:opacity-90"
            >
              登录 ›
            </button>
          </div>
        )}

        {/* ==================== 30 SETTINGS ROW ==================== */}
        {previewKey === 'preview-c30' && (
          <div className="w-full max-w-sm space-y-2 px-2">
            {[
              { icon: '🔔', title: '系统通知提醒' },
              { icon: '🌙', title: '深色与磨砂玻璃模式' },
              { icon: '🔒', title: '权限与开发安全' },
            ].map((row) => (
              <div
                key={row.title}
                onClick={() => triggerToast(`进入设置: ${row.title}`)}
                className="flex items-center justify-between bg-white text-[#0A3D63] border-3 border-[#0A3D63] rounded-xl px-4 py-2.5 cursor-pointer hover:bg-slate-100 transition-colors shadow-[2px_2px_0_#0A3D63]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{row.icon}</span>
                  <span className="font-bold text-xs">{row.title}</span>
                </div>
                <span className="font-black text-slate-400 text-sm">›</span>
              </div>
            ))}
          </div>
        )}

        {/* ==================== KOTLIN: FLOW & COROUTINE ==================== */}
        {previewKey === 'preview-kt-flow' && (
          <div className="w-full max-w-sm space-y-3">
            <div className="flex items-center justify-between bg-slate-900 border border-white/10 rounded-xl p-3">
              <div>
                <div className="text-xs font-bold text-cyan-300">StateFlow 实时状态模拟</div>
                <div className="text-[11px] text-slate-400">
                  当前状态: {flowLoading ? '加载中...' : `UserUiState(items=${flowCount})`}
                </div>
              </div>
              <button
                onClick={() => {
                  setFlowLoading(true);
                  setTimeout(() => {
                    setFlowLoading(false);
                    setFlowCount((c) => c + 1);
                    setFlowLogs((l) => [
                      `[+${flowCount}s] update { it.copy(items=${flowCount + 1}) }`,
                      ...l.slice(0, 2),
                    ]);
                    triggerToast('Flow 触发了一次数据流重发射');
                  }, 600);
                }}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-bold active:scale-95 transition-all"
              >
                触发 loadUserData()
              </button>
            </div>
            <div className="bg-black/50 p-2.5 rounded-lg font-mono text-[11px] text-emerald-300 space-y-1">
              {flowLogs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== KOTLIN: DEBOUNCE CLICK ==================== */}
        {previewKey === 'preview-kt-debounce' && (
          <div className="w-full max-w-sm flex flex-col items-center gap-3">
            <button
              onClick={handleDebounceClick}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm shadow-lg active:scale-95 transition-all"
            >
              请快速连续多次点击我！⚡
            </button>
            <div className="grid grid-cols-2 gap-4 w-full text-center">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400">原始高频物理点击</div>
                <div className="text-xl font-mono font-black text-rose-400">{rawClicks} 次</div>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30">
                <div className="text-[11px] text-cyan-300">防抖 500ms 过滤响应</div>
                <div className="text-xl font-mono font-black text-cyan-300">{debouncedClicks} 次</div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== ARCH: ROOM DATABASE ==================== */}
        {previewKey === 'preview-arch-room' && (
          <div className="w-full max-w-sm space-y-2">
            <div className="flex items-center justify-between text-xs pb-1">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-cyan-400" /> Room 本地表 (snippets_table)
              </span>
              <button
                onClick={() => {
                  const newId = roomData.length + 1;
                  setRoomData([...roomData, { id: newId, title: `自定义扩展模块 #${newId}`, category: 'User', fav: false }]);
                  triggerToast('Room 已异步插入一条新记录');
                }}
                className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 text-[11px] font-bold"
              >
                + Insert 记录
              </button>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {roomData.map((row) => (
                <div
                  key={row.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 text-xs"
                >
                  <span className="font-mono text-slate-400 text-[10px]">#{row.id}</span>
                  <span className="font-semibold text-slate-200 truncate flex-1 px-2">{row.title}</span>
                  <button
                    onClick={() => {
                      setRoomData((list) =>
                        list.map((r) => (r.id === row.id ? { ...r, fav: !r.fav } : r))
                      );
                      triggerToast('DAO: updateFavorite 执行成功');
                    }}
                    className="p-1 text-slate-400 hover:text-amber-400"
                  >
                    <Heart className={`w-3.5 h-3.5 ${row.fav ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== ARCH: DATASTORE ==================== */}
        {previewKey === 'preview-arch-datastore' && (
          <div className="w-full max-w-sm space-y-2.5">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Preferences DataStore 键值存取
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>KEY_THEME (主题模式)</span>
                <button
                  onClick={() => {
                    const next = dsTheme === 'dark-frost' ? 'aurora-frost' : 'dark-frost';
                    setDsTheme(next);
                    triggerToast(`DataStore edit: ${next}`);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-bold"
                >
                  {dsTheme}
                </button>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>KEY_AUTO_COPY (点击自动复制代码)</span>
                <button
                  onClick={() => {
                    setDsAutoCopy(!dsAutoCopy);
                    triggerToast(`DataStore edit: autoCopy=${!dsAutoCopy}`);
                  }}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                    dsAutoCopy ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      dsAutoCopy ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== SYSTEM: PERMISSION SIMULATOR ==================== */}
        {previewKey === 'preview-sys-perm' && (
          <div className="w-full max-w-sm flex flex-col items-center gap-3">
            <button
              onClick={() => setPermState('prompt')}
              className="px-5 py-2.5 rounded-xl bg-[#006AAA] text-white font-bold text-xs border border-white/20 active:scale-95"
            >
              模拟触发 registerForActivityResult 权限弹窗 🛡️
            </button>
            <div className="text-xs text-slate-400">
              当前权限状态:{' '}
              <b
                className={
                  permState === 'granted'
                    ? 'text-emerald-400'
                    : permState === 'denied'
                    ? 'text-rose-400'
                    : 'text-amber-300'
                }
              >
                {permState === 'granted'
                  ? '已获得 (PERMISSION_GRANTED)'
                  : permState === 'denied'
                  ? '已拒绝 (PERMISSION_DENIED)'
                  : '未申请 (NOT_REQUESTED)'}
              </b>
            </div>
            {permState === 'prompt' && (
              <div className="w-full p-4 rounded-2xl bg-slate-900 border-2 border-cyan-400/40 text-center shadow-xl">
                <ShieldCheck className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-xs font-bold text-white">是否允许应用访问您的相机与媒体？</div>
                <div className="flex gap-2 justify-center mt-3">
                  <button
                    onClick={() => {
                      setPermState('denied');
                      triggerToast('回调: isGranted = false');
                    }}
                    className="px-4 py-1.5 rounded-lg bg-white/10 text-xs font-semibold"
                  >
                    拒绝
                  </button>
                  <button
                    onClick={() => {
                      setPermState('granted');
                      triggerToast('回调: isGranted = true');
                    }}
                    className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold"
                  >
                    允许
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== SYSTEM: PHOTO PICKER SIMULATOR ==================== */}
        {previewKey === 'preview-sys-photopicker' && (
          <div className="w-full max-w-sm space-y-2">
            <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-cyan-400" /> 原生免权限相册选择器
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">无需在 Manifest 申请权限</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { emoji: '🌄', label: '山川' },
                { emoji: '🎧', label: '耳机' },
                { emoji: '☕', label: '咖啡' },
                { emoji: '🚀', label: '火箭' },
              ].map((img, i) => {
                const selected = selectedPhoto === i;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedPhoto(i);
                      triggerToast(`PhotoPicker 返回: content://media/image/${i + 1}`);
                    }}
                    className={`h-16 rounded-xl border-2 cursor-pointer flex flex-col items-center justify-center transition-all ${
                      selected
                        ? 'border-cyan-400 bg-cyan-500/20 shadow-md scale-105'
                        : 'border-white/10 bg-white/5 hover:border-white/30'
                    }`}
                  >
                    <span className="text-2xl">{img.emoji}</span>
                    <span className="text-[9px] text-slate-400 mt-0.5">{img.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== UTILS: DP TO PX ==================== */}
        {previewKey === 'preview-util-ext' && (
          <div className="w-full max-w-sm space-y-2.5">
            <div className="text-xs font-bold text-slate-300">Kotlin 尺寸扩展计算器 (dpToPx / spToPx)</div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={dpInput}
                onChange={(e) => setDpInput(Number(e.target.value))}
                className="w-20 px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-center text-sm font-bold outline-none"
              />
              <span className="text-xs font-bold text-slate-400">dp 在 xxhdpi 屏幕下 ≈</span>
              <span className="text-base font-mono font-black text-cyan-300">
                {(dpInput * 3).toFixed(1)} px
              </span>
            </div>
            <button
              onClick={() => triggerToast('Context.copyToClipboard() 执行成功')}
              className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-slate-200 flex items-center justify-center gap-2"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>测试 Context.copyToClipboard() 快捷扩展</span>
            </button>
          </div>
        )}

        {/* ==================== UTILS: NETWORK OBSERVER ==================== */}
        {previewKey === 'preview-util-network' && (
          <div className="w-full max-w-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">模拟设备当前网络状态变化</span>
              <button
                onClick={() => {
                  setNetworkOnline(!networkOnline);
                  triggerToast(networkOnline ? '已切断网络 (NetworkStatus.Lost)' : '网络已连接 (NetworkStatus.Available)');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  networkOnline ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                }`}
              >
                {networkOnline ? '点击切断网络' : '点击恢复联网'}
              </button>
            </div>
            <div
              className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${
                networkOnline
                  ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-200'
                  : 'bg-rose-500/10 border-rose-400/30 text-rose-200'
              }`}
            >
              {networkOnline ? <Wifi className="w-5 h-5 text-emerald-400" /> : <WifiOff className="w-5 h-5 text-rose-400" />}
              <div>
                <div className="text-xs font-bold">
                  {networkOnline ? 'NetworkStatus.Available' : 'NetworkStatus.Lost'}
                </div>
                <div className="text-[11px] opacity-80">
                  {networkOnline ? 'WiFi 5GHz 已连接 · 信号优秀' : '无网络连接 · 提示用户检查设置'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== FALLBACK: CUSTOM CODE SANDBOX INSPECTOR ==================== */}
        {!isUpdateDialogPreview &&
          !previewKey.startsWith('preview-nat-') &&
          !previewKey.startsWith('preview-fox-') &&
          ![
            'preview-common',
            'preview-c01',
            'preview-c02',
            'preview-c03',
            'preview-c04',
            'preview-c05',
            'preview-c06',
            'preview-c07',
            'preview-c08',
            'preview-c09',
            'preview-c10',
            'preview-c11',
            'preview-c12',
            'preview-c13',
            'preview-c14',
            'preview-c15',
            'preview-c16',
            'preview-c17',
            'preview-c18',
            'preview-c19',
            'preview-c20',
            'preview-c21',
            'preview-c22',
            'preview-c23',
            'preview-c24',
            'preview-c25',
            'preview-c26',
            'preview-c27',
            'preview-c28',
            'preview-c29',
            'preview-c30',
            'preview-kt-flow',
            'preview-kt-debounce',
            'preview-arch-room',
            'preview-arch-datastore',
            'preview-sys-perm',
            'preview-sys-photopicker',
            'preview-util-ext',
            'preview-util-network',
          ].includes(previewKey) && (
            <div className="w-full max-w-sm p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center mx-auto">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">用户自定义代码实时沙箱视窗</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  已解析语法树与方法入口，可在下方进行运行模拟
                </div>
              </div>
              <button
                onClick={() => triggerToast('运行成功: 逻辑执行无异常')}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-bold hover:bg-cyan-500/30 transition-all"
              >
                ▶ 模拟运行代码入口
              </button>
            </div>
          )}
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900 border border-cyan-400 text-white shadow-2xl"
          >
            <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-black text-xs">
              ✓
            </span>
            <span className="text-xs font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
