# 导航与参数动效文档核对

历史记录：本文对应参数卡顿修正前的实现，保留当时的 300ms 与中段伸展核对结果。最终实现已改为 240ms 整段缓动，见[后续复核](choice-stutter-review.md)及[修正记录](../../../docs/catalog-motion-refinement.md)。

2026-10-28。范围限于本轮侧栏闪烁、连续导航和参数选择动效；沿用已确认的丝网套色身份。独立[完成审查](finish-review.md)已给出 `disposition: ship`，`material_fixes` 为无，且文档一致性项通过；结论仅覆盖本轮窄幅修正。本文记录文档与源码的对应关系，不将旧首页未关闭门禁改记为通过。

## 依据与写入范围

- `components/motion/page-transition.tsx`、`lib/navigation/route-motion.ts`：目录内部跳过根透明度入场，其他路径保留原短淡入；同步 `PRODUCT.md` 的当前路径行为一句和 `DESIGN.md` 的 Navigation。
- `features/catalog/catalog-content.tsx`、`features/catalog/motion/`、`features/catalog/styles/navigation.css`：浅纸底板从当前矩形接续；局部内容等待目标页面，按导航顺序入场；同步 Navigation、sidecar 对应 motion 条目和 catalog surface 的 Signature。
- `components/ui/choice-field.tsx`、`components/ui/use-choice-motion.ts`、`components/ui/fields.css`：原生 radio 状态即时生效，深蓝底板与浅字同裁切，连续改选、无预设收拢和静态结算；同步 Inputs / Fields、sidecar 对应 motion 条目和分段单选说明。
- `docs/catalog-motion-refinement.md` 的验证部分与 `docs/README.md`：记录检查结果、浏览器采样、八张截图及未覆盖环境；独立审查回传后链接其本轮 `ship` 结论。

## 一致性检查

`DESIGN.md` 的 frontmatter 颜色、字体、圆角、间距和组件基础属性没有改动；新增时长、距离与裁切行为只写在组件说明和 sidecar 的 `extensions.motion`。已有 Overview、Named Rules 与 Do / Don't 保留，sidecar narrative 没有重新措辞。

sidecar 的分段单选 HTML/CSS 保留可直接渲染的原生 checked、hover、focus 和减少动态效果回退；同步标签等分、最小宽度与（120ms）背景过渡。说明明确其为独立回退片段，实际测量及裁切动画由应用 `useChoiceMotion` 提供，没有声称面板片段会重现完整运行时动画。

数值逐项核对：导航底板（360ms）；标题（8px、280ms、opacity 0.84 → 1）；其他内容（16px、360ms、opacity 0.9 → 1）；延迟（25ms），最多（50ms）；选项（300ms），中心距离（12%）伸展、上限（14px）；未命中预设退出（180ms）。首次挂载、快速改选、流式抵达、减少动态效果、后台、卸载及固定复制栏边界均依实际实现描述。

本轮七个文档已单独通过 Prettier 检查，`git diff --check` 通过。结构化核对确认 sidecar narrative 与其余组件条目保持原样、新增 motion 名称无重复，八张截图链接均指向现存文件。

## 未纳入规则的漂移与限制

保留既有 example-copy 漂移，未扩大到首页历史文档。上一轮旧首页 comp responsive 门禁和 HTML 入口捕获限制仍未解决。本轮减少动态效果只有导航与内容自动测试及 Choice 源码证据，未完成真实浏览器仿真；真机、GPU 与跨浏览器检查也未覆盖。上述事项均不写成通过，不作为以后页面需要继承的系统规则。
