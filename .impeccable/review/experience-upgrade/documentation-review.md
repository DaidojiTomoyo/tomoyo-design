# 体验升级文档核对

2026-10-28。角色：Impeccable documenter。按已授权的共享控件与导航改进执行窄幅合并，不重新访谈、重命名视觉方向或替换既有设计体系。应用源码、样式、测试及历史研究文件未由本角色修改；没有提交。

## 写入与职责

- `PRODUCT.md`：纠正首页词汇索引的过时事实，记录真实展示、特有效果参数、配置和语言连续性；详细参数与验证仍通过文档引用。
- `README.md`：更新现有入口、快捷参数、共享字段、目录职责和验证链接，保留 Node.js 24、pnpm 10.33.4 及已有检查命令。
- `docs/README.md`：新增体验升级简报、验证记录与研究入口；区分首轮历史证据和当前构图依据。
- `docs/architecture.md`：仅更新「当前实现」和「当前实现的职责边界」，补全 schema、presets、共享字段、预览生命周期及 pathname 过渡。后续配方、工作台、iframe、Motion、Zod 与测试框架方案保留原文和规划身份。
- `docs/experience-upgrade-validation.md`：汇总本次实施、21 项自动测试、最后 UI 修正后的 check/build、生产操作与四档视口证据，区分独立四项修正 verdict 已通过与实际旧 comp 门禁未关闭，尚未部署。
- `DESIGN.md` 与 `.impeccable/design.json`：按下方范围同步共享字段与路径规则；本记录负责说明合并边界和未修复漂移。

`docs/experience-upgrade-brief.md` 已与实际实现一致，本角色未改。旧首页及效果库简报、研究、图稿与验证记录均保留。

## 系统窄幅合并

| 实际来源                                                | 记录范围                                                                                                                                                     |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `components/ui/fields.css` 与三个字段组件               | 新增 `field` 6px、`choice-group` 7px，数字、range、select 与单选组的基础 token；仅补录已有滑轨灰与选项纸底，保留既有纸色、群青、朱红及字体分工。             |
| `RangeField`、`ChoiceField`、`SelectField`              | 描述原生语义、数值提交与取消、单一外框焦点、触屏高度和 select 箭头留白；sidecar 新增两种字段片段并更新既有 select 片段，不宣称所有旧控件半径和焦点完全相同。 |
| `content/effects/schema.ts`、`presets.ts`、`prompts.ts` | 把参数来源从首页模块纠正为公共效果规范；旧演示数值注明为默认配置，各效果实际字段留在规范与表面简报。                                                         |
| `components/effects/preview-frames.ts` 与控制器         | 默认参数随当前配置变化，记录 180ms 合并演示与取消；玻璃重播预备段曲线按当前源码纠正为 ease-in。                                                              |
| `components/motion/page-transition.tsx`                 | 新增 240ms、opacity 0.65 → 1 的路径到达规则；忽略 query 和仅语言变化，公共祖先不做 transform，保持 fixed 复制栏的定位。                                      |
| 首页当前导航与 `scroll-motion.ts`                       | 修正已有效果库入口与语言路径描述；移除已不运行的旧分类标题/编号动效记录，保留资源加载屏规则。                                                                |

frontmatter 继续拥有基础 token；sidecar 只补对应色彩元数据、字段片段、760px 字段断点及动效扩展。没有新增非标准 frontmatter 分组。侧栏色阶为观察辅助，不成为新的应用色彩。

同样的共享字段、选择和导航规则在两份系统文件中对应；overview 只补充当前表面简报引用，Creative North Star、定性色彩身份、字体角色及既有命名规则保持不变。原首页量度没有扩展成所有页面的固定模板。

## 证据与验收边界

来源核对覆盖共享字段 CSS/组件、路径与语言导航、首页快捷参数和真实展示、目录结果条件、详情参数面板与固定复制栏、效果规范/预设/提示词/帧定义及预览控制器。已读取初次 `finish-review.md`，按主执行者回传记录最后三项 UI 修正与生产复验；本角色没有另开浏览器、重跑构建或将截图等同于动态验证。

文档检查：本次七份可格式化文件的 Prettier 检查通过，79 条本地文档链接均存在，sidecar JSON 解析通过，已跟踪文档的 `git diff --check` 通过。`docs/architecture.md` 按项目忽略约定保留历史正文格式，只对当前实现与职责段作定点修改。

动效中复制栏测量来自主执行者 CUA 输出；`navigation-evidence.json` 为稳定帧的补充测量。1586px 的旧稿差异为 0.6285、最终 1440px 为 0.6057，均为 drift，不能称作图稿还原通过。旧 0.8977 / 0.8667 分数属于历史构图。

独立 `finish-verdict.md` 已将原四项问题全部评为 resolved，`disposition: ship` 只覆盖这四项。主执行者实际运行 `finish --disposition ship` 后，工具先拒绝过时 responsive 输入；推进阶段并重新对照后，旧首页 comp 的 0.6057 得分仍未通过，responsive 保持 open。当前构图变化已由本轮简报授权，该结果不能包装成像素还原通过，本文也不宣布实际门禁关闭。主执行者继续处理门禁路径；最新状态见 `docs/experience-upgrade-validation.md`。

## 保留且未修复的漂移

已知 `.impeccable/design.json` 的旧提示词/示例文案与当前应用存在 example-copy drift。本次没有重写相关 `prompt-summary`、`prompt-textarea` 和 `sample-card-compact` 片段；写入脚本对这些完整对象做前后相等检查并通过。该漂移不属于用户本次授权的系统控件与导航改进，未用改写历史示例来扩展任务。

没有把固定栏位移、拥挤箭头或双焦点缺陷归纳为设计规则，也没有把未测的真实 reduced-motion、硬件性能、故障注入或跨浏览器环境标成通过。
