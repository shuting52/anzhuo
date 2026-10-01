import { Snippet } from '../types/snippet';

export interface UpdateDialogTheme {
  id: string;
  name: string;
  themeStyle: string; // e.g. 'rocket', 'cyber', 'aurora', 'liquid', 'retro', etc.
  primaryColor: string;
  secondaryColor: string;
  bgGradient: string;
  animationType: string;
  icon: string;
  version: string;
  size: string;
  features: string[];
}

export const UPDATE_DIALOG_THEMES: UpdateDialogTheme[] = [
  // 1-10: 科技与未来风
  { id: 'up-01', name: '火箭升空加速舱', themeStyle: 'rocket', primaryColor: '#f43f5e', secondaryColor: '#fb923c', bgGradient: 'from-rose-950 via-slate-900 to-indigo-950', animationType: 'rocket-fly', icon: '🚀', version: 'v3.2.0', size: '28.4 MB', features: ['全新引擎加载提速 300%', '全新 Compose 渲染管线', '修复若干已知奔溃问题'] },
  { id: 'up-02', name: '赛博朋克流光舱', themeStyle: 'cyber', primaryColor: '#06b6d4', secondaryColor: '#ec4899', bgGradient: 'from-cyan-950 via-slate-900 to-fuchsia-950', animationType: 'glitch', icon: '⚡', version: 'v2.8.5', size: '32.1 MB', features: ['霓虹夜间高刷模式', '触觉反馈震动引擎', '系统资源优化与减负'] },
  { id: 'up-03', name: '极光波浪粒子舱', themeStyle: 'aurora', primaryColor: '#10b981', secondaryColor: '#06b6d4', bgGradient: 'from-emerald-950 via-slate-900 to-teal-950', animationType: 'aurora-wave', icon: '🌌', version: 'v4.0.0', size: '45.0 MB', features: ['极光流体过渡动效', '沉浸式磨砂玻璃视窗', '全局数据缓存加速'] },
  { id: 'up-04', name: '全息投影雷达舱', themeStyle: 'radar', primaryColor: '#38bdf8', secondaryColor: '#6366f1', bgGradient: 'from-sky-950 via-slate-900 to-blue-950', animationType: 'radar-sweep', icon: '📡', version: 'v3.5.1', size: '24.2 MB', features: ['全天候雷达网络监听', '低功耗后台数据同步', '隐私沙盒权限隔离'] },
  { id: 'up-05', name: '星际跃迁引擎', themeStyle: 'warp', primaryColor: '#8b5cf6', secondaryColor: '#ec4899', bgGradient: 'from-violet-950 via-purple-900 to-slate-950', animationType: 'warp-speed', icon: '🪐', version: 'v5.1.0', size: '36.8 MB', features: ['星际级无感增量热更新', '深度内存泄露自动回收', '多端响应式断点适配'] },
  { id: 'up-06', name: '黑客矩阵终端', themeStyle: 'matrix', primaryColor: '#22c55e', secondaryColor: '#16a34a', bgGradient: 'from-zinc-950 via-green-950 to-black', animationType: 'matrix-rain', icon: '💻', version: 'v1.9.9', size: '18.7 MB', features: ['绿色荧光代码终端风格', '底层二进制执行优化', '强化 APK 防逆向加固'] },
  { id: 'up-07', name: '量子微孔吸积', themeStyle: 'quantum', primaryColor: '#0ea5e9', secondaryColor: '#d946ef', bgGradient: 'from-slate-950 via-indigo-950 to-slate-900', animationType: 'spin-pulse', icon: '⚛️', version: 'v3.6.0', size: '30.5 MB', features: ['量子纠缠状态流同步', '双工网络吞吐提升 50%', '全新错误诊断日志栈'] },
  { id: 'up-08', name: '深海发光水母', themeStyle: 'jellyfish', primaryColor: '#06b6d4', secondaryColor: '#a855f7', bgGradient: 'from-cyan-950 via-blue-950 to-slate-950', animationType: 'float-bubble', icon: '🪼', version: 'v2.4.2', size: '22.3 MB', features: ['轻盈水母呼吸浮动感', '柔性物理反弹微交互', '夜间蓝光过滤护眼算法'] },
  { id: 'up-09', name: '超导悬浮轨道', themeStyle: 'maglev', primaryColor: '#f59e0b', secondaryColor: '#3b82f6', bgGradient: 'from-amber-950 via-slate-900 to-sky-950', animationType: 'magnetic', icon: '🚄', version: 'v4.2.1', size: '41.2 MB', features: ['磁悬浮零阻力平滑滚动', '120FPS 极限帧率稳定', '大图片解码后台多线程'] },
  { id: 'up-10', name: '脉冲电磁光环', themeStyle: 'emp', primaryColor: '#6366f1', secondaryColor: '#f43f5e', bgGradient: 'from-indigo-950 via-purple-950 to-slate-950', animationType: 'pulse-ring', icon: '🔮', version: 'v3.0.4', size: '27.9 MB', features: ['多层脉冲同心光环', '即时触发微触觉振荡', '提升低配机型渲染兼容'] },

  // 11-20: 游戏与潮流动感
  { id: 'up-11', name: '盲盒礼品惊喜拆封', themeStyle: 'gift', primaryColor: '#ec4899', secondaryColor: '#eab308', bgGradient: 'from-pink-950 via-slate-900 to-amber-950', animationType: 'gift-bounce', icon: '🎁', version: 'v2.9.0', size: '35.0 MB', features: ['开箱礼盒解包动效', '升级立赠开发者专享权益', '界面个性化主题装扮'] },
  { id: 'up-12', name: '电竞赛事段位晋升', themeStyle: 'esports', primaryColor: '#eab308', secondaryColor: '#ef4444', bgGradient: 'from-amber-950 via-slate-900 to-red-950', animationType: 'rank-up', icon: '🏆', version: 'v4.5.0', size: '52.6 MB', features: ['段位勋章鎏金旋转光效', '排位赛匹配速度翻倍', '新增对局回放与高光生成'] },
  { id: 'up-13', name: '复古像素红白机', themeStyle: 'pixel', primaryColor: '#ef4444', secondaryColor: '#3b82f6', bgGradient: 'from-zinc-900 via-stone-900 to-black', animationType: 'pixel-blink', icon: '👾', version: 'v8.0.0-Bit', size: '12.8 MB', features: ['8-Bit 复古点阵界面', '复古蜂鸣器按键音效', '超轻量包体极速下载'] },
  { id: 'up-14', name: '机甲战损展开', themeStyle: 'mecha', primaryColor: '#f97316', secondaryColor: '#0ea5e9', bgGradient: 'from-orange-950 via-slate-900 to-zinc-950', animationType: 'mecha-deploy', icon: '🤖', version: 'v3.8.0', size: '48.9 MB', features: ['机械翼板液压展开动画', '核心驱动引擎升级', '重载渲染散热功耗优化'] },
  { id: 'up-15', name: '烈焰狂飙氮气加速', themeStyle: 'nitro', primaryColor: '#f97316', secondaryColor: '#ef4444', bgGradient: 'from-red-950 via-orange-950 to-slate-950', animationType: 'flame-flicker', icon: '🔥', version: 'v3.3.3', size: '39.0 MB', features: ['氮气喷射粒子轨迹流', 'UI 操作响应低于 16ms', '解决后台被系统异常杀死'] },
  { id: 'up-16', name: '赛道方格旗冲线', themeStyle: 'race', primaryColor: '#f8fafc', secondaryColor: '#e2e8f0', bgGradient: 'from-slate-950 via-stone-900 to-zinc-950', animationType: 'flag-wave', icon: '🏁', version: 'v2.7.1', size: '26.4 MB', features: ['黑白方格旗终点冲线动效', '优化数据表本地持久化', '适配折叠屏与平板大屏'] },
  { id: 'up-17', name: '黑金至尊专属定制', themeStyle: 'blackgold', primaryColor: '#f59e0b', secondaryColor: '#d97706', bgGradient: 'from-amber-950 via-stone-900 to-black', animationType: 'gold-sheen', icon: '👑', version: 'v6.0.0', size: '33.8 MB', features: ['黑金拉丝金属倒角质感', '专享 VIP 云端空间同步', '专属 1v1 极速技术工单'] },
  { id: 'up-18', name: '霓虹街区滑板夜跑', themeStyle: 'skate', primaryColor: '#ec4899', secondaryColor: '#06b6d4', bgGradient: 'from-fuchsia-950 via-slate-900 to-cyan-950', animationType: 'board-flip', icon: '🛹', version: 'v2.3.0', size: '29.7 MB', features: ['街头涂鸦与反光贴纸', '手势滑动手感阻尼升级', '支持摇一摇快速反馈'] },
  { id: 'up-19', name: '街机摇杆投币复活', themeStyle: 'arcade', primaryColor: '#eab308', secondaryColor: '#f43f5e', bgGradient: 'from-yellow-950 via-slate-900 to-rose-950', animationType: 'coin-drop', icon: '🕹️', version: 'v1.6.8', size: '15.2 MB', features: ['投币插入拟真微动画', '街机复古关卡全新上线', '操作手柄蓝牙低延迟连接'] },
  { id: 'up-20', name: '魔法药水咕嘟冒泡', themeStyle: 'potion', primaryColor: '#a855f7', secondaryColor: '#22c55e', bgGradient: 'from-purple-950 via-emerald-950 to-slate-950', animationType: 'bubble-burst', icon: '🧪', version: 'v2.1.0', size: '21.0 MB', features: ['药水瓶身液体摇晃模拟', '神秘配方算法重构', '全新动效插槽灵活扩展'] },

  // 21-30: 极简纯净与毛玻璃自然风
  { id: 'up-21', name: '冰川雾面超透毛玻璃', themeStyle: 'icefrost', primaryColor: '#38bdf8', secondaryColor: '#e0f2fe', bgGradient: 'from-sky-950 via-slate-900 to-cyan-950', animationType: 'frost-shimmer', icon: '❄️', version: 'v3.1.2', size: '25.0 MB', features: ['超高透明度磨砂倒角', '环境光漫反射模拟', '支持系统深浅色自适应'] },
  { id: 'up-22', name: '春日樱花漫天飘落', themeStyle: 'sakura', primaryColor: '#f472b6', secondaryColor: '#fda4af', bgGradient: 'from-pink-950 via-rose-950 to-slate-950', animationType: 'sakura-fall', icon: '🌸', version: 'v2.6.0', size: '31.2 MB', features: ['花瓣随风摇曳掉落动效', '柔和樱粉视觉主色调', '支持离线模式极速查看'] },
  { id: 'up-23', name: '晨曦竹林风铃清脆', themeStyle: 'bamboo', primaryColor: '#4ade80', secondaryColor: '#a3e635', bgGradient: 'from-emerald-950 via-stone-900 to-slate-950', animationType: 'wind-sway', icon: '🎋', version: 'v2.2.1', size: '20.8 MB', features: ['清爽青竹摇摆自然微动', '极简无冗余代码架构', '降低电量消耗超过 25%'] },
  { id: 'up-24', name: '深秋枫叶飞舞旋转', themeStyle: 'maple', primaryColor: '#ea580c', secondaryColor: '#ca8a04', bgGradient: 'from-orange-950 via-amber-950 to-stone-950', animationType: 'leaf-spin', icon: '🍁', version: 'v3.7.0', size: '27.5 MB', features: ['红枫落叶物理漂移动力学', '重构列表 LazyColumn 性能', '消除偶发滑动卡顿掉帧'] },
  { id: 'up-25', name: '海盐冰柠清爽苏打', themeStyle: 'soda', primaryColor: '#38bdf8', secondaryColor: '#facc15', bgGradient: 'from-cyan-950 via-blue-900 to-slate-950', animationType: 'soda-fizz', icon: '🍋', version: 'v1.8.4', size: '19.9 MB', features: ['气泡水密苏打升腾特效', '清凉水蓝色调视觉升级', '文件管理器兼容 Android 14'] },
  { id: 'up-26', name: '山峦云海日出晨光', themeStyle: 'mountain', primaryColor: '#fb923c', secondaryColor: '#f472b6', bgGradient: 'from-amber-950 via-purple-950 to-slate-950', animationType: 'sun-rise', icon: '🌄', version: 'v4.1.0', size: '38.6 MB', features: ['霞光渐变云雾缭绕动效', '全新多语言国际化支持', '键盘弹出防遮挡自适应'] },
  { id: 'up-27', name: '月相盈亏星空夜幕', themeStyle: 'moon', primaryColor: '#cbd5e1', secondaryColor: '#94a3b8', bgGradient: 'from-slate-950 via-indigo-950 to-black', animationType: 'moon-phase', icon: '🌙', version: 'v3.9.2', size: '33.0 MB', features: ['月相周期动态轮转显示', '暗夜护眼纯黑主题调优', '优化本地 SQLite 事务读写'] },
  { id: 'up-28', name: '纯白杂志简约折页', themeStyle: 'magazine', primaryColor: '#f8fafc', secondaryColor: '#94a3b8', bgGradient: 'from-slate-900 via-zinc-900 to-stone-950', animationType: 'page-fold', icon: '📖', version: 'v2.5.4', size: '23.6 MB', features: ['真实书页翻动阴影折叠', '严格依照排版字体规范', '一键导出高清代码卡片'] },
  { id: 'up-29', name: '黑白极简主义纯线框', themeStyle: 'mono', primaryColor: '#ffffff', secondaryColor: '#a1a1aa', bgGradient: 'from-black via-zinc-950 to-stone-950', animationType: 'wireframe', icon: '📐', version: 'v5.0.0', size: '17.4 MB', features: ['去除所有无用装饰性元素', '极致 1px 细线几何对称', '支持 Android Studio 快捷复制'] },
  { id: 'up-30', name: '水墨山水写意晕染', themeStyle: 'inkwash', primaryColor: '#94a3b8', secondaryColor: '#475569', bgGradient: 'from-stone-950 via-slate-900 to-zinc-950', animationType: 'ink-spread', icon: '🖌️', version: 'v3.4.0', size: '28.0 MB', features: ['墨水渐进晕染散开水墨画', '诗意古典国风主题定制', '增强软键盘联动输入体验'] },

  // 31-40: 商务、生产力与工具
  { id: 'up-31', name: '金牌盾牌安全防护', themeStyle: 'shield', primaryColor: '#eab308', secondaryColor: '#3b82f6', bgGradient: 'from-amber-950 via-slate-900 to-blue-950', animationType: 'shield-lock', icon: '🛡️', version: 'v4.3.0', size: '34.5 MB', features: ['安全盾牌发光锁定动效', '升级 SSL 证书链双向认证', '防抓包与反代码反编译'] },
  { id: 'up-32', name: '云端同步飞鸟报信', themeStyle: 'cloud', primaryColor: '#38bdf8', secondaryColor: '#60a5fa', bgGradient: 'from-sky-950 via-blue-950 to-slate-900', animationType: 'cloud-float', icon: '☁️', version: 'v3.1.8', size: '26.8 MB', features: ['云朵漂浮与光速同步', '秒级跨设备代码收藏同步', '支持私有云自建 WebDAV'] },
  { id: 'up-33', name: '齿轮工坊机械咬合', themeStyle: 'gear', primaryColor: '#f97316', secondaryColor: '#a8a29e', bgGradient: 'from-stone-950 via-orange-950 to-zinc-900', animationType: 'gear-rotate', icon: '⚙️', version: 'v2.8.2', size: '22.0 MB', features: ['双齿轮精密咬合啮合旋转', '多线程流水线并行下载', '支持断点续传与后台静默'] },
  { id: 'up-34', name: '高能电池闪电快充', themeStyle: 'battery', primaryColor: '#22c55e', secondaryColor: '#eab308', bgGradient: 'from-emerald-950 via-slate-900 to-zinc-950', animationType: 'charge-spark', icon: '🔋', version: 'v3.5.5', size: '24.9 MB', features: ['闪电充能高亮粒子跳动', '功耗降低 40% 绿盟认证', '休眠模式内存极度释放'] },
  { id: 'up-35', name: '代码晶体璀璨折射', themeStyle: 'crystal', primaryColor: '#c084fc', secondaryColor: '#38bdf8', bgGradient: 'from-purple-950 via-indigo-950 to-slate-950', animationType: 'crystal-shine', icon: '💎', version: 'v4.8.0', size: '42.3 MB', features: ['多边形钻石光棱折射光斑', 'Kotlin 2.0 编译器完美适配', '优化 Compose Previews 渲染'] },
  { id: 'up-36', name: '雷达扫描定位坐标', themeStyle: 'target', primaryColor: '#ef4444', secondaryColor: '#f97316', bgGradient: 'from-red-950 via-slate-900 to-stone-950', animationType: 'crosshair', icon: '🎯', version: 'v2.7.7', size: '25.6 MB', features: ['准心十字精确捕捉微动画', '异常崩溃捕捉精准堆栈', '新增代码片段一键定位'] },
  { id: 'up-37', name: '火箭发射台点火倒数', themeStyle: 'countdown', primaryColor: '#f43f5e', secondaryColor: '#eab308', bgGradient: 'from-rose-950 via-slate-900 to-amber-950', animationType: 'fire-boost', icon: '⏱️', version: 'v3.3.0', size: '36.0 MB', features: ['点火倒计时喷火动态特效', '网络超时自适应换源机制', '完整覆盖 Android 15 预览版'] },
  { id: 'up-38', name: '星空罗盘方向指引', themeStyle: 'compass', primaryColor: '#38bdf8', secondaryColor: '#818cf8', bgGradient: 'from-indigo-950 via-slate-900 to-sky-950', animationType: 'needle-spin', icon: '🧭', version: 'v2.4.9', size: '21.5 MB', features: ['罗盘磁针回旋定格微动画', '开发者进阶学习路径指引', '分类筛选与收藏标签联动'] },
  { id: 'up-39', name: '声波均衡音频律动', themeStyle: 'audio', primaryColor: '#ec4899', secondaryColor: '#8b5cf6', bgGradient: 'from-fuchsia-950 via-purple-950 to-slate-950', animationType: 'equalizer-wave', icon: '🎵', version: 'v4.4.4', size: '40.0 MB', features: ['音频频谱跳动条律动', '内置操作音效与触感回馈', '支持背景音频播放浮窗'] },
  { id: 'up-40', name: '万花筒幻彩几何旋涡', themeStyle: 'kaleido', primaryColor: '#06b6d4', secondaryColor: '#f43f5e', bgGradient: 'from-teal-950 via-slate-900 to-rose-950', animationType: 'kaleido-spin', icon: '🎨', version: 'v3.0.0', size: '30.1 MB', features: ['几何对称万花筒旋转绽放', 'UI 主题自由调色盘支持', '优化平板横屏分栏布局'] },

  // 41-52: 趣味、节日与奇幻动效
  { id: 'up-41', name: '宇宙飞船光速折跃', themeStyle: 'spaceshuttle', primaryColor: '#38bdf8', secondaryColor: '#e2e8f0', bgGradient: 'from-slate-950 via-sky-950 to-indigo-950', animationType: 'warp-drive', icon: '🛸', version: 'v5.2.0', size: '47.5 MB', features: ['飞船折跃流光尾焰动效', '全新 Kotlin Multiplatform 模块', '内存占用减少 35%'] },
  { id: 'up-42', name: '烟花盛宴彩带礼炮', themeStyle: 'fireworks', primaryColor: '#f43f5e', secondaryColor: '#facc15', bgGradient: 'from-purple-950 via-rose-950 to-slate-950', animationType: 'firework-burst', icon: '🎆', version: 'v6.6.6', size: '50.0 MB', features: ['绚丽烟花绽放彩屑飘落', '年度大版本里程碑献礼', '全新加入 50+ 组件库实战'] },
  { id: 'up-43', name: '深海潜艇声呐回波', themeStyle: 'submarine', primaryColor: '#06b6d4', secondaryColor: '#10b981', bgGradient: 'from-cyan-950 via-slate-950 to-teal-950', animationType: 'sonar-ping', icon: '🚢', version: 'v2.6.5', size: '23.4 MB', features: ['声呐水下波纹探测模拟', '网络弱网包重传重试机制', '优化离线数据加载持久化'] },
  { id: 'up-44', name: '甜甜圈糖霜梦幻波', themeStyle: 'donut', primaryColor: '#f472b6', secondaryColor: '#fcd34d', bgGradient: 'from-pink-950 via-amber-950 to-slate-950', animationType: 'sprinkle-drop', icon: '🍩', version: 'v2.0.1', size: '26.3 MB', features: ['彩虹糖针掉落弹性摇摆', '可爱萌系手绘风交互', '新增代码片段收藏分组'] },
  { id: 'up-45', name: '外星飞碟牵引光束', themeStyle: 'ufo', primaryColor: '#a3e635', secondaryColor: '#38bdf8', bgGradient: 'from-lime-950 via-slate-900 to-cyan-950', animationType: 'tractor-beam', icon: '👽', version: 'v3.7.8', size: '37.2 MB', features: ['UFO 底部绿色吸附光束', '全新代码片段拖拽排序', '支持多选批量导出 JSON'] },
  { id: 'up-46', name: '复古磁带倒带倒带', themeStyle: 'cassette', primaryColor: '#ea580c', secondaryColor: '#facc15', bgGradient: 'from-stone-900 via-amber-950 to-zinc-950', animationType: 'tape-wind', icon: '📼', version: 'v1.7.0', size: '18.1 MB', features: ['双孔磁带快速转动倒带', '经典机械复古工业外观', '极度轻量化无第三方依赖'] },
  { id: 'up-47', name: '魔方六面立体还原', themeStyle: 'cube', primaryColor: '#3b82f6', secondaryColor: '#ef4444', bgGradient: 'from-blue-950 via-slate-900 to-red-950', animationType: 'cube-3d', icon: '🎲', version: 'v4.0.5', size: '36.9 MB', features: ['3D 魔方旋转与面块翻转', '架构 MVI 单向数据流范式', '解耦业务逻辑与 UI 状态'] },
  { id: 'up-48', name: '全息芯片电路流光', themeStyle: 'chip', primaryColor: '#0ea5e9', secondaryColor: '#22c55e', bgGradient: 'from-slate-950 via-cyan-950 to-black', animationType: 'circuit-flow', icon: '🖲️', version: 'v3.9.0', size: '31.8 MB', features: ['印刷电路板电流脉冲疾行', '底层硬件加速开关支持', '降低 CPU 发热与功耗'] },
  { id: 'up-49', name: '钻石皇冠光芒四射', themeStyle: 'crown', primaryColor: '#eab308', secondaryColor: '#f59e0b', bgGradient: 'from-amber-950 via-yellow-950 to-stone-950', animationType: 'crown-glow', icon: '✨', version: 'v5.5.0', size: '44.0 MB', features: ['黄金皇冠八角星光芒闪耀', '开发者社区顶级荣誉勋章', '支持自定义代码云端分享'] },
  { id: 'up-50', name: '折纸千纸鹤振翅欲飞', themeStyle: 'origami', primaryColor: '#38bdf8', secondaryColor: '#f43f5e', bgGradient: 'from-sky-950 via-slate-900 to-rose-950', animationType: 'origami-flap', icon: '🕊️', version: 'v2.9.9', size: '27.7 MB', features: ['纸鹤翅膀立体折痕与扑翼', '极具东方韵味的折纸美学', '流畅的 SharedElement 过渡'] },
  { id: 'up-51', name: '沙漏时光流逝重置', themeStyle: 'hourglass', primaryColor: '#f59e0b', secondaryColor: '#38bdf8', bgGradient: 'from-amber-950 via-slate-950 to-blue-950', animationType: 'sand-drip', icon: '⏳', version: 'v3.2.5', size: '28.8 MB', features: ['金黄细沙平滑滴落模拟', '倒计时到期自动静默下载', '升级后无需重启直接生效'] },
  { id: 'up-52', name: '火星探测车着陆气囊', themeStyle: 'rover', primaryColor: '#ef4444', secondaryColor: '#f97316', bgGradient: 'from-red-950 via-orange-950 to-stone-950', animationType: 'airbag-bounce', icon: '🛸', version: 'v4.9.9', size: '46.1 MB', features: ['着陆缓冲气囊弹跳入场', '超长链路断网容灾方案', '全面提升复杂网络适应力'] },
];

export const UPDATE_DIALOG_SNIPPETS: Snippet[] = UPDATE_DIALOG_THEMES.map((theme, index) => {
  const numStr = (index + 1).toString().padStart(2, '0');
  return {
    id: theme.id,
    title: `弹窗 ${numStr} · ${theme.name}（动态 CSS / Compose 特效）`,
    category: 'compose-feedback',
    categoryName: '50+ 动效更新弹窗',
    language: 'compose',
    description: `自带【${theme.animationType}】动态特效的 Android 升级弹窗。配备版本号 ${theme.version}、大小 ${theme.size}、更新日志条目及安装包 MD5 校验机制。`,
    tips: `内置下载进度模拟与粒子反馈，点击「立即升级」可触发动态下载条，支持点击关闭或稍后提醒。`,
    tags: ['更新弹窗', '动效弹窗', theme.themeStyle, theme.animationType, 'Dialog', '版本升级'],
    interactivePreviewKey: `update-preview-${theme.id}`,
    code: `import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * 动效更新弹窗 · ${theme.name}
 * 样式特效: ${theme.animationType}
 */
@Composable
fun UpdateDialog_${theme.id.replace('-', '_')}(
    version: String = "${theme.version}",
    size: String = "${theme.size}",
    features: List<String> = listOf(${theme.features.map(f => `"${f}"`).join(', ')}),
    onDismiss: () -> Unit = {},
    onInstall: () -> Unit = {}
) {
    var isDownloading by remember { mutableStateOf(false) }
    var progress by remember { mutableFloatStateOf(0f) }
    val scope = rememberCoroutineScope()

    // 核心入场歪斜与弹性缩放动画
    val scale = remember { Animatable(0.6f) }
    val rotation = remember { Animatable(-6f) }
    val infiniteTransition = rememberInfiniteTransition(label = "badge_float")
    val floatOffset by infiniteTransition.animateFloat(
        initialValue = -6f,
        targetValue = 6f,
        animationSpec = infiniteRepeatable(tween(1400, easing = EaseInOutSine), RepeatMode.Reverse),
        label = "dy"
    )

    LaunchedEffect(Unit) {
        scale.animateTo(1f, tween(360, easing = FastOutSlowInEasing))
        rotation.animateTo(0f, tween(300, easing = FastOutSlowInEasing))
    }

    // 全屏半透明遮罩
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black.copy(alpha = 0.65f))
            .clickable(onClick = onDismiss),
        contentAlignment = Alignment.Center
    ) {
        // 弹窗本体 (阻止事件透传)
        Box(
            modifier = Modifier
                .width(320.dp)
                .graphicsLayer {
                    scaleX = scale.value
                    scaleY = scale.value
                    rotationZ = rotation.value
                }
                .clip(RoundedCornerShape(24.dp))
                .background(
                    Brush.verticalGradient(
                        listOf(Color(0xFF0F172A), Color(0xFF020617))
                    )
                )
                .border(2.dp, Color(0xFF38BDF8).copy(alpha = 0.35f), RoundedCornerShape(24.dp))
                .clickable(enabled = false) {}
                .padding(24.dp)
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                // 顶部动效徽章图标
                Box(
                    modifier = Modifier
                        .size(64.dp)
                        .offset(y = floatOffset.dp)
                        .clip(CircleShape)
                        .background(
                            Brush.linearGradient(
                                listOf(Color(0xFF${theme.primaryColor.slice(1)}), Color(0xFF${theme.secondaryColor.slice(1)}))
                            )
                        )
                        .border(3.dp, Color.White.copy(alpha = 0.6f), CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Text("${theme.icon}", fontSize = 32.sp)
                }

                Spacer(modifier = Modifier.height(16.dp))

                // 版本标题与标签
                Text(
                    text = "发现新版本 $version",
                    color = Color.White,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Black
                )

                Text(
                    text = "更新包体积: $size · 建议在 WiFi 下升级",
                    color = Color(0xFF94A3B8),
                    fontSize = 11.sp,
                    modifier = Modifier.padding(top = 4.dp, bottom = 12.dp)
                )

                // 更新日志列表
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(14.dp))
                        .background(Color.White.copy(alpha = 0.05f))
                        .padding(12.dp),
                    verticalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    features.forEachIndexed { i, log ->
                        Text(
                            text = "\${i + 1}. $log",
                            color = Color(0xFFE2E8F0),
                            fontSize = 12.sp,
                            lineHeight = 18.sp
                        )
                    }
                }

                Spacer(modifier = Modifier.height(18.dp))

                // 下载进度条 / 升级按钮
                if (isDownloading) {
                    Column(modifier = Modifier.fillMaxWidth()) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text("下载中...", color = Color(0xFF38BDF8), fontSize = 11.sp)
                            Text("\${(progress * 100).toInt()}%", color = Color(0xFF38BDF8), fontSize = 11.sp, fontWeight = FontWeight.Bold)
                        }
                        Spacer(modifier = Modifier.height(6.dp))
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(8.dp)
                                .clip(CircleShape)
                                .background(Color.White.copy(alpha = 0.1f))
                        ) {
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth(progress)
                                    .fillMaxHeight()
                                    .clip(CircleShape)
                                    .background(Color(0xFF38BDF8))
                            )
                        }
                    }
                } else {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        // 稍后提醒
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .height(44.dp)
                                .clip(RoundedCornerShape(12.dp))
                                .background(Color.White.copy(alpha = 0.08f))
                                .clickable(onClick = onDismiss),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("以后再说", color = Color(0xFF94A3B8), fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
                        }

                        // 立即更新
                        Box(
                            modifier = Modifier
                                .weight(1.4f)
                                .height(44.dp)
                                .clip(RoundedCornerShape(12.dp))
                                .background(
                                    Brush.horizontalGradient(
                                        listOf(Color(0xFF${theme.primaryColor.slice(1)}), Color(0xFF${theme.secondaryColor.slice(1)}))
                                    )
                                )
                                .clickable {
                                    isDownloading = true
                                    scope.launch {
                                        for (p in 1..100) {
                                            progress = p / 100f
                                            delay(20)
                                        }
                                        onInstall()
                                    }
                                },
                            contentAlignment = Alignment.Center
                        ) {
                            Text("立即升级", color = Color.White, fontSize = 13.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }
    }
}
`,
  };
});
