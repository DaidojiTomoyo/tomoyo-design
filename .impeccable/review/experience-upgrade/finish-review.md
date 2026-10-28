disposition: fix

输入限制：未提供独立的 QUALITY BAR 图卡，以指定的 `docs/research/2026-10-28/home-and-parameter-review.md` 为研究基准。未读未抽样的实现文件、完整测试日志及全部差异裁片；未运行浏览器、重新截图或第二轮检测。

## persistence

fail — 本轮文档与收尾记录尚未完成；已有方向、产品与素材记录存在。

- 所有 16 张指定页面截图已打开：首页 1440、1280、390、320 及 1586 对照尺寸，目录 1440、390、320，详情 1440、1280、390、320，移动菜单和空搜索。内容、顶部、尺寸与文件所指页面相符，没有缺失或空白证据。详情长截图中固定复制栏位于原生视口高度的位置，不能据此认定页面内容被永久覆盖。
- `PRODUCT.md` 存在；`.impeccable/build/state.json` 的 `comps` 为 skipped，spec、plates、hero、sections、motion、responsive、review 均为 closed，无 forced。历史 hero 得分 0.8977；不是未证明的原始构建。review 的新注记已记录此次用户授权与重新评审要求，但旧 closed 记录和旧分数不是本轮完成凭据。
- 当前简报明确批准首屏调参、真实预览替换词汇列表、目录尺度调整；目录表面为 code-led，旧首页图稿仅保留身份来源作用。无需恢复旧列表或再选一个视觉世界。
- FORM 中 `seed:648b9982cb48d682` 经 `concept-seed --check-seed seed:648b9982cb48d682` 确认为本机记录；简报也明确它是已拒绝方向的记录，不覆盖用户选定结构。
- `PRODUCT.md:45` 仍声称首页有下划线词汇索引；`DESIGN.md:352` 仍描述真实入口与静态词汇并存，`:364` 仍将参数来源写为 `content/home-effects.ts`，并缺少本轮共享控件、按效果参数与路径过渡规则。应在本轮 documenter 阶段更新。

## fidelity

历史 comp 的主要元素是暖纸底、朱红粗糙外框与套准标记、窄字标、横向标题条、大群青画布、左侧三个编号、中央海岸卡片、右侧注释、底部朱红复制与轮廓重播，以及三栏大字号分类。当前用户反馈与 `docs/experience-upgrade-brief.md` 授权改写标题、右侧注释和下方分类构图，因此这张图不再是本轮构图的像素规格。

已读历史 hero/final 报告及本轮报告。本轮对旧规格得分 0.6285（drift），不能称为像素复现通过。已打开的 brand/navigation 裁片落在新标题区域，blue-grain 裁片包含新增控件，copy/replay 裁片没有包含按钮完整高度；这些坐标裁片不证明字标、油墨或动作缺失。`home-comp-size.png` 与 side-by-side 可见这些要素。旧 final 中 category-overline 的 missing 也不构成恢复眉题的理由。

| 检查项 | 状态 | 证据与依据 |
| --- | --- | --- |
| TYPE | match | 英文仍是压缩展示字与等宽注释，中文保留清楚的粗黑标题层次；layout 明确自托管 Anton、Oswald、Roboto Mono、Noto Sans SC。没有用系统展示字体替代。 |
| MATERIAL | match | 纸纹、蓝墨与海岸均由 spec 中的三张 raster plate 提供；layout 与 EffectPreview 引用实际素材，截图中可见其纹理和图像。没有用 CSS 图案冒充海岸素材。 |
| GROUND | match | 依据 OWN-WORLD 和 paper-grain 对照裁片，页面暖纸色仍一致，目录沿用同一纸色；这是视觉判断，未取得像素采样值。 |
| 首页标题、右侧内容与 Browse 动作 | adaptation | 两行标题、直接目录入口和可调参数依据本轮简报“第一屏直接操作真实效果”；不再保留原稿右侧非交互注释。 |
| 首页图像、套准框、编号与主要动作 | adaptation | 群青舞台与真实海岸卡片保留，位置及中文重排服务新增控件；复制仍为朱红主动作，重播为轮廓动作。 |
| 原三栏分类与词汇列表 | adaptation | 真实的照片卡、文字卡、玻璃卡与分类入口取代旧列表，直接依据本轮用户反馈和简报；不应重新加入不可操作词条。 |
| 目录与分类栏 | match | 保留 246px 分类栏；总览一幅高预览与两幅横预览，手机单列及可展开分类。实际只有三个效果，无虚构规模。 |
| 详情预览与特有效果参数 | match | 6 项 lift、7 项 reveal、7 项 glass 参数与三种各自预设符合简报；分组、单位、数值编辑入口、复制与分享均可见。 |
| 参数、预览与提示词的同源关系 | match | `resolveEffect`、`parameters`、`effectQuery`、`createEffectPrompt`、`preview-frames` 使用同一解析规格；源码抽样未见截图与参数描述矛盾。实际剪贴板、返回、分享与键盘行为采用父任务的验证记录，不从静态图推断。 |
| THESIS / STORY | match | “浏览—试用—调参—复制”有可见入口，返回结果与语言保持有对应状态实现；没有为展示扩充不真实产品功能。 |
| FIRST VIEWPORT | match | 首页能记住纸色/群青舞台和可操作海岸卡片；目录展示真实效果，详情大画布与分组面板对应明确。320px 截图没有横向内容溢出。 |
| FORM / 连续性 | contradicted | PageTransition 对包含所有页面内容的共同祖先应用 transform，动画期间会改变手机 fixed 复制栏的包含块；稳定后的截图不能证明这 240ms 无跳动。 |
| 公共控件 | contradicted | `library-en-320.png` 的 Recommended 尾部与 chevron 重叠；`search-empty-mobile.png` 的输入框出现内外两道焦点环。均与“一致边界与焦点”承诺冲突。 |

OWN-WORLD 已保留。示例为明显的演示卡内容，没有虚构客户、数量、评价或商业承诺。未发现需要新增栅格素材的缺口。父任务报告的 check、build、21 项测试与生产控制台结果属于外部验证证据，本审查未独立重跑，也不扩展为浏览器 reduced-motion 或性能基准通过。

## ceiling

当前首页真实调参、连续展示三种真实效果，以及目录和详情不同预览尺度，已采用研究记录中的主要产品展示手法。操作界面的余下差距是共享控件的内留白、单一焦点轮廓和导航过程中的固定工具稳定性；不需要添加装饰、假统计、更多卡片或更密集纹理来补足。未发现现有印刷世界必须补做的素材或字形处理。

## material_fixes

1. **连续性 / FORM：** 修正 `components/motion/page-transition.tsx:17` 的共同祖先 transform；`app/[locale]/layout.tsx:133` 包住全部页面，而 `features/effect-detail/styles/workspace.css:197` 的手机复制栏为 fixed。共同祖先只淡入，或把位移限定在不含 fixed 工具栏的内容层；验证进入详情的整个 240ms 中底栏仍贴着视口，且第一下点击有效。
2. **公共控件：** 删除或收窄 `features/catalog/styles/listing.css:65` 的 `padding: 5px 4px` 等旧 select 布局覆盖，让 `components/ui/fields.css:166` 的 34px 箭头预留生效；复拍 320 英文和 390 中文目录，值与 chevron 必须完全分开。
3. **公共控件 / 焦点：** 为 `.catalog-search input:focus-visible` 明确移除内圈，保留 `.catalog-search:focus-within` 的单一外圈；目前 `features/catalog/styles/base.css:32` 的广泛焦点规则覆盖 input 的普通 outline:none。复拍键盘聚焦或已输入的搜索框，并保留清晰可见的焦点。
4. **持久化 / FINISH：** 由 documenter 更新 PRODUCT 与 DESIGN 中的旧词汇索引、参数来源及控件/过渡规则；把本轮修正、复验和独立 verdict 追加到当前构建完成记录，明确旧 0.8977/0.8667 分数属于原始构图，不将本轮 0.6285 对旧规格的差异包装成像素一致。

## keep

保留纸色、群青、朱红与真实 raster 材质、压缩英文和粗黑中文层次、用户指定分类栏、真实三效果展示、按效果分别定义的参数，以及资源实际就绪才结束加载、URL 配置与提示词同步、metadata/analytics 的既有行为。
