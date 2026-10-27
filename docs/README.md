# 项目文档索引

项目文档按职责存放，正文保留中文，普通文件名使用英文 `kebab-case`。工具约定的 `README.md`、`AGENTS.md`、`PRODUCT.md` 和 `DESIGN.md` 使用固定名称。

## 阅读入口

| 文档                                                                                                            | 职责                                                   | 状态                     |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------ |
| [项目说明](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/README.md)                                         | 环境、启动命令、检查命令与工程目录                     | 对应当前工程             |
| [产品上下文](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/PRODUCT.md)                                      | 已确认的用户、目标、约束与待定事项；供 Impeccable 读取 | 已从对话整理             |
| [设计规范](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/DESIGN.md)                                         | 从当前首页提取的视觉、布局和交互规则                   | 当前实现依据             |
| [首页设计简报](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/homepage-design-brief.md)                 | 已选图稿、首页范围、交互要求与方向约定                 | 本轮实现范围             |
| [首页验证记录](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/homepage-validation.md)                   | 浏览器检查、构建结果与未覆盖范围                       | 本轮验证证据             |
| [首页动效方案](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/homepage-motion-studies.md)               | 已采用的活字排版、预览入口与动画库预留                 | 首页已采用；另两种待入库 |
| [架构方案](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/architecture.md)                              | 技术选型、已落地职责边界、内容模型与后续目录规划       | 首页已按职责拆分         |
| [页面与交互方案](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/experience-design.md)                   | 竞品结论、首页、路由职责、页面布局、响应式和动效       | 设计草案                 |
| [视觉风格与动效词汇手册](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/ui-style-motion-glossary.md)    | 效果分类与描述词汇，作为内容参考                       | 原始正文保留             |
| [竞品浏览原始记录](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/docs/research/2026-10-26/capture-notes.md) | 实际浏览步骤、观察范围与截图说明                       | 历史研究证据             |

新加入项目时，先读项目说明与产品上下文，再按任务读取架构或页面方案。制作效果内容时使用词汇手册；查验竞品结论时阅读原始记录与同目录截图。

## 存放结构

```text
README.md
AGENTS.md
PRODUCT.md
DESIGN.md
docs/
  README.md
  architecture.md
  experience-design.md
  homepage-design-brief.md
  homepage-motion-studies.md
  homepage-validation.md
  ui-style-motion-glossary.md
  research/
    2026-10-26/
      capture-notes.md
      *.png
```

## 文档边界与维护

- `PRODUCT.md` 保留在项目根目录，记录产品事实和已确认约束；颜色、字体与页面构图留在设计相关文档。
- `architecture.md` 维护技术与实现方案；精确依赖版本以工程配置和锁文件为准。
- `experience-design.md` 维护页面与交互草案，不将候选颜色、尺寸或动效时长直接视为已定稿规则。
- 根目录 `DESIGN.md` 与 `.impeccable/design.json` 描述已实现的设计体系；后续修改应同步实际样式和文档，不把历史提案当作现行规范。
- `ui-style-motion-glossary.md` 是参考手册，其中的各种风格都是可展示的内容，不要求主站同时使用这些风格。
- 研究资料按 `YYYY-MM-DD` 归档，截图与观察记录放在一起；保留原始截图，不用后续设计稿替换历史证据。
- 新文档使用能说明职责的英文短横线文件名，避免 `final`、`new`、`v2` 等无法说明内容的名称；新增后更新本索引。
- 移动或重命名文档时，同步更新引用、图片路径、`AGENTS.md` 和工具忽略配置。
