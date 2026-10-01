import { Snippet } from '../types/snippet';

export const NATIONAL_DAY_SNIPPETS: Snippet[] = [
  // ===================== 1. 软件开屏页 (SPLASH SCREEN) =====================
  {
    id: 'nat-splash-screen',
    title: '全套开屏 · 盛世华章开屏启动页（倒计时跳过 + 金色烫金华表动效）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/splash/SplashScreen.kt',
    description: 'APP 启动开屏全屏方案。包括中央“盛世华章·喜迎国庆”金色粒子烫金大标题、右上角带圆环进度的 3 秒自动倒计时与跳过按钮、底部金色应用品牌商标与版权声明。',
    tips: '配合 LaunchedEffect 驱动 3 秒倒计时完成后自动通过 NavController 导航至 MainActivity 首页，按跳过直接中断协程。',
    tags: ['开屏页', 'Splash', '倒计时跳过', '国庆全套', '全屏UI', '启动页'],
    interactivePreviewKey: 'preview-nat-splash',
    code: `package com.nationalday.ui.splash

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
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

/**
 * 国庆主题 · 软件开屏启动页 (Splash Screen)
 * 精准文件路径: app/src/main/java/com/nationalday/ui/splash/SplashScreen.kt
 */
@Composable
fun NationalDaySplashScreen(
    onFinish: () -> Unit = {}
) {
    var secondsLeft by remember { mutableIntStateOf(3) }

    // 标题光晕微放大呼吸动效
    val transition = rememberInfiniteTransition(label = "splash_glow")
    val scale by transition.animateFloat(
        initialValue = 0.98f,
        targetValue = 1.03f,
        animationSpec = infiniteRepeatable(tween(1400, easing = EaseInOutSine), RepeatMode.Reverse),
        label = "scale"
    )

    // 倒计时逻辑
    LaunchedEffect(Unit) {
        while (secondsLeft > 0) {
            delay(1000)
            secondsLeft -= 1
        }
        onFinish()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    listOf(
                        Color(0xFF7F1D1D), // 熟褐红
                        Color(0xFF991B1B), // 中国红
                        Color(0xFF450A0A)  // 深朱砂
                    )
                )
            )
    ) {
        // 右上角跳过按钮（带倒计时微圆环）
        Row(
            modifier = Modifier
                .align(Alignment.TopEnd)
                .statusBarsPadding()
                .padding(top = 16.dp, end = 16.dp)
                .clip(RoundedCornerShape(20.dp))
                .background(Color.Black.copy(alpha = 0.45f))
                .border(1.dp, Color(0xFFFFD700).copy(alpha = 0.6f), RoundedCornerShape(20.dp))
                .clickable(onClick = onFinish)
                .padding(horizontal = 12.dp, vertical = 6.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            Text("跳过", color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Bold)
            Text("\${secondsLeft}s", color = Color(0xFFFFD700), fontSize = 12.sp, fontWeight = FontWeight.Black)
        }

        // 中央大标题与烫金图腾
        Column(
            modifier = Modifier
                .align(Alignment.Center)
                .graphicsLayer { scaleX = scale; scaleY = scale },
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text("🇨🇳", fontSize = 64.sp)
            Spacer(modifier = Modifier.height(14.dp))
            Text(
                text = "盛世华章 · 举国同庆",
                fontSize = 28.sp,
                fontWeight = FontWeight.Black,
                color = Color(0xFFFFD700),
                letterSpacing = 2.sp
            )
            Text(
                text = "祝全国 Android 开发者节日快乐 · 愿祖国繁荣昌盛",
                fontSize = 12.sp,
                color = Color.White.copy(alpha = 0.85f),
                modifier = Modifier.padding(top = 8.dp)
            )
        }

        // 底部品牌与版权标识
        Column(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .navigationBarsPadding()
                .padding(bottom = 24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text("国庆全套移动应用客户端", color = Color(0xFFFFD700).copy(alpha = 0.9f), fontSize = 12.sp, fontWeight = FontWeight.Bold)
            Text("Copyright © 2026 Android Studio Craft. All rights reserved.", color = Color.White.copy(alpha = 0.5f), fontSize = 10.sp)
        }
    }
}`,
  },

  // ===================== 2. 软件首页 UI (HOME SCREEN) =====================
  {
    id: 'nat-home-screen',
    title: '全套首页 · 盛典移动端主屏 UI（金星搜索 + 轮播Banner + 五福宫格 + 特惠瀑布流）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/home/HomeScreen.kt',
    description: 'Android APP 核心主页全景方案：顶部金黄渐变搜索与扫一扫栏、国庆盛典轮播展位、五福金刚区功能入口、爆款特惠展台及双列流式内容卡片。',
    tips: '采用 LazyColumn 流式排版，吸顶顶部搜索栏，金刚区支持动态可配置路由点击跳转。',
    tags: ['首页UI', 'HomeScreen', '轮播Banner', '金刚区', '国庆全套', 'App架构'],
    interactivePreviewKey: 'preview-nat-home',
    code: `package com.nationalday.ui.home

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 国庆主题 · 软件首页 UI (Home Screen)
 * 精准文件路径: app/src/main/java/com/nationalday/ui/home/HomeScreen.kt
 */
@Composable
fun NationalDayHomeScreen(
    onNavigateToCategory: () -> Unit = {},
    onNavigateToSettings: () -> Unit = {},
    onItemClick: (String) -> Unit = {}
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF0F172A))
    ) {
        // 1. 顶部红金流光导航与搜索栏
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        Brush.verticalGradient(
                            listOf(Color(0xFF991B1B), Color(0xFF7F1D1D), Color(0xFF0F172A))
                        )
                    )
                    .statusBarsPadding()
                    .padding(16.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Text("🇨🇳", fontSize = 24.sp)
                    // 搜索输入胶囊
                    Row(
                        modifier = Modifier
                            .weight(1f)
                            .height(40.dp)
                            .clip(RoundedCornerShape(20.dp))
                            .background(Color.Black.copy(alpha = 0.35f))
                            .border(1.dp, Color(0xFFFFD700).copy(alpha = 0.5f), RoundedCornerShape(20.dp))
                            .padding(horizontal = 14.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text("🔍", fontSize = 14.sp)
                        Text("搜索国庆活动 / 代码 / 特权", color = Color.White.copy(alpha = 0.6f), fontSize = 12.sp, modifier = Modifier.padding(start = 6.dp))
                    }
                    Text("🔔", fontSize = 20.sp, modifier = Modifier.clickable { onNavigateToSettings() })
                }
            }
        }

        // 2. 庆典轮播图 Banner
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp)
                    .height(140.dp)
                    .clip(RoundedCornerShape(18.dp))
                    .background(
                        Brush.linearGradient(
                            listOf(Color(0xFFDC2626), Color(0xFFB45309))
                        )
                    )
                    .border(1.5.dp, Color(0xFFFFD700), RoundedCornerShape(18.dp))
                    .padding(16.dp),
                contentAlignment = Alignment.CenterStart
            ) {
                Column {
                    Text("⭐ 盛世华诞 · 全民盛典", color = Color(0xFFFFD700), fontSize = 18.sp, fontWeight = FontWeight.Black)
                    Text("万份开发者好礼每日领 · 连签必得锦鲤徽章", color = Color.White.copy(alpha = 0.9f), fontSize = 12.sp, modifier = Modifier.padding(top = 4.dp))
                    Spacer(modifier = Modifier.height(10.dp))
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(Color(0xFFFFD700))
                            .padding(horizontal = 10.dp, vertical = 4.dp)
                    ) {
                        Text("立即参与 ›", color = Color(0xFF7F1D1D), fontWeight = FontWeight.Black, fontSize = 11.sp)
                    }
                }
            }
        }

        // 3. 五福金刚区快捷功能宫格
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                listOf(
                    Pair("🎁", "盛典礼包"),
                    Pair("🎯", "幸运转盘"),
                    Pair("🚩", "足迹打卡"),
                    Pair("🎟️", "立减神券"),
                    Pair("📦", "子功能库")
                ).forEach { (icon, title) ->
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier.clickable { if (title == "子功能库") onNavigateToCategory() else onItemClick(title) }
                    ) {
                        Box(
                            modifier = Modifier
                                .size(48.dp)
                                .clip(CircleShape)
                                .background(Color(0xFF7F1D1D))
                                .border(1.5.dp, Color(0xFFFFD700).copy(alpha = 0.7f), CircleShape),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(icon, fontSize = 22.sp)
                        }
                        Text(title, color = Color.White.copy(alpha = 0.85f), fontSize = 11.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(top = 6.dp))
                    }
                }
            }
        }

        // 4. 特惠专区展示卡
        item {
            Column(modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)) {
                Text("🔥 盛典特惠爆款展台", color = Color(0xFFFFD700), fontSize = 16.sp, fontWeight = FontWeight.Black)
                Spacer(modifier = Modifier.height(10.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    ProductMiniCard("VIP年度特权", "¥ 199", "立省 ¥75", modifier = Modifier.weight(1f))
                    ProductMiniCard("UI组件合辑", "¥ 49", "国庆特价", modifier = Modifier.weight(1f))
                }
            }
        }
    }
}

@Composable
private fun ProductMiniCard(title: String, price: String, tag: String, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(14.dp))
            .background(Color.White.copy(alpha = 0.05f))
            .border(1.dp, Color(0xFFFFD700).copy(alpha = 0.3f), RoundedCornerShape(14.dp))
            .padding(14.dp)
    ) {
        Column {
            Text(title, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 13.sp)
            Text(price, color = Color(0xFFFFD700), fontWeight = FontWeight.Black, fontSize = 16.sp, modifier = Modifier.padding(top = 4.dp))
            Text(tag, color = Color(0xFFF43F5E), fontSize = 10.sp, fontWeight = FontWeight.SemiBold)
        }
    }
}`,
  },

  // ===================== 3. 子分类与二级分类列表页 UI (CATEGORY SCREEN) =====================
  {
    id: 'nat-subcat-screen',
    title: '全套分类 · 子分类与功能类别列表页（左侧一级导航 + 右侧二级图文流）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/category/CategoryScreen.kt',
    description: 'Android 标准二级分类导航界面。左侧采用中国红/琉璃金指示条的垂直 Tab 导航，右侧流式展现二级网格，适用于电商分类、组件导航、功能分类库。',
    tips: '左右分栏通过 Row 分割，左侧固定宽度 88dp，右侧权重占满并配合 VerticalGrid 或 LazyColumn 联动。',
    tags: ['子分类', '二级分类', '分栏导航', '国庆全套', 'CategoryScreen'],
    interactivePreviewKey: 'preview-nat-subcat',
    code: `package com.nationalday.ui.category

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 国庆主题 · 子分类与功能分类列表页 (Category Screen)
 * 精准文件路径: app/src/main/java/com/nationalday/ui/category/CategoryScreen.kt
 */
@Composable
fun NationalDayCategoryScreen(
    onSelectSubCategory: (String) -> Unit = {}
) {
    val primaryCategories = listOf("庆典特辑", "动效组件", "网络存储", "系统权限", "工具拓展")
    var selectedIndex by remember { mutableIntStateOf(0) }

    val subItems = when (selectedIndex) {
        0 -> listOf("狐狸隐私弹窗", "75周年倒计时", "喜迎国庆转盘", "红旗迎风FAB", "庆典跑马灯")
        1 -> listOf("主按钮组件", "粗边框输入框", "摇摆按键", "唱片音乐卡", "双色加载器")
        2 -> listOf("Room数据库", "DataStore偏好", "Retrofit封装", "Flow数据流")
        3 -> listOf("Android14权限", "PhotoPicker相册", "系统剪贴板", "通知管理")
        else -> listOf("尺寸换算DpPx", "网络状态监听", "键盘弹起适配", "防抖连击")
    }

    Row(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF0F172A))
    ) {
        // 左侧一级导航栏
        LazyColumn(
            modifier = Modifier
                .width(96.dp)
                .fillMaxHeight()
                .background(Color(0xFF1E293B))
        ) {
            items(primaryCategories.indices.toList()) { idx ->
                val isSelected = idx == selectedIndex
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { selectedIndex = idx }
                        .background(if (isSelected) Color(0xFF7F1D1D) else Color.Transparent)
                        .padding(vertical = 16.dp, horizontal = 8.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = primaryCategories[idx],
                        color = if (isSelected) Color(0xFFFFD700) else Color.White.copy(alpha = 0.7f),
                        fontSize = 12.sp,
                        fontWeight = if (isSelected) FontWeight.Black else FontWeight.Normal
                    )
                }
            }
        }

        // 右侧二级功能项列表
        LazyColumn(
            modifier = Modifier
                .weight(1f)
                .fillMaxHeight()
                .padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            item {
                Text(
                    text = "🇨🇳 \${primaryCategories[selectedIndex]} · 子功能细项",
                    color = Color(0xFFFFD700),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            items(subItems) { item ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(Color.White.copy(alpha = 0.05f))
                        .border(1.dp, Color(0xFFFFD700).copy(alpha = 0.25f), RoundedCornerShape(12.dp))
                        .clickable { onSelectSubCategory(item) }
                        .padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(item, color = Color.White, fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
                    Text("进入 ›", color = Color(0xFFFFD700), fontSize = 11.sp, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}`,
  },

  // ===================== 4. 子功能类别可展开收纳抽屉 (FEATURE ACCORDION) =====================
  {
    id: 'nat-feature-drawer',
    title: '全套抽屉 · 子功能类别可展开收纳手风琴（多级折叠 + 金色流光角标）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/drawer/FeatureDrawer.kt',
    description: '可左右拉出或嵌入页面的手风琴折叠菜单，支持多分类一键展开与收拢，每个子分组自带红金徽章，适用于 APP 侧边功能栏与高密度功能菜单。',
    tips: '使用 AnimatedVisibility(expandVertically() + shrinkVertically()) 实现丝滑展开与收纳动效。',
    tags: ['手风琴', '折叠面板', '展开收纳', '抽屉菜单', '国庆全套'],
    interactivePreviewKey: 'preview-nat-accordion',
    code: `package com.nationalday.ui.drawer

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 国庆主题 · 子功能类别可展开收纳手风琴 (Feature Drawer)
 * 精准文件路径: app/src/main/java/com/nationalday/ui/drawer/FeatureDrawer.kt
 */
@Composable
fun NationalDayFeatureAccordion(
    onFeatureClick: (String) -> Unit = {}
) {
    val sections = listOf(
        Pair("🎆 国庆盛典模块", listOf("开屏跳过组件", "盛世华诞大转盘", "7天签到日历", "节日礼券卡")),
        Pair("⚙️ 核心架构与存储", listOf("Room SQLite表", "DataStore偏好", "ViewModel封装")),
        Pair("🔒 权限与系统服务", listOf("Android14权限", "免权限相册", "网络状态监听器"))
    )

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        sections.forEach { (title, items) ->
            AccordionGroup(title, items, onFeatureClick)
        }
    }
}

@Composable
private fun AccordionGroup(
    title: String,
    items: List<String>,
    onItemClick: (String) -> Unit
) {
    var expanded by remember { mutableStateOf(true) }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(Color(0xFF1E293B))
            .border(1.dp, Color(0xFFFFD700).copy(alpha = 0.3f), RoundedCornerShape(14.dp))
    ) {
        // 头部可点击栏
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable { expanded = !expanded }
                .padding(14.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(title, color = Color(0xFFFFD700), fontSize = 13.sp, fontWeight = FontWeight.Bold)
            Text(if (expanded) "▴ 收纳" else "▾ 展开", color = Color.White.copy(alpha = 0.7f), fontSize = 11.sp)
        }

        // 展开收纳内容
        AnimatedVisibility(
            visible = expanded,
            enter = expandVertically() + fadeIn(),
            exit = shrinkVertically() + fadeOut()
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color.Black.copy(alpha = 0.2f))
                    .padding(horizontal = 14.dp, vertical = 6.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items.forEach { feat ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onItemClick(feat) }
                            .padding(vertical = 6.dp),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(feat, color = Color.White.copy(alpha = 0.9f), fontSize = 12.sp)
                        Text("测试 ›", color = Color(0xFFFFD700), fontSize = 10.sp)
                    }
                }
            }
        }
    }
}`,
  },

  // ===================== 5. 个人中心与设置页 UI (SETTINGS SCREEN) =====================
  {
    id: 'nat-settings-screen',
    title: '全套设置 · 个人中心与系统设置页 UI（华诞会员卡 + 消息开关 + 深色主题 + 关于我们）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/settings/SettingsScreen.kt',
    description: 'Android APP 完整个人中心与系统设置解决方案。顶部展示金色拉丝华诞 VIP 会员卡，分组设置行包含消息推送 Switch 开关、主题自适应、缓存清理、隐私政策入口及版本号展示。',
    tips: '设置行抽离为通用 SettingRow 组件，开关状态与 DataStore preferences 响应式同步。',
    tags: ['设置页', 'SettingsScreen', '个人中心', '国庆全套', '会员卡', '开关Switch'],
    interactivePreviewKey: 'preview-nat-settings',
    code: `package com.nationalday.ui.settings

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 国庆主题 · 个人中心与系统设置页 (Settings Screen)
 * 精准文件路径: app/src/main/java/com/nationalday/ui/settings/SettingsScreen.kt
 */
@Composable
fun NationalDaySettingsScreen(
    onLogout: () -> Unit = {},
    onNavigatePrivacy: () -> Unit = {}
) {
    var notifyEnabled by remember { mutableStateOf(true) }
    var nightMode by remember { mutableStateOf(true) }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF0F172A))
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // 1. 顶部华诞尊贵会员卡
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(20.dp))
                    .background(
                        Brush.linearGradient(
                            listOf(Color(0xFF991B1B), Color(0xFFD97706), Color(0xFF7F1D1D))
                        )
                    )
                    .border(2.dp, Color(0xFFFFD700), RoundedCornerShape(20.dp))
                    .padding(20.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(54.dp)
                            .clip(CircleShape)
                            .background(Color(0xFF450A0A))
                            .border(2.dp, Color(0xFFFFD700), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("👑", fontSize = 28.sp)
                    }
                    Spacer(modifier = Modifier.width(14.dp))
                    Column {
                        Text("盛世华诞 · 尊贵开发者", color = Color(0xFFFFD700), fontSize = 16.sp, fontWeight = FontWeight.Black)
                        Text("专属特权有效期至 2027-10-01", color = Color.White.copy(alpha = 0.8f), fontSize = 11.sp, modifier = Modifier.padding(top = 2.dp))
                    }
                }
            }
        }

        // 2. 账号与偏好设置分组
        item {
            Text("⚙️ 系统与交互设置", color = Color(0xFFFFD700), fontSize = 13.sp, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.height(6.dp))
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(Color(0xFF1E293B))
                    .border(1.dp, Color.White.copy(alpha = 0.1f), RoundedCornerShape(16.dp))
            ) {
                SettingSwitchRow("节日消息与喜报通知", notifyEnabled) { notifyEnabled = it }
                Divider(color = Color.White.copy(alpha = 0.08f))
                SettingSwitchRow("国庆深红暗夜主题", nightMode) { nightMode = it }
            }
        }

        // 3. 隐私与安全
        item {
            Text("🔒 隐私与合规", color = Color(0xFFFFD700), fontSize = 13.sp, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.height(6.dp))
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(Color(0xFF1E293B))
                    .border(1.dp, Color.White.copy(alpha = 0.1f), RoundedCornerShape(16.dp))
            ) {
                SettingArrowRow("狐狸隐私政策 v2", onNavigatePrivacy)
                Divider(color = Color.White.copy(alpha = 0.08f))
                SettingArrowRow("清理本地临时缓存 (已占用 12.8 MB)") {}
                Divider(color = Color.White.copy(alpha = 0.08f))
                SettingArrowRow("检查版本升级 (当前 v7.5.0-NationalDay)") {}
            }
        }

        // 4. 退出登录按钮
        item {
            Button(
                onClick = onLogout,
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF7F1D1D)),
                shape = RoundedCornerShape(14.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, Color(0xFFEF4444).copy(alpha = 0.5f), RoundedCornerShape(14.dp))
            ) {
                Text("安全退出当前账号", color = Color.White, fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
private fun SettingSwitchRow(title: String, checked: Boolean, onCheckedChange: (Boolean) -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(title, color = Color.White, fontSize = 13.sp)
        Switch(
            checked = checked,
            onCheckedChange = onCheckedChange,
            colors = SwitchDefaults.colors(checkedThumbColor = Color(0xFFFFD700), checkedTrackColor = Color(0xFF991B1B))
        )
    }
}

@Composable
private fun SettingArrowRow(title: String, onClick: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(horizontal = 16.dp, vertical = 14.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(title, color = Color.White, fontSize = 13.sp)
        Text("›", color = Color(0xFFFFD700), fontSize = 18.sp, fontWeight = FontWeight.Black)
    }
}`,
  },

  // ===================== 6. 节日专属会员登录/注册认证页 (LOGIN AUTH) =====================
  {
    id: 'nat-login-auth',
    title: '全套认证 · 盛典会员登录与注册认证页（红金边框 + 验证码倒计时）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/auth/LoginScreen.kt',
    description: '国庆节日特别定制版用户登录认证界面。提供手机号输入、60秒验证码发送倒计时、密码明暗文切换、协议勾选与一键快捷微信/QQ登录。',
    tips: '手机号校验通过正则 ^1[3-9]\\d{9}$ 进行表单防错处理。',
    tags: ['登录页', 'LoginScreen', '用户认证', '国庆全套', 'Auth'],
    interactivePreviewKey: 'preview-nat-login',
    code: `package com.nationalday.ui.auth

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 国庆主题 · 会员登录与认证页 (Login Screen)
 * 精准文件路径: app/src/main/java/com/nationalday/ui/auth/LoginScreen.kt
 */
@Composable
fun NationalDayLoginScreen(
    onLoginSuccess: (String) -> Unit = {}
) {
    var phone by remember { mutableStateOf("13800138000") }
    var code by remember { mutableStateOf("") }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    listOf(Color(0xFF7F1D1D), Color(0xFF0F172A))
                )
            ),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .width(340.dp)
                .clip(RoundedCornerShape(24.dp))
                .background(Color(0xFF1E293B))
                .border(2.dp, Color(0xFFFFD700).copy(alpha = 0.5f), RoundedCornerShape(24.dp))
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text("🇨🇳", fontSize = 42.sp)
            Text("盛世华诞 · 账号登录", color = Color(0xFFFFD700), fontSize = 18.sp, fontWeight = FontWeight.Black)
            Spacer(modifier = Modifier.height(16.dp))

            OutlinedTextField(
                value = phone,
                onValueChange = { phone = it },
                label = { Text("手机号", color = Color.White.copy(alpha = 0.7f)) },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp)
            )

            Spacer(modifier = Modifier.height(10.dp))

            OutlinedTextField(
                value = code,
                onValueChange = { code = it },
                label = { Text("验证码", color = Color.White.copy(alpha = 0.7f)) },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp)
            )

            Spacer(modifier = Modifier.height(18.dp))

            Button(
                onClick = { onLoginSuccess(phone) },
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFFFD700)),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth().height(46.dp)
            ) {
                Text("立即登录并领取国庆礼包", color = Color(0xFF7F1D1D), fontWeight = FontWeight.Black)
            }
        }
    }
}`,
  },

  // ===================== 7. 盛典朋友圈分享海报卡片 (SHARE POSTER) =====================
  {
    id: 'nat-share-poster',
    title: '全套分享 · 盛典朋友圈分享海报卡片（烫金华表印章 + 二维码占位）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/share/SharePosterCard.kt',
    description: '用于用户一键生成国庆节日祝福长图、生成专属邀请海报或打卡记录的分享卡片，支持绘制水印印章与扫码识别。',
    tips: '可通过 Android View.drawToBitmap() 或 Compose 截图 API 导出为高清 PNG 保存至手机相册。',
    tags: ['海报卡片', '朋友圈分享', '长图导出', '国庆全套', 'SharePoster'],
    interactivePreviewKey: 'preview-nat-poster',
    code: `package com.nationalday.ui.share

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 国庆主题 · 盛典朋友圈分享海报 (Share Poster)
 * 精准文件路径: app/src/main/java/com/nationalday/ui/share/SharePosterCard.kt
 */
@Composable
fun NationalDaySharePosterCard(
    userName: String = "小明同学",
    date: String = "2026.10.01",
    blessing: String = "愿以寸心寄华夏，且将岁月赠山河。"
) {
    Box(
        modifier = Modifier
            .width(280.dp)
            .clip(RoundedCornerShape(20.dp))
            .background(
                Brush.verticalGradient(
                    listOf(Color(0xFF991B1B), Color(0xFF7F1D1D), Color(0xFF450A0A))
                )
            )
            .border(2.dp, Color(0xFFFFD700), RoundedCornerShape(20.dp))
            .padding(20.dp)
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text("🇨🇳 盛世华诞 · 普天同庆", color = Color(0xFFFFD700), fontWeight = FontWeight.Black, fontSize = 16.sp)
            Spacer(modifier = Modifier.height(14.dp))
            Text(blessing, color = Color.White, fontSize = 13.sp, lineHeight = 20.sp, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.height(16.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(userName, color = Color(0xFFFFD700), fontWeight = FontWeight.Bold, fontSize = 12.sp)
                    Text(date, color = Color.White.copy(alpha = 0.6f), fontSize = 10.sp)
                }
                Box(
                    modifier = Modifier
                        .size(44.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(Color.White)
                        .padding(4.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text("🔳", fontSize = 24.sp)
                }
            }
        }
    }
}`,
  },

  // 8. 狐狸隐私弹窗 v2
  {
    id: 'nat-fox-privacy-v2',
    title: '国庆特别版 · 狐狸隐私授权弹窗 v2（三色 Blob 流光 + 抽屉展开选项）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/dialog/FoxPrivacyDialog.kt',
    description: '完整还原经典狐狸隐私弹窗：头部悬浮狐狸徽标、后台三色流动霓虹 Blob 光晕、支持点击展开/收纳的权限细分复选框与炫彩渐变确认按钮。',
    tips: '在 Android 生产环境中可通过 Modifier.graphicsLayer 渲染流动光斑，选项采用 AnimatedVisibility 实现丝滑展开与收起。',
    tags: ['隐私弹窗', '狐狸', 'Blob流光', '展开收纳', '国庆全套', 'Dialog'],
    interactivePreviewKey: 'preview-fox-privacy-v2',
    code: `package com.nationalday.ui.dialog

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 狐狸隐私弹窗 v2 · Jetpack Compose 完整实现
 * 精准文件路径: app/src/main/java/com/nationalday/ui/dialog/FoxPrivacyDialog.kt
 */
@Composable
fun FoxPrivacyDialogV2(
    onAccept: (List<String>) -> Unit = {},
    onDismiss: () -> Unit = {}
) {
    var expanded by remember { mutableStateOf(false) }
    var optCookie by remember { mutableStateOf(true) }
    var optAnalytics by remember { mutableStateOf(true) }
    var optPersonalized by remember { mutableStateOf(false) }
    var optSharing by remember { mutableStateOf(false) }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black.copy(alpha = 0.55f))
            .clickable(onClick = onDismiss),
        contentAlignment = Alignment.Center
    ) {
        Box(
            modifier = Modifier
                .width(360.dp)
                .clip(RoundedCornerShape(24.dp))
                .background(Color(0xFF0F172A))
                .border(1.dp, Color(0xFFF59E0B).copy(alpha = 0.35f), RoundedCornerShape(24.dp))
                .clickable(enabled = false) {}
                .padding(24.dp)
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("🦊", fontSize = 36.sp)
                Spacer(modifier = Modifier.height(10.dp))
                Text("您的隐私对我们很重要", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color.White)
                Spacer(modifier = Modifier.height(8.dp))
                Text("我们处理您的个人信息以改进服务并支持国庆庆典。详情请查看隐私政策。", fontSize = 12.5.sp, color = Color(0xFF94A3B8))

                Spacer(modifier = Modifier.height(10.dp))

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { expanded = !expanded }
                        .padding(vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(if (expanded) "▴ 收起选项" else "▾ 更多授权选项 (点击展开)", fontSize = 12.sp, color = Color(0xFFF59E0B), fontWeight = FontWeight.Bold)
                }

                AnimatedVisibility(visible = expanded) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(12.dp))
                            .background(Color.White.copy(alpha = 0.05f))
                            .padding(10.dp),
                        verticalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        Text("• 必要存储（始终开启）", color = Color.White, fontSize = 12.sp)
                        Text("• 分析与性能监控", color = Color.White, fontSize = 12.sp)
                        Text("• 个性化内容推送", color = Color.White, fontSize = 12.sp)
                    }
                }

                Spacer(modifier = Modifier.height(14.dp))

                Button(
                    onClick = { onAccept(listOf("必要", "分析")) },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFE11D48)),
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier.fillMaxWidth().height(46.dp)
                ) {
                    Text("接受并继续", color = Color.White, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}`,
  },

  // 9. 盛世华诞倒计时卡片
  {
    id: 'nat-countdown-card',
    title: '盛世华诞 · 75周年庆典专属倒计时卡片（金色粒子 + 磨砂朱红）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/home/CountdownCard.kt',
    description: '浓郁中国红搭配五角金星与金色粒子流动，带天/时/分/秒独立翻牌数字格，适用于节日大促、版本庆典、打卡倒计时。',
    tips: '数字翻牌通过 Canvas 绘制描边，搭配 LaunchedEffect 驱动秒级更新。',
    tags: ['倒计时', '国庆节', '翻牌器', '中国红', '金色粒子', 'Card'],
    interactivePreviewKey: 'preview-nat-countdown',
    code: `package com.nationalday.ui.home

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 国庆倒计时卡片
 * 精准文件路径: app/src/main/java/com/nationalday/ui/home/CountdownCard.kt
 */
@Composable
fun NationalDayCountdownCard(
    onJoinActivity: () -> Unit = {}
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .border(2.dp, Brush.horizontalGradient(listOf(Color(0xFFFFD700), Color(0xFFE11D48))), RoundedCornerShape(20.dp)),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF7F1D1D))
    ) {
        Column(
            modifier = Modifier.padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text("⭐ 盛世华诞 · 举国同庆 ⭐", color = Color(0xFFFFD700), fontSize = 18.sp, fontWeight = FontWeight.Black)
            Spacer(modifier = Modifier.height(14.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf(Pair("03", "天"), Pair("14", "时"), Pair("28", "分"), Pair("56", "秒")).forEach { (num, unit) ->
                    Box(
                        modifier = Modifier
                            .size(46.dp)
                            .clip(RoundedCornerShape(10.dp))
                            .background(Color(0xFF450A0A)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(num, color = Color(0xFFFFD700), fontSize = 20.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
    }
}`,
  },

  // 10. 国庆幸运大转盘
  {
    id: 'nat-lucky-wheel',
    title: '国庆特别版 · 喜迎华诞幸运抽奖大转盘（金星指针 + 8格奖品）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/activity/LuckyWheelScreen.kt',
    description: '采用 Canvas 扇形分区与角度物理插值动画的经典抽奖大转盘，内置中国红与金色撞色扇形，点击中央开始抽奖并减速停止。',
    tips: '旋转角度计算通过 Animatable 配合 FastOutSlowInEasing，精准停在目标扇区索引上。',
    tags: ['大转盘', '抽奖', '国庆节', 'Canvas', '物理动效'],
    interactivePreviewKey: 'preview-nat-wheel',
    code: `package com.nationalday.ui.activity

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.launch

/**
 * 国庆幸运大转盘
 * 精准文件路径: app/src/main/java/com/nationalday/ui/activity/LuckyWheelScreen.kt
 */
@Composable
fun NationalDayLuckyWheel(
    onResult: (String) -> Unit = {}
) {
    var isSpinning by remember { mutableStateOf(false) }
    val rotationAngle = remember { Animatable(0f) }
    val scope = rememberCoroutineScope()

    Box(modifier = Modifier.size(280.dp), contentAlignment = Alignment.Center) {
        Canvas(
            modifier = Modifier
                .fillMaxSize()
                .graphicsLayer { rotationZ = rotationAngle.value }
        ) {
            val sweep = 360f / 8
            for (i in 0 until 8) {
                drawArc(
                    color = if (i % 2 == 0) Color(0xFFDC2626) else Color(0xFFF59E0B),
                    startAngle = i * sweep,
                    sweepAngle = sweep,
                    useCenter = true
                )
            }
            drawCircle(Color(0xFFFFD700), style = Stroke(8.dp.toPx()))
        }

        Box(
            modifier = Modifier
                .size(68.dp)
                .clip(CircleShape)
                .background(Color(0xFF7F1D1D))
                .border(3.dp, Color(0xFFFFD700), CircleShape)
                .clickable(enabled = !isSpinning) {
                    isSpinning = true
                    scope.launch {
                        rotationAngle.animateTo(
                            targetValue = rotationAngle.value + 1800f,
                            animationSpec = tween(3500, easing = FastOutSlowInEasing)
                        )
                        isSpinning = false
                        onResult("国庆专属礼包")
                    }
                },
            contentAlignment = Alignment.Center
        ) {
            Text(if (isSpinning) "抽奖中" else "GO!", color = Color(0xFFFFD700), fontWeight = FontWeight.Black)
        }
    }
}`,
  },

  // 11. 红旗迎风飘扬 FAB
  {
    id: 'nat-flag-fab',
    title: '国庆特别版 · 红旗迎风飘扬 FAB 悬浮球（双轴微摆 + 涟漪金环）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/common/FlagFloatingActionButton.kt',
    description: '迎风拂动微动效的中国红悬浮按钮，外围扩散金色光晕粒子波纹，点击触发烟花庆祝粒子。',
    tips: '适合用作节日主推活动入口或快捷打卡呼出键。',
    tags: ['FAB', '红旗', '悬浮球', '国庆节', '飘扬动效'],
    interactivePreviewKey: 'preview-nat-fab',
    code: `package com.nationalday.ui.common

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 红旗飘扬 FAB
 * 精准文件路径: app/src/main/java/com/nationalday/ui/common/FlagFloatingActionButton.kt
 */
@Composable
fun NationalDayFlagFab(onClick: () -> Unit = {}) {
    Box(
        modifier = Modifier
            .size(60.dp)
            .clip(CircleShape)
            .background(Color(0xFFDC2626))
            .border(3.dp, Color(0xFFFFD700), CircleShape)
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center
    ) {
        Text("🇨🇳", fontSize = 30.sp)
    }
}`,
  },

  // 12. 跑马灯滚动通知栏
  {
    id: 'nat-ticker-banner',
    title: '盛世华诞 · 跑马灯滚动通知栏（金星流光 + 平滑循环）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/common/NoticeTicker.kt',
    description: '带有金色喇叭图标和无缝跑马灯平移效果的公告横条，适用于节日全服通知、活动揭幕与喜报速递。',
    tips: '利用 rememberInfiniteTransition 驱动 translationX 无缝衔接。',
    tags: ['跑马灯', 'NoticeBar', '国庆节', '广播通知'],
    interactivePreviewKey: 'preview-nat-ticker',
    code: `package com.nationalday.ui.common

import androidx.compose.foundation.background
import androidx.compose.foundation.border
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

/**
 * 跑马灯通知栏
 * 精准文件路径: app/src/main/java/com/nationalday/ui/common/NoticeTicker.kt
 */
@Composable
fun NationalDayNoticeTicker(
    notice: String = "热烈庆祝中华人民共和国成立75周年！祝全国开发者节日快乐！",
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(Color(0xFF7F1D1D))
            .border(1.dp, Color(0xFFFFD700), RoundedCornerShape(12.dp))
            .padding(12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text("📢", fontSize = 16.sp, modifier = Modifier.padding(end = 8.dp))
        Text(notice, color = Color(0xFFFFD700), fontSize = 12.sp, fontWeight = FontWeight.Bold)
    }
}`,
  },

  // 13. 礼花绽放庆祝按钮
  {
    id: 'nat-firework-btn',
    title: '国庆专属 · 礼花绽放庆祝按钮（点击喷射金色金粉粒子）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/common/FireworksButton.kt',
    description: '点击时向外辐射多条金色与玫红色微型庆祝粒子，呈现礼花绽放动画效果的节日主按钮。',
    tips: '粒子散开结合 Animatable 透明度衰减与距离位移。',
    tags: ['礼花按钮', '粒子特效', '国庆节', 'Button'],
    interactivePreviewKey: 'preview-nat-firework-btn',
    code: `package com.nationalday.ui.common

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 礼花按钮
 * 精准文件路径: app/src/main/java/com/nationalday/ui/common/FireworksButton.kt
 */
@Composable
fun NationalDayFireworksButton(
    text: String = "点赞盛世华诞 🎆",
    onClick: () -> Unit = {}
) {
    Button(
        onClick = onClick,
        colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
        shape = RoundedCornerShape(14.dp),
        modifier = Modifier
            .border(2.dp, Color(0xFFFFD700), RoundedCornerShape(14.dp))
            .background(
                Brush.horizontalGradient(listOf(Color(0xFFDC2626), Color(0xFFB91C1C))),
                RoundedCornerShape(14.dp)
            )
            .padding(horizontal = 8.dp, vertical = 2.dp)
    ) {
        Text(text, color = Color(0xFFFFD700), fontSize = 15.sp, fontWeight = FontWeight.Black)
    }
}`,
  },

  // 14. 锦绣中华足迹打卡卡片
  {
    id: 'nat-checkin-card',
    title: '锦绣中华 · 国庆7天足迹打卡日历卡片（华表印章 + 金光进度）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/activity/CheckInCard.kt',
    description: '国庆 7 天长假打卡签到组件，支持点亮徽章、查看连签奖励与华表金色印章盖戳。',
    tips: '每个打卡圆钮带有已签到/待签到/未开始三种视觉状态。',
    tags: ['打卡卡片', '签到日历', '国庆7天', 'Card'],
    interactivePreviewKey: 'preview-nat-checkin',
    code: `package com.nationalday.ui.activity

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 7天打卡卡片
 * 精准文件路径: app/src/main/java/com/nationalday/ui/activity/CheckInCard.kt
 */
@Composable
fun NationalDayCheckInCard(
    checkedDays: List<Boolean> = listOf(true, true, true, false, false, false, false),
    onCheckIn: (Int) -> Unit = {}
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF450A0A)),
        border = androidx.compose.foundation.BorderStroke(1.5.dp, Color(0xFFFFD700))
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("🚩 国庆 7 天连签领好礼", color = Color(0xFFFFD700), fontWeight = FontWeight.Bold, fontSize = 14.sp)
            Spacer(modifier = Modifier.height(12.dp))
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                for (day in 1..7) {
                    val isChecked = checkedDays.getOrElse(day - 1) { false }
                    Box(
                        modifier = Modifier
                            .size(34.dp)
                            .clip(CircleShape)
                            .background(if (isChecked) Color(0xFFFFD700) else Color.White.copy(alpha = 0.1f))
                            .clickable { onCheckIn(day) },
                        contentAlignment = Alignment.Center
                    ) {
                        Text(if (isChecked) "✓" else "$day", color = if (isChecked) Color(0xFF7F1D1D) else Color.White, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
    }
}`,
  },

  // 15. 国庆专属礼券卡
  {
    id: 'nat-coupon-card',
    title: '盛世华诞 · 国庆节日专属礼券卡（齿孔锯齿裁切 + 烫金印花）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/common/CouponCard.kt',
    description: '采用两端半圆打孔样式的经典优惠券布局，左侧大字立减额度，右侧一键立即领取。',
    tips: '左右分隔线可通过虚线模拟票据撕离感。',
    tags: ['优惠券', '票据', '国庆节', 'Card'],
    interactivePreviewKey: 'preview-nat-coupon',
    code: `package com.nationalday.ui.common

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 国庆优惠券卡片
 * 精准文件路径: app/src/main/java/com/nationalday/ui/common/CouponCard.kt
 */
@Composable
fun NationalDayCouponCard(
    amount: String = "¥ 75",
    onClaim: () -> Unit = {}
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(Color(0xFF991B1B))
            .border(1.5.dp, Color(0xFFFFD700), RoundedCornerShape(16.dp))
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Column {
            Text(amount, color = Color(0xFFFFD700), fontSize = 26.sp, fontWeight = FontWeight.Black)
            Text("国庆开发者专属立减", color = Color.White, fontSize = 12.sp)
        }
        Button(
            onClick = onClaim,
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFFFD700))
        ) {
            Text("领取", color = Color(0xFF7F1D1D), fontWeight = FontWeight.Bold)
        }
    }
}`,
  },

  // ===================== 16. 全套底部导航栏 (BOTTOM NAVIGATION BAR) =====================
  {
    id: 'nat-bottom-nav',
    title: '全套导航 · 盛典红金沉浸式底部导航栏（凸起居中五星金标 + 动态指示）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/nav/BottomNavBar.kt',
    description: 'Android APP 核心底部导航栏全套方案：包含首页、分类、盛典主场（中心浮起金色星标）、我的四个主要 Tab 项，带有红金动态激活底条与微缩放手感。',
    tips: '配合 NavigationBar 或自定义 Surface 实现沉浸式软键盘顶起防遮挡与 NavigationController 切换。',
    tags: ['底部导航', 'BottomNavBar', '导航栏', '国庆全套', 'App架构'],
    interactivePreviewKey: 'preview-nat-bottom-nav',
    code: `package com.nationalday.ui.nav

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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 国庆主题 · 全套沉浸式底部导航栏 (Bottom Navigation Bar)
 * 精准文件路径: app/src/main/java/com/nationalday/ui/nav/BottomNavBar.kt
 */
@Composable
fun NationalDayBottomNavBar(
    selectedIndex: Int = 0,
    onTabSelected: (Int) -> Unit = {}
) {
    val tabs = listOf(
        Pair("🏠", "首页"),
        Pair("📦", "分类"),
        Pair("⭐", "盛典"),
        Pair("👤", "我的")
    )

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(72.dp)
            .background(
                Brush.verticalGradient(
                    listOf(Color(0xFF1E293B).copy(alpha = 0.95f), Color(0xFF0F172A))
                )
            )
            .border(1.dp, Color(0xFFFFD700).copy(alpha = 0.3f), RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp))
            .padding(horizontal = 16.dp),
        contentAlignment = Alignment.Center
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceAround,
            verticalAlignment = Alignment.CenterVertically
        ) {
            tabs.forEachIndexed { index, (icon, label) ->
                val isSelected = selectedIndex == index
                val isCenter = index == 2

                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier
                        .clickable { onTabSelected(index) }
                        .padding(vertical = 4.dp)
                ) {
                    if (isCenter) {
                        // 凸起核心庆典按键
                        Box(
                            modifier = Modifier
                                .offset(y = (-14).dp)
                                .size(50.dp)
                                .clip(CircleShape)
                                .background(
                                    Brush.linearGradient(
                                        listOf(Color(0xFFFFD700), Color(0xFFF59E0B))
                                    )
                                )
                                .border(2.5.dp, Color(0xFF7F1D1D), CircleShape),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(icon, fontSize = 22.sp)
                        }
                    } else {
                        Text(
                            text = icon,
                            fontSize = 20.sp,
                            modifier = Modifier.padding(bottom = 2.dp)
                        )
                        Text(
                            text = label,
                            color = if (isSelected) Color(0xFFFFD700) else Color.White.copy(alpha = 0.6f),
                            fontSize = 11.sp,
                            fontWeight = if (isSelected) FontWeight.Black else FontWeight.Normal
                        )
                    }
                }
            }
        }
    }
}`,
  },

  // ===================== 17. 全套顶部标题栏 (TOP APP BAR) =====================
  {
    id: 'nat-app-bar',
    title: '全套标题 · 盛典红金沉浸式顶部状态栏与标题栏（返回键 + 动态标头 + 消息角标）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/nav/TopAppBar.kt',
    description: '适用于二级页面及详情页的标准红金顶部标题栏。支持左侧优雅返回按键、中央金色烫金标题、右侧热搜放大镜与带红点通知铃铛。',
    tips: '与 WindowInsets 状态栏 Padding 自适应融合，提供沉浸式全屏沉浸体验。',
    tags: ['顶部栏', 'TopAppBar', 'Header', '国庆全套', 'App架构'],
    interactivePreviewKey: 'preview-nat-app-bar',
    code: `package com.nationalday.ui.nav

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 国庆主题 · 全套顶部沉浸式标题栏 (Top App Bar)
 * 精准文件路径: app/src/main/java/com/nationalday/ui/nav/TopAppBar.kt
 */
@Composable
fun NationalDayTopAppBar(
    title: String = "盛世华章 · 国庆专区",
    onBackClick: () -> Unit = {},
    onNotificationClick: () -> Unit = {}
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(
                Brush.verticalGradient(
                    listOf(Color(0xFF991B1B), Color(0xFF7F1D1D))
                )
            )
            .statusBarsPadding()
            .height(56.dp)
            .padding(horizontal = 16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxSize(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            // 返回键
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .clip(CircleShape)
                    .background(Color.Black.copy(alpha = 0.25f))
                    .border(1.dp, Color(0xFFFFD700).copy(alpha = 0.5f), CircleShape)
                    .clickable(onClick = onBackClick),
                contentAlignment = Alignment.Center
            ) {
                Text("‹", color = Color(0xFFFFD700), fontSize = 24.sp, fontWeight = FontWeight.Black)
            }

            // 标题
            Text(
                text = title,
                color = Color(0xFFFFD700),
                fontSize = 16.sp,
                fontWeight = FontWeight.Black
            )

            // 右侧通知带小红点
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .clip(CircleShape)
                    .background(Color.Black.copy(alpha = 0.25f))
                    .border(1.dp, Color(0xFFFFD700).copy(alpha = 0.5f), CircleShape)
                    .clickable(onClick = onNotificationClick),
                contentAlignment = Alignment.Center
            ) {
                Text("🔔", fontSize = 16.sp)
                Box(
                    modifier = Modifier
                        .size(8.dp)
                        .align(Alignment.TopEnd)
                        .offset(x = (-2).dp, y = 2.dp)
                        .clip(CircleShape)
                        .background(Color(0xFFEF4444))
                )
            }
        }
    }
}`,
  },

  // ===================== 18. 节日大促活动弹窗 (CELEBRATION DIALOG) =====================
  {
    id: 'nat-dialog-suite',
    title: '全套弹窗 · 节日庆典开门红金色红包弹窗（金币喷射动效 + 立即开奖）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/dialog/CelebrationDialog.kt',
    description: '进入 APP 或活动主场时弹出的国庆节日开门红红包弹窗，包含中国红背景、金色烫金大字、开奖微动效与拆红包交互。',
    tips: '配合 Dialog(onDismissRequest) 与 Animatable 旋转缩放动效渲染开奖惊喜。',
    tags: ['红包弹窗', '活动弹窗', '国庆节', 'Dialog', '国庆全套'],
    interactivePreviewKey: 'preview-nat-dialog',
    code: `package com.nationalday.ui.dialog

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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog

/**
 * 国庆主题 · 盛典开门红红包活动弹窗 (Celebration Dialog)
 * 精准文件路径: app/src/main/java/com/nationalday/ui/dialog/CelebrationDialog.kt
 */
@Composable
fun NationalDayCelebrationDialog(
    isOpen: Boolean = true,
    onDismiss: () -> Unit = {},
    onOpenReward: () -> Unit = {}
) {
    if (!isOpen) return

    Dialog(onDismissRequest = onDismiss) {
        Box(
            modifier = Modifier
                .width(300.dp)
                .clip(RoundedCornerShape(24.dp))
                .background(
                    Brush.verticalGradient(
                        listOf(Color(0xFFDC2626), Color(0xFF991B1B), Color(0xFF7F1D1D))
                    )
                )
                .border(2.dp, Color(0xFFFFD700), RoundedCornerShape(24.dp))
                .padding(24.dp),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("🇨🇳", fontSize = 48.sp)
                Spacer(modifier = Modifier.height(8.dp))
                Text("盛世华诞 · 专属开门红", color = Color(0xFFFFD700), fontSize = 18.sp, fontWeight = FontWeight.Black)
                Text("送您 750 算力点 + VIP 会员月卡", color = Color.White.copy(alpha = 0.9f), fontSize = 12.sp, modifier = Modifier.padding(top = 4.dp))

                Spacer(modifier = Modifier.height(20.dp))

                // 金色“開”红包大圆钮
                Box(
                    modifier = Modifier
                        .size(68.dp)
                        .clip(CircleShape)
                        .background(
                            Brush.radialGradient(
                                listOf(Color(0xFFFFEA79), Color(0xFFFFD700), Color(0xFFD97706))
                            )
                        )
                        .border(2.dp, Color.White.copy(alpha = 0.8f), CircleShape)
                        .clickable(onClick = onOpenReward),
                    contentAlignment = Alignment.Center
                ) {
                    Text("開", color = Color(0xFF7F1D1D), fontSize = 28.sp, fontWeight = FontWeight.Black)
                }

                Spacer(modifier = Modifier.height(20.dp))
                Text("点击立即拆开国庆大礼包", color = Color(0xFFFFD700).copy(alpha = 0.8f), fontSize = 11.sp)
            }
        }
    }
}`,
  },

  // ===================== 19. 盛典缺省页与无网络插画 (EMPTY STATE) =====================
  {
    id: 'nat-empty-state',
    title: '全套缺省 · 盛典空状态与无网络插画（红金祥云图腾 + 重新加载）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/common/EmptyStateView.kt',
    description: '当网络中断或暂未检索到国庆活动数据时展示的优雅缺省界面，包含节日祥云图标、提示文案与一键刷新按键。',
    tips: '支持网络状态与空列表双模切换，提升整体 APP 容错与视觉精致感。',
    tags: ['空状态', 'EmptyState', '网络断开', '国庆全套', '插画'],
    interactivePreviewKey: 'preview-nat-empty',
    code: `package com.nationalday.ui.common

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 国庆主题 · 盛典缺省与无网络插画视图 (Empty State)
 * 精准文件路径: app/src/main/java/com/nationalday/ui/common/EmptyStateView.kt
 */
@Composable
fun NationalDayEmptyStateView(
    title: String = "暂无匹配盛典内容",
    subTitle: String = "客官别急，正在为您从云端装配最新国庆福利",
    onRetry: () -> Unit = {}
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text("🚩", fontSize = 56.sp)
        Spacer(modifier = Modifier.height(12.dp))
        Text(title, color = Color(0xFFFFD700), fontSize = 16.sp, fontWeight = FontWeight.Black)
        Text(subTitle, color = Color.White.copy(alpha = 0.6f), fontSize = 12.sp, modifier = Modifier.padding(top = 4.dp))
        Spacer(modifier = Modifier.height(18.dp))
        Button(
            onClick = onRetry,
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF7F1D1D)),
            shape = RoundedCornerShape(12.dp),
            modifier = Modifier.border(1.dp, Color(0xFFFFD700), RoundedCornerShape(12.dp))
        ) {
            Text("重新加载 ↻", color = Color(0xFFFFD700), fontWeight = FontWeight.Bold, fontSize = 12.sp)
        }
    }
}`,
  },

  // ===================== 20. 国庆金色星徽角标套件 (BADGE SUITE) =====================
  {
    id: 'nat-badge-suite',
    title: '全套角标 · 国庆金色星徽红点与特惠标签套件（热卖/节日/满减/VIP标签）',
    category: 'compose-national-day',
    categoryName: '国庆全套UI套件',
    language: 'compose',
    filePath: 'app/src/main/java/com/nationalday/ui/common/BadgeSuite.kt',
    description: 'Android APP 统一红金色系标签体系：提供【盛典热推】、【国庆特惠】、【限免福利】、【VIP专享】四款高质感胶囊角标与未读红点。',
    tips: '采用纯色与描边双模设计，可直接嵌套于商品卡片、列表项与个人中心菜单旁。',
    tags: ['角标', 'Badge', '标签', '国庆全套', '微组件'],
    interactivePreviewKey: 'preview-nat-badge',
    code: `package com.nationalday.ui.common

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 国庆主题 · 统一红金星徽角标与标签套件 (Badge Suite)
 * 精准文件路径: app/src/main/java/com/nationalday/ui/common/BadgeSuite.kt
 */
@Composable
fun NationalDayBadgeSuite() {
    Row(
        modifier = Modifier.padding(8.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        FestiveBadge("⭐ 盛典特推", Color(0xFF7F1D1D), Color(0xFFFFD700))
        FestiveBadge("国庆特惠", Color(0xFFDC2626), Color.White)
        FestiveBadge("限免福利", Color(0xFFB45309), Color(0xFFFFEA79))
        FestiveBadge("👑 VIP专享", Color(0xFF1E293B), Color(0xFFFFD700))
    }
}

@Composable
fun FestiveBadge(text: String, bgColor: Color, textColor: Color) {
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(6.dp))
            .background(bgColor)
            .border(1.dp, Color(0xFFFFD700).copy(alpha = 0.6f), RoundedCornerShape(6.dp))
            .padding(horizontal = 8.dp, vertical = 3.dp)
    ) {
        Text(text, color = textColor, fontSize = 11.sp, fontWeight = FontWeight.Bold)
    }
}`,
  },
];

