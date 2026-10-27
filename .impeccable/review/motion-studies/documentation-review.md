# 首页动效预览文档核对

2026-10-27。本轮属于已确认「丝网套色」首页的普通扩展。用户要求看三个可操作候选，尚未选定正式首页的整页动效。本次核对保留根目录 `DESIGN.md` 与 `.impeccable/design.json`，不新增已批准 token。

## 对照来源

- 已确认体系：`DESIGN.md`、`.impeccable/design.json`。
- 产品与方向：`PRODUCT.md`、`docs/homepage-design-brief.md`、`.impeccable/surfaces/app-page-tsx.md`、`docs/homepage-motion-studies.md`。
- 实现：`app/globals.css`、`app/[locale]/layout.tsx`、`app/[locale]/page.tsx`、`app/[locale]/motion-preview/[direction]/page.tsx`；`components/home/` 中共享内容、预览控制栏、语言切换、文字过渡与两个页面动效控制器；`content/home-effects.ts`、`content/motion-studies.ts`、`content/locales/`。
- 已有验证记录：本目录 `observations.json`、`coast-opening-tail.json`、`font-inventory.json`、`finish-review.md`，以及 `docs/homepage-validation.md`。本次未启动浏览器、重跑测试或另做性能采样。

## 与既有体系一致

- **颜色：** 根 CSS 仍以奶油纸 `#f7e8d8`、深蓝 `#08297e`、群青 `#0840b1`、朱红 `#f74822` 为基础。候选复用已有的纸、墨及浅暖强调色，没有替换静止页面的色彩角色。
- **排版：** Anton 承担英文展示，Oswald 承担标题和编号，Roboto Mono 承担英文正文与注释，Noto Sans SC 承担中文。四者继续本地托管；中文扩充字符集合，没有增加字体家族。候选开场独立的大字号只记录为实验构图。
- **材料与形状：** 布局与组件仍引用 `paper-grain.png`、`blue-grain.png`、`coast-print.png`；纸面、蓝色纹理、朱红印刷外框、套准几何及卡片圆角关系保留。复制和重播继续使用几何 SVG 图标。
- **The Two Inks Rule / The Type Roles Rule：** 已确认颜色与字体职责仍适用；重写的是说明内容，不是视觉身份。候选中的文字错位与遮片沿用印刷语言，不升级为所有页面的规范。
- **The Steady Content Rule：** 外层按钮保留命中与焦点，`.sample-surface` 继续承载示例材质和演示；新增 `.sample-arrival` 单独承载整页入场。`content/home-effects.ts` 仍同时提供演示参数与技术提示词。

## 本轮扩展与保留差异

主首页共享改写后的中英文内容，并使用文字范围的原生过渡；原有 720ms 纸面入场、520ms 套准及步骤编号提示仍由原控制器负责。预览路由增加三种完整开场、资源准备、返回页面短入场、首次滚动显现、阅读进度及候选语言过渡。海岸视差、开场模糊与遮片只属于候选，不能从本次核对推导出新的全站动效规则。

新增路由为两种语言各三个方向，标记 `noindex, nofollow`。比较栏提供方案切换、重播、跳过和回到首页。语言切换保留当前方向、效果、提示词语言与锚点；文字过渡不把海岸图片或快速操作控件变成快照。

已确认体系文件的组件 HTML 仍保存上一版示例文案，且双层卡片说明没有展开新增的入场包装层。它们也没有列出本轮文字过渡或候选控制栏。这些是本轮扩展与既有记录之间的窄差异；当前文案和行为已在扩展文档与代码中明确，不通过刷新体系文件把未选候选变为正式规则。未修复无关的既有漂移，也未将新的禁止项或缺陷写入体系。

`public/fonts/README.md` 补充临时状态字形检查和同目录临时文件验证后原子替换的维护方式。已有字体清单记录 413 个字形、118616 字节，中文文案缺字列表为空，包含“打”。

## 验证范围

工程检查由主执行者完成并记录：`pnpm check` 与 `pnpm build` 通过，两种语言首页和六个候选页面成功生成。本次文档核对仅检查这些记录与实现是否一致，不把报告当作独立重测。

`observations.json` 记录三种开场的中间样式、套色语言切换的 `copy-plate-in`、保留的玻璃效果与结束状态；布局记录覆盖三种中文预览的 1280px / 390px，以及海岸英文的 320px / 768px，记录的横向溢出为 0。最终完成审查另记录十一张静止图均已打开，并给出 `ship`，没有需要修复的实质问题。

海岸开场结尾的专项证据为 240 个样式样本、约 1471ms。完成审查未发现超过 0.1 的透明度反弹，最终为完成状态，开场透明度为 0，遮片与示例模糊已清除。这只支持该浏览器中未观察到结尾闪回，不能据此声称真机 60fps 或跨浏览器性能。

减少动态效果、动态偏好改变、无原生文字过渡 API 的降级、资源超时或失败和剪贴板拒绝目前主要依据源码检查。没有强制媒体偏好测试、真实手机帧率、屏幕阅读器或完整浏览器矩阵的结论。用户选择最终动效后，再决定是否更新正式体系及其验证范围。

## 本次写入

- `docs/homepage-motion-studies.md`：补充与既有体系的关系、完整播放记忆与资源等待边界、验证链接。
- `public/fonts/README.md`：补充临时状态字形和安全替换流程。
- `.impeccable/review/motion-studies/documentation-review.md`：本次对照与证据边界。

`DESIGN.md`、`.impeccable/design.json` 及应用代码未改动。
