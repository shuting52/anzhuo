import { Snippet } from '../types/snippet';
import { UPDATE_DIALOG_SNIPPETS } from './updateDialogSnippets';
import { NATIONAL_DAY_SNIPPETS } from './nationalDaySnippets';

export const INITIAL_SNIPPETS: Snippet[] = [
  // ===================== 国庆特别企划组件 =====================
  ...NATIONAL_DAY_SNIPPETS,

  // ===================== COMPOSE COMMON =====================
  {
    id: 'c-common-01',
    title: 'UColors 主题调色板 & HardShadow 硬阴影容器',
    category: 'compose-common',
    categoryName: '公共基础 Common',
    language: 'compose',
    description: 'Novaxlo 撞色硬阴影风格基础库。提供深蓝 #006AAA、橙黄 #FFBF6A、玫粉 #FF7C90 主题色和独立无外部依赖的硬边阴影容器。',
    tips: '所有后续组件均依赖本基础类，在项目中请优先置入基础通用包内。',
    tags: ['Theme', 'HardShadow', 'Color', 'Canvas', '基础库'],
    interactivePreviewKey: 'preview-common',
    code: `import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

// ================= 主题调色板 =================
object UColors {
    val Blue   = Color(0xFF006AAA) // 招牌深蓝
    val Yellow = Color(0xFFFFBF6A) // 明快橙黄
    val Pink   = Color(0xFFFF7C90) // 活力玫粉
    val Ink    = Color(0xFF0A3D63) // 墨蓝硬阴影与文字
    val Paper  = Color(0xFFFFF6EC) // 温暖浅色底纸
    val White  = Color(0xFFFFFFFF)
    val Track  = Color(0xFFD6E4ED) // 浅蓝灰色轨道底色
}

// 辅助四元色数据类
data class Quad(val a: Color, val b: Color, val c: Color, val d: Color)

// ================= 硬阴影核心容器 =================
@Composable
fun HardShadow(
    modifier: Modifier = Modifier,
    shape: Shape = RoundedCornerShape(14.dp),
    shadowColor: Color = UColors.Ink,
    shadowOffset: Dp = 6.dp,
    background: Color = UColors.White,
    content: @Composable BoxScope.() -> Unit,
) {
    Box(modifier = modifier) {
        // 1. 底层：硬偏移阴影实体块
        Box(
            modifier = Modifier
                .matchParentSize()
                .offset(x = shadowOffset, y = shadowOffset)
                .clip(shape)
                .background(shadowColor)
        )
        // 2. 表层：实际内容承载面
        Box(
            modifier = Modifier
                .clip(shape)
                .background(background),
            content = content
        )
    }
}`,
  },

  // ===================== COMPOSE BUTTONS =====================
  {
    id: 'c01',
    title: '01 · 主按钮（Primary / Alt / Ghost 三变体）',
    category: 'compose-buttons',
    categoryName: '按钮 Buttons',
    language: 'compose',
    description: '三种变体按钮，带深邃硬阴影与 4dp 实线描边，支持按压回弹与点击事件。',
    tips: 'Primary 适合主要引导行动点，Alt 为副操作，Ghost 适用于取消或轻量级交互。',
    tags: ['Button', 'UButton', 'HardShadow', '变体按钮'],
    interactivePreviewKey: 'preview-c01',
    code: `enum class UBtnVariant { Primary, Alt, Ghost }

@Composable
fun UButton(
    text: String,
    modifier: Modifier = Modifier,
    variant: UBtnVariant = UBtnVariant.Primary,
    onClick: () -> Unit = {},
) {
    val (fill, border, fg, shadow) = when (variant) {
        UBtnVariant.Primary -> Quad(UColors.Pink, UColors.Blue, Color.White, UColors.Blue)
        UBtnVariant.Alt     -> Quad(UColors.Yellow, UColors.Ink, UColors.Ink, UColors.Ink)
        UBtnVariant.Ghost   -> Quad(Color.Transparent, UColors.Blue, UColors.Blue, UColors.Pink)
    }
    HardShadow(modifier = modifier, shadowColor = shadow, background = fill) {
        Box(
            Modifier
                .border(4.dp, border, RoundedCornerShape(14.dp))
                .clickable(onClick = onClick)
                .padding(horizontal = 26.dp, vertical = 14.dp)
        ) {
            Text(text, color = fg, fontWeight = FontWeight.Bold, fontSize = 15.sp)
        }
    }
}

// 用法示例:
// UButton("立即下载")
// UButton("开始使用", variant = UBtnVariant.Alt)
// UButton("了解更多", variant = UBtnVariant.Ghost)`,
  },
  {
    id: 'c02',
    title: '02 · 图标按钮（圆形硬阴影）',
    category: 'compose-buttons',
    categoryName: '按钮 Buttons',
    language: 'compose',
    description: '正圆形状的快捷图标按钮，搭配 CircleShape 剪裁与玫粉色硬阴影偏移。',
    tips: '可在右上角配合 Badge 组件组合使用。',
    tags: ['IconButton', 'CircleShape', '圆形按钮'],
    interactivePreviewKey: 'preview-c02',
    code: `@Composable
fun UIconButton(
    symbol: String,
    modifier: Modifier = Modifier,
    background: Color = UColors.Yellow,
    foreground: Color = UColors.Ink,
    onClick: () -> Unit = {},
) {
    HardShadow(
        modifier = modifier,
        shape = CircleShape,
        shadowColor = UColors.Pink,
        background = background,
    ) {
        Box(
            Modifier
                .size(52.dp)
                .border(4.dp, UColors.Blue, CircleShape)
                .clickable(onClick = onClick),
            contentAlignment = Alignment.Center
        ) {
            Text(symbol, color = foreground, fontSize = 22.sp, fontWeight = FontWeight.Black)
        }
    }
}

// 用法示例:
// UIconButton("♥")
// UIconButton("✚", background = UColors.Pink, foreground = Color.White)`,
  },
  {
    id: 'c03',
    title: '03 · FAB 悬浮球（漂浮上下律动动画）',
    category: 'compose-buttons',
    categoryName: '按钮 Buttons',
    language: 'compose',
    description: '采用 rememberInfiniteTransition 驱动 offset.y 实现呼吸感悬浮起伏的浮动操作按钮。',
    tips: '动画使用 tween(1500) + RepeatMode.Reverse，CPU 占用极低。',
    tags: ['FAB', 'Animation', 'InfiniteTransition', '浮动按钮'],
    interactivePreviewKey: 'preview-c03',
    code: `@Composable
fun UFab(
    symbol: String = "+",
    modifier: Modifier = Modifier,
    onClick: () -> Unit = {},
) {
    val transition = rememberInfiniteTransition()
    val dy by transition.animateFloat(
        initialValue = 0f, targetValue = -10f,
        animationSpec = infiniteRepeatable(
            tween(1500), RepeatMode.Reverse
        )
    )
    HardShadow(
        modifier = modifier,
        shape = CircleShape,
        shadowColor = UColors.Pink,
        background = UColors.Blue,
    ) {
        Box(
            Modifier
                .size(64.dp)
                .offset(y = dy.dp)
                .border(5.dp, UColors.Yellow, CircleShape)
                .clickable(onClick = onClick),
            contentAlignment = Alignment.Center
        ) {
            Text(symbol, color = Color.White, fontSize = 28.sp, fontWeight = FontWeight.Bold)
        }
    }
}`,
  },
  {
    id: 'c04',
    title: '04 · 链接按钮（文本 + 底部粗色条）',
    category: 'compose-buttons',
    categoryName: '按钮 Buttons',
    language: 'compose',
    description: '带粗底边饰条的文字超链接按钮，轻量又具有极佳的视觉着力点。',
    tips: '也可以用 drawBehind 绘制自定义高度与圆角的下划粗条。',
    tags: ['LinkButton', 'Text', '链接按钮'],
    interactivePreviewKey: 'preview-c04',
    code: `@Composable
fun ULinkButton(
    text: String,
    modifier: Modifier = Modifier,
    onClick: () -> Unit = {},
) {
    Text(
        text = text,
        modifier = modifier
            .clickable(onClick = onClick)
            .drawBehind {
                drawRect(
                    color = UColors.Yellow,
                    topLeft = Offset(0f, size.height - 4.dp.toPx()),
                    size = Size(size.width, 4.dp.toPx())
                )
            }
            .padding(horizontal = 8.dp, vertical = 6.dp),
        color = UColors.Blue,
        fontWeight = FontWeight.Bold,
        fontSize = 14.sp,
    )
}`,
  },
  {
    id: 'c05',
    title: '05 · 摇摆按钮（点击 Wobble 弹簧动效）',
    category: 'compose-buttons',
    categoryName: '按钮 Buttons',
    language: 'compose',
    description: '利用 Animatable 在点击触发时执行快速交替旋转 (-8° -> 8° -> -5° -> 0°) 的趣味摇摆按钮。',
    tips: '适合用在表单提交成功、点赞收藏或抽奖按钮上增强反馈感知。',
    tags: ['Wobble', 'Animatable', 'GraphicsLayer', '动效按钮'],
    interactivePreviewKey: 'preview-c05',
    code: `@Composable
fun UWobbleButton(
    text: String,
    modifier: Modifier = Modifier,
    onClick: () -> Unit = {},
) {
    val angle = remember { Animatable(0f) }
    val scope = rememberCoroutineScope()
    HardShadow(modifier = modifier, shadowColor = UColors.Blue, background = UColors.Pink) {
        Box(
            Modifier
                .graphicsLayer { rotationZ = angle.value }
                .border(4.dp, UColors.Blue, RoundedCornerShape(14.dp))
                .clickable {
                    scope.launch {
                        listOf(-8f, 8f, -5f, 5f, 0f).forEach {
                            angle.animateTo(it, tween(70))
                        }
                    }
                    onClick()
                }
                .padding(horizontal = 26.dp, vertical = 14.dp)
        ) {
            Text(text, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 15.sp)
        }
    }
}`,
  },

  // ===================== COMPOSE INPUTS =====================
  {
    id: 'c06',
    title: '06 · 招牌款文本输入框（右底粗边框 + 右下大圆角）',
    category: 'compose-inputs',
    categoryName: '输入框 Inputs',
    language: 'compose',
    description: 'Novaxlo 经典标志性组件！蓝底、右侧与底部玫粉粗边框、右下角大弧度圆角，采用 Canvas 精确绘制边框。',
    tips: 'Canvas 绘制 drawArc 与 drawLine 保证了圆角交界的完美闭合，不会产生断裂毛刺。',
    tags: ['BasicTextField', 'Canvas', 'UTextField', '招牌输入框'],
    interactivePreviewKey: 'preview-c06',
    code: `@Composable
fun UTextField(
    value: String,
    onValueChange: (String) -> Unit,
    placeholder: String = "",
    modifier: Modifier = Modifier,
) {
    var focused by remember { mutableStateOf(false) }
    Box(modifier.fillMaxWidth()) {
        // 底层：蓝底容器
        Box(
            Modifier
                .matchParentSize()
                .clip(RoundedCornerShape(10.dp))
                .background(UColors.Blue)
        )
        // 边框层：右下大圆角 + 右/底粗边（Canvas 精确绘制）
        Canvas(Modifier.matchParentSize()) {
            val stroke = 5.dp.toPx()
            val cr = 30.dp.toPx()
            val w = size.width; val h = size.height
            drawArc(
                color = UColors.Pink,
                startAngle = 0f, sweepAngle = 90f, useCenter = false,
                topLeft = Offset(w - 2 * cr, h - 2 * cr),
                size = Size(2 * cr, 2 * cr),
                style = Stroke(stroke)
            )
            drawLine(UColors.Pink, Offset(w - stroke / 2, 0f), Offset(w - stroke / 2, h - 2 * cr + stroke), stroke)
            drawLine(UColors.Pink, Offset(w - 2 * cr + stroke, h - stroke / 2), Offset(0f, h - stroke / 2), stroke)
        }
        BasicTextField(
            value = value,
            onValueChange = onValueChange,
            modifier = Modifier
                .fillMaxWidth()
                .padding(start = 16.dp, end = 22.dp, top = 14.dp, bottom = 14.dp),
            textStyle = TextStyle(color = if (focused) UColors.Blue else UColors.Pink, fontWeight = FontWeight.Bold, fontSize = 15.sp),
            cursorBrush = SolidColor(UColors.Pink),
            decorationBox = { inner ->
                if (value.isEmpty()) Text(placeholder, color = Color(0xFF8FC3E8), fontWeight = FontWeight.Bold, fontSize = 15.sp)
                inner()
            }
        )
    }
}`,
  },
  {
    id: 'c07',
    title: '07 · 搜索框（带内嵌动作胶囊）',
    category: 'compose-inputs',
    categoryName: '输入框 Inputs',
    language: 'compose',
    description: '深蓝底色、橙黄描边，内嵌放大镜与玫粉色搜索触发按钮的组合搜索栏。',
    tips: '软键盘回车可通过 KeyboardOptions(imeAction = ImeAction.Search) 联动。',
    tags: ['SearchBar', 'USearchBar', '搜索栏'],
    interactivePreviewKey: 'preview-c07',
    code: `@Composable
fun USearchBar(
    query: String,
    onQueryChange: (String) -> Unit,
    onSearch: () -> Unit = {},
    modifier: Modifier = Modifier,
) {
    Row(
        modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(UColors.Blue)
            .border(4.dp, UColors.Yellow, RoundedCornerShape(14.dp))
            .padding(start = 14.dp, end = 6.dp, top = 4.dp, bottom = 4.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text("⌕", color = Color.White, fontSize = 20.sp, fontWeight = FontWeight.Black)
        BasicTextField(
            value = query,
            onValueChange = onQueryChange,
            modifier = Modifier.weight(1f).padding(horizontal = 10.dp, vertical = 10.dp),
            textStyle = TextStyle(color = Color.White, fontWeight = FontWeight.Bold, fontSize = 14.sp),
            cursorBrush = SolidColor(Color.White),
            decorationBox = { inner ->
                if (query.isEmpty()) Text("搜索组件与代码…", color = Color.White.copy(alpha = .6f), fontSize = 14.sp)
                inner()
            }
        )
        Box(
            Modifier
                .clip(RoundedCornerShape(9.dp))
                .background(UColors.Pink)
                .clickable(onClick = onSearch)
                .padding(horizontal = 14.dp, vertical = 9.dp)
        ) {
            Text("搜索", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 13.sp)
        }
    }
}`,
  },
  {
    id: 'c08',
    title: '08 · 密码输入框（眼睛切换明暗文）',
    category: 'compose-inputs',
    categoryName: '输入框 Inputs',
    language: 'compose',
    description: '支持通过右侧圆形图标在 PasswordVisualTransformation 与常规明文之间自由切换。',
    tips: '包含内置的占位符和安全遮罩状态记忆。',
    tags: ['Password', 'VisualTransformation', '密码框'],
    interactivePreviewKey: 'preview-c08',
    code: `@Composable
fun UPasswordField(
    value: String,
    onValueChange: (String) -> Unit,
    placeholder: String = "输入密码…",
    modifier: Modifier = Modifier,
) {
    var show by remember { mutableStateOf(false) }
    Row(modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        Box(Modifier.weight(1f)) {
            Box(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(10.dp))
                    .background(UColors.Blue)
            )
            BasicTextField(
                value = value,
                onValueChange = onValueChange,
                modifier = Modifier.fillMaxWidth().padding(start = 16.dp, end = 16.dp, top = 14.dp, bottom = 14.dp),
                textStyle = TextStyle(color = UColors.Pink, fontWeight = FontWeight.Bold, fontSize = 15.sp),
                cursorBrush = SolidColor(UColors.Pink),
                visualTransformation = if (show) VisualTransformation.None else PasswordVisualTransformation(),
                decorationBox = { inner ->
                    if (value.isEmpty()) Text(placeholder, color = Color(0xFF8FC3E8), fontWeight = FontWeight.Bold)
                    inner()
                }
            )
        }
        // 眼睛开关按钮
        Box(
            Modifier
                .padding(start = 8.dp)
                .clip(CircleShape)
                .background(UColors.Yellow)
                .clickable { show = !show }
                .size(38.dp),
            contentAlignment = Alignment.Center
        ) {
            Text(if (show) "🙈" else "👀", fontSize = 18.sp)
        }
    }
}`,
  },

  // ===================== COMPOSE SELECTION =====================
  {
    id: 'c09',
    title: '09 · 开关 Switch（旋钮左右滑动 + 颜色过渡）',
    category: 'compose-selection',
    categoryName: '选择控件 Selection',
    language: 'compose',
    description: '采用 updateTransition 平滑过渡背景与旋钮颜色，带有 3dp 墨蓝重边框。',
    tips: '尺寸采用 76dp x 40dp 黄金比例，手感饱满。',
    tags: ['Switch', 'USwitch', 'Toggle', '开关'],
    interactivePreviewKey: 'preview-c09',
    code: `@Composable
fun USwitch(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
) {
    val transition = updateTransition(checked, label = "switch")
    val bg by transition.animateColor(label = "bg") { on ->
        if (on) UColors.Blue else UColors.Track
    }
    val knobBg by transition.animateColor(label = "knob") {
        if (it) UColors.Pink else UColors.Yellow
    }
    Box(
        modifier
            .width(76.dp)
            .height(40.dp)
            .clip(CircleShape)
            .background(bg)
            .border(3.dp, UColors.Ink, CircleShape)
            .clickable { onCheckedChange(!checked) }
    ) {
        Box(
            Modifier
                .align(if (checked) Alignment.CenterEnd else Alignment.CenterStart)
                .padding(4.dp)
                .size(28.dp)
                .clip(CircleShape)
                .background(knobBg)
                .border(2.dp, UColors.Ink, CircleShape)
        )
    }
}`,
  },
  {
    id: 'c10',
    title: '10 · 复选框 Checkbox（打勾 + 倾斜回正动效）',
    category: 'compose-selection',
    categoryName: '选择控件 Selection',
    language: 'compose',
    description: '带有文字标签的复选框行，选中时带有 -6° 微微歪斜俏皮角度与纯白高亮打勾。',
    tips: '可在 Row 外层整体增加可点击区域以提升点击舒适度。',
    tags: ['Checkbox', 'UCheckRow', '多选框'],
    interactivePreviewKey: 'preview-c10',
    code: `@Composable
fun UCheckRow(
    label: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
) {
    Row(
        modifier.clickable { onCheckedChange(!checked) },
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            Modifier
                .size(32.dp)
                .clip(RoundedCornerShape(10.dp))
                .background(if (checked) UColors.Blue else UColors.White)
                .border(3.dp, UColors.Ink, RoundedCornerShape(10.dp))
                .graphicsLayer { rotationZ = if (checked) -6f else 0f },
            contentAlignment = Alignment.Center
        ) {
            if (checked) Text("✓", color = Color.White, fontWeight = FontWeight.Black, fontSize = 16.sp)
        }
        Spacer(Modifier.width(10.dp))
        Text(label, color = UColors.Ink, fontWeight = FontWeight.Bold, fontSize = 14.sp)
    }
}`,
  },
  {
    id: 'c11',
    title: '11 · 单选按钮 Radio（选中弹跳动效）',
    category: 'compose-selection',
    categoryName: '选择控件 Selection',
    language: 'compose',
    description: '点击切换时触发 Animatable 从 0.7f 迅速弹回 1f 弹性放大的单选组件。',
    tips: '通常配合当前选中的 index 状态管理成组单选。',
    tags: ['RadioButton', 'URadioRow', '单选框'],
    interactivePreviewKey: 'preview-c11',
    code: `@Composable
fun URadioRow(
    label: String,
    selected: Boolean,
    onSelect: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val scale = remember { Animatable(1f) }
    val scope = rememberCoroutineScope()
    Row(
        modifier.clickable {
            if (!selected) scope.launch {
                scale.snapTo(0.7f)
                scale.animateTo(1f, tween(180, easing = FastOutSlowInEasing))
            }
            onSelect()
        },
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            Modifier
                .size(32.dp)
                .clip(CircleShape)
                .background(if (selected) UColors.Pink else UColors.White)
                .border(3.dp, UColors.Ink, CircleShape)
                .graphicsLayer { this.scaleX = scale.value; this.scaleY = scale.value },
            contentAlignment = Alignment.Center
        ) {
            if (selected) Box(
                Modifier.size(13.dp).clip(CircleShape).background(Color.White)
            )
        }
        Spacer(Modifier.width(10.dp))
        Text(label, color = UColors.Ink, fontWeight = FontWeight.Bold, fontSize = 14.sp)
    }
}`,
  },
  {
    id: 'c12',
    title: '12 · 滑块 Slider（手势拖拽 + 双色进度条）',
    category: 'compose-selection',
    categoryName: '选择控件 Selection',
    language: 'compose',
    description: '通过 detectHorizontalDragGestures 实现的手指滑动条，橙黄进度条搭配玫粉色滑块。',
    tips: '支持 0.0f 到 1.0f 浮点值，并自动使用 coerceIn 防越界。',
    tags: ['Slider', 'DragGesture', 'USlider', '滑块'],
    interactivePreviewKey: 'preview-c12',
    code: `@Composable
fun USlider(
    value: Float,
    onValueChange: (Float) -> Unit,
    modifier: Modifier = Modifier,
) {
    Box(
        modifier
            .fillMaxWidth()
            .height(32.dp)
            .clip(CircleShape)
            .background(UColors.White)
            .border(3.dp, UColors.Ink, CircleShape)
            .pointerInput(Unit) {
                detectHorizontalDragGestures { change, dragAmount ->
                    change.consume()
                    onValueChange((value + dragAmount / size.width).coerceIn(0f, 1f))
                }
            }
    ) {
        // 已填充部分（黄）
        Box(
            Modifier
                .align(Alignment.CenterStart)
                .padding(start = 4.dp)
                .fillMaxWidth(value.coerceIn(0.01f, 1f))
                .height(14.dp)
                .clip(CircleShape)
                .background(UColors.Yellow)
        )
        // 拇指圆点（粉色，跟随进度位置）
        Box(
            Modifier
                .align(Alignment.CenterStart)
                .fillMaxWidth(value.coerceIn(0f, 1f))
                .padding(start = 4.dp)
        ) {
            Box(
                Modifier
                    .align(Alignment.CenterEnd)
                    .size(34.dp)
                    .clip(CircleShape)
                    .background(UColors.Pink)
                    .border(3.dp, UColors.Ink, CircleShape)
            )
        }
    }
}`,
  },

  // ===================== COMPOSE LOADERS =====================
  {
    id: 'c13',
    title: '13 · 旋转加载器 Spinner（双色撞色弧）',
    category: 'compose-loaders',
    categoryName: '加载动效 Loaders',
    language: 'compose',
    description: 'Canvas 绘制的双色圆环弧线，结合 360° 无限旋转动画，设计感极强。',
    tips: 'StrokeCap.Round 使两端弧线饱满圆润。',
    tags: ['Spinner', 'USpinner', 'Canvas', '菊花加载'],
    interactivePreviewKey: 'preview-c13',
    code: `@Composable
fun USpinner(modifier: Modifier = Modifier, size: Dp = 60.dp) {
    val transition = rememberInfiniteTransition()
    val angle by transition.animateFloat(
        initialValue = 0f, targetValue = 360f,
        animationSpec = infiniteRepeatable(tween(1000), RepeatMode.Restart)
    )
    Canvas(modifier.size(size).graphicsLayer { rotationZ = angle }) {
        val stroke = 8.dp.toPx()
        val inset = stroke / 2
        val arcSize = Size(size.width - stroke, size.height - stroke)
        // 浅灰蓝底环
        drawArc(UColors.Track, 0f, 360f, false, Offset(inset, inset), arcSize, style = Stroke(stroke))
        // 蓝弧
        drawArc(UColors.Blue, -90f, 100f, false, Offset(inset, inset), arcSize,
            style = Stroke(stroke, cap = StrokeCap.Round))
        // 玫粉弧
        drawArc(UColors.Pink, 140f, 60f, false, Offset(inset, inset), arcSize,
            style = Stroke(stroke, cap = StrokeCap.Round))
    }
}`,
  },
  {
    id: 'c14',
    title: '14 · 脉冲圆点加载器（四色交替弹跳）',
    category: 'compose-loaders',
    categoryName: '加载动效 Loaders',
    language: 'compose',
    description: '带不同 delayMillis 延迟的四色圆点依次向上弹起，如同轻盈波浪接力。',
    tips: '每个小球均有 3dp 墨蓝描边，质感立体。',
    tags: ['DotsLoader', 'UDotsLoader', '小球波浪'],
    interactivePreviewKey: 'preview-c14',
    code: `@Composable
fun UDotsLoader(modifier: Modifier = Modifier, count: Int = 4) {
    val colors = listOf(UColors.Pink, UColors.Yellow, UColors.Blue, UColors.Pink)
    Row(modifier, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
        repeat(count) { i ->
            val transition = rememberInfiniteTransition()
            val dy by transition.animateFloat(
                initialValue = 0f, targetValue = -16f,
                animationSpec = infiniteRepeatable(
                    tween(450, delayMillis = i * 75),
                    RepeatMode.Reverse
                )
            )
            Box(
                Modifier
                    .size(20.dp)
                    .offset(y = dy.dp)
                    .clip(CircleShape)
                    .background(colors[i % colors.size])
                    .border(3.dp, UColors.Ink, CircleShape)
            )
        }
    }
}`,
  },
  {
    id: 'c15',
    title: '15 · 条纹流动进度条（斜纹滚动效果）',
    category: 'compose-loaders',
    categoryName: '加载动效 Loaders',
    language: 'compose',
    description: '在粉色进度内部利用 Canvas 动态平移绘制斜角条纹，呈现传送带式物理质感。',
    tips: '通过 shift % (stripe * 2) 创造无缝死循环流动错觉。',
    tags: ['ProgressBar', 'Canvas', 'Stripe', '条纹进度条'],
    interactivePreviewKey: 'preview-c15',
    code: `@Composable
fun UProgressBar(
    progress: Float,
    modifier: Modifier = Modifier,
    striped: Boolean = true,
) {
    val transition = rememberInfiniteTransition()
    val shift by transition.animateFloat(
        initialValue = 0f, targetValue = 34f,
        animationSpec = infiniteRepeatable(tween(1200), RepeatMode.Restart)
    )
    Box(
        modifier
            .fillMaxWidth()
            .height(32.dp)
            .clip(CircleShape)
            .background(UColors.White)
            .border(4.dp, UColors.Ink, CircleShape)
    ) {
        Canvas(
            Modifier
                .fillMaxWidth(progress.coerceIn(0.01f, 1f))
                .height(32.dp)
                .clip(CircleShape)
        ) {
            val stripe = 16.dp.toPx()
            val h = size.height
            drawRect(UColors.Pink)
            if (striped) {
                var x = -stripe * 2 + shift % (stripe * 2)
                while (x < size.width + stripe) {
                    drawLine(
                        UColors.Yellow, strokeWidth = 16.dp.toPx(),
                        start = Offset(x, 0f), end = Offset(x + h, h),
                        cap = StrokeCap.Square
                    )
                    x += stripe * 2
                }
            }
        }
    }
}`,
  },
  {
    id: 'c16',
    title: '16 · 骨架屏 Skeleton（高光波浪扫描）',
    category: 'compose-loaders',
    categoryName: '加载动效 Loaders',
    language: 'compose',
    description: '带水平扫光渐变 Brush 的优雅骨架屏，用于数据异步加载时防止界面布局突变。',
    tips: '可根据列表或卡片实际高度封装自定义插槽。',
    tags: ['Skeleton', 'Shimmer', '骨架屏'],
    interactivePreviewKey: 'preview-c16',
    code: `@Composable
fun USkeleton(
    modifier: Modifier = Modifier,
    lines: Int = 3,
) {
    val transition = rememberInfiniteTransition()
    val x by transition.animateFloat(
        initialValue = 200f, targetValue = -200f,
        animationSpec = infiniteRepeatable(tween(1400), RepeatMode.Restart)
    )
    Column(modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Box(
            Modifier
                .fillMaxWidth()
                .height(44.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(UColors.Track)
        )
        repeat(lines) {
            val width = if (it == 0) 0.7f else 0.5f
            Box(
                Modifier
                    .fillMaxWidth(width)
                    .height(16.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(UColors.Track)
            )
        }
        // 扫描光带层
        Box(Modifier.fillMaxWidth()) {
            Box(
                Modifier
                    .fillMaxWidth()
                    .height(44.dp + lines * 28.dp)
                    .graphicsLayer { translationX = x.dp.toPx() }
                    .background(Brush.horizontalGradient(
                        listOf(Color.Transparent, UColors.White.copy(alpha = .5f), Color.Transparent)
                    ))
            )
        }
    }
}`,
  },

  // ===================== COMPOSE CARDS =====================
  {
    id: 'c17',
    title: '17 · 统计卡（数字漂浮与增量标签）',
    category: 'compose-cards',
    categoryName: '卡片视图 Cards',
    language: 'compose',
    description: '深蓝底色卡片，醒目的 36sp 黄色粗体数字并附带 TextStyle Shadow 描边与趋势标签。',
    tips: '常用于数据仪表盘、任务量统计或收益汇总面板。',
    tags: ['Card', 'UStatCard', '数据卡片'],
    interactivePreviewKey: 'preview-c17',
    code: `@Composable
fun UStatCard(
    number: String,
    label: String,
    tag: String,
    modifier: Modifier = Modifier,
) {
    HardShadow(
        modifier = modifier.width(230.dp),
        shape = RoundedCornerShape(16.dp),
        shadowColor = UColors.Pink,
        background = UColors.Blue,
    ) {
        Column(Modifier.padding(20.dp)) {
            Text(number, color = UColors.Yellow, fontSize = 36.sp, fontWeight = FontWeight.Black,
                style = TextStyle(shadow = Shadow(UColors.Pink, Offset(2f, 3f))))
            Spacer(Modifier.height(4.dp))
            Text(label, color = Color.White.copy(alpha = .85f), fontSize = 13.sp)
            Spacer(Modifier.height(10.dp))
            Box(
                Modifier
                    .clip(CircleShape)
                    .background(UColors.Yellow)
                    .border(2.dp, UColors.Ink, CircleShape)
                    .padding(horizontal = 10.dp, vertical = 4.dp)
            ) {
                Text(tag, color = UColors.Ink, fontWeight = FontWeight.Black, fontSize = 11.sp)
            }
        }
    }
}`,
  },
  {
    id: 'c18',
    title: '18 · 用户卡片（圆形头像与信息列）',
    category: 'compose-cards',
    categoryName: '卡片视图 Cards',
    language: 'compose',
    description: '白底硬朗卡片，内嵌带玫粉描边的深蓝头像与加粗姓名、邮箱。',
    tips: '可加入点击回调，作为用户个人中心或者团队成员列表项。',
    tags: ['UserCard', 'Avatar', '用户资料卡'],
    interactivePreviewKey: 'preview-c18',
    code: `@Composable
fun UUserCard(
    name: String,
    email: String,
    avatar: String,
    modifier: Modifier = Modifier,
) {
    Row(
        modifier
            .width(280.dp)
            .clip(RoundedCornerShape(16.dp))
            .background(UColors.White)
            .border(4.dp, UColors.Ink, RoundedCornerShape(16.dp))
            .padding(14.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            Modifier
                .size(54.dp)
                .clip(CircleShape)
                .background(UColors.Blue)
                .border(4.dp, UColors.Pink, CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Text(avatar, fontSize = 22.sp, fontWeight = FontWeight.Black, color = Color.White)
        }
        Spacer(Modifier.width(14.dp))
        Column {
            Text(name, color = UColors.Ink, fontWeight = FontWeight.Black, fontSize = 15.sp)
            Spacer(Modifier.height(2.dp))
            Text(email, color = Color(0xFF7A8CA0), fontSize = 12.sp)
        }
    }
}`,
  },
  {
    id: 'c19',
    title: '19 · 商品展示卡（渐变视窗 + 价格标签）',
    category: 'compose-cards',
    categoryName: '卡片视图 Cards',
    language: 'compose',
    description: '蓝粉渐变商品展台、粗体价格与热卖徽章，电商和展示型 App 的利器。',
    tips: '顶部渐变区域亦可替换为 AsyncImage 加载网络实物照片。',
    tags: ['ProductCard', 'Gradient', '商品卡片'],
    interactivePreviewKey: 'preview-c19',
    code: `@Composable
fun UProductCard(
    title: String,
    price: String,
    tag: String,
    emoji: String = "🎧",
    modifier: Modifier = Modifier,
) {
    Column(
        modifier
            .width(230.dp)
            .clip(RoundedCornerShape(18.dp))
            .background(UColors.White)
            .border(4.dp, UColors.Ink, RoundedCornerShape(18.dp)),
    ) {
        Box(
            Modifier
                .fillMaxWidth()
                .height(120.dp)
                .background(Brush.linearGradient(listOf(UColors.Blue, UColors.Pink))),
            contentAlignment = Alignment.Center
        ) {
            Text(emoji, fontSize = 52.sp)
        }
        Column(Modifier.padding(14.dp)) {
            Text(title, color = UColors.Ink, fontWeight = FontWeight.Black, fontSize = 14.sp)
            Spacer(Modifier.height(3.dp))
            Text(price, color = UColors.Pink, fontWeight = FontWeight.Black, fontSize = 17.sp)
            Spacer(Modifier.height(6.dp))
            Box(
                Modifier
                    .clip(CircleShape)
                    .background(UColors.Yellow)
                    .padding(horizontal = 8.dp, vertical = 2.dp)
            ) {
                Text(tag, color = UColors.Ink, fontSize = 11.sp, fontWeight = FontWeight.Bold)
            }
        }
    }
}`,
  },
  {
    id: 'c20',
    title: '20 · 音乐卡（黑胶唱片旋转 + 音频律动柱）',
    category: 'compose-cards',
    categoryName: '卡片视图 Cards',
    language: 'compose',
    description: '采用 Canvas 精细刻画唱片黑胶纹理，配合无限 360° 旋转与四条参差跳动的律动柱。',
    tips: '黑胶唱片的同心圆纹理循环绘制通过 step 步进实现，视觉极为细腻逼真。',
    tags: ['MusicCard', 'Vinyl', 'Equalizer', '黑胶唱片'],
    interactivePreviewKey: 'preview-c20',
    code: `@Composable
fun UMusicCard(
    song: String,
    singer: String,
    modifier: Modifier = Modifier,
) {
    val rotation = rememberInfiniteTransition().animateFloat(
        initialValue = 0f, targetValue = 360f,
        animationSpec = infiniteRepeatable(tween(4000, easing = LinearEasing))
    )
    Column(
        modifier
            .width(240.dp)
            .clip(RoundedCornerShape(18.dp))
            .background(UColors.White)
            .border(4.dp, UColors.Ink, RoundedCornerShape(18.dp))
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // 旋转黑胶唱片
        Canvas(Modifier.size(74.dp).graphicsLayer { rotationZ = rotation.value }) {
            drawCircle(UColors.Ink, radius = size.minDimension / 2)
            drawCircle(UColors.Blue, radius = size.minDimension / 2 - 5.dp.toPx())
            // 圈纹
            for (r in 8.dp.toPx()..(size.minDimension / 2 - 10.dp.toPx()) step 4.dp.toPx()) {
                drawCircle(Color.White.copy(alpha = .3f), radius = r, style = Stroke(1.dp.toPx()))
            }
            drawCircle(UColors.Yellow, radius = 8.dp.toPx())
        }
        Spacer(Modifier.height(12.dp))
        Text(song, color = UColors.Ink, fontWeight = FontWeight.Black, fontSize = 14.sp)
        Text(singer, color = Color(0xFF7A8CA0), fontSize = 12.sp)
        Spacer(Modifier.height(10.dp))
        // 律动柱
        Row(horizontalArrangement = Arrangement.spacedBy(4.dp), verticalAlignment = Alignment.Bottom) {
            listOf(0, 150, 300, 450).forEach { delay ->
                val h = rememberInfiniteTransition().animateFloat(
                    initialValue = 6f, targetValue = 22f,
                    animationSpec = infiniteRepeatable(tween(500, delayMillis = delay), RepeatMode.Reverse)
                )
                Box(Modifier.width(6.dp).height(h.value.dp).clip(RoundedCornerShape(3.dp)).background(UColors.Pink))
            }
        }
    }
}`,
  },

  // ===================== COMPOSE NAVIGATION =====================
  {
    id: 'c21',
    title: '21 · 底部导航栏 BottomNav（硬阴影 + 玫粉指示条）',
    category: 'compose-nav',
    categoryName: '导航栏目 Navigation',
    language: 'compose',
    description: '胶囊阴影圆角底栏，选中项高亮切换并在正下方搭配贯穿的指示色块。',
    tips: '传入 List<Pair<String, String>> 分别代表图标与文字。',
    tags: ['BottomNav', 'Navigation', '底部导航'],
    interactivePreviewKey: 'preview-c21',
    code: `@Composable
fun UBottomNav(
    items: List<Pair<String, String>>, // (图标, 文字)
    selected: Int,
    onSelect: (Int) -> Unit,
    modifier: Modifier = Modifier,
) {
    Column(modifier.fillMaxWidth()) {
        HardShadow(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(20.dp),
            shadowColor = UColors.Blue,
            background = UColors.White,
        ) {
            Row {
                items.forEachIndexed { index, (icon, label) ->
                    val on = index == selected
                    Column(
                        Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(20.dp))
                            .background(if (on) UColors.Blue else Color.Transparent)
                            .clickable { onSelect(index) }
                            .padding(vertical = 14.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(5.dp)
                    ) {
                        Text(icon, color = if (on) Color.White else UColors.Ink, fontSize = 20.sp)
                        Text(label, color = if (on) Color.White else UColors.Ink,
                            fontSize = 11.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
        // 底部玫粉指示条
        Row(Modifier.fillMaxWidth().offset(y = (-3).dp)) {
            repeat(items.size) { i ->
                Box(Modifier.weight(1f).height(6.dp)
                    .background(if (i == selected) UColors.Pink else Color.Transparent))
            }
        }
    }
}`,
  },
  {
    id: 'c22',
    title: '22 · Tab 栏（黄底高亮分段选项卡）',
    category: 'compose-nav',
    categoryName: '导航栏目 Navigation',
    language: 'compose',
    description: '采用墨蓝边框包裹的扁平分段控制器，选中项以橙黄色平铺突出。',
    tips: '非常适合一级或二级分类切换。',
    tags: ['TabBar', 'Tabs', '选项卡'],
    interactivePreviewKey: 'preview-c22',
    code: `@Composable
fun UTabBar(
    tabs: List<String>,
    selected: Int,
    onSelect: (Int) -> Unit,
    modifier: Modifier = Modifier,
) {
    Row(
        modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(UColors.White)
            .border(4.dp, UColors.Ink, RoundedCornerShape(14.dp))
    ) {
        tabs.forEachIndexed { index, label ->
            val on = index == selected
            Box(
                Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(14.dp))
                    .background(if (on) UColors.Yellow else Color.Transparent)
                    .clickable { onSelect(index) }
                    .padding(vertical = 12.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(label, color = if (on) UColors.Ink else Color(0xFF7A8CA0),
                    fontWeight = FontWeight.Bold, fontSize = 13.sp)
            }
        }
    }
}`,
  },
  {
    id: 'c23',
    title: '23 · 顶部 AppBar（标题投影 + 动作按键）',
    category: 'compose-nav',
    categoryName: '导航栏目 Navigation',
    language: 'compose',
    description: '蓝底黄框的强视觉 AppBar，汉堡菜单与右侧动作键均为黄色硬边小方块。',
    tips: '标题文字附带 TextStyle Shadow 产生立体雕刻感。',
    tags: ['AppBar', 'TopBar', '顶部栏'],
    interactivePreviewKey: 'preview-c23',
    code: `@Composable
fun UAppBar(
    title: String,
    modifier: Modifier = Modifier,
    onMenu: () -> Unit = {},
    actions: List<Pair<String, () -> Unit>> = emptyList(),
) {
    Row(
        modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(UColors.Blue)
            .border(4.dp, UColors.Yellow, RoundedCornerShape(14.dp))
            .padding(horizontal = 16.dp, vertical = 13.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        UAppBarIcon("☰", onClick = onMenu)
        Spacer(Modifier.width(12.dp))
        Text(title, color = Color.White, fontWeight = FontWeight.Black, fontSize = 16.sp,
            modifier = Modifier.weight(1f),
            style = TextStyle(shadow = Shadow(UColors.Pink, Offset(1f, 2f))))
        actions.forEach { (icon, cb) ->
            UAppBarIcon(icon, onClick = cb)
            Spacer(Modifier.width(8.dp))
        }
    }
}

@Composable
private fun UAppBarIcon(icon: String, onClick: () -> Unit) {
    Box(
        Modifier
            .size(36.dp)
            .clip(RoundedCornerShape(10.dp))
            .background(UColors.Yellow)
            .border(2.dp, UColors.Ink, RoundedCornerShape(10.dp))
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center
    ) {
        Text(icon, color = UColors.Ink, fontWeight = FontWeight.Black, fontSize = 15.sp)
    }
}`,
  },
  {
    id: 'c24',
    title: '24 · 列表项（图标 + 标题 + 副标题）',
    category: 'compose-nav',
    categoryName: '导航栏目 Navigation',
    language: 'compose',
    description: '圆角色块图标与主副文案的组合列表项，支持整行按压波纹反馈。',
    tips: '可在 LazyColumn 中配合 items(list) 遍历展示海量数据。',
    tags: ['ListItem', 'List', '列表项'],
    interactivePreviewKey: 'preview-c24',
    code: `@Composable
fun UListItem(
    icon: String,
    title: String,
    subtitle: String,
    modifier: Modifier = Modifier,
    iconBg: Color = UColors.Blue,
    onClick: () -> Unit = {},
) {
    Row(
        modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(horizontal = 16.dp, vertical = 13.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            Modifier
                .size(40.dp)
                .clip(RoundedCornerShape(10.dp))
                .background(iconBg),
            contentAlignment = Alignment.Center
        ) {
            Text(icon, color = Color.White, fontWeight = FontWeight.Black, fontSize = 16.sp)
        }
        Spacer(Modifier.width(12.dp))
        Text(title, color = Color(0xFF26303C), fontWeight = FontWeight.Bold, fontSize = 14.sp,
            modifier = Modifier.weight(1f))
        Text(subtitle, color = Color(0xFF9AA8B6), fontSize = 11.5.sp)
    }
}`,
  },
  {
    id: 'c25',
    title: '25 · 徽章 Badge（多色变体 + 可关闭叉号）',
    category: 'compose-nav',
    categoryName: '导航栏目 Navigation',
    language: 'compose',
    description: '带墨蓝实线描边的椭圆胶囊徽章，提供默认、粉色、蓝色等配色变体，支持可选 onClose 叉号点击。',
    tips: '关闭按钮通过 onClose 回调控制父层标签删除。',
    tags: ['Badge', 'Tag', '徽章'],
    interactivePreviewKey: 'preview-c25',
    code: `enum class BadgeVariant { Default, Pink, Blue }

@Composable
fun UBadge(
    text: String,
    modifier: Modifier = Modifier,
    variant: BadgeVariant = BadgeVariant.Default,
    onClose: (() -> Unit)? = null,
) {
    val bg = when (variant) {
        BadgeVariant.Default -> UColors.White
        BadgeVariant.Pink -> UColors.Pink
        BadgeVariant.Blue -> UColors.Blue
    }
    val fg = when (variant) {
        BadgeVariant.Default -> UColors.Ink
        BadgeVariant.Blue, BadgeVariant.Pink -> Color.White
    }
    Row(
        modifier
            .clip(CircleShape)
            .background(bg)
            .border(3.dp, UColors.Ink, CircleShape)
            .padding(horizontal = 12.dp, vertical = 5.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(6.dp)
    ) {
        Text(text, color = fg, fontWeight = FontWeight.Bold, fontSize = 12.sp)
        if (onClose != null) {
            Text("✕", color = fg.copy(alpha = .8f), fontSize = 12.sp, fontWeight = FontWeight.Black,
                modifier = Modifier.clickable(onClick = onClose))
        }
    }
}`,
  },

  // ===================== COMPOSE FEEDBACK =====================
  {
    id: 'c26',
    title: '26 · 对话框 Dialog（旋转弹出 + 遮罩）',
    category: 'compose-feedback',
    categoryName: '交互反馈 Feedback',
    language: 'compose',
    description: '弹出时伴随 scale 放大与 rotationZ 歪斜回正动画的警告确认弹窗。',
    tips: '带有全屏半透明黑色遮罩，点击外部亦可触发取消。',
    tags: ['Dialog', 'Modal', '弹出框'],
    interactivePreviewKey: 'preview-c26',
    code: `@Composable
fun UDialog(
    title: String,
    message: String,
    onCancel: () -> Unit,
    onOk: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val scale = remember { Animatable(0.5f) }
    val rotation = remember { Animatable(-8f) }
    LaunchedEffect(Unit) {
        scale.animateTo(1f, tween(350, easing = FastOutSlowInEasing))
        rotation.animateTo(0f, tween(300, easing = FastOutSlowInEasing))
    }
    // 全屏遮罩 + 居中
    Box(Modifier.fillMaxSize().background(Color.Black.copy(alpha = .5f)), contentAlignment = Alignment.Center) {
        HardShadow(
            modifier = modifier
                .width(300.dp)
                .graphicsLayer { scaleX = scale.value; scaleY = scale.value; rotationZ = rotation.value },
            shape = RoundedCornerShape(18.dp),
            shadowColor = UColors.Pink,
            background = UColors.Blue,
        ) {
            Column(Modifier.padding(20.dp)) {
                Text("⚠️ $title", color = UColors.Yellow, fontSize = 18.sp, fontWeight = FontWeight.Black)
                Spacer(Modifier.height(8.dp))
                Text(message, color = Color.White.copy(alpha = .85f), fontSize = 13.sp, lineHeight = 20.sp)
                Spacer(Modifier.height(16.dp))
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.End) {
                    Box(
                        Modifier
                            .clip(RoundedCornerShape(10.dp))
                            .background(UColors.Track)
                            .clickable(onClick = onCancel)
                            .padding(horizontal = 16.dp, vertical = 9.dp)
                    ) { Text("取消", color = UColors.Ink, fontWeight = FontWeight.Bold, fontSize = 13.sp) }
                    Spacer(Modifier.width(10.dp))
                    HardShadow(
                        shape = RoundedCornerShape(10.dp),
                        shadowColor = UColors.White,
                        background = UColors.Pink,
                    ) {
                        Box(Modifier.clickable(onClick = onOk).padding(horizontal = 18.dp, vertical = 9.dp)) {
                            Text("确定", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                        }
                    }
                }
            }
        }
    }
}`,
  },
  {
    id: 'c27',
    title: '27 · Toast 提示（横滑飞入动效）',
    category: 'compose-feedback',
    categoryName: '交互反馈 Feedback',
    language: 'compose',
    description: '通过 offset.x 从屏幕右侧飞入并微带倾斜入场的悬浮 Toast。',
    tips: '可配合 LaunchedEffect + delay(2500) 自动消隐。',
    tags: ['Toast', 'Snackbar', '提示框'],
    interactivePreviewKey: 'preview-c27',
    code: `@Composable
fun UToast(
    text: String,
    modifier: Modifier = Modifier,
) {
    val offsetX = remember { Animatable(400f) }
    LaunchedEffect(Unit) { offsetX.animateTo(0f, tween(400, easing = FastOutSlowInEasing)) }
    HardShadow(
        modifier = modifier
            .fillMaxWidth()
            .offset(x = offsetX.value.dp)
            .graphicsLayer { rotationZ = offsetX.value * 0.01f },
        shape = RoundedCornerShape(14.dp),
        shadowColor = UColors.Pink,
        background = UColors.Ink,
    ) {
        Row(Modifier.padding(horizontal = 16.dp, vertical = 13.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(
                Modifier.size(32.dp).clip(CircleShape).background(UColors.Pink),
                contentAlignment = Alignment.Center
            ) { Text("✓", color = Color.White, fontWeight = FontWeight.Black) }
            Spacer(Modifier.width(10.dp))
            Text(text, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 13.sp)
        }
    }
}`,
  },
  {
    id: 'c28',
    title: '28 · 空状态 EmptyState（卡通角色摇头动效）',
    category: 'compose-feedback',
    categoryName: '交互反馈 Feedback',
    language: 'compose',
    description: '可爱的摇头动效与行动号召按钮，常用于收藏夹为空、搜索无结果等场景。',
    tips: '摇头动效使用 tween(800) + RepeatMode.Reverse。',
    tags: ['EmptyState', '空状态', '插画动效'],
    interactivePreviewKey: 'preview-c28',
    code: `@Composable
fun UEmptyState(
    emoji: String = "🐻",
    title: String = "还没有收藏哦",
    desc: String = "去逛逛组件库吧～",
    actionText: String = "去逛逛 🚀",
    modifier: Modifier = Modifier,
    onAction: () -> Unit = {},
) {
    val rotation = rememberInfiniteTransition().animateFloat(
        initialValue = -5f, targetValue = 5f,
        animationSpec = infiniteRepeatable(tween(800), RepeatMode.Reverse)
    )
    Column(modifier.fillMaxWidth().padding(vertical = 26.dp), horizontalAlignment = Alignment.CenterHorizontally) {
        Text(emoji, fontSize = 64.sp, modifier = Modifier.graphicsLayer { rotationZ = rotation.value })
        Spacer(Modifier.height(10.dp))
        Text(title, color = UColors.Ink, fontWeight = FontWeight.Black, fontSize = 16.sp)
        Spacer(Modifier.height(5.dp))
        Text(desc, color = Color(0xFF9AA8B6), fontSize = 12.5.sp)
        Spacer(Modifier.height(14.dp))
        Box(
            Modifier
                .clip(RoundedCornerShape(12.dp))
                .background(UColors.Blue)
                .border(3.dp, UColors.Yellow, RoundedCornerShape(12.dp))
                .clickable(onClick = onAction)
                .padding(horizontal = 22.dp, vertical = 11.dp)
        ) {
            Text(actionText, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 13.sp)
        }
    }
}`,
  },

  // ===================== COMPOSE FORMS =====================
  {
    id: 'c29',
    title: '29 · 登录表单（Novaxlo 经典款蓝黄组合）',
    category: 'compose-forms',
    categoryName: '经典表单 Forms',
    language: 'compose',
    description: '完整还原经典款：蓝底、右上橙黄大圆角块、顶部标题栏、右下角大圆角粗边输入框组与玫粉登录按钮。',
    tips: '适合用作极具个性风格的独立登录页或卡片式弹窗。',
    tags: ['LoginForm', 'Form', '登录表单'],
    interactivePreviewKey: 'preview-c29',
    code: `@Composable
fun ULoginForm(
    modifier: Modifier = Modifier,
    onLogin: (username: String, email: String, password: String) -> Unit = { _, _, _ -> },
) {
    var username by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Box(
        modifier
            .width(260.dp)
            .background(UColors.Blue)
            .border(5.dp, UColors.Yellow),
        contentAlignment = Alignment.TopCenter
    ) {
        // 右上橙色圆角块
        Box(
            Modifier
                .align(Alignment.TopEnd)
                .size(72.dp)
                .clip(RoundedCornerShape(topEnd = 0.dp, bottomEnd = 40.dp))
                .background(UColors.Yellow)
        )
        Column {
            // 标题区
            Row(
                Modifier
                    .fillMaxWidth()
                    .height(64.dp)
                    .background(UColors.Yellow)
                    .padding(end = 12.dp),
                horizontalArrangement = Arrangement.End,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("登录", color = UColors.Blue, fontSize = 20.sp, fontWeight = FontWeight.Bold,
                    style = TextStyle(shadow = Shadow(UColors.Pink, Offset(0f, 2f))))
            }
            // 输入区
            Column(
                Modifier.padding(horizontal = 10.dp, vertical = 12.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                NovaxloInput(username, { username = it }, "用户名")
                NovaxloInput(email, { email = it }, "邮箱")
                NovaxloInput(password, { password = it }, "密码", isPassword = true)
            }
            // 登录按钮
            Box(
                Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 10.dp)
                    .height(48.dp)
                    .clip(RoundedCornerShape(topStart = 10.dp, topEnd = 10.dp, bottomEnd = 30.dp))
                    .background(UColors.Pink)
                    .clickable { onLogin(username, email, password) },
                contentAlignment = Alignment.CenterStart
            ) {
                Text("登录", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 16.sp,
                    modifier = Modifier.padding(start = 14.dp))
            }
            // 忘记密码
            Row(
                Modifier
                    .fillMaxWidth()
                    .padding(top = 8.dp, bottom = 12.dp, end = 12.dp),
                horizontalArrangement = Arrangement.End
            ) {
                Text("忘记密码？", color = UColors.Yellow, fontSize = 12.sp, fontWeight = FontWeight.Bold,
                    modifier = Modifier.clickable { })
            }
        }
    }
}

@Composable
private fun NovaxloInput(
    value: String,
    onValueChange: (String) -> Unit,
    placeholder: String,
    isPassword: Boolean = false,
) {
    Box(Modifier.fillMaxWidth()) {
        Box(
            Modifier
                .matchParentSize()
                .clip(RoundedCornerShape(8.dp))
                .background(UColors.Blue)
        )
        Canvas(Modifier.matchParentSize()) {
            val stroke = 5.dp.toPx()
            val cr = 24.dp.toPx()
            val w = size.width; val h = size.height
            drawArc(UColors.Pink, 0f, 90f, false,
                Offset(w - 2 * cr, h - 2 * cr), Size(2 * cr, 2 * cr), style = Stroke(stroke))
            drawLine(UColors.Pink, Offset(w - stroke / 2, 0f), Offset(w - stroke / 2, h - 2 * cr + stroke), stroke)
            drawLine(UColors.Pink, Offset(w - 2 * cr + stroke, h - stroke / 2), Offset(0f, h - stroke / 2), stroke)
        }
        BasicTextField(
            value = value,
            onValueChange = onValueChange,
            modifier = Modifier.fillMaxWidth().padding(start = 12.dp, end = 16.dp, top = 10.dp, bottom = 10.dp),
            textStyle = TextStyle(color = UColors.Pink, fontWeight = FontWeight.Bold, fontSize = 14.sp),
            cursorBrush = SolidColor(UColors.Pink),
            visualTransformation = if (isPassword) PasswordVisualTransformation() else VisualTransformation.None,
            decorationBox = { inner ->
                if (value.isEmpty()) Text(placeholder, color = Color(0xFF8FC3E8), fontSize = 14.sp, fontWeight = FontWeight.Bold)
                inner()
            }
        )
    }
}`,
  },
  {
    id: 'c30',
    title: '30 · 设置表单行（带图标与右侧小箭头）',
    category: 'compose-forms',
    categoryName: '经典表单 Forms',
    language: 'compose',
    description: '通用的 App 设置项行，包含左侧表情/图标、中间标题与右侧箭头。',
    tips: '可包裹在 Column 中，配合 verticalArrangement = Arrangement.spacedBy(12.dp) 构建设置页。',
    tags: ['SettingRow', 'Settings', '设置页'],
    interactivePreviewKey: 'preview-c30',
    code: `@Composable
fun USettingRow(
    icon: String,
    title: String,
    modifier: Modifier = Modifier,
    onClick: () -> Unit = {},
) {
    Row(
        modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(UColors.White)
            .border(4.dp, UColors.Ink, RoundedCornerShape(14.dp))
            .clickable(onClick = onClick)
            .padding(horizontal = 15.dp, vertical = 13.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(icon, fontSize = 22.sp)
        Spacer(Modifier.width(12.dp))
        Text(title, color = Color(0xFF26303C), fontWeight = FontWeight.Bold, fontSize = 14.sp, modifier = Modifier.weight(1f))
        Text("›", color = Color(0xFF9AA8B6), fontWeight = FontWeight.Black, fontSize = 18.sp)
    }
}`,
  },

  // ===================== KOTLIN COROUTINES =====================
  {
    id: 'kt-coroutine-01',
    title: 'StateFlow 与 SharedFlow 生产级 ViewModel 状态封装',
    category: 'kotlin-coroutine',
    categoryName: '协程与 Flow',
    language: 'kotlin',
    description: '采用不可变暴露原则（UIState + SingleLiveEvent 替代方案），避免 UI 层越权修改内部状态。',
    tips: 'asStateFlow() 与 asSharedFlow() 属于零开销类型擦除，可安全暴露给 Compose 中的 collectAsStateWithLifecycle()。',
    tags: ['Flow', 'StateFlow', 'SharedFlow', 'ViewModel', '协程'],
    interactivePreviewKey: 'preview-kt-flow',
    code: `import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

// 1. UI 渲染不可变数据契约
data class UserUiState(
    val isLoading: Boolean = false,
    val userName: String = "",
    val items: List<String> = emptyList(),
    val errorMessage: String? = null
)

// 2. 单次一次性事件（如弹 Toast、页面跳转）
sealed interface UiEvent {
    data class ShowToast(val message: String) : UiEvent
    data class NavigateToDetail(val id: String) : UiEvent
}

class UserViewModel : ViewModel() {

    // 内部可写，对外只读
    private val _uiState = MutableStateFlow(UserUiState())
    val uiState = _uiState.asStateFlow()

    private val _eventFlow = MutableSharedFlow<UiEvent>()
    val eventFlow = _eventFlow.asSharedFlow()

    fun loadUserData(userId: String) {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, errorMessage = null) }
            try {
                // 模拟网络请求或本地数据库异步拉取
                kotlinx.coroutines.delay(1000)
                _uiState.update {
                    it.copy(
                        isLoading = false,
                        userName = "Android Developer",
                        items = listOf("Compose", "Coroutines", "Room", "DataStore")
                    )
                }
                _eventFlow.emit(UiEvent.ShowToast("数据加载成功！"))
            } catch (e: Exception) {
                _uiState.update { it.copy(isLoading = false, errorMessage = e.localizedMessage) }
            }
        }
    }
}`,
  },
  {
    id: 'kt-coroutine-02',
    title: '协程防抖 debounceClick 与高频点击拦截',
    category: 'kotlin-coroutine',
    categoryName: '协程与 Flow',
    language: 'kotlin',
    description: '防止用户连续多次快速点击按钮导致重复开启 Activity 或重复发起 POST 请求的 Compose Modifier 扩展。',
    tips: '比基于 System.currentTimeMillis() 更适合处理复杂异步触发流。',
    tags: ['Debounce', 'Modifier', 'Click', '防抖扩展'],
    interactivePreviewKey: 'preview-kt-debounce',
    code: `import androidx.compose.foundation.clickable
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.channels.BufferOverflow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.debounce
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach

@Composable
fun Modifier.debounceClickable(
    debounceMs: Long = 500L,
    coroutineScope: CoroutineScope,
    onClick: () -> Unit
): Modifier {
    val clickFlow = remember {
        MutableSharedFlow<Unit>(
            extraBufferCapacity = 1,
            onBufferOverflow = BufferOverflow.DROP_OLDEST
        )
    }

    remember(clickFlow) {
        clickFlow
            .debounce(debounceMs)
            .onEach { onClick() }
            .launchIn(coroutineScope)
    }

    return this.clickable {
        clickFlow.tryEmit(Unit)
    }
}`,
  },

  // ===================== ANDROID ARCH & STORAGE =====================
  {
    id: 'arch-room-01',
    title: 'Room 数据库标准配置（Entity + DAO + TypeConverter）',
    category: 'android-arch',
    categoryName: '架构与存储 Arch',
    language: 'kotlin',
    description: '包含协程挂起函数查询、Flow 响应式观察、主键自动递增的现代化 SQLite 封装。',
    tips: '导出 schema 建议为 false (exportSchema = false) 除非做复杂数据迁移。',
    tags: ['Room', 'Database', 'DAO', 'Entity', '本地存储'],
    interactivePreviewKey: 'preview-arch-room',
    code: `import androidx.room.*
import kotlinx.coroutines.flow.Flow

// 1. 实体表定义
@Entity(tableName = "snippets_table")
data class SnippetEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val title: String,
    val category: String,
    val codeContent: String,
    val isFavorite: Boolean = false,
    val createTime: Long = System.currentTimeMillis()
)

// 2. 数据访问对象
@Dao
interface SnippetDao {
    @Query("SELECT * FROM snippets_table ORDER BY createTime DESC")
    fun getAllSnippets(): Flow<List<SnippetEntity>>

    @Query("SELECT * FROM snippets_table WHERE isFavorite = 1")
    fun getFavorites(): Flow<List<SnippetEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSnippet(snippet: SnippetEntity): Long

    @Delete
    suspend fun deleteSnippet(snippet: SnippetEntity)

    @Query("UPDATE snippets_table SET isFavorite = :isFav WHERE id = :id")
    suspend fun updateFavorite(id: Long, isFav: Boolean)
}

// 3. 数据库入口
@Database(entities = [SnippetEntity::class], version = 1, exportSchema = false)
abstract class AppDatabase : RoomDatabase() {
    abstract fun snippetDao(): SnippetDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getInstance(context: android.content.Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "app_database.db"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}`,
  },
  {
    id: 'arch-datastore-01',
    title: 'Jetpack DataStore (Preferences) 替代 SharedPreferences',
    category: 'android-arch',
    categoryName: '架构与存储 Arch',
    language: 'kotlin',
    description: 'Google 官方推荐的完全异步、基于协程与 Flow 的轻量偏好数据存储方案，规避 ANR 隐患。',
    tips: '无需使用 apply() 或 commit()，完全采用原子协程事务更新。',
    tags: ['DataStore', 'Preferences', 'KV存储'],
    interactivePreviewKey: 'preview-arch-datastore',
    code: `import android.content.Context
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

// 顶层代理拓展
val Context.dataStore by preferencesDataStore(name = "user_preferences")

class PreferenceManager(private val context: Context) {

    companion object {
        val KEY_THEME = stringPreferencesKey("theme_mode")
        val KEY_AUTO_COPY = booleanPreferencesKey("auto_copy_on_click")
    }

    // 读取响应式数据流
    val themeFlow: Flow<String> = context.dataStore.data.map { preferences ->
        preferences[KEY_THEME] ?: "dark-frost"
    }

    // 写入配置
    suspend fun saveTheme(theme: String) {
        context.dataStore.edit { preferences ->
            preferences[KEY_THEME] = theme
        }
    }

    suspend fun toggleAutoCopy(enabled: Boolean) {
        context.dataStore.edit { preferences ->
            preferences[KEY_AUTO_COPY] = enabled
        }
    }
}`,
  },

  // ===================== ANDROID SYSTEM & PERMISSIONS =====================
  {
    id: 'sys-perm-01',
    title: 'Android 13/14 动态权限与 ActivityResultContracts',
    category: 'android-system',
    categoryName: '权限与系统 System',
    language: 'kotlin',
    description: '无需任何第三方庞大依赖，使用 AndroidX 原生 registerForActivityResult 请求单权限与多权限数组。',
    tips: 'Android 13 (API 33) 需使用 READ_MEDIA_IMAGES 替代原 READ_EXTERNAL_STORAGE。',
    tags: ['Permissions', 'ActivityResult', 'Android13', '权限管理'],
    interactivePreviewKey: 'preview-sys-perm',
    code: `import android.Manifest
import android.os.Build
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.result.contract.ActivityResultContracts

class MainActivity : ComponentActivity() {

    // 1. 请求单权限（如相机）
    private val requestCameraLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (isGranted) {
            openCamera()
        } else {
            Toast.makeText(this, "相机权限被拒绝，无法拍照", Toast.LENGTH_SHORT).show()
        }
    }

    // 2. 请求媒体相册权限（兼容 Android 13+ 细分权限）
    private val requestMediaLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val imageGranted = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            permissions[Manifest.permission.READ_MEDIA_IMAGES] == true
        } else {
            permissions[Manifest.permission.READ_EXTERNAL_STORAGE] == true
        }

        if (imageGranted) {
            Toast.makeText(this, "媒体读取权限已获得", Toast.LENGTH_SHORT).show()
        }
    }

    fun checkAndRequest() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            requestMediaLauncher.launch(arrayOf(Manifest.permission.READ_MEDIA_IMAGES))
        } else {
            requestMediaLauncher.launch(arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE))
        }
    }

    private fun openCamera() { /* 业务逻辑 */ }
}`,
  },
  {
    id: 'sys-photopicker-01',
    title: 'PhotoPicker 原生相册选择器（无需任何权限！）',
    category: 'android-system',
    categoryName: '权限与系统 System',
    language: 'kotlin',
    description: 'Google 在 Android 11+ 推出的隐私安全图片选择器，无需在 Manifest 申请任何存储权限即可选取相册照片。',
    tips: '完美解决各大应用市场对读取相册所有照片权限的严苛审核。',
    tags: ['PhotoPicker', 'ImagePicker', '免权限', '相册选择'],
    interactivePreviewKey: 'preview-sys-photopicker',
    code: `import androidx.activity.ComponentActivity
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts

class PhotoSelectActivity : ComponentActivity() {

    // 1. 注册单选图片合同
    val pickMedia = registerForActivityResult(
        ActivityResultContracts.PickVisualMedia()
    ) { uri ->
        if (uri != null) {
            // 获取到所选图片的 content:// URI
            android.util.Log.d("PhotoPicker", "选中的图片 URI: $uri")
        }
    }

    // 2. 触发选择器（支持仅图片、仅视频或全部）
    fun launchPhotoPicker() {
        pickMedia.launch(
            PickVisualMediaRequest(
                ActivityResultContracts.PickVisualMedia.ImageOnly
            )
        )
    }
}`,
  },

  // ===================== ANDROID UTILS =====================
  {
    id: 'util-ext-01',
    title: 'Android 核心开发扩展函数集合（Dp/Px、Toast、剪贴板）',
    category: 'android-utils',
    categoryName: '常用工具 Utils',
    language: 'kotlin',
    description: '日常 Android 开发必备的高频极简 Kotlin Extensions 集合，包含 dp 转 px、Toast 快速调用、复制文本到系统剪贴板。',
    tips: '建议放入 CommonExt.kt 中作为全局顶层函数使用。',
    tags: ['Extensions', 'DpPx', 'Toast', 'Clipboard', '工具类'],
    interactivePreviewKey: 'preview-util-ext',
    code: `import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.res.Resources
import android.util.TypedValue
import android.widget.Toast

// 1. 尺寸转换扩展
val Number.dpToPx: Float
    get() = TypedValue.applyDimension(
        TypedValue.COMPLEX_UNIT_DIP,
        this.toFloat(),
        Resources.getSystem().displayMetrics
    )

val Number.spToPx: Float
    get() = TypedValue.applyDimension(
        TypedValue.COMPLEX_UNIT_SP,
        this.toFloat(),
        Resources.getSystem().displayMetrics
    )

// 2. Toast 快捷弹出
fun Context.showToast(message: CharSequence, duration: Int = Toast.LENGTH_SHORT) {
    Toast.makeText(this, message, duration).show()
}

// 3. 复制文本到剪贴板
fun Context.copyToClipboard(text: String, label: String = "AppClip") {
    val clipboard = getSystemService(Context.CLIPBOARD_SERVICE) as? ClipboardManager
    val clip = ClipData.newPlainText(label, text)
    clipboard?.setPrimaryClip(clip)
    showToast("已成功复制到剪贴板")
}`,
  },
  {
    id: 'util-network-01',
    title: '网络状态实时监听 NetworkStateObserver (Flow 封装)',
    category: 'android-utils',
    categoryName: '常用工具 Utils',
    language: 'kotlin',
    description: '基于 ConnectivityManager.NetworkCallback 与 callbackFlow 实现的实时网络畅通/断开监听。',
    tips: '在 Compose 中只需 observeAsState() 即可实现全页面无网络提示条。',
    tags: ['Network', 'Flow', 'ConnectivityManager', '网络监听'],
    interactivePreviewKey: 'preview-util-network',
    code: `import android.content.Context
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.net.NetworkRequest
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow

sealed interface NetworkStatus {
    object Available : NetworkStatus
    object Lost : NetworkStatus
}

class NetworkObserver(context: Context) {
    private val cm = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

    fun observe(): Flow<NetworkStatus> = callbackFlow {
        val callback = object : ConnectivityManager.NetworkCallback() {
            override fun onAvailable(network: Network) {
                trySend(NetworkStatus.Available)
            }
            override fun onLost(network: Network) {
                trySend(NetworkStatus.Lost)
            }
        }

        val request = NetworkRequest.Builder()
            .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
            .build()

        cm.registerNetworkCallback(request, callback)

        awaitClose {
            cm.unregisterNetworkCallback(callback)
        }
    }
}`,
  },

  // ===================== 50+ 动效更新弹窗 =====================
  ...UPDATE_DIALOG_SNIPPETS
];
