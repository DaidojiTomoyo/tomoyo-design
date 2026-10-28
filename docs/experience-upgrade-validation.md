# 首页、目录与详情体验升级验证记录

日期：2026 年 10 月 28 日。

范围：[体验升级简报](experience-upgrade-brief.md)授权的首页真实演示与快捷参数、目录布局、共享字段、特有效果参数及路径切换。沿用丝网套色身份和三张已批准栅格素材；研究依据为[首页与参数面板参考观察](research/2026-10-28/home-and-parameter-review.md)。本文汇总主执行者的生产浏览器、命令结果及独立审查证据，文档整理本身不构成一次独立运行验证。

当前状态：独立[修正判定](../.impeccable/review/experience-upgrade/finish-verdict.md)将固定复制栏、排序箭头留白、搜索双焦点及过时文档四项全部评为 `resolved`，`disposition: ship` 仅覆盖这四项。实际完成门禁仍未关闭：`finish --disposition ship` 先拒绝过时的 responsive 输入，推进阶段后仍绑定旧首页图稿，最新 1440px 对照为 `0.6057`（约 61%，drift），responsive 阶段保持 open。它不能作为当前已获准新构图的像素通过证明，也不等同于四项修正未完成。主执行者继续处理该门禁状态，本文暂不声明最终完成。

最新 `pnpm check` 与 `pnpm build` 通过，本轮参数和预览变更后的 `pnpm test` 为 21/21 通过。应用在本地生产服务器 `http://localhost:3003` 检查，尚未部署。

## 实现范围

| 对象   | 本次实现                                                                                                                                                                                     |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 首页   | 首屏保留印刷舞台和真实卡片，直接提供效果库入口；悬停浮起、柔和入场快捷调整距离与时长，玻璃快捷调整模糊与不透明度。当前配置进入提示词与详情链接。下方以三种真实预览和分类入口替换原词汇列表。 |
| 目录   | 保留共用分类栏；无搜索、默认排序且处于全部分类时，用一幅高预览配两幅横向预览。搜索、分类和名称排序使用规则网格；手机使用一列与可展开分类。                                                   |
| 详情   | 大画布与分组参数，宽屏预览和复制工具栏在滚动中保持可用；手机使用底部复制入口并为页面内容预留底部空间。                                                                                       |
| 参数   | 悬停浮起 6 项，柔和入场 7 项，磨砂玻璃 7 项，各有三个预设。每种效果只显示和序列化适用参数，预览、双语提示词与分享同源。                                                                      |
| 字段   | 共用原生 range 与 number 输入、radio 选择、select。数字在 Enter 或失焦时提交、Escape 取消；滑动与数字提交经过同一效果规范。                                                                  |
| 连续性 | 仅 pathname 变化做 240ms 透明度淡入；移除语言前缀后比较，查询更新和仅切换界面语言不触发整页动画。公共页面祖先不做 transform，固定复制栏继续以视口定位。                                      |
| 兼容性 | 分享版本保持 `v=1`，旧链接缺少的新增字段使用默认值；非法字段值回退相应默认值，不支持版本整体回退并提示。首页资源加载规则沿用既有实现。                                                       |

字段、默认值、范围、步长和选项的事实来源是 `content/effects/schema.ts`，预设在 `content/effects/presets.ts`。没有新增效果条目、账户、数据库、代码安装入口、iframe 预览或运行依赖。架构中的配方、工作台、收藏和其他工具选择仍为后续方案。

## 自动化与构建

| 检查         | 结果与适用范围                                                                                                                         |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm test`  | 参数与预览变更后 21/21 通过；使用 Node.js 内置测试运行器。最后三项 UI 修正未改测试目标逻辑，未把此结果表述为新的浏览器验证。           |
| `pnpm check` | 固定复制栏、排序及焦点修正后通过，包括 ESLint、Prettier 和 TypeScript。                                                                |
| `pnpm build` | 同一轮 UI 修正后的生产构建通过；生产服务器重启后进行下列复验。                                                                         |
| 规范与提示词 | 分享往返、双语提示词含当前字段、不同效果不串参数、非法与重复参数、旧值默认补全、版本回退、步长归一化、合法返回路径与混合语言别名搜索。 |
| 实际预览帧   | 缩放、旋转、方向、模糊、延迟和时长进入动画关键帧；快速重播不重置，连续参数修改只保留一个待播任务，卸载清理定时任务。                   |
| 生命周期     | 减少动态效果、偏好改变、离屏、后台与卸载取消，以及不支持背景模糊时的可读回退；既有首页资源准备、失败、超时、取消与缓存路径测试仍通过。 |

自动测试通过的是函数与受控生命周期环境；不等同于真实浏览器中的减少动态效果仿真、真机性能或故障注入。

## 生产浏览器检查

使用 Codex 内置浏览器检查桌面 1440×900、用户实际窗口 1280×720、手机 390×844 和窄屏 320×844，覆盖中英文。历史图稿对照另有 1586px 宽度截图。

| 场景               | 已观察的结果                                                                                                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 首页与真实展示     | 快捷参数改变预览与当前提示词；详情入口带当前配置，真实展示和分类入口可进入已实现内容。                                                                                 |
| 参数与预设         | 各效果的三个预设可切换；滑块、直接数字输入、Enter 提交、Escape 取消和重置可用，URL 及提示词反映当前值。                                                                |
| 复制               | 等到界面显示已复制后读取实际剪贴板，内容与当前提示词完全相等。新进入手机详情后第一次复制也显示成功。                                                                   |
| 分享与语言         | 分享 URL 包含当前参数和提示词语言；切换界面语言后参数与独立的提示词语言保持。                                                                                          |
| 搜索和返回         | 中英文及别名搜索、空结果与清除可用；从结果进入详情再返回保留查询条件。滚动恢复的精确 190px 证据属于[前一轮验证](effects-library-validation.md)，本轮未重新声明该数值。 |
| 手机导航           | 分类菜单展开、收起和选择入口可用；320px 页面未观察到横向溢出。                                                                                                         |
| 快速操作           | 生产版快速把滑块调至 End、点击 Browse、进入详情，第一下点击均生效。此项覆盖曾出现的整页过渡阻挡点击问题。                                                              |
| 控件修正           | 生产 DOM 中 select 内边距为 `8px 34px 8px 12px`；320px 英文与 390px 中文复拍中值和箭头分开。搜索 input 的 `outlineStyle` 为 `none`、外层为 `solid`，保持单一可见焦点。 |
| 导航中的固定复制栏 | 进入玻璃详情后立即读取，公共祖先 opacity 为 `0.65`，处于淡入阶段；所有祖先 transform 为 `none`，复制栏 bottom 为 `844`，等于视口高度 `844`。随后第一次复制成功。       |

最后一项的动效中数值来自主执行者本轮 CUA 运行输出。[navigation-evidence.json](../.impeccable/review/experience-upgrade/navigation-evidence.json)保存的是另一次稳定帧测量：390×844 视口，祖先 opacity 为 1、transform 为 none，复制栏仍贴着底部。该 JSON 不能单独证明整个过渡过程，整页长截图也不能独立证明固定栏动态定位。

## 审查与修正状态

[初次收尾审查](../.impeccable/review/experience-upgrade/finish-review.md)列出四项问题：

| 问题                                       | 当前处理与证据                                                                                |
| ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| 公共祖先 transform 改变 fixed 复制栏包含块 | 已改为纯 opacity 过渡；生产动效中位置与首次复制复验通过。                                     |
| 窄屏排序文字与箭头拥挤                     | 已移除页面级旧 padding 覆盖；保留共享 select 的箭头留白并复拍。                               |
| 搜索输入内外双焦点                         | 已清除内部 input 焦点轮廓；生产 DOM 与聚焦截图确认外框单圈。                                  |
| 产品与设计文档过时                         | 已移除当前首页词汇索引的错误描述，补充规范来源、共享字段和路径规则；独立审查已评为 resolved。 |

[独立修正判定](../.impeccable/review/experience-upgrade/finish-verdict.md)逐一复看更新后的原路径截图，并核对源码与主执行者生产输出，四项均为 resolved，未发现本批修正新增的可见回归。审查者没有独立运行浏览器；其 ship 限于原四项，不是全表面的重新验收。

实际 build-phase 完成门禁目前仍受旧 comp 的 responsive 对照阻挡，未关闭。现有完成记录和首轮效果库 `ship` 仍是各自当时范围的证据，不替代本轮最终判断。

## 视觉证据与边界

新版截图集中在 `.impeccable/review/experience-upgrade/`。主执行者在最后三项 UI 修正后整批更新；首页通用检查截图 `.impeccable/review/desktop.png`、`mobile.png`、`user-1280.png` 也对应本次页面。

| 对象           | 截图                                                                                                                                                                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 首页桌面与首屏 | [整页](../.impeccable/review/experience-upgrade/home-desktop.png)、[首屏](../.impeccable/review/experience-upgrade/home-first-viewport.png)、[历史图稿尺寸](../.impeccable/review/experience-upgrade/home-comp-size.png)                             |
| 首页手机与窄屏 | [390px](../.impeccable/review/experience-upgrade/home-mobile.png)、[320px 英文](../.impeccable/review/experience-upgrade/home-en-320.png)                                                                                                            |
| 目录           | [桌面](../.impeccable/review/experience-upgrade/library-desktop.png)、[390px](../.impeccable/review/experience-upgrade/library-mobile.png)、[320px 英文](../.impeccable/review/experience-upgrade/library-en-320.png)                                |
| 详情           | [柔和入场](../.impeccable/review/experience-upgrade/detail-reveal-desktop.png)、[磨砂玻璃](../.impeccable/review/experience-upgrade/detail-glass-desktop.png)、[1280px 悬停浮起](../.impeccable/review/experience-upgrade/detail-lift-user-1280.png) |
| 手机详情       | [当前视口](../.impeccable/review/experience-upgrade/detail-mobile-viewport.png)、[玻璃整页](../.impeccable/review/experience-upgrade/detail-glass-mobile.png)、[320px 英文](../.impeccable/review/experience-upgrade/detail-lift-en-320.png)         |
| 状态           | [分类菜单](../.impeccable/review/experience-upgrade/mobile-menu.png)、[空搜索及焦点](../.impeccable/review/experience-upgrade/search-empty-mobile.png)                                                                                               |

旧首页图稿保留丝网套色身份与历史决策价值。本次用户授权改变标题、首屏右侧内容及下方词汇列表，图稿已不再是当前构图的像素规格。[1586px 旧稿差异报告](../.impeccable/review/experience-upgrade/diff/report.json)得分为 `0.6285`（drift，约 63%），[最终 1440px 差异报告](../.impeccable/review/experience-upgrade/diff/desktop-report.json)为 `0.6057`（drift，约 61%）。两者都不能称为视觉还原通过；原构图的 `0.8977`、`0.8667` 等历史分数也不能当作本轮完成凭据。新的布局依据当前简报、真实运行截图与独立审查判断。

## 字体与素材

没有新增栅格图。纸纹、蓝墨与海岸继续使用已有三张获准素材，并保留来源记录。中文字体子集覆盖本轮 481 个请求字符，WOFF2 为 139452 字节（约 136 KiB），已由主执行者通过 Next.js 内置 fontkit 检查字形覆盖；维护方法见[字体说明](../public/fonts/README.md)。

## 未覆盖范围

### 完成门禁的当前阻塞

独立修正判定已返回 `ship`，范围仅为原四项问题全部 resolved。随后实际执行 `build-phase finish --disposition ship`，因当前源码与旧 responsive 记录不同而拒绝；使用本轮真实桌面与手机截图执行 `build-phase advance` 后，旧图稿对照为 `0.6057`，responsive 仍 open。本轮新增的双行标题、快捷参数和真实效果展示与旧稿的词汇列表构图不同，未修改门槛或强制通过。

已按首屏审核流程准备 `.impeccable/review/hero.json`，保持真实入口 `app/[locale]/page.tsx` 并声明 96 个依赖。`component-review prepare` 创建会话 `0a007ba2b7d8ff9aa021404d34417cacb7eb80be0cd5c66ffe5e3278a90b5bcd`；`capture` 返回 `pinned snapshot requires its HTML entry`，没有生成有效审核预览或用户接受凭据。该工具目前不能直接捕获此 Next.js TSX 入口，不能把准备成功写成用户已审核。

本地生产页和上列 CUA 截图可查看，应用开发与列明的验证已完成；旧 responsive 及最终完成门禁仍未关闭。文档整理完成后的再次 `pnpm check` 通过，未改变应用源码。

- 未在真实浏览器中仿真减少动态效果偏好；对应逻辑由自动测试覆盖。
- 未进行真机硬件性能测量、Core Web Vitals 基准、Firefox 或 WebKit 交叉浏览器检查，也未完成屏幕阅读器验收。
- 未注入剪贴板权限拒绝、网络失败或运行时故障；已经实现的错误、重试与手动复制路径不能据此称为本轮故障验收通过。
- 未在外部 AI 项目中逐一复现提示词；配置与复制文本一致不代表所有工具能得到相同图像。
- 尚未部署；本地生产检查不证明线上环境可用性。

历史研究、截图、首版简报与验证记录均保留。共享系统本轮只做窄幅合并，既有 sidecar 的示例文案漂移未修复，理由与检查范围见[文档核对记录](../.impeccable/review/experience-upgrade/documentation-review.md)。
