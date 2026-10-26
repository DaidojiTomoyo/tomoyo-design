# Tomoyo Design

可体验、调整并复制 AI 提示词的 UI 风格与动效库。

当前完成基础工程初始化，首页为最小占位页面。页面设计与完整路由按已有方案逐步实现。

## 环境与启动

- Node.js 24（可通过 `nvm use` 切换）
- pnpm 10.33.4，与 `package.json` 中的 `packageManager` 保持一致

```bash
pnpm install --frozen-lockfile
pnpm dev
```

开发地址为 http://localhost:3000。

## 技术基础

- Next.js 16 App Router、React 19、TypeScript 严格模式
- Tailwind CSS 4 与官方 PostCSS 插件
- ESLint 10、Next.js Core Web Vitals 和 TypeScript 规则
- Prettier 3、Tailwind 类名自动排序、ESLint 格式规则兼容配置
- EditorConfig、VS Code 工作区格式化设置与扩展推荐

ESLint 负责代码规则，Prettier 负责格式；两者通过 `eslint-config-prettier` 避免重复或冲突。格式化不改动已有手册、方案文档和研究资料。安装的 Agent 工具目录也不参与应用代码检查与格式化。

Next.js 官方配置支持 ESLint 10，但随附的部分插件尚未更新 peer dependency 版本声明，安装时可能出现对应提示。初始化时已验证实际 lint，以及 TypeScript、可访问性和 Next.js 规则对错误代码的检测；后续升级依赖时仍需运行检查。

## 常用命令

| 命令                | 用途                                        |
| ------------------- | ------------------------------------------- |
| `pnpm dev`          | 启动开发服务器                              |
| `pnpm build`        | 构建生产版本                                |
| `pnpm start`        | 运行已经构建的生产版本                      |
| `pnpm lint`         | 检查代码，出现警告或错误时失败              |
| `pnpm lint:fix`     | 自动修复可处理的 ESLint 问题                |
| `pnpm format`       | 格式化项目文件并整理 Tailwind 类名          |
| `pnpm format:check` | 只检查格式，不修改文件                      |
| `pnpm typecheck`    | 生成 Next.js 路由类型并执行 TypeScript 检查 |
| `pnpm check`        | 依次执行 ESLint、格式和类型检查             |

提交或交付前执行 `pnpm check` 和 `pnpm build`。当前保留标准 Next.js 开发与生产运行方式，静态导出及语言路由在对应功能阶段接入。

## 目录约定

```text
app/                  App Router 页面、根布局和基础样式
components/           可复用组件，后续按需要新增
public/               静态资源
docs/                 架构、页面方案、词汇手册与研究资料
PRODUCT.md            已确认的产品上下文，供 Impeccable 读取
.vscode/              编辑器扩展推荐和工作区设置
AGENTS.md             项目约定与 Next.js 自动生成的 Agent 指引
eslint.config.mjs     ESLint flat config
prettier.config.mjs   Prettier 与 Tailwind 排序配置
```

不创建 `src/`。`@/*` 指向项目根目录，例如 `@/components/...`。后续的 `features/`、`content/`、`core/` 和 `registry/` 也直接放在根目录。

## 项目文档

- [文档索引](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/README.md)：文档职责、阅读顺序和维护约定。
- [产品上下文](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/PRODUCT.md)：已确认需求、约束和待定事项。
- [架构方案](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/architecture.md)：技术选型、数据流、工程组织和实施阶段。
- [页面与交互方案](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/experience-design.md)：竞品依据、首页、路由职责、布局与动效建议。
- [视觉风格与动效词汇手册](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/ui-style-motion-glossary.md)：效果分类和描述词汇。

Impeccable 已安装。根目录 `PRODUCT.md` 保存其可读取的产品上下文；页面方案中的颜色、字体、尺寸和动效时长仍是设计草案，后续确定设计语言时再形成根目录 `DESIGN.md`。

Impeccable 的本地安装文件及本地 hooks 配置不纳入 Git，新开发环境需要单独安装。项目的 `PRODUCT.md`、后续的 `DESIGN.md` 和其他共享设计资料随仓库维护。

## 配置依据

- [Next.js ESLint 配置](https://nextjs.org/docs/app/api-reference/config/eslint)
- [Prettier 安装与版本固定](https://prettier.io/docs/install)
- [Tailwind CSS 的 Prettier 插件](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
