# 首页设计简报

状态：2026 年 10 月 27 日完成首版首页实现与本轮审查修正。用户于 2026 年 10 月 26 日选择「丝网套色」图稿，并在次日明确继续实现及批准素材方案。实际设计规则见根目录 [DESIGN.md](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/DESIGN.md)，检查范围见 [首页验证记录](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/homepage-validation.md)。

## 首页任务

面向希望借助 AI 复现界面效果的全球用户，用一个可操作的真实示例说明：这里能看到什么、复制什么、怎样在自己的项目中使用。首页模式为 Persuade，主要行动是体验效果并复制当前提示词。

首页机制：同一个界面场景切换不同效果，预览与自然语言描述同步变化。

## 第一版内容与行为

- 顶部保留 Tomoyo Design、效果示例和使用说明入口；未实现的独立页面不设置无效导航。
- 首屏包含简短价值说明、真实预览、效果选择、重播与复制当前提示词。
- 代表预设先使用同一张内容卡片，演示悬浮抬升、柔和入场和玻璃材质，便于比较变化；这些名称与数量是本轮实现选择。
- 下方按动效、风格、材质等概念组织精选入口，并说明“选择效果 → 复制提示词 → 交给 AI 实现”的使用路径。
- 这一轮先让首页可独立使用；完整目录、效果详情和工作台继续按对应阶段实现。语言路由已在后续的国际化工作中实现。

## 验收要求

- 预览、参数与复制文本来自同一份配置；复制成功可感知，失败时可以直接选中文本。
- 鼠标、键盘和触屏均能触发演示，遵循减少动态效果偏好；不以动画阻碍阅读或操作。
- 桌面和手机保持相同的主要任务，320px 窄屏仍可操作。
- 页面不虚构用户数、评价、商业权益或尚未提供的功能。
- 首屏风格应能延伸到搜索目录、参数面板与说明文档，示例画布允许拥有独立样式。

## 视觉探索依据

探索开始时只有初始化占位页。用户现已选择丝网套色首页稿，已有页面方案继续作为任务与布局参考；实际设计体系在实现和验收后记录。

实现保留图稿的样张构图，并作出经过审查的调整：复制按钮使用更易读的粗体大字；玻璃边框不改变卡片内容尺寸；分类区重复的上方标签移除，独立的操作说明关联到预览区；未接通的词汇不伪装成链接。纸纹、海岸图像与字体沿用用户批准的素材，印刷边缘使用同一张纸纹控制墨色与细微位移。

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

## 2026-10-27 交互修正与国际化

用户要求修复预设切换与鼠标指针闪烁、增加多语言，并补全首页自身动效。保持现有丝网套色视觉方向和图像素材。

- 主动效：首屏用一次 720ms 的纸面遮片退场显露群青印刷样张，套准标记在 520ms 内对齐；首次指针或键盘操作立即结束装饰性入场。
- 连续性：动画从当前视觉状态接续；稳定的外层按钮承载点击，内部表面承载位移。渐显和玻璃重播先平滑复位，连续点击不强制回到首帧。
- 反馈：复制状态通过文本和图标表达，保持手型指针与焦点；防止重复剪贴板请求。
- 预算：无循环、无全页滤镜；滚动仅在使用说明的三步编号首次进入视口时做 420ms、间隔 90ms 的短序列；减少动态效果时保持静态可读。
- 国际化：`/en` 与 `/zh` 静态页面、正确的文档语言与元信息；界面和提示词语言可独立选择，语言切换保留已选效果、提示词语言与锚点。

## 2026-10-27 文案与动效候选

用户明确要求用 Humanizer 改写显得像 AI 的文案，并通过 Impeccable 的 animate、delight、overdrive 增强开场、加载就绪、滚动和语言切换。用户回复“这三种我都想看看”，授权实现套色印刷、活字排版和海岸显影三个可操作预览。具体编排及入口见 [首页动效对比](./homepage-motion-studies.md)。

文案更新适用于主首页与全部候选。原始图稿继续约束既有构图与素材，旧图稿中的原句不覆盖本次用户明确提出的文案改写要求。三个动效候选仍待选择，不把它们同时提升为正式首页规范。

## 2026-10-27 动效采用决定

用户已选择「活字排版」，此前的待选状态到此结束。正式中英文首页采用其完整开场、内容入场、滚动与纵向文字切换，保留约 2.4 秒的完整节奏及立即跳过能力。正式首页不展示候选比较栏，首次播放记录与预览页分开；预览页继续用于重播和对照。

「套色印刷」与「海岸显影」保留实现，后续整理为动画库条目与 AI 提示词，本次不扩展库页面。具体范围与接入待办见 [首页动效方案](./homepage-motion-studies.md)。
