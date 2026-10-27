---
version: 1
slug: "app-page-tsx"
primary_target: "app/[locale]/page.tsx"
related_targets: ["app/globals.css","components/home"]
---

# 首页设计简报

状态：已完成「丝网套色」首页，2026 年 10 月 27 日补充中英文语言路由与首页动效。用户于 2026 年 10 月 26 日在方案页选择该稿，并在次日明确继续实现。

## 首页任务

面向希望借助 AI 复现界面效果的全球用户，用一个可操作的真实示例说明：这里能看到什么、复制什么、怎样在自己的项目中使用。首页模式为 Persuade，主要行动是体验效果并复制当前提示词。

首页机制：同一个界面场景切换不同效果，预览与自然语言描述同步变化。

## 第一版内容与行为

- 顶部保留 Tomoyo Design、效果示例和使用说明入口；未实现的独立页面不设置无效导航。
- 首屏包含简短价值说明、真实预览、效果选择、重播与复制当前提示词。
- 代表预设先使用同一张内容卡片，演示悬浮抬升、柔和入场和玻璃材质，便于比较变化；这些名称与数量是本轮实现选择。
- 下方按动效、风格、材质等概念组织精选入口，并说明“选择效果 → 复制提示词 → 交给 AI 实现”的使用路径。
- 这一轮先让首页可独立使用；完整目录、效果详情、工作台继续按对应阶段实现；语言路由已提供 `/en` 和 `/zh`。

## 验收要求

- 预览、参数与复制文本来自同一份配置；复制成功可感知，失败时可以直接选中文本。
- 鼠标、键盘和触屏均能触发演示，遵循减少动态效果偏好；不以动画阻碍阅读或操作。
- 桌面和手机保持相同的主要任务，320px 窄屏仍可操作。
- 页面不虚构用户数、评价、商业权益或尚未提供的功能。
- 首屏风格应能延伸到搜索目录、参数面板与说明文档，示例画布允许拥有独立样式。

## 视觉探索依据

探索开始时只有初始化占位页。用户现已选择丝网套色首页稿，已有页面方案继续作为任务与布局参考；实际设计体系在实现和验收后记录。

本轮从创作者常见的印刷、展览、动态图像和索引系统推导方向。常规组件库首页与纯装饰艺术展示都是需要主动检查的惯性：前者容易让产品失去辨识度，后者容易让预览与复制操作消失。

以下候选在运行方向探索工具前排序，均需能承载真实预览、复制操作与后续详情页：

| 顺序 | 方向       | 与任务的关系                                   | 视觉语法                                                     |
| ---- | ---------- | ---------------------------------------------- | ------------------------------------------------------------ |
| 1    | 字体样本册 | 将可见效果和准确描述并列，让人像翻样本一样挑选 | 暖白、深墨、少量朱红；展示字与正文区分；开放的样本与注释布局 |
| 2    | 动态展览   | 作品先出现，交互即是证明                       | 浅色场地、炭黑与钴蓝；大幅留白；预览舞台和简短展签           |
| 3    | 动画分镜   | 将状态、节奏与重播关联起来                     | 深色画幅、浅色轨道与黄色节点；帧序列；清楚的时间标记         |
| 4    | 丝网套色   | 用同一内容的层叠与切换表达效果的组成           | 奶油白、群青、朱红；粗体与细注释；大幅套色样张与操作边栏     |
| 5    | 唱片试听   | 先体验一段，再带走对应配方                     | 深蓝、暖白与酸橙；唱片套的尺度与索引节奏；连续的试听选择     |
| 6    | 城市导视   | 将发现、体验、复制组织成清楚路径               | 浅灰、深墨与信号绿；清晰字重；分类索引与稳定方向提示         |
| 7    | 透光标本台 | 同一观察位置对照不同材质与状态                 | 电蓝底、明亮样本与精确注释；大画布；独立的可调观察区         |

FORM: seed:74003f5a2999bf99

已选稿：`.impeccable/mocks/decision/screenprint.png`。其余文件为未采用的探索方案。用户已批准该具体图稿并授权继续实现，直接以此作为构图依据。图稿中尚未实现的分类子项不作为无效链接上线；类别保持清楚，首批三个真实预设接通交互。

## Direction contract

THESIS: The homepage is one interactive printed specimen: see a UI effect, then take its exact words. The preview leads the opening.

OWN-WORLD: Committed ultramarine ink over warm cream paper, vermilion active marks and actions, condensed heavy display type, compact monospaced annotations, registration rules. Text and controls remain semantic; printed texture and landscape are image assets.

STORY: Select a preset, interact or replay, inspect the matching prompt, copy it into an existing AI workflow. The same content card keeps comparisons meaningful.

FIRST VIEWPORT: A compact wordmark/nav row; title and preset index in the sheet's upper margin; a broad blue stage with left-side preset labels, central landscape-and-text card, quiet right annotations; a full-width prompt/action strip immediately below; the category index begins within the first desktop viewport.

FORM: Screenprint overprint, grounded candidate 4; seed:74003f5a2999bf99. Approved comp: `.impeccable/mocks/decision/screenprint.png`. Signature: the active registration mark moves between presets while preview and prompt change together. Platform feedback is brief and bounded; reduced motion keeps content visible and removes displacement. On compact screens, preset navigation becomes horizontal, the sample stacks, and the prompt/actions remain reachable.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## 2026-10-27 文案与动效预览扩展

用户明确要求改写 AI 感文案，并希望比较三个动效方向。以 `docs/homepage-motion-studies.md` 记录本轮扩展：共享现有布局与素材，提供套色印刷、活字排版、海岸显影三个预览；正式首页动效的采用方案仍待选择。原始 comp 继续作为构图与素材依据，原句由本轮用户授权的中英文文案替代。

## 2026-10-27 活字排版采用决定

用户确认“要 活字排版 这个，然后其他的两个我们后续要做到我们的动画库里面去”。正式 `/en` 与 `/zh` 首页采用活字开场、内容入场、滚动及中英文文字切换；保留完整形成后 650ms 停留、约 2370ms 总编排和立即中断能力。首页与预览分开记录播放状态，正式首页没有比较栏。套色印刷与海岸显影保留源码和预览，后续接入动画库与提示词。原始图稿继续约束静止构图与素材，此次只确认动效选择。

## 2026-10-27 加载开屏修正与职责拆分

用户明确更正：开场也是加载开屏，不需要“跳过开场”；首次打开应先见开屏，不能先露出首页再播放。该要求取代前文的手动立即中断规则。首份 HTML/CSS 显示遮片并形成字标，准备完成后自动进入内容；点击、键盘、滚动不跳过。减少动态效果直接显示，未接管脚本有 6 秒 CSS 恢复，迟到接管不重新覆盖正文。

用户同时要求按职责组织代码。路由留在根目录 app；首页的效果、动效及区域样式归 features/home；语言与文字过渡归共享 components；URL 状态归 lib/navigation。保持已批准静态构图、素材和文案，预览入口保留其他两种编排。

## 2026-10-27 真实资源加载修正

用户再次指出：“每次刷新加载动画都会闪烁，这是不对的，加载动画我的意思是正在加载资源”。该要求取代前文每次首帧强制显示开屏、访问记录和首页固定停留规则。首页先检查实际资源，快速就绪时直接显示内容；仍需等待才显示活字加载，已经显示则接续字标并平滑退场。不按看过开场与否决定是否加载，不增加跳过功能。完整的 650ms 展示停留只属于预览与主动重播。首屏图片、字体、纸纹和蓝色纹理均参与就绪判断，失败与超时提供可用退路；静止构图、素材及文案不变。
