# 效果库文档对照

2026-10-28。范围为已批准的 React Bits 分类导航 HTML 到目录、分类、详情的实现。此轮为现有「丝网套色」体系的普通扩展，没有批准新的全局身份或 token。

## 对照证据

- `DESIGN.md`、`.impeccable/design.json` 与 `.impeccable/surfaces/app-locale-catalog-explore-page-tsx.md`。
- `styles/tokens.css`、`features/catalog/styles/`、`features/effect-detail/styles/`、`components/effects/effect-preview.css`，以及目录卡片和详情组件。
- `content/effects/{registry,schema,prompts}.ts`、`content/home-effects.ts`、`lib/effects/`、`lib/navigation/`、`lib/clipboard/` 和目录路由。
- 主执行者提供的浏览器、生产 HTML、18 项测试、构建、素材与字体检查结果；本角色没有另行启动浏览器或应用测试。

## 系统保留理由

审查原意见要求把目录与详情约定写入 `DESIGN.md`。本次将这些约定写入 `docs/effects-library-design-brief.md` 的「已实现的页面约定」，保留 `DESIGN.md` 和 `.impeccable/design.json` 原文件，依据如下：

- `reference/new-work.md` 的普通扩展规则："No concept tournament, and no DESIGN.md change unless the user approves a durable system change."
- 同文件收尾规则："Ordinary extensions compare the finished build against the incumbent system, preserve its files, and report the evidence checked; report pre-existing drift without repairing it unasked."
- shipped `impeccable_documenter` 的工作流第 3 项同样要求普通扩展保留现有系统，只在新世界或已批准的系统变更后写入系统文件。
- 现有 `DESIGN.md` Overview 已说明后续页面继承颜色、字体关系、材料和状态规则；首页布局归首页简报。Layout 也明确新页面按内容重排，不必继承首页绝对定位或列数。本轮的分类栏、网格、300px 参数区及手机复制栏属于页面结构，不构成新的全局视觉身份。

来源：[new-work.md](../../../.agents/skills/impeccable/reference/new-work.md)、[document.md](../../../.agents/skills/impeccable/reference/document.md)、[impeccable_documenter.toml](../../../.agents/skills/impeccable/agents/impeccable_documenter.toml)。没有因上述保留规则新增确认流程或中断已授权实现。

## 系统摘要

1. 配色仍为奶油纸、深蓝油墨、群青画布与朱红动作、选中标记；全局四个 CSS token 保持原值。
2. 字体仍按 Anton 展示、Oswald 标题、Roboto Mono 注释与正文、Noto Sans SC 中文分工，目录仅使用适合其密度的局部字阶。
3. The Two Inks Rule 延续颜色职责，页面辅助分隔色没有提升为新的全站 token。
4. The Type Roles Rule 延续中英文字体关系；标题、说明、真实控件保持可读且可选择。
5. The Steady Content Rule 延续固定命中区域与内部动画表面，预览、参数、提示词及分享读取同一效果规范。

## 保留的漂移与验证边界

此前已记录的 sidecar 示例文案漂移仍保留，例如示例卡片的 "A small moment of calm." 及旧正文。当前文案以 `content/locales/`、`content/catalog/` 和实际组件为准；此问题已在 `review/loading-refactor/documentation-review.md` 与 `review/resource-loading/documentation-review.md` 记录，本轮未获维护 sidecar 的授权，不借普通扩展修复。

`DESIGN.md` 仍包含以旧首页为范围的页内导航及参数文件描述；当前首页已接目录链接，公共定义移至 `content/effects/` 并由 `content/home-effects.ts` 复用。当前事实已写入 README、PRODUCT、架构和本轮简报；这类来源描述不被本次文档工作当作新的系统规则。局部蓝色焦点环、参数控件及目录辅助色也未被升级为全站规范。

UI 修正后的 18 项测试已通过。返回位置修正通过生产构建，并在 1280×720 视口复验「目录 190px → 详情 → 返回结果 190px」。最后修改及文档定稿后的完整 `pnpm check` 也已通过。审查者在 `finish-verdict.md` 中给出 `ship`，限定原三项问题和返回位置问题四项均已解决，并接受将页面约定记录于简报、保留系统文件。此结论不扩展为整页重新验收。本文仅做源码、文档与提供证据的对照，不声明真机、多浏览器、故障注入或整体发布通过。

文档代理完成主要整理后触及使用额度，最终验证状态由主执行者依据 documenter 的替代流程补齐；现有系统文件保持不变。

## 写入文件

- `README.md`
- `PRODUCT.md`
- `docs/README.md`
- `docs/architecture.md`
- `docs/effects-library-design-brief.md`
- `docs/effects-library-validation.md`
- `.impeccable/review/effects-library/documentation.md`

保留不改：`DESIGN.md`、`.impeccable/design.json`、历史设计草图与研究记录。
