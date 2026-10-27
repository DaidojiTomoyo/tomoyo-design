disposition: fix

缺少输入：QUALITY BAR card 未提供；未逐行重读全部区域样式、locale 字典及 design.json 的历史组件样例；减少动态、完全禁脚本和后台资源等待没有本轮独立运行证据，相关结论限于源码审查。

## persistence

- **pass — evidence:** 已打开批准稿及全部七张必需最终截图。`desktop.png` 是 EN 1440×1000 视口，`home-zh-desktop.png` 是 ZH 1440×900 视口，`comp-1586.png` 是 EN 1586×992 视口；完整页面分别为 EN `mobile.png` 390×2921、ZH `home-zh-mobile.png` 390×2782、`compact-320.png` 320×2862、`user-1280.png` 1280×1601。均从所声称的页面顶部开始，海岸图可见，没有黑块、空白捕获或横向裁切。没有把两张 1440px 视口当作完整页面。文件虽使用 `.png` 后缀，实际编码为可正常读取的 JPEG，尺寸与可见内容有效。
- **pass — persistence:** `PRODUCT.md` 存在并记录最新资源加载要求；`DESIGN.md` 仍属于已批准的丝网套色世界。`.impeccable/build/state.json` 中 `comps` 显式 skipped，其余 review 前阶段均 closed，所有 forced 字段为空；hero gate 为 0.8977，高于 0.72。`.impeccable/review/hero-repro.png` 存在且已打开。表面简报明确记录用户选择 `screenprint.png`，没有跳过批准点的证据。
- **pass — current authority:** 本轮按用户“加载动画……正在加载资源”的反证进行 fresh full review，不继承 state 中上一轮 `finish: ship`。用户授权的 Humanizer 中英文改写取代原稿句子；构图、材料、字体世界及正式首页活字方向仍由批准决定约束。套色印刷、海岸显影仍是预览与后续动画库内容。
- **pass — separation:** 路由仅校验语言并组合 `HomeContent`；资源收集、屏障、开屏形成、页面入场与生命周期控制分文件，公共语言意图在 `lib/navigation/`，根目录保留 `app/`、`components/`、`features/`。本轮没有引入 `src/` 或将业务重新塞入路由。
- **pending final recording:** 现有 state 的 finish 记录早于本次资源修正，不能代表这批源码已完成最终 gate；本审查提出的两项修正解决并复核后，主执行者须按当前源码完成既定 finish 记录。工程 `pnpm check`、五项 `pnpm test`、`pnpm build` 通过是调用包提供的结果，本角色未重复运行。

## fidelity

先看图得到的原稿元素清单：窄而重的深蓝字标与两项导航、右上角小注和朱红圆点；带磨损的朱红样张外框、套准十字与细线；上沿的橙色序号、分隔线和粗标题；大面积有油墨颗粒的蓝色舞台；左侧三项竖排预设及选中短线；中央浅纸卡、左侧海岸栅格图、右侧两级文字、朱红短线和页码；后方偏移虚线参照框；右侧上下两组注释；底部提示词与实心 Copy、描边 Replay；下方三个大字分类、朱红索引和细线分隔。

测量起点：本次 final report 为 **0.8667 / match**，历史 hero report 为 **0.8977 / match**。本轮 final 的 `nav-note=contradicted`、`category-overline=missing` 已单独打开 paired crop；另打开 blue-grain、copy-button、card-heading、page-ground paired crops。以下人工状态针对当前权威判断，不用总体分数掩盖局部差异。

| 元素 / 区域 | 人工状态 | 图像、源码或授权依据 |
| --- | --- | --- |
| TYPE：字标、主标题、分类大字、注释 | match | Anton / Oswald 保留原稿的重、窄、紧凑直立字形与明确层级；Roboto Mono 保留样本注释的字符节奏。没有用系统显示字体替代正式画面。卡片标题因授权改写缩短，仍维持两行和右半卡主焦点。 |
| TYPE：中文 | adaptation | 用户明确要求中英文首页；Noto Sans SC 用独立字阶和重量承接同一层级，数字与拉丁字标继续使用原字体。在 ZH 1440、1280、390、320 截图中未见溢出或缺字。 |
| MATERIAL：纸面、油墨、海岸 | match | 三张批准栅格均可见，没有以 CSS 渐变、SVG 场景或多顶点遮罩替代。纸纹通过实际 texture URL 绘制，蓝纹在舞台显现，海岸是预览卡主图。 |
| GROUND：页面纸色净结果 | match | 在同尺寸原稿 / 当前截图的无文字区域 `(500,15)-(900,45)`，RGB 平均为 `(244.80,232.32,214.24)` / `(244.59,233.54,215.77)`；底部纸面区域为 `(243.23,232.50,214.47)` / `(244.39,233.22,215.37)`。约 1–1.5 通道值的差异没有形成可见的冷暖偏移；判断基于纹理覆盖后的像素，不只是 token。 |
| brand / navigation / nav-dot | match | 字标、两项导航及圆点保持顶部阅读次序和紧凑体量。新增语言控件位置不压缩主要动作，不遮挡注释。 |
| nav-note（机械 contradicted） | adaptation | crop 确认旧句变为 “Preview here. Build in your project.”，两行小注仍在页眉右侧；机械裁框还截去了新句开头，完整截图没有文字裁切。变化由用户 Humanizer 改写与双语要求授权，不应恢复旧句。 |
| sheet-frame / registration geometry | match | 磨损朱红边框、四个套准十字、贯穿舞台的细线和上沿分隔关系保留；不是干净矩形替代印刷边缘。 |
| sheet-index / page-title / sheet-note | adaptation | 01/03、标题与右侧小注的拓扑保持。当前行动句及“三个可操作示例”属于授权改写；数字仍说明三项真实预设。 |
| stage / blue-grain | adaptation | 油墨颗粒仍清楚存在；paired crop 的蓝色比原稿多一些红分量，同一区域平均约 `(1.39,64.01,175.34)` / `(26.92,64.58,174.68)`。此为已批准生产蓝纹的既有呈现，调用包明确要求保留三张批准材料，未见本轮更换或埋藏纹理；不是素材缺失。 |
| preset-lift / preset-reveal / preset-glass | match | 左侧编号、标签、选中朱红线与分组间细线保留，三项名称对应实际示例。手机改成横排，仍在卡片前。 |
| stage-caption / stage-footer | adaptation | 右侧上下位置、短横线和小注层级保留；内容因授权改写与当前产品事实更新。手机按表面简报收起次要注释，主任务未丢失。 |
| rest-outline | match | 偏移虚线轮廓仍在纸卡后方，建立同一张卡片的抬升参照，不抢夺主图。 |
| sample-card / coast-print | match | 纸卡的两列比例、圆角、软阴影、海岸图面积及前后层次保留。海岸有真实网点和轮廓，卡片不是空白占位。 |
| card-heading / card-body | adaptation | “Sit by the sea.” 与中文海边场景由用户授权改写，替代原稿 AI 感句子；右列仍是强标题加短正文，没有替换示例用途或引入产品承诺。 |
| card-mark / card-index | match | 朱红短横与 01/03 保留在卡片底部，未变成额外按钮或标签。 |
| prompt-label / prompt-field | match | 桌面提示词操作带仍紧贴蓝色舞台，摘要可读；窄屏摘要转为多行，下方没有横向溢出。 |
| copy-button | adaptation | 实心朱红和受纸纹作用的边缘、复制图标、主行动位置保留。大字加粗相对 comp 的差异有已记录的对比度原因，不能为像素相似而缩回低对比的小白字。 |
| replay-button | match | 描边次要动作、回转图标和与 Copy 的强弱关系保留；没有额外“跳过”按钮。 |
| category-overline（机械 missing） | adaptation | crop 确实显示 “EXPLORE EFFECTS” 已删除；这是 craft-floor 对标题 eyebrow 的明确禁止所要求的删除，不能把正确的像素缺失转换为恢复禁用元素的修正。分类大标题承担标题职责。 |
| category-note | adaptation | 独立右侧操作说明仍在同一位置，说明提示词随效果变化；不是新增分类标题。句子改写由用户授权。 |
| motion-title / style-title / material-title | match | 三个大字体量、朱红索引和三栏顺序保持。中文使用相应大黑体；手机按同一顺序竖排。 |
| 三组 description / list | adaptation | 原稿密度、描述与列表的并置保留；下划线区分真实预览入口，其他词条明确为参考，来自 PRODUCT 和表面简报对未实现链接的限制。 |
| 完整提示词、使用说明与页尾 | adaptation | 位于原稿首屏以下，符合已确认的“体验 → 复制 → 交给 AI”路径；full-page 1280/390/320 证据覆盖这些区域，没有虚构目录或商业内容。 |
| 窄屏构图 | adaptation | 依据 FORM 的明确响应规则，预设横排、卡片上下堆叠、主动作靠前、分类竖排。320px 中标题自然换行，按钮和提示词仍可达，没有靠缩成桌面缩略图维持布局。 |

| 契约 / 行为 | 状态 | 证据与范围 |
| --- | --- | --- |
| THESIS | match | 首屏仍是一个可操作的印刷样张，预览和对应提示词相邻，操作目的在第一眼可辨。 |
| OWN-WORLD | match | 纸、群青、朱红、压缩粗体、注释和套准几何贯穿中英文与窄屏；三张材料保留。 |
| STORY | match | 现有玻璃选择与复制证据包含对应完整中文提示词及“已复制”反馈；语言切换后的刷新回到资源检查。这里不把单条交互记录扩张为所有错误分支已经实测。 |
| FIRST VIEWPORT | match | 1440 / 1586 首屏保持“页眉 → 样张标题 → 蓝舞台与预览 → 提示词操作 → 分类开头”的顺序。记忆测试的主体仍是蓝色印刷样张上的海岸纸卡与朱红动作。 |
| FORM / seed | match | FORM 包含 `seed:74003f5a2999bf99`，没有原始 seed key；调用包提供 `check-seed` exit 0 的校验证据。本角色未重跑命令。活字是正式首页唯一整页方向，另两种仍留预览。 |
| FORM / 快速资源与正常等待 | match | SSR `checking` 隐藏正文，250ms 后才显露遮片；实际字体、海岸解码、两种纹理解码进入屏障。六次生产缓存刷新、三次开发刷新均为 `loadingUi=bypassed`；源码的快速路径不调用入场。三类慢资源样本均在 pending 时隐藏正文，ready 后退场；普通首页不再追加 650ms。 |
| FORM / 失败、超时、迟到脚本 | match | 503 为 degraded，11.5 秒图片延迟得到 timeout；受管理的 loading 不被 6 秒未接管恢复打断。late-script 样本和恢复截图支持迟到接管不重新覆盖。JSON 的 observedMs 仅是采样起点后的时间。 |
| FORM / 后台时资源仍 pending | contradicted | `controller.ts:40` 在后台启动时直接 complete；`:87` 的 visibilitychange 同样调用 complete，`:25` 又会 abort 当前资源等待。回到前台仅 scroll.refresh，不再检查资源。因此慢资源期间切走再切回，可在图片/字体仍 pending 时提前露出正文；这个结果由页面可见性决定，违背“加载表示正在等待真实资源”。现有样本没有覆盖这条分支。 |
| 静态降级 / 立即可用与可滚动 | contradicted | `opening.css:27` / `:39` 的 checking/loading html 规则特异性为 `(0,2,1)`，`:309` / `:315` 的 reduced-motion、scripting:none 覆盖仅 `(0,1,1)`。后者的 overflow:auto、animation:none 赢不了前者。禁 JS 的 noscript 立即显示正文，但 html 仍锁滚动至 6 秒动画恢复；减少动态且脚本尚未接管时同样受到影响。 |

Truth / floor：示例被放在明确的预览语境中，未见捏造用户量、评价、收益或性能承诺；纸纹、蓝纹与海岸分别由 layout/base、stage、effect-stage 的真实素材引用交付，final diff 不存在 raster missing。主体没有梯度字、系统显示字体、emoji 图标、重复图标卡片结构、装饰玻璃或硬块阴影；图标为几何图标，编号属于既定样张索引与有顺序的使用步骤。选择、焦点与滚动条有调色。字体尚在下载时的 auxiliary `font-pending.png` 显示临时系统回退，这是加载中的降级证据，不冒充最终字形验收。hook 包提供 opening.css 无确定性问题，motion-studies 的重复提示抑制也不等于通过全部检查；本角色没有运行第二次 detector。

## ceiling

- QUALITY BAR card 未提供，外部质量上限无法评分，不声称 reached。
- 原稿已有的原生手段——套准框、油墨颗粒、纸面、双色海岸、压缩字形、错位虚线和印刷主行动——均保留；本轮无需用新装饰、额外开场停留或新材料补足不存在的外部标杆。
- 当前阻塞点是资源状态和降级可用性，不是再增加视觉表现。

## material_fixes

1. **FORM / 真实资源状态：** 修正 `features/home/motion/controller.ts:40` 与 `:87`，后台启动或切到后台不得把尚未结算的资源直接 complete/abort；可以停止装饰动画，但应保留资源屏障及超时，在资源已结算后才静默完成。补充“真实图片延迟时切走、未就绪前切回”和“后台打开后提前切回”的定点证据，确认 pending 时仍遵守加载状态、ready/degraded/timeout 后才释放且不补播开场。
2. **Floor / 静态降级可用性：** 修正 `features/home/motion/opening.css:309`、`:315` 的 html 覆盖特异性，使减少动态和禁 JS 立即取消滚动锁及恢复动画；同时确保 noscript 路径不依赖 6 秒兜底才能滚动。补充完全禁脚本及减少动态下首帧内容可见、遮片隐藏、滚动未锁的证据。

## keep

保留已批准的丝网套色构图、三张栅格、字体与 Humanizer 双语文案，以及正式首页活字方向、250ms 抗闪烁检查、真实资源屏障、无跳过入口、迟到脚本不盖回和仅预览/主动重播保留完整停留的边界。
