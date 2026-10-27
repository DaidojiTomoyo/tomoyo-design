# 加载开屏与职责拆分文档核对

2026-10-27。用户明确要求开场兼作加载开屏、删除跳过功能，并由首份 HTML/CSS 显示开屏，避免首页先闪现；同时要求按职责拆分实现。本次只同步这项修正，不改变已批准的丝网套色静态体系或首页活字方向。

## 核对来源

- `features/home/motion/`：`motion-shell.tsx`、`opening-screen.tsx`、`opening.css`、`controller.ts`、`opening.ts`、`resource-readiness.ts`、`page-entry.ts`、`scroll-motion.ts`、`visit.ts`、`locale-arrival.ts`。
- `styles/tokens.css`、`styles/base.css`、`features/home/styles/index.css` 与示例样式；`app/[locale]/layout.tsx` 的本地字体和素材接入。
- `components/navigation/`、`components/motion/`、`lib/navigation/`、`features/motion-preview/preview-bar.tsx` 和 `content/motion-studies.ts`。
- `.impeccable/surfaces/app-page-tsx.md` 末节记录的最新用户修正；此前手动立即中断规则已被取代。

## 当前加载规则

服务端输出 `data-motion-phase="loading"`。对应 CSS 令遮片不透明、可接收指针，暂时隐藏正文并锁定滚动；字标和横线直接开始 CSS 形成动画。`opening.ts` 等待已经运行的 CSS 动画，再保留完整字标 650ms，React 不从头重放。字母 640ms、间隔 45ms、横线 720ms，以及后续入场配置不变；原 180ms 遮片淡入已删除。约 2370ms 是及时接管且资源已准备时的配置编排，不能当作所有网络和脚本条件下的精确总耗时。

资源准备最多等待 2200ms，并与字标形成、停留并行；资源失败、超时或 AbortSignal 均会解除等待。开屏以状态区域表达准备情况，资源准备结束或超时且编排完成后自动入场。进入退场时释放正文和滚动。正式首页与预览继续分别使用 `tomoyo-home-type`、`tomoyo-study-type` 记录，重复访问不再等待完整字标编排，语言切换不触发完整开场。

当前页面、预览栏和控制器均没有跳过开场 UI 或相应事件；pointerdown、keydown、wheel、touchstart 不再用于中断加载。预览的显式重播仍保留。减少动态效果、页面隐藏和卸载通过生命周期取消路径结束等待及动画，与手动跳过不是同一功能。

CSS 在加载样式启动约 6 秒后分别恢复遮片、正文和滚动。控制器在接管开始及资源等待结束后检查遮片是否已被恢复规则隐藏，避免迟到脚本重新覆盖内容。`noscript` 直接显示静态正文并隐藏开屏，`scripting: none` 恢复滚动；减少动态效果直接采用静态可见状态。

## 本次同步

`DESIGN.md` 移除 `button-intro-skip` 及跳过按钮规则，替换“输入随时中断”和“所有静态初始正文可见”的旧描述，明确加载阶段、自动进入及静态恢复路径。来源路径更新为拆分后的 `styles/`、`features/home/`、共享 `components/` 和 `lib/navigation/`。颜色、字体、间距、圆角、其他组件基础属性、三个命名规则及素材要求保持原值。

`.impeccable/design.json` 删除跳过按钮片段与未用的 180ms 开场淡入项，新增实际使用的 6s CSS 恢复延迟；其余既定时长不变。示例入场与语言组件的来源路径、首页特征和 Do / Don't 文本同步到当前 Markdown。套色印刷和海岸显影仍为预览，后续动画库集成没有在本次记录中被宣称为完成。

## 验证边界

本次是源码与文档对照，没有启动浏览器、运行应用测试或修改应用。只执行文档格式化、JSON 可解析性与映射核对；首次绘制、慢脚本、无脚本、减少动态效果和 CSS 恢复的运行时结论由主执行者另行验证。本记录不构成真机帧率、跨浏览器或屏幕阅读器证明。

无关历史漂移未修复：部分 sidecar 组件例子仍展示文案改写前的文字，当前产品文案以 `content/locales/` 为准。没有将这些历史例子或未采用编排提升为新的规范。

## 写入文件

- `DESIGN.md`
- `.impeccable/design.json`
- `.impeccable/review/loading-refactor/documentation-review.md`
