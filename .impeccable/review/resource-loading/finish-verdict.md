## verdict

已重新打开原报告指定的七个同路径最终截图：`desktop.png`、`mobile.png`、`user-1280.png`、`home-zh-desktop.png`、`home-zh-mobile.png`、`compact-320.png`、`comp-1586.png`。视口与完整页面范围有效，海岸图、主要控件及下方内容均可见，没有黑块、漏图或横向裁切；无需 recapture。本轮只评分原报告两项 material fixes。

1. **resolved — 后台资源等待：** 当前 `controller.ts` 不再因启动时 `document.hidden` 提前 complete；后台完成分支位于 `await prepareResources` 之后，visibilitychange 在 `loading + resources=pending` 时保留屏障。已阅读 `tests/loading-controller.test.mjs`：实际控制器源码经转译执行，受控资源覆盖后台启动等待、切走后提前返回仍 pending、后台结算后省略入场三个情形；调用包报告三项控制器与五项屏障测试通过。最终 EN/ZH 浏览器样本仍为 ready/bypassed/complete，重拍画面没有遮片残留。本结论区分控制器单元环境与真实后台浏览器验证，不把前者称为后者。
2. **resolved — 静态降级滚动锁：** reduced-motion 与 scripting:none 的 html 规则均已改为 `html:has(.motion-study[data-motion-phase])`，特异性 `(0,2,1)` 与 checking/loading 锁相同，且位于后方，因此 `overflow:auto` 与 `animation:none` 能实际覆盖原规则；noscript 的内容可见与遮片隐藏规则保留。该结论来自明确的 CSS 级联核对，未声称本轮强制模拟禁 JS 或减少动态的浏览器实测通过。

## remaining

clear。未见此修正批次引入的可见回归；同尺寸最终 diff 为 0.8667 / match，刷新最终样本仍跳过加载层。当前证据支持关闭原两项发现，不新增检查项。

本次 ship 仅覆盖已评分的两项修正，不代表对整个页面重新完整验收，也不扩展为跨浏览器或真机结论。

disposition: ship
