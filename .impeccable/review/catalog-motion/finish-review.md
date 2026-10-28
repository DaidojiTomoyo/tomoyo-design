disposition: ship

历史记录：这是参数卡顿修正前的审查，不代表最终时间曲线的验证结果。选项后续改为 240ms 整段缓动，最终复核见 [choice-stutter-review.md](choice-stutter-review.md)，验证见[修正记录](../../../docs/catalog-motion-refinement.md)。

未提供独立 QUALITY BAR 图卡或 detector findings 清单；本轮按已批准的 DESIGN.md、目录表面契约和 craft-floor 审查既有 Operate 表面的窄修。没有新 comp 或新视觉方向；未重审历史首页构图、旧 comp diff 或其未关闭门禁。

## persistence

pass（仅本轮范围）。PRODUCT.md 存在；DESIGN.md、design.json、目录 surface 与 catalog-motion-refinement.md 已同步目录内部豁免根淡入、局部内容衔接和参数裁切规则。历史 HTML 草图的批准记录保留在 surface；它们是既有布局来源，本次没有新的 comp-led 构建。FORM 保留用户指定的分类结构和被否决方向的历史 seed，没有把该 seed 当成本轮新选择。

已逐张打开 desktop-1440.png、library-1440.png、user-1280.png、mobile-menu-390.png、mobile-390.png、english-320.png、narrow-controls-320.png、mobile-controls-390.png；八张均有效，内容与命名一致，无黑屏或缺失主体。前六张提供页面布局证据，后两张提供操作后的原生控件视口证据；Playing 与模糊中的演示属于允许的中间态。手机 full-page 图里复制栏的绘制位置不用于独立证明动态定位。

已核对 browser-evidence.json、主要修改源码及 navigation-motion.test.mjs。27 / 27、pnpm check、pnpm build 与 console error/warning 为空由父线程验证记录提供，本审未重跑测试、浏览器或 detector。真实减少动态效果仿真、真机、跨浏览器与 GPU 平顺性未验证；导航和内容控制器有相关自动测试，Choice 的偏好变化和后台结算以源码审查为限。旧首页 responsive 与 HTML 捕获门禁仍未关闭，本判定不改变其状态。

## fidelity

先于读取方向说明，截图中可见的元素清单为：暖纸场、深蓝压缩标题、紧凑字标和语言入口、持续分类侧栏、预览与分组参数双列、朱红复制动作；手机折叠分类、单列预览与固定复制入口。以下按既有世界与本次三项反馈判定，不把历史草图转成本次新构图规范。

| 元素或契约 | 判定 | 证据 |
| --- | --- | --- |
| TYPE | match | 英文压缩标题、中文黑体层级与参数小字沿用 DESIGN；320px 英文选项自然换行，未因装饰层造成重影或错位。 |
| MATERIAL | match | 既有纸纹和海岸印刷图仍在预览中可见；新增运动使用几何选中底板，没有新造物理材质或素材替代。 |
| GROUND | match | 截图保持 OWN-WORLD 指定的暖纸、蓝墨和朱红关系；本次没有修改底色 token。此项为视觉核对，没有宣称逐像素色差测量。 |
| THESIS：浏览与调参共用导航 | match | 目录及详情保留同一分类结构；动态采样的六个侧栏祖先 opacity 均为 1，移动的是选中底板。 |
| OWN-WORLD：预览表现、控件稳定 | match | 详情只让标题、预览与参数区局部入场；参数改选时根 opacity 为 1，预览与原生控件的职责保持清楚。 |
| STORY：选择、修改、复制配置 | match | radio 值立即提交；预设中间 clip 不等于目标 clip，说明状态更新与装饰运动分离。精确限定预设组的 custom-preset-scoped-check 得到 checked 为 null，与自定义参数提示一致。旧整页查询不作为预设证据。 |
| FIRST VIEWPORT：桌面与手机操作层级 | match | 1440px 列表、1440px / 1280px 详情与 390px / 320px 手机图保持既有层级；320px 文档宽度为 320，底层标签与浅字层的坐标、宽高逐项一致。 |
| FORM：连续导航及参数选中运动 | match | 导航从当前矩形接续；复用内容节点读取当前计算样式；参数从当前裁切区域接续，并取消旧动画。首次挂载不播放这些进场。 |
| 固定复制入口 | match | 导航仍在运动时，copy bar bottom 为 844，等于视口高度；七个祖先 transform 均为 none。父线程随后完成复制，截图保留成功反馈。 |
| 键盘与辅助技术 | match | 原生链接、fieldset、legend、radio 及可见焦点保留；装饰层 aria-hidden 且不接收指针。Escape 关闭手机菜单并将焦点返回 SUMMARY。 |

本轮未新增商业声明、演示数据或栅格资产。craft-floor 检查未发现由本次改动引入的禁用装饰、标签或图标替代；效果画布中的 blur 服务于真实示例。

## ceiling

reached（本轮 Operate 修正范围）。导航底板、短距离内容衔接与同边缘裁切的参数底板给三项反馈提供了明确响应；没有需要补上的新装饰或材料资产。独立 QUALITY BAR 图卡未提供，不宣称完成图卡逐项对照，也不以静态截图宣称完整动画或跨设备性能已获验证。

## material_fixes

无。本轮矩阵没有 missing 或 contradicted 项。

## keep

保留稳定的目录外壳、可中断接续的单一选中底板、原生 radio 与焦点语义，以及不进入 transform 祖先的手机复制入口；继续如实保留本轮覆盖限制和旧首页未关闭门禁。
