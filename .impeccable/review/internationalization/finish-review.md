# next-intl 迁移完成检查

日期：2026-10-28。

本轮工程与语言功能验收完成；首页静态响应式回归通过。历史首页 comp 的 `responsive` 仍为 `open`，本次 `finish --disposition ship` 被拒绝，不能沿用旧 `ship` 记录宣称整轮图稿验收完成。

## 当前页面响应式检查

生产构建在 `http://127.0.0.1:3006` 运行。通过 Codex 内置浏览器调整视口，在资源完成、`data-motion-phase=complete` 后从文档顶部采集全页截图：

| 截图 | 检查结果 |
| --- | --- |
| `home-en-1440.png` | 英文桌面三栏预览、参数、CTA 与导航完整 |
| `home-zh-1280.png` | 中文桌面字体、预览和操作完整 |
| `home-en-390.png` | 英文单列布局、参数与复制入口正常 |
| `home-zh-390.png` | 中文单列布局、参数与复制入口正常 |
| `home-en-320.png` | 最窄布局正常；Frosted glass 自然换行，没有重叠 |

主执行者与独立审阅者均逐张打开五张截图，未发现黑块、加载遮片残留、主体缺失、横向裁切或控件重叠。各尺寸 `documentElement.scrollWidth` 等于视口宽度，原始数据见 `responsive-evidence.json`。标准 `../desktop.png` 与 `../mobile.png` 已更新为本次英文 1440 和 390 截图。

以上仅验证截图布局。真实触屏手势、实体设备、原生 View Transition 逐帧表现及跨浏览器性能不在本次覆盖范围；语言功能、44 项测试和构建结果见 `../../../docs/internationalization.md`。

## 历史 comp 门禁的实际结果

构建仍绑定 `.impeccable/mocks/decision/screenprint.png`，该稿包含旧版 Motion / Style / Material 词汇区和旧文案。之后用户要求的文案、首页体验与真实效果展示已经改变这些区域。当前迁移未修改布局 CSS 或动效编排。

1. 执行 `build-phase finish --disposition ship`：退出码 2，原因是 `responsive` 未关闭。
2. 使用本次最新全页截图执行 `build-phase advance`：退出码 2；桌面图为 1440 × 2316，首屏相对旧稿得分约 63%，低于 65%。
3. 按工具顺序打开 `motion-title`、`material-title`、`style-title` 配对裁切及整幅对比图；它们对应旧词汇区，在当前首页已被真实效果展示替换。页面标题、卡片文案和其他区域也存在门禁列出的差异。

工具仍拒绝关闭 `responsive`。没有强制推进、降低门槛、覆盖批准图稿、伪造接受凭据，或用 `fix` / `recapture` 结束这个未通过的阶段。Skill 的 `reference/new-work.md` 明确说明："A refused ship is an unfinished build" 和 "Never record fix to end a run over an open gate"。

实际收尾状态：**本轮 i18n 与静态响应式回归完成；历史 comp fidelity 未解决，当前 ship 被拒绝，responsive 保持 open。** 后续需要使首页验收基准与已经批准的当前布局一致，并通过工具要求的有效验收流程；本次没有擅自修改旧基准。
