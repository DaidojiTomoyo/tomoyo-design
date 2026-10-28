# Tomoyo Design

可体验并复制 AI 提示词的 UI 风格与动效库。

当前已实现「丝网套色」风格首页，以及共用分类导航的效果库、分类页和效果详情。首批内容为 Hover lift、Soft reveal、Frosted glass，支持中英文与别名搜索、排序、真实预览、调参、重播、重置、提示词复制和分享恢复。`/en` 与 `/zh` 提供相同路径；界面与提示词语言可独立选择，切换界面语言保留当前效果、参数和提示词语言。

首页提供两项随效果变化的快捷参数，以及三种真实预览和分类入口。效果库保留分类栏，默认总览为一幅高预览配两幅横向预览；搜索、分类与名称排序使用规则网格。Hover lift、Soft reveal、Frosted glass 分别提供 6、7、7 项参数和三个预设，共用原生滑块、数字输入、单选和下拉控件。

效果库入口为 `/en/explore`、`/zh/explore`，分类只有当前有内容的 `motion` 与 `material`，详情使用固定地址 `/[locale]/effects/[slug]`。从结果进入详情后可回到原搜索条件和滚动位置。最初实现见 [效果库设计简报](docs/effects-library-design-brief.md)和[验证记录](docs/effects-library-validation.md)；本次调整及验收状态见 [体验升级简报](docs/experience-upgrade-brief.md)和[验证记录](docs/experience-upgrade-validation.md)。当前尚未部署。

首页已选用「活字排版」开场、滚动和文字切换动效。套色印刷与海岸显影保留在动效预览路由中，后续收入动画库；采用决定与预留范围见 [首页动效方案](docs/homepage-motion-studies.md)。

## 环境与启动

- Node.js 24（可通过 `nvm use` 切换）
- pnpm 10.33.4，与 `package.json` 中的 `packageManager` 保持一致

```bash
pnpm install --frozen-lockfile
pnpm dev
```

默认开发地址为 [http://localhost:3000](http://localhost:3000)。端口被占用时以终端实际输出为准。

## 技术基础

- Next.js 16 App Router、React 19、TypeScript 严格模式
- Tailwind CSS 4 与官方 PostCSS 插件
- ESLint 10、Next.js Core Web Vitals 和 TypeScript 规则
- Prettier 3、Tailwind 类名自动排序、ESLint 格式规则兼容配置
- EditorConfig、VS Code 工作区格式化设置与扩展推荐

ESLint 负责代码规则，Prettier 负责格式；两者通过 `eslint-config-prettier` 避免重复或冲突。格式化不改动已有手册、方案文档和研究资料。安装的 Agent 工具目录也不参与应用代码检查与格式化。

Next.js 官方配置支持 ESLint 10，但随附的部分插件尚未更新 peer dependency 版本声明，安装时可能出现对应提示。初始化时已验证实际 lint，以及 TypeScript、可访问性和 Next.js 规则对错误代码的检测；后续升级依赖时仍需运行检查。

## 常用命令

| 命令                | 用途                                               |
| ------------------- | -------------------------------------------------- |
| `pnpm dev`          | 启动开发服务器                                     |
| `pnpm build`        | 构建生产版本                                       |
| `pnpm start`        | 运行已经构建的生产版本                             |
| `pnpm lint`         | 检查代码，出现警告或错误时失败                     |
| `pnpm lint:fix`     | 自动修复可处理的 ESLint 问题                       |
| `pnpm format`       | 格式化项目文件并整理 Tailwind 类名                 |
| `pnpm format:check` | 只检查格式，不修改文件                             |
| `pnpm typecheck`    | 生成 Next.js 路由类型并执行 TypeScript 检查        |
| `pnpm check`        | 依次执行 ESLint、格式和类型检查                    |
| `pnpm test`         | 验证资源生命周期、效果参数、提示词、分享与预览控制 |

提交或交付前执行 `pnpm check` 和 `pnpm build`，涉及效果或资源控制时同时执行 `pnpm test`。当前使用标准 Next.js 开发与生产运行方式；首页和动效预览页在构建时预生成，效果库、分类和详情页读取 `searchParams`，由服务端按请求输出当前搜索或效果配置。根路径固定跳转到 `/en`。当前版本需要 Next.js 服务端运行时，未启用静态导出。

## 目录约定

```text
app/[locale]/         中英文首页、动效预览与语言根布局
app/[locale]/(catalog)/ 目录、分类、详情及共用加载、错误、未找到路由
app/globals.css       Tailwind、全局变量和基础样式的入口
features/home/        首页组合，effects/ 负责效果与提示词交互
features/home/motion/ 加载开屏、内容入场、滚动与资源准备
features/home/styles/ 首页各区域样式，含各自的响应式规则
features/motion-preview/ 动效方案预览工具栏
features/catalog/     分类导航、搜索排序、列表与返回位置
features/effect-detail/ 参数、提示词、复制和分享操作
components/effects/   共用效果画布、帧定义和预览控制器
components/navigation/ 跨页面语言与导航控件
components/motion/    路径淡入与跨页面文字过渡组件
components/ui/        图标、滑块与数值输入、单选和原生下拉控件
lib/navigation/       URL 状态订阅与语言导航标记
lib/effects/          跨语言搜索与目录元信息
lib/clipboard/        复制状态与失败回调
styles/               全局设计变量、重置和基础元素样式
content/effects/      效果注册、参数规范、预设与提示词生成
content/catalog/      目录与详情的中英文界面文案
content/locales/      类型约束的中英文文案
assets/plates/        经审核的印刷纹理与海岸图像源文件
public/fonts/         自托管字体与许可文件
docs/                 架构、页面方案、词汇手册与研究资料
PRODUCT.md            已确认的产品上下文，供 Impeccable 读取
DESIGN.md             已确认的视觉身份与共享控件、导航规则
.vscode/              编辑器扩展推荐和工作区设置
AGENTS.md             项目约定与 Next.js 自动生成的 Agent 指引
eslint.config.mjs     ESLint flat config
prettier.config.mjs   Prettier 与 Tailwind 排序配置
```

不创建 `src/`。`@/*` 指向项目根目录，例如 `@/features/home/...`。路由文件只组装页面；业务组件、hooks、控制器和局部样式归所属功能，跨页面复用后再提到 `components/` 或 `lib/`。按职责拆分，不用一个全局样式或大控制器承接所有新页面。具体边界见 [架构方案](docs/architecture.md#当前实现的职责边界)。

效果注册、参数范围、默认值、预设和提示词集中在 `content/effects/`，首页通过 `content/home-effects.ts` 复用这些定义。预览、提示词和版本为 `v=1` 的分享 URL 读取同一份校验后配置；旧 v1 链接缺少的新增字段使用默认值，只序列化当前效果支持的参数。数值输入在 Enter 或失焦时提交、Escape 时取消，随后与滑块经过同一份范围和步长校验。

路径切换只对公共页面容器做短暂透明度过渡，不对该祖先应用 transform，以保留手机固定复制栏的视口定位。语言切换只过渡文字；查询更新不触发整页过渡。首页资源加载规则沿用既有实现。交互使用 CSS 与浏览器 Web Animations API，本轮未增加依赖。字体自托管，图像和背景纹理由 Next.js 图像优化服务提供。中文使用 Noto Sans SC 子集；字形清单及更新方式见 [字体说明](public/fonts/README.md)。

## 项目文档

- [文档索引](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/README.md)：文档职责、阅读顺序和维护约定。
- [产品上下文](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/PRODUCT.md)：已确认需求、约束和待定事项。
- [设计规范](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/DESIGN.md)：配色、字体、布局、控件与动效规则。
- [首页验证记录](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/homepage-validation.md)：浏览器检查、构建结果与验证范围。
- [效果库设计简报](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/effects-library-design-brief.md)：已批准的分类结构、目录与详情约定及历史草图。
- [效果库验证记录](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/effects-library-validation.md)：首轮效果库功能、生产页面、截图证据和未覆盖范围。
- [体验升级简报](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/experience-upgrade-brief.md)：首页、目录、详情参数与共享控件的本次调整范围。
- [体验升级验证记录](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/experience-upgrade-validation.md)：本次检查、修正复验、审查状态与验证限制。
- [架构方案](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/architecture.md)：技术选型、数据流、工程组织和实施阶段。
- [页面与交互方案](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/experience-design.md)：竞品依据、首页、路由职责、布局与动效建议。
- [视觉风格与动效词汇手册](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/ui-style-motion-glossary.md)：效果分类和描述词汇。

Impeccable 已安装。根目录 `PRODUCT.md` 保存产品上下文；`DESIGN.md` 和 `.impeccable/design.json` 记录当前实现的设计体系。历史页面方案中的候选参数仍作为草案保留，后续页面应以实际设计规范为基础。

Impeccable、Humanizer 的本地安装文件及本地 hooks 配置不纳入 Git，新开发环境需要单独安装；`skills-lock.json` 保留已记录的技能来源。项目的 `PRODUCT.md`、`DESIGN.md` 和其他共享设计资料随仓库维护。

`.impeccable/` 保留设计体系、方案稿、审查文本和最新资源加载验证截图。构建状态、问题会话、自动生成的差异图及历史检查的中间截图只保留在本地，不纳入 Git；这些忽略规则不会删除现有文件。历史验证范围见 `docs/homepage-validation.md`。

## 配置依据

- [Next.js ESLint 配置](https://nextjs.org/docs/app/api-reference/config/eslint)
- [Prettier 安装与版本固定](https://prettier.io/docs/install)
- [Tailwind CSS 的 Prettier 插件](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
