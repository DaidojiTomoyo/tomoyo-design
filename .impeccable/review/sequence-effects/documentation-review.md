# 序列效果设计一致性记录

2026-10-28。角色：Impeccable documenter。本轮是既有 Operate / code-led 效果库的普通扩展，没有批准新的全局视觉体系。仅新增本文；`DESIGN.md` 与 `.impeccable/design.json` 保持原样。

## 依据与证据

已读取 documenter 定义及完整 `reference/document.md`，以 [PRODUCT.md](../../../PRODUCT.md)、[DESIGN.md](../../../DESIGN.md)、[sidecar](../../design.json)和[方向合同](../../surfaces/app-locale-catalog-explore-page-tsx.md)对照成品。抽查全局 token/reset、字体加载、共享字段、目录基础样式、参数面板，以及序列样式、示例、资源等待、生命周期、参数定义和时序模块。

本角色逐张打开以下八张最终截图；未另开浏览器，未重复工程测试。

| 证据 | 对照内容 |
| --- | --- |
| [中文套色 1440px](desktop-press-zh.png)、[英文显影 1440px](desktop-coast-en.png) | 稳定分类导航、蓝色画布、参数区、图文层次与有效场景控件 |
| [英文套色 320px](mobile-press-en-320.png)、[中文显影 390px](mobile-coast-zh-390.png) | 图文堆叠、两列场景选择、完整标签及手机复制入口 |
| [中文分类 1280px](user-1280-catalog-zh.png) | 四项动画条目、静态列表预览和独立播放入口 |
| [套色暂停 1280px](overprint-paused-viewport-1280.png)、[显影暂停 1280px](coastal-reveal-paused-viewport-1280.png) | 套准文字、纸纹、曝光图像与动画区域外的继续操作 |
| [英文提示词 390px](mobile-prompt-en-390.png) | 中文界面中的独立英文提示词、手动选文与固定复制栏 |

另读取 `checks.json`、`flow-verification.json`、`pause-verification.json`、`scene-verification.json`、`responsive-verification.json` 及[收尾审查](finish-review.md)。全页截图从文档顶部开始；两张暂停图与提示词图是局部视口，手机固定栏的位置不能当作整页内容布局。

## 系统对照

| 项目 | 结论 |
| --- | --- |
| 调色与材料 | 新样例直接使用既有 paper、ink、blue、vermilion、action-paper；开场纸纹仍按 630px 平铺，海岸图来自原 `coast-print.png`。未新增栅格资产、品牌色或伪造纹理。 |
| 字体与字阶 | Anton 字标、Oswald 英文标题、Roboto Mono 英文正文、Noto Sans SC 中文职责保留。样例标题采用局部流体字号 28–48px，compact 为 24–32px；这些是预览量度，不替换全局字阶。中文子集仍为原家族，维护记录为 665 个请求字符、186972 字节。 |
| 形状与空间 | 8px 画布圆角、16/24px 内边距、480px 容器重排及矮桌面高度适配均局限于序列预览。目录、详情和手机复制布局延续既有实现；未将预览构图推广为所有页面模板。 |
| 共享控件 | 三个预设、数值输入、滑块和提示词语言下拉继续使用现有组件。场景选择是原 ChoiceField 的两列局部排布，深蓝选中底板、原生 radio 与焦点语义保持；只显示当前场景有效参数。 |
| 动作与内容 | 播放/暂停在移动区域外；文字切换只改变示例，并为两个版本保留空间、隐藏非当前版本的辅助技术内容。滚动使用可聚焦的局部真实视口。重复播放、暂停继续、取消和减少动态效果均沿用稳定内容与单次演示原则。 |

本轮保留「The Two Inks Rule」「The Type Roles Rule」「The Steady Content Rule」的职责。形成、停留、裁切、曝光和视差是被演示效果的参数，不成为网站通用开场或全局 motion token。字体与图片等待有 10 秒边界；失败保留静态内容。首页加载行为未被新演示的固定停留替代。

## 文档状态与验证边界

[序列效果入库](../../../docs/sequence-effects.md)承载四场景、参数、预设、模块职责和验证限制；PRODUCT、文档索引、国际化及首页动效文档已记录发布状态。本次复核发现的架构顶部摘要遗漏已由主任务补齐；复读确认七个 slug、三类定义/提示词模块及序列生命周期与当前实现一致。

工程结果引用 `checks.json`：`pnpm check`、57/57 测试、生产构建及 `git diff --check` 通过。浏览器记录覆盖 1440、1280、390、320px，未记录横向溢出，字体和图像已加载；复制、分享、语言独立性、暂停继续及场景操作有对应证据。收尾审查 disposition 为 `ship`，没有 material fixes。

资源失败和运行时减少动态效果切换仅有单元环境证据；没有真实移动设备、跨浏览器矩阵或外部 AI 提示词复现。静态截图对照不扩大这些验证结论。

## 未修复或规范化的漂移

- sidecar 的提示词和样例片段仍含旧展示文案，延续[前轮记录](../effects-expansion/design-consistency.md)；当前内容以消息和生成器为准。
- 既有目录 Copy 使用朱红底、深蓝文字、19px/900，而系统片段仍以首页的广色域朱红、浅纸白文字、700 字重为基准；目录焦点也与首页片段不同。`git show HEAD` 确认这些规则早已存在，本轮没有把目录变体重新定义为全局规则。
- 既有 `.catalog textarea { font: inherit }` 覆盖全局按 `lang` 选字体的规则；中文界面中的英文提示词截图因此未呈现预期等宽字体。此样式在 HEAD 已存在，是与 Type Roles 说明的历史差异，不是应继承的新规范。
- DESIGN 的首页动效章节仍将两项的动画库接入指向后续；本轮的当前发布事实已在 PRODUCT 和专题文档记录，未借普通扩展改写系统文件。首页 `--unit`、断点和历史 comp 门禁也保持原适用范围。

`git diff --name-only` 核对 DESIGN、sidecar、全局 token/reset、共享字段、目录基础样式、详情提示词样式、原栅格目录、字体加载定义及依赖清单均无本轮差异。上述漂移只报告，不修复或写成新的规范；本角色没有修改应用、资产、配置或其他文档。
