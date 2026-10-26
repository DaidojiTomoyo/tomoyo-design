# Product

<!-- impeccable:product-schema 1 -->

本文整理本次对话中已经确认的产品需求与项目事实，供 Impeccable 和后续开发读取。详细技术方案与页面建议通过下方文档引用，不在这里重复维护。

## Platform

web

## Users

- 面向海外或全球用户。
- 用户希望看到具体的 UI 视觉效果和动画，并把相应提示词交给自己使用的 AI 工具，实现类似效果。
- “不熟悉设计术语或代码的用户”是当前方案重点考虑的画像，仍需后续用户验证。

## Product Purpose

将 UI 视觉风格与动效词汇手册转化为可体验的系统：用户看见效果、理解效果，再复制能帮助 AI 复现该效果的提示词。

产品是否有效，首先看用户能否找到想要的效果，并用对应描述在自己的项目中实现相近的视觉与交互特征。

## Operating Context

- 通过网页展示和使用效果库。
- 提示词交给用户自己使用的 AI 工具继续实现，首要使用路径围绕“看效果、复制描述、复现效果”。
- 手册涵盖动效、节奏、整体风格、配色、材质、布局及其组合表达，是首批内容的参考来源。

## Capabilities and Constraints

### 已确认的目标与约束

- 展示真实的 UI 视觉与动画效果，并提供可复制的 AI 提示词。
- 开发前先研究同类产品，明确首页和各路由职责。
- 先做好网站自身的布局、设计语言和动效，再扩充效果内容。
- 使用 Next.js；`app/`、`components/` 等目录位于项目根目录，不创建 `src/`。
- 工程已完成 TypeScript、Tailwind CSS、ESLint、Prettier 和 pnpm 的初始化；实际版本以 `package.json` 和锁文件为准。
- 用户已安装 Impeccable，用于后续设计与开发。

### 当前实现状态

当前应用只有初始化占位页面，尚未实现效果目录、参数调整、提示词生成或完整业务路由。占位页面的字体、颜色和布局用于验证工程运行，不代表已经确定的产品视觉体系。

### 规划与待定事项

架构和页面方案已经提出搜索、调参、场景配方、工作台、本机收藏和中英文支持等能力，具体实现范围按后续任务推进。首批样例数量、正式品牌名称和最终视觉方向尚未定稿；`Tomoyo Design` 是当前工程使用的名称。

## Evidence on Hand

- [视觉风格与动效词汇手册](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/ui-style-motion-glossary.md)：用户提供的内容基础。
- [架构方案](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/architecture.md)：技术选型、数据流、模块划分和实施顺序。
- [页面与交互方案](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/experience-design.md)：首页、路由、布局、动效建议及竞品观察。
- [竞品浏览原始记录](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/research/2026-10-26/capture-notes.md)：2026 年 10 月 26 日的公开页面观察，同目录保留实际截图。

研究截图用于理解同类产品的组织方式；页面方案中的视觉参数是待验证建议。

## Product Principles

- 让用户从看得见、能体验的效果出发理解设计词汇。
- 让复制的描述准确对应用户正在参考的效果。
- 用网站自身的布局与动效质量证明产品能力，再扩大样例规模。
