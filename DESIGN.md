---
name: Tomoyo Design
description: 以丝网套色的纸面、油墨和精确注释，呈现可体验的界面效果。
colors:
  paper: '#f7e8d8'
  ink: '#08297e'
  blue: '#0840b1'
  vermilion: '#f74822'
  copy-vermilion-p3: 'color(display-p3 0.97 0.283 0.135)'
  action-paper: '#fff9ef'
  active-peach: '#ff986e'
  quiet-blue: '#a8c3e0'
  registration-blue: '#aec8ea'
  control-border: '#426aa7'
  divider: '#7481a5'
  step-vermilion: '#ad321a'
  error: '#96301f'
  field-surface: 'rgb(255 249 239 / 45%)'
  glass-surface: 'rgba(247, 232, 216, 0.86)'
  glass-border: 'rgb(255 249 239 / 70%)'
  range-track: '#c5bec0'
  choice-surface: '#e8d9cc'
typography:
  display:
    fontFamily: 'Anton, sans-serif'
    fontSize: 'calc(94 * var(--unit))'
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: '-0.035em'
  headline:
    fontFamily: 'Oswald, sans-serif'
    fontSize: 'calc(52 * var(--unit))'
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: '-0.035em'
  title:
    fontFamily: 'Oswald, sans-serif'
    fontSize: 'calc(34 * var(--unit))'
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: '0.005em'
  step-title:
    fontFamily: 'Oswald, sans-serif'
    fontSize: '28px'
    fontWeight: 600
  body:
    fontFamily: 'Roboto Mono, monospace'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: 1.8
  sample-body:
    fontFamily: 'Roboto Mono, monospace'
    fontSize: 'calc(17 * var(--unit))'
    fontWeight: 400
    lineHeight: 1.35
  label:
    fontFamily: 'Roboto Mono, monospace'
    fontSize: 'calc(14 * var(--unit))'
    fontWeight: 600
  annotation:
    fontFamily: 'Roboto Mono, monospace'
    fontSize: 'calc(12 * var(--unit))'
    fontWeight: 400
    lineHeight: 1.25
  preset-name:
    fontFamily: 'Roboto Mono, monospace'
    fontSize: 'calc(21 * var(--unit))'
    fontWeight: 400
    lineHeight: 1.3
  prompt-summary:
    fontFamily: 'Roboto Mono, monospace'
    fontSize: 'calc(17 * var(--unit))'
    fontWeight: 400
    lineHeight: 1.4
  prompt-text:
    fontFamily: 'Roboto Mono, monospace'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: 1.7
  copy-action:
    fontFamily: 'Roboto Mono, monospace'
    fontSize: 'max(19px, calc(19 * var(--unit)))'
    fontWeight: 700
    letterSpacing: '-0.04em'
  secondary-action:
    fontFamily: 'Roboto Mono, monospace'
    fontSize: 'calc(16 * var(--unit))'
    fontWeight: 400
  display-zh:
    fontFamily: 'Noto Sans SC, sans-serif'
    fontSize: 'calc(78 * var(--unit))'
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: '-0.03em'
  headline-zh:
    fontFamily: 'Noto Sans SC, sans-serif'
    fontSize: 'calc(35 * var(--unit))'
    fontWeight: 900
    lineHeight: 1.3
    letterSpacing: '-0.02em'
  title-zh:
    fontFamily: 'Noto Sans SC, sans-serif'
    fontSize: 'calc(34 * var(--unit))'
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: '-0.02em'
  guide-display-zh:
    fontFamily: 'Noto Sans SC, sans-serif'
    fontSize: 'clamp(36px, 4.2vw, 66px)'
    fontWeight: 900
    lineHeight: 1.3
    letterSpacing: '-0.025em'
  body-zh:
    fontFamily: 'Noto Sans SC, sans-serif'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: 1.8
  sample-body-zh:
    fontFamily: 'Noto Sans SC, sans-serif'
    fontSize: 'calc(17 * var(--unit))'
    fontWeight: 400
    lineHeight: 1.7
  prompt-text-zh:
    fontFamily: 'Noto Sans SC, sans-serif'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: 1.7
  copy-action-zh:
    fontFamily: 'Noto Sans SC, sans-serif'
    fontSize: 'max(19px, calc(19 * var(--unit)))'
    fontWeight: 700
    letterSpacing: '-0.04em'
  language-label:
    fontFamily: 'Roboto Mono, monospace'
    fontSize: '12px'
    fontWeight: 600
  prompt-language-label:
    fontFamily: 'Roboto Mono, monospace'
    fontSize: '13px'
    fontWeight: 400
  field-number:
    fontFamily: 'Roboto Mono, monospace'
    fontSize: '12px'
rounded:
  mark: '4px'
  control: '5px'
  field: '6px'
  choice-group: '7px'
  reference-outline: '8px'
  specimen-compact: '12px'
  specimen: '14px'
  circle: '50%'
spacing:
  tight: '8px'
  control-gap: '10px'
  related: '12px'
  compact: '16px'
  page-compact: '20px'
  section: '24px'
  page-tablet: '28px'
  loose: '32px'
  specimen-inset: 'calc(33 * var(--unit))'
  page-wide: '40px'
components:
  button-copy:
    backgroundColor: '{colors.copy-vermilion-p3}'
    textColor: '{colors.action-paper}'
    typography: '{typography.copy-action}'
    rounded: '{rounded.control}'
    padding: '0 calc(7 * var(--unit))'
    height: 'calc(52 * var(--unit))'
    width: 'calc(174 * var(--unit))'
  button-replay:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    typography: '{typography.secondary-action}'
    rounded: '{rounded.control}'
    padding: '0 calc(18 * var(--unit))'
    height: 'calc(52 * var(--unit))'
    width: 'calc(150 * var(--unit))'
  button-replay-hover:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
  button-text:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    padding: '0'
  prompt-summary:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    typography: '{typography.prompt-summary}'
    rounded: '{rounded.control}'
    padding: 'calc(11 * var(--unit)) calc(17 * var(--unit))'
    height: 'calc(51 * var(--unit))'
  prompt-textarea:
    backgroundColor: '{colors.field-surface}'
    textColor: '{colors.ink}'
    typography: '{typography.prompt-text}'
    rounded: '{rounded.control}'
    padding: '20px'
    width: '100%'
  navigation:
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    padding: '12px 0'
  language-switch:
    textColor: '{colors.ink}'
    typography: '{typography.language-label}'
    padding: '0 4px'
  select-field:
    backgroundColor: '{colors.action-paper}'
    textColor: '{colors.ink}'
    rounded: '{rounded.field}'
    padding: '8px 34px 8px 12px'
  number-field:
    backgroundColor: '{colors.action-paper}'
    textColor: '{colors.ink}'
    typography: '{typography.field-number}'
    rounded: '{rounded.field}'
    padding: '0 9px'
  range-control:
    backgroundColor: 'transparent'
    height: '32px'
    width: '100%'
  choice-group:
    backgroundColor: '{colors.choice-surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.choice-group}'
    padding: '3px'
  choice-option:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    rounded: '{rounded.mark}'
    padding: '6px 8px'
  choice-option-selected:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.action-paper}'
  effect-preset:
    backgroundColor: 'transparent'
    textColor: '{colors.paper}'
    typography: '{typography.preset-name}'
    padding: '0'
  sample-hit-area:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    rounded: '{rounded.specimen}'
    padding: '0'
  sample-card:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    rounded: '{rounded.specimen}'
    padding: '{spacing.specimen-inset}'
  sample-card-compact:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    rounded: '{rounded.specimen-compact}'
    padding: '18px'
  sample-card-glass:
    backgroundColor: '{colors.glass-surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.specimen}'
    padding: '{spacing.specimen-inset}'
---

# Design System: Tomoyo Design

## Overview

**Creative North Star: "丝网套色 / Screenprint Overprint"**

暖奶油纸面承接群青油墨，朱红标记让操作和当前状态清楚可见。英文以压缩粗体建立远近层次，等宽文字像印刷样本旁的准确注释；中文以本地黑体的重量和独立字阶延续同一层次。材质来自经批准的纸纹、蓝色油墨与海岸图像；文字和控件保持真实、可选择、可操作。

这套语言服务于「看见效果、找到描述、用于自己的项目」：效果可以有触感和运动，说明与操作则保持稳定。它以第一版首页为实证，后续页面继承颜色、字体关系、材料和状态规则；原首页的画布位置、三栏分类与首屏顺序保留在[首页设计简报](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/homepage-design-brief.md)。当前首页、目录与详情构图以[体验升级简报](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/experience-upgrade-brief.md)为准，均不构成所有页面的固定模板。

**Key Characteristics:**

- 奶油纸与深蓝油墨形成稳定的阅读底色。
- 朱红动作、浅暖色选中编号与细蓝线共同表达状态。
- 英文的 Anton、Oswald、Roboto Mono 与中文的 Noto Sans SC 各有明确职责。
- 真实栅格纹理带来印刷触感，语义文字和几何图标保持清晰。
- 演示动效局限于当前示例；首页只有资源仍需等待才显示活字加载，快速就绪直接显示内容，滚动与语言过渡延续同一节奏。

本文件从 `styles/tokens.css`、`styles/base.css`、`features/home/styles/`、`features/home/motion/`、`features/home/effects/`、`components/navigation/`、`components/motion/`，以及 `app/[locale]/layout.tsx`、`content/home-effects.ts`、`content/motion-studies.ts`、`content/locales/` 提取。本轮仅根据 `components/ui/fields.css`、共享字段组件、`content/effects/`、`components/effects/` 和路径过渡实现补充公共规则，不重建既有视觉身份。语言与 URL 状态共用 `lib/navigation/`，预览比较栏位于 `features/motion-preview/`。frontmatter 是颜色、排版、圆角、间距及组件基础属性的规范；`.impeccable/design.json` 补充阴影、动效、断点和组件片段。sidecar 色阶仅供面板观察，不是已实现的新色彩 token。

## Colors

调色以纸、群青和朱红的套印关系为主，辅助蓝灰线条让密集说明与控件保持秩序。

### Primary

- **群青舞台 — `blue`：** 大面积预览底色，与纸色卡片形成明确前后层次。
- **深蓝油墨 — `ink`：** 正文、标题、导航、轮廓及文本选择底色。

### Secondary

- **朱红印记 — `vermilion`：** 主要动作的兼容底色、纸面焦点环、编号、短标记与印刷外框。
- **广色域朱红 — `copy-vermilion-p3`：** Copy 的实际背景；CSS 先声明 `vermilion` 作为不支持 Display P3 时的回退。
- **浅暖选中编号 — `active-peach`：** 蓝底已选预设的编号。短选中线仍用朱红，避免把小号状态文字直接套用动作底色。
- **深朱红步骤号 — `step-vermilion`：** 纸面使用说明的数字。
- **错误砖红 — `error`：** 复制失败说明；同时提供可读错误文本和手动选文路径。

### Neutral

- **奶油纸 — `paper`：** 页面与默认卡片；也用于蓝底文字与蓝底焦点环。
- **浅纸白 — `action-paper`：** Copy 文字、几何图标与共享数字、下拉字段底色。
- **退后蓝 — `quiet-blue`：** 未选编号和细短线；**套准浅蓝 — `registration-blue`：** 贯穿画布的套准线及虚线参照框。
- **控件蓝边 — `control-border`：** 摘要、Replay 与宽屏分类分隔；**蓝灰分隔 — `divider`：** 折叠区、步骤和紧凑分类之间的线条。
- **半透明字段纸 — `field-surface`：** 提示词文本域；**玻璃纸 — `glass-surface`** 与 **玻璃亮边 — `glass-border`：** Frosted glass 的表面与不占布局空间的描边。
- **滑轨灰 — `range-track`：** 数值滑块尚未经过的轨道；**选项纸底 — `choice-surface`：** 分段单选组的承托面。两者限定在共享参数控件中，选中项继续使用深蓝与浅纸白。

**The Two Inks Rule.** 群青承担主体与预览，朱红承担动作、索引和有意义的标记；蓝底选中编号使用更亮的暖色，不能直接以装饰色替代可读的状态文字。

## Typography

**Display Font:** Anton（400；sans-serif 回退）。  
**Heading Font:** Oswald（可变字重 200–700；当前标题主要用 600、700；sans-serif 回退）。  
**Body / Label Font:** Roboto Mono（可变字重 100–700；当前主要用 400、600、700；monospace 回退）。  
**Chinese Font:** Noto Sans SC（可变字重 400–900；中文标题主要用 900；sans-serif 回退）。

四者通过 `next/font/local` 自托管并采用 `display: swap`。源文件与各自 OFL 许可位于 `public/fonts/`。Noto Sans SC 使用本地 WOFF2 字符子集，不预加载；字形集合与维护方式见 [字体说明](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/public/fonts/README.md)。扩充中文文案时同步扩充子集，未覆盖字符仍有系统中文字体回退。压缩标题提供体量，等宽文字提供精确感；不使用系统字体充当主要展示字体。

### Hierarchy

- **Display：** frontmatter 的 `display` 为宽屏分类标题。使用说明大标题另用流体字号（`clamp(48px, 5.1vw, 82px)`）、行高（1.06）与字距（-0.025em）。
- **Headline：** 示例卡片标题使用 `headline`。桌面两列场景保留明确换行；紧凑模式为流体字号（`clamp(36px, 8.4vw, 52px)`）、行高（0.98），最窄断点降至（32px）。
- **Title：** `title` 对应样张标题；`step-title` 对应说明步骤。编号用 Oswald 与对应标题相呼应。
- **Body：** 说明段落使用 `body`，步骤内容最大行长（60ch）；引言为（15px / 1.8），最大行长（43ch）。预览正文使用独立的 `sample-body`，紧凑模式转为（14px / 1.6），手机为（13px / 1.55）。
- **Label / Annotation：** 标签、导航、索引和注释使用等宽字体；大写只出现在已有的短标签和说明中，不将长段正文全部大写。
- **Copy action：** 使用 `copy-action` 的加粗字号下限，确保朱红底上的主行动可读；不要把它缩回普通次要按钮字号。
- **Chinese display / headline：** 中文分类、示例、样张标题分别使用 `display-zh`、`headline-zh`、`title-zh`；使用说明大标题使用 `guide-display-zh`。平板分类为（64px）、示例标题为（30px）；紧凑分类为（56px）、示例标题为（`clamp(26px, 6vw, 36px)`），样张标题为（28px / 1.35）。中文预览正文的紧凑字号为（15px），行高保持（1.7）。
- **Chinese controls / prompt：** 中文页面的正文、操作与标签继承 Noto Sans SC；英文长文仍用 Roboto Mono。提示词文本域根据自身 `lang` 选择字体，独立于界面语言。数字与拉丁字标保留 Oswald，避免整页的层次因语言切换而改变。

**The Type Roles Rule.** 英文以 Anton 建立展示体量、Oswald 承担标题和编号、Roboto Mono 承担正文与注释；中文由 Noto Sans SC 接续标题、正文与控件，数字和拉丁字标仍用 Oswald。字体分工比单页的字号位置更值得继承。

## Layout

页面使用根目录业务结构，不依赖组件库的默认栅格。当前宽屏样张以设计宽度（1586px）进行比例换算：`--unit: calc(min(100vw, 1800px) / 1586)`；外层最大宽度（1800px），居中。frontmatter 中含 `--unit` 的值属于这套宽屏样张量度，不应在未定义变量的容器内直接使用。

首页的实际断点如下。新页面按内容选用这些响应方式，不必继承预览的绝对定位或分类列数。

| 最大宽度 | 当前实现的变化                                                                                                                                              |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1400px   | Copy 的长标签缩为短标签，可访问名称保持完整。                                                                                                               |
| 1100px   | 平板尺度使用固定字号和间距；主体外边距为（28px）；预览高（430px），示例卡高（300px）；隐藏贯穿舞台的套准直线、头部短注与次要边注，语言链接靠右。            |
| 900px    | 采用紧凑内容流：预设横排三列、示例图文单列、分类与说明单列；主内容外边距为（20px）；隐藏套准圆标与虚线参照框。Copy 和 Replay 各占一列，其后显示可换行摘要。 |
| 600px    | 导航换到第二行，隐藏品牌圆点并收紧语言链接间距；卡片表面内边距降为（16px），缩小预设名称与样张标题。                                                        |
| 360px    | 为（320px）窄屏继续收紧标题、编号和列间距，维持现有操作路径。                                                                                               |

宽屏卡片的内部视觉表面使用两列等分、`specimen-inset` 同时作为内边距与列间距；平板转为（24px）内边距、（22px）列间距。紧凑表面采用单列、（18px）内边距与（16px）间距。外层按钮始终维持点击区域、零内边距与透明背景；只有内部表面移动。提示词工具栏允许换行，将文本标签和独立语言选择并列。其余间距遵循 frontmatter 中从控件间隙到页面留白的已用尺度，数值并非要求所有布局以同一倍数排列。

## Elevation & Depth

纸面与分类保持平整，通过油墨密度、细线和留白区分区域。示例卡片有真实的柔和下落阴影；这里的深度用于解释被演示的效果，不是所有面板的默认装饰。

### Shadow Vocabulary

- **静置卡片：** `0 20px 32px rgba(4, 25, 72, 0.32)`。
- **抬升卡片：** `0 28px 44px rgba(4, 25, 72, 0.38)`。

两个阴影均来自 `motionTokens`，供预览和复制文本共同读取。Frosted glass 使用静置阴影、背景模糊（18px）、饱和度（1.15）和 frontmatter 中的玻璃纸色。背景图像留在卡片后面，文字与前景图保持清晰；不支持 `backdrop-filter` 时回退到不透明纸面。

**The Steady Content Rule.** 切换效果保留同一内容盒、字体和内间距；点击区域固定，内部视觉表面从当前帧接续运动。玻璃亮边通过绝对定位伪元素叠加，不能让描边挤窄内容、改变换行或吞掉标记。

## Shapes

原有按钮、提示词文本域与目录搜索采用轻圆角 `control`；共享数字和下拉字段使用 `field`，分段单选组使用 `choice-group`，其中选项使用 `mark` 的圆角量度。它们是一组按用途区分的控件，不要求全部旧控件改成同一半径。主示例采用 `specimen`，紧凑示例采用 `specimen-compact`；可调玻璃的实际圆角来自效果配置。短印记用 `mark`；虚线参照框用 `reference-outline`。外部印刷样张维持直角，圆形用于已有的品牌点、套准标记和滑块拇指。

普通控件与分隔使用细线（1px），静置参照框用虚线（1.5px）。样张外框是朱红描边（2px），经真实纸纹调制形成缺墨和细微不齐；它不是硬偏移阴影，也不是随机噪声描边。

纸纹与蓝色纹理来自 `assets/plates/` 已批准的不可变源文件，来源信息保留在栅格中，由 Next.js 优化后使用。纸面与蓝底纹理按（630px）平铺，蓝底纹理不透明度为（0.48）。外框滤镜用同一纸纹的 `feImage`（320px 平铺），把窄亮度范围归一化为油墨 alpha，再施加有界位移（2px）；不以 `feTurbulence` 代替实际纹理。海岸图属于当前示例内容，不是后续每个页面都必须重复的品牌图案。

几何操作图标使用内联 SVG（24 × 24 viewBox、1.8 描边、圆端点与圆连接），形状来自现有 `Icon` 组件；不以文字字形模拟复制、重播或箭头。

## Components

### Buttons

主动作明确，次动作保留纸面。

- **Copy：** 使用 `button-copy`，朱红填充、浅纸白字、加粗标签与复制图标；hover 轻微压暗（`brightness(0.94)`）。复制中显示当前语言的处理中标签、不透明度降为（0.85），以 `aria-busy`、`aria-disabled` 和请求互斥阻止重复提交，保留 pointer 指针与键盘焦点，不使用原生 disabled 或 progress 指针。成功显示对应语言的成功文字与勾选图标（2400ms）后回到默认；正式首页的勾选图标以（320ms）缩放归位，标签以（260ms）从下方（8px）进入，减少动态效果时省略这两段动画。失败会打开完整提示词、聚焦并选中文本，同时给出错误说明。
- **Replay：** 使用 `button-replay`，细蓝边、透明底；hover 转为深蓝底与纸色字。按钮、卡片点击或键盘操作均可请求单次演示。同一效果正在演示时，重复重播请求被忽略；切换到另一效果则从当前画面接续。
- **文字动作：** Select all text 保留下划线与（44px）最小高度。首页展示区和分类入口连接已经实现的效果与目录；原静态词汇列表已移除。
- **Focus：** 默认焦点环为朱红实线（3px），外偏移（5px）；蓝底预览内改用纸色。保留可见键盘焦点与跳转到效果区域的 skip link。
- **Pointer / Touch：** 按钮和 disclosure 内部元素继承父级指针，图标与文字不切换鼠标样式；按钮、链接、summary 和 select 使用 `touch-action: manipulation`。

### Effect Presets

预设是带 `aria-pressed` 的真实按钮组，数字、名称和选中短线共同表达选择。未选编号使用退后蓝，已选编号使用浅暖色；选中线由细线变为朱红厚线。短线状态变化使用（180ms ease-out），hover 给名称加下划线；不是靠颜色单独传达状态。紧凑布局保留相同按钮与语义，只转为横排。

### Cards / Containers

示例卡片外层是固定命中区域的真实按钮（`sample-hit-area`）；中间的 `sample-arrival` 包装层只承担首页入场，内部 `sample-surface` 承担纸色、纹理、阴影、内容内间距与示例演示。两层均不接收指针事件，两个控制器不向同一元素写入变换。frontmatter 中既有 `sample-card`、`sample-card-compact`、`sample-card-glass` 描述内部视觉表面。海岸图、标题、正文、印记和编号的结构在三个效果之间保持稳定。玻璃后方图像常驻，切换时只以（200ms ease-out）改变透明度，不反复挂载。完整宽屏构图与影像选择属于首页简报。

演示参数、默认值与范围维护在 `content/effects/schema.ts`，预设维护在 `content/effects/presets.ts`，预览与中英文提示词同时读取校验后的配置。`content/home-effects.ts` 只复用这些定义；`features/home/effects/use-preview-motion.ts` 接入 `components/effects/preview-controller.ts`，与目录、详情共用 hover、焦点、切换和重播行为。开始新演示前先读取当前透明度、位置、阴影和材质，再取消旧动画并接续。示例表面本身默认可见，加载阶段的整体可见性由外部 `motion-content` 管理；内容入场由 `features/home/motion/page-entry.ts` 单独负责。

以下是默认配置的演示行为；调参后使用同一规范中的当前值，不把默认距离、阴影或时长固化为所有效果的规则。悬停浮起、柔和入场、磨砂玻璃分别有 6、7、7 项适用参数，详情各提供三个预设；完整字段和范围以规范为准。连续参数修改合并为短暂等待后的一次演示；离屏、后台、减少动态效果与卸载均清理待播放任务。

| 效果          | 实际行为                                                                                                                                                                   |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hover lift    | 内部表面向上（6px），普通 hover / focus 归稳过渡为（240ms）；精细指针 hover 和可见键盘焦点均可触发。点击或 Replay 演示段为（960ms），结束后按当前 hover / focus 状态归稳。 |
| Soft reveal   | 先从当前帧淡出（120ms，ease-in），再以 opacity（0 → 1）、translateY（12px → 0）入场（480ms）；演示段合计（600ms），不突然隐藏已可见内容。                                  |
| Frosted glass | 切换到最终玻璃表面用（320ms）；同一玻璃效果重播时先平滑回到纸面（160ms，ease-in），再转为玻璃（320ms），演示段合计（480ms）。静态玻璃状态保留。                            |

演示的进入与归稳使用指数缓出曲线（`cubic-bezier(0.16, 1, 0.3, 1)`）；有预备段的时间轴为 linear，各段单独设定 easing。结束后根据当前输入状态归稳，页面进入后台时取消演示并落实可见目标状态。实现采用 CSS 与 Web Animations API，无独立动画依赖，不自动循环。

`prefers-reduced-motion: reduce` 跳过演示位移、渐显和重播，关闭选中线与玻璃背景的过渡；偏好动态改变时取消在途动画，保持内容、焦点与全部操作可用，玻璃可以保留静态材质。

### Homepage Motion

正式 `/en` 与 `/zh` 首页采用用户已选择的「活字排版」，由 `homeMotionDirection = 'type'` 统一控制开场、内容入场、滚动和语言文字切换。它延续丝网套色的材料和字体关系，不要求后续页面复制同一开场。套色印刷与海岸显影保留为独立预览，后续动画库的接入另见[首页动效对比](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/homepage-motion-studies.md)；正式首页不显示方案比较栏。

首份服务端 HTML 带有 `data-motion-phase="checking"`，暂时隐藏 `motion-content` 正文并锁定滚动，避免先显示未准备好的首页。加载层初始隐藏，CSS 延迟（250ms）后仍在等待才显示活字加载；React 接管后转入 `loading` 并检查实际资源。若资源结果返回时加载层尚未出现，首页直接进入 `complete`、显示内容，不播放开屏和后续页面入场。因此缓存已就绪的刷新不需要人为展示加载过程。

资源判断覆盖当前字体、首屏海岸图，以及页面实际绘制的纸纹和蓝色纹理。读取当前渲染样式后等待 `document.fonts.ready` 并检查字体错误；图片及两个纹理 URL 均等待解码，纹理采用布局提供并预加载的优化资源。资源结果区分 `ready`、`degraded`、`timeout`、`aborted`：全部成功才为 `ready`，资源失败但全部结算为 `degraded`，仍有等待任务达到（10s）故障上限则为 `timeout`，生命周期取消为 `aborted`。降级与超时释放等待，但不记录成全部资源成功；取消后的旧任务不再写回状态。

若加载层已经出现且页面在前台，资源结算后接续正在形成的字标，再平滑退场；首页不额外保留固定的展示停留，也没有固定开场总时长。深蓝底上的六个字母从上下交替排入（translateY ±110% → 0），每字（640ms）、相邻间隔（45ms），完整形成用（865ms）；横线在（720ms）内展开。随后加载层向上（24%）退场并淡出（640ms）；页面内容延迟（200ms）开始，示例由右侧（24px）配合遮片进入（640ms），首页标题与三个预设编号以（520ms）、间隔（45ms）从下方（24px）归位。进入退场时释放正文和滚动，结束后隐藏加载层。以上进入与归位沿用指数缓出（`cubic-bezier(0.16, 1, 0.3, 1)`）。

加载层以 `role="status"`、`aria-live="polite"` 表达准备状态，装饰字标不重复播报；资源结算后显示「试试效果」或「Explore the effects」，不展示虚构进度。页面不提供跳过按钮，普通指针、键盘、滚轮和触屏输入不结束资源等待。每次刷新均依据当次资源状态判断，不保存“看过开场”的记录；语言切换意图仅在当前页面内存中保留，刷新不会继承。预览路由和显式重播则直接显示完整演示，并在资源结算、字标形成后保留（650ms）展示停留；这段停留不属于正式首页的加载规则。

只有尚未接管的 `checking` 状态保留约（6s）的 CSS 恢复：隐藏加载层、显露正文并恢复滚动。迟到接管若发现正文已恢复可见，直接完成，不重新覆盖。脚本接管后的 `loading` 由资源结果和（10s）故障上限管理，不再被这个 CSS 恢复时限提前结束。无脚本时，`noscript` 直接隐藏加载层并显示静态正文，`scripting: none` 恢复滚动；减少动态效果时也直接显示正文并解除滚动锁。

使用说明标题与每个步骤首次进入视口（IntersectionObserver threshold 0.2）时播放一次。说明标题按行从左侧（16px）配合遮片进入（680ms），行间隔（85ms）；步骤编号各以（460ms）从上方（18px）进入。原分类词汇区已被真实效果展示替换，原分类标题及编号的滚动入场不再运行。说明区上方的朱红细线根据阅读位置伸展；正式首页不启用海岸视差。开屏退出后的正文保持可见，滚动提示不自动循环。

加载层视图与检查阶段样式、资源结果聚合、页面资源收集、内容入场和滚动分别由 `features/home/motion/` 下的独立模块负责；`resource-barrier.ts` 汇总结果，`resource-readiness.ts` 收集实际字体与图像任务。减少动态效果时省略加载动画、滚动位移、阅读细线和语言过渡；切换为减少动态效果或卸载会通过 AbortController 结束等待并取消相应动画，防止旧异步过程重新写回状态，卸载还释放观察器、帧请求与事件监听。

正常加载初始位于后台，或资源仍为 `pending` 时切到后台，都继续等待资源结算。结算后若仍在后台，则直接进入 `complete` 并标记 `loadingUi="background"`，省略装饰退场；资源已结算时切到后台，可以取消剩余装饰。开发环境重复挂载时保留已运行的 CSS 时间线，显式重播才重新开始该时间线。

### Inputs / Fields

摘要是打开完整提示词的按钮，使用 `prompt-summary`，不是可编辑输入框。宽屏单行省略，紧凑布局完整换行；hover 加深描边。

完整提示词使用原生 `details` / `summary` 展开和只读 `textarea`，字段拥有实际 label。文本域采用 `prompt-textarea`，最小高度（310px）、纵向可调整；紧凑屏为（420px）最小高度、（16px）字号与（14px）内边距。焦点使用全局规则，输入光标为朱红。复制失败时文字自动选中，也可点击 Select all text 手动选择。

共享字段保留原生输入语义，位于 `components/ui/`。`RangeField` 用 label 对应原生 range，旁边的 number 输入显示当前值和独立单位；`ChoiceField` 用 fieldset、legend 和同名 radio 表达互斥选项，预设及参数都可以用键盘选择。提示词文本域与目录搜索仍保留各自的用途和外观，不把字段族描述为所有旧控件的统一替换。

- **数值与滑块：** 数字外框使用 `number-field`，蓝色细边（1px）与等宽对齐数字；数字输入宽（49px）、最小高（36px），手机最小高（40px）、字号（16px）。Enter 或失焦提交，Escape 取消编辑；空白和非有限数字不提交，有效值先限制到范围，再按效果规范的步长归一化。原生 range 的操作高度使用 `range-control`，轨道厚（4px）、拇指外径（18px）；已调部分为深蓝，hover / active 的拇指变为浅暖色。滑动即时更新数字和同一配置。
- **分段单选：** 使用 `choice-group`，每个 `choice-option` 等分宽度并允许文字换行；选中时使用 `choice-option-selected`。选项最小高（38px），在（760px）以下为（44px）。hover 使用浅蓝透明底，选中 hover 转为群青；状态由真实 radio 的 checked 语义表达。
- **原生下拉：** 排序和提示词语言共用 `select-field`；浅纸白底、控件蓝边（1px），最小高（42px），右侧内边距为箭头预留空间。箭头是无指针事件的 SVG，不能用页面样式缩掉预留宽度。字体继承所在表单，提示词语言选项为 English 与简体中文。
- **单一焦点：** 数字和 select 外框使用群青（2px）外圈、偏移（3px），内部输入不再叠加第二圈。radio 焦点显示在其可见选项表面；目录搜索同样只保留外框焦点。原有按钮和提示词文本域继续使用其既有朱红焦点，不因此改写全局规则。

提示词语言只改变完整提示词及文本域自身的字体、`lang`，不改变当前效果或界面语言。其 label 跟随界面语言；摘要仍使用当前界面语言。

### Navigation

主导航使用深蓝文字的真实链接，英文为等宽字、中文为本地黑体，hover 显示下划线。首页连接效果库与页内使用说明；目录和详情保留共用分类导航与当前类别标记，窄屏以可展开分类适应内容。只提供已经实现的路由。Oswald 字标与朱红圆点维持首页紧凑头部节奏，头部短注在平板布局隐藏，圆点在手机布局隐藏。

EN / 中文是界面语言链接组，切换当前路径的 `/en` 与 `/zh` 前缀；当前语言以 `aria-current="page"` 和（2px）下划线表示，单个链接最小高度为（44px）。切换界面语言时保留路径、查询、hash 和当前实际提示词语言，包括尚未手动修改的默认值。首页效果选择、目录搜索和详情参数均由各自 URL 状态记录；界面切换不重置用户正在参考的内容。

正式首页的语言切换采用活字纵向交换，仅为文本建立 React ViewTransition。旧文上移（18px）并淡出（160ms，ease-in），新文延迟（60ms）后从下方（18px）进入（380ms，指数缓出）；根快照不播放整页动画，海岸图像与操作控件保持实时。不支持原生过渡 API 时，新的文本以（300ms）从下方（10px）及透明度（0.4）进入；减少动态效果时直接显示文本。语言切换不触发完整开场。

跨页面路径变化由 `PageTransition` 对公共页面容器做短暂淡入：opacity（0.65 → 1）、时长（240ms）、指数缓出。比较前移除语言前缀，只有 pathname 改变才播放；query 更新、仅切换语言和首次挂载不播放，减少动态效果时跳过。公共页面祖先不得通过 transform 做这段过渡，保持 fixed 复制栏以视口定位；点击和控件持续可用，后续切换或卸载取消在途动画。详情的 sticky 画布、桌面复制工具栏与手机底部复制入口属于该表面的布局，不能被共同祖先动画改变定位方式。

## Do's and Don'ts

### Do:

- **Do** 保持纸、群青、朱红的角色及中英文字体分工，先用已有 token 解决新界面的层次。
- **Do** 让预览参数与复制文本共用同一份配置，状态改变时保持示例内容与布局稳定。
- **Do** 使用批准的栅格材料并保留来源信息；文字和操作仍由真实 HTML 与 SVG 承担。
- **Do** 提供 hover、可见键盘焦点、触屏与复制失败的手动路径，并在减少动态效果时保持内容可用。
- **Do** 根据内容重排紧凑页面，保留主操作和正文的可读空间。
- **Do** 固定预览的点击区域，让内部表面从当前帧接续运动；重复重播不得把进行中的同一演示重置到第一帧。
- **Do** 将界面语言与提示词语言分开选择，切换界面时保留当前效果与实际提示词语言。
- **Do** 根据真实首屏资源决定是否显示首页加载层；快速就绪直接显示内容，已出现的字标接续后退场；将页面入场与示例演示分层，语言切换只过渡文本。

### Don't:

- **Don't** 将首页的绝对定位、三栏分类或海岸图案升级为所有未来页面的必选布局。
- **Don't** 用随机噪声替代已批准的纸纹，或让静态材质削弱文字与焦点指示。
- **Don't** 用改变内容盒尺寸的边框实现材质切换，或设置自动循环；加载开屏不得在脚本失效后持续遮挡正文。
- **Don't** 缩小 Copy 的已确定字重与字号下限，或只靠颜色表达选中、成功和失败。
- **Don't** 把已经移除的类别 eyebrow 与装饰短线重新引入系统，或把静态词汇伪装成可点击入口。
