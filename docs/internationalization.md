# 国际化实现与维护

更新：2026 年 10 月 28 日。本文记录当前 next-intl 迁移及维护边界；产品事实见 [PRODUCT.md](../PRODUCT.md)，技术整体分工见 [架构方案](architecture.md)。最终工程检查、44 项自动化测试和生产构建已通过，核心语言切换流程已在本地生产服务验证。具体覆盖与限制见下方验证记录。

## 实现范围

项目使用 next-intl 4.14.9，版本由 `package.json` 和 `pnpm-lock.yaml` 固定。首页、效果库、分类、详情、参数控件、路由状态和动效预览的界面文案均通过 next-intl 读取。工程继续使用根目录的 `app/`、`components/`、`features/`、`i18n/` 和 `messages/`，不创建 `src/`。

本次迁移保留页面结构、营销文案和现有交互。首页中文效果名与注册表统一为“悬停浮起”“柔和入场”“磨砂玻璃”。效果注册表中的名称、描述、别名仍是领域内容，提示词生成器继续读取效果规范；它们不与界面消息混用。

## 文件与消息边界

| 位置                                  | 职责                                                   |
| ------------------------------------- | ------------------------------------------------------ |
| `i18n/config.ts`                      | 界面语言、提示词语言、默认语言、语言标签与路径辅助函数 |
| `i18n/routing.ts`                     | next-intl 语言前缀、检测、cookie 与 alternates 策略    |
| `i18n/navigation.ts`                  | 共用 `Link`、redirect 和路由 hooks                     |
| `i18n/request.ts`                     | 读取当前语言，加载该语言的六个消息文件                 |
| `i18n/messages.ts`、`i18n/types.d.ts` | 消息结构及 next-intl 的 `Locale`、`Messages` 类型声明  |
| `components/i18n/intl-scope.tsx`      | 选择允许传入客户端的消息命名空间                       |
| `i18n/metadata.ts`、`lib/site.ts`     | canonical、语言 alternates 与规范站点地址              |
| `proxy.ts`                            | 复用路由配置处理带语言前缀的请求                       |
| `scripts/check-messages.mjs`          | 执行消息完整性和 ICU 校验                              |

`messages/en/` 与 `messages/zh/` 各有以下六个 JSON 文件。文件内部直接保存命名空间内容，加载时再组合命名空间键。

| 文件                  | 命名空间        | 内容                                                     |
| --------------------- | --------------- | -------------------------------------------------------- |
| `common.json`         | `Common`        | 共用导航、语言控件、预览和路由状态                       |
| `home.json`           | `Home`          | 首页元信息、导航、效果体验、提示词操作、展示区和使用说明 |
| `catalog.json`        | `Catalog`       | 目录导航、搜索、排序、结果与返回入口                     |
| `effect-detail.json`  | `EffectDetail`  | 详情、复制、分享和配置恢复反馈                           |
| `controls.json`       | `Controls`      | 参数、分组、选项与预设名称                               |
| `motion-preview.json` | `MotionPreview` | 开屏提示和动效方案预览工具栏                             |

同步组件使用 `useTranslations('Home')` 等命名空间 hook，异步服务端代码使用 `getTranslations`。动态文案使用 ICU 参数，例如 `t('preview.view', {name})`；保留排版换行的数组通过 `t.raw` 读取，数组本身不执行插值。原有 `content/locales/`、`content/catalog/` 和 `control-copy.ts` 字典已移除。

`i18n/messages.ts` 对英文 JSON 的引用只用于 TypeScript 消息类型。运行时加载当前请求语言，没有额外合并英文消息的 fallback；缺失翻译应在检查阶段修复，不能依赖生产页面自动显示英文。

## 服务端与客户端加载

`next.config.ts` 通过 next-intl 插件绑定 `i18n/request.ts`。请求配置优先使用调用方显式传入的 locale，否则从 `next/root-params` 取得语言根布局的 `[locale]`；不支持的语言交给 `notFound()`。页面消息配置不直接读取请求 headers，也不使用旧式 `setRequestLocale`；浏览器语言协商由入口代理负责，详见下方路由规则。这是当前 Next.js 与 next-intl 文档提供的根参数读取方式。[next/root-params](https://nextjs.org/docs/app/api-reference/functions/next-root-params)、[next-intl 请求配置](https://next-intl.dev/docs/usage/configuration)

服务端并行加载当前语言的全部六个命名空间。客户端只接收当前页面需要的部分，`IntlScope` 总是包含 `Common`，再加入调用方指定的命名空间。

| 作用域                         | 传入客户端的命名空间                            |
| ------------------------------ | ----------------------------------------------- |
| 语言根布局                     | `Common`                                        |
| 首页、动效预览页               | `Common`、`Home`、`Controls`、`MotionPreview`   |
| 目录路由组（目录、分类和详情） | `Common`、`Catalog`、`EffectDetail`、`Controls` |

组件不直接导入全部语言的 UI 字典。首页与动效预览继续通过静态参数预生成；目录、分类和详情依然等待 `searchParams`，按请求渲染当前搜索或效果配置。国际化迁移未改变这些页面的服务端渲染职责。

## 语言路由与切换

界面支持 `en`、`zh`，回退语言为 `en`；公开地址始终带语言前缀。`routing.ts` 设置 `localePrefix: 'always'`、`localeDetection: true`、`localeCookie: false`，代理与统一导航组件共用这份配置。[next-intl 路由配置](https://next-intl.dev/docs/routing/configuration)

用户于 2026-10-28 要求默认读取浏览器语言，此规则取代迁移初版的固定英文入口。访问 `/` 或没有语言前缀的内容路径时，由 next-intl 根据请求的 `Accept-Language` 及语言优先级匹配中文或英文；中文地区变体归入当前中文版本，不支持、缺失或无效的偏好回退英文。明确访问 `/en` 或 `/zh` 时，网址语言优先，不被浏览器偏好覆盖。入口使用 307 临时跳转，保留路径及查询参数；已移除 `next.config.ts` 中先于代理执行的固定英文永久跳转。[next-intl 语言协商](https://next-intl.dev/docs/routing/middleware#locale-detection)

浏览器偏好在服务端入口读取，不通过客户端读取 `navigator.language` 后重新加载。语言 cookie 仍关闭；手动选择通过当前网址保持，不额外记忆到下次无前缀访问。显式 `prompt` 查询参数继续控制提示词语言，浏览器偏好不会覆盖它。既有 `/en`、`/zh` 静态页面与规范地址保持。

站内导航使用 `@/i18n/navigation` 的 `Link`，传入不带语言前缀的内容路径；语言由当前上下文或显式 `locale` 属性确定。本页的原生 `#effects`、`#top` 等锚点保持原样。

`LanguageSwitch` 通过 `languageLocation` 保留当前内容路径、查询参数与锚点。切换时使用 `scroll={false}`，沿用语言跳转标记和 `LocalizedText` 节点；首页 `MotionShell`、开屏、滚动控制器及文字节点 id 保留。仅切换语言或查询参数不会触发 `PageTransition` 的整页淡入。目录与详情内部导航也跳过该公共淡入，由目录内容自身处理局部入场。

## 界面语言与提示词语言

`UiLocale` 与 `PromptLocale` 是独立配置，目前都支持英文和中文。有效的 `prompt` 参数优先；没有有效参数时，若提示词生成器支持当前界面语言，就采用该语言，不支持时使用默认提示词语言。语言切换会先把当前有效提示词语言写入 URL，因此改变界面语言不会同时改变提示词输出。

提示词由 `createEffectPrompt(spec, promptLocale)` 生成。预览、参数、提示词和 `v=1` 分享配置继续使用同一份效果规范。`prompt` 查询参数保存输出语言；界面翻译只影响按钮、说明、状态等 UI 文案。后续增加界面语言时，需要单独决定是否也增加提示词生成能力。

## 元信息与网站地图

`i18n/config.ts` 的 `localeInfo` 统一 HTML `lang` 和语言链接标签：英文为 `en`，中文路由为 `zh`、标签为 `zh-Hans`。`i18n/metadata.ts` 生成当前页面 canonical、对应的 `en`/`zh-Hans` alternates，以及指向默认英文版本的 `x-default`。页面传入不含查询参数的内容路径，搜索、排序与效果配置不产生新的 canonical。

`routing.ts` 关闭代理自动生成的 `alternateLinks`，由页面 metadata 统一管理语言链接。`lib/site.ts` 按以下顺序选择规范站点地址：

1. `NEXT_PUBLIC_SITE_URL`，自定义正式域名使用此配置，格式应包含协议。
2. `VERCEL_PROJECT_PRODUCTION_URL`，自动补上 `https://`。
3. `http://localhost:3000`，供本地开发使用。

`.env.example` 提供配置提示。发布前需要核对正式环境中的域名，避免 canonical 和网站地图仍指向本地地址。

`app/sitemap.ts` 由当前效果注册表生成首页、效果库总览、两个分类、三个效果详情的中英文地址，共 14 条；每条包含对应语言 alternates。网站地图不收录查询组合与动效预览路由。动效预览页继续设置 `index: false`、`follow: false`。

## 文案维护与检查

修改 UI 文案时，在两个语言文件中维护同一消息键；效果参数与提示词模板仍在 `content/effects/` 中维护。新页面只给 `IntlScope` 增加需要的命名空间，避免让首页携带目录或详情的 UI 消息。新增命名空间时同步更新请求加载器、消息类型与检查脚本中的清单。

`pnpm i18n:check` 使用 ICU 解析器检查每种语言的消息，并以英文为参考比较键、值结构、结构化数组和占位符名称及类型。空消息、非法 ICU、缺失或额外消息键、占位符不匹配会令命令失败。该命令已纳入 `pnpm check`，与 ESLint、Prettier 和 TypeScript 一起执行；应用变更仍需运行 `pnpm build`，语言导航和提示词相关变更同时执行 `pnpm test`。

增加语言时，应同步语言配置、消息目录、字体字形、路由与元信息，并单独评估提示词语言支持；检查通过后再验证对应页面与切换路径。运行时不提供额外英文 fallback。

## 验证状态

验证日期：2026 年 10 月 28 日。浏览器检查使用本地生产服务 `http://127.0.0.1:3006`，桌面视口为 1280 × 720，手机视口为 390 × 844。

| 工程检查                 | 结果                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `pnpm check`             | 通过，包含 ESLint、格式、TypeScript 与六个命名空间的消息校验 |
| `pnpm test`              | 44 / 44 通过                                                 |
| `pnpm build`             | 通过                                                         |
| 已检查页面的浏览器控制台 | 无 warning 或 error                                          |

### 已验证的用户流程

- 中英文首页、效果库搜索、`soft-reveal` 与 `frosted-glass` 详情均可渲染；补充检查了英文 `motion` 分类、中文 `material` 分类与英文 `hover-lift` 详情，页面使用对应语言。
- 中文界面切到英文后，原英文提示词全文逐字一致；在英文界面单独选择中文提示词，界面仍为英文。再次切到中文界面后，测试配置中的位移 48px、时长 700ms、延迟 160ms 等参数值保持。
- 切换界面语言保留 URL 查询与锚点。中文详情没有显式 `prompt` 参数时，切到英文会写入 `prompt=zh`，保留原提示词语言。
- `q=glass&sort=name` 跨语言保留；进入详情后返回目录，链接匹配当前界面语言并保留 `q`、`sort`。单条结果的英文 `1 effect` 与中文 `1 个效果` 显示正确。
- 首页切换语言后的状态为 `data-entry-kind=language`、`data-motion-phase=complete`，没有重播资源加载开屏。原有 `LocalizedText`、View Transition、回退动画和 CSS 未修改。
- 手机视口下，界面与提示词语言可以独立选择，没有横向溢出。
- `/zh/effects/not-an-effect` 呈现中文未找到说明，并包含 `noindex`。`/zh/motion-preview/type` 与 `/en/motion-preview/coast` 的开屏和工具栏使用对应语言，均包含 `noindex, nofollow`。

### 元信息与证据

已检查详情 HTML 的语言标签、canonical 与三个 hreflang 链接；canonical 不含查询参数。本地未配置正式域名时，canonical 使用 `http://localhost:3000`，与 `lib/site.ts` 的回退值一致。实际浏览器测试端口为 3006，不会自动改变规范域名配置。

构建产物中的中英文首页静态 HTML 包含对应语言的标题、HTML `lang`、canonical 和原有 Google 验证标记。静态路由清单保留中英文首页、六个动效预览页与 sitemap，目录、分类和详情继续动态渲染。网站地图包含 14 个唯一 URL、42 个语言 alternate 链接，没有查询参数或动效预览地址。

截图与结构化记录：

- [英文界面与中文提示词](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/.impeccable/review/internationalization/english-ui-chinese-prompt.png)
- [手机上的独立语言选择](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/.impeccable/review/internationalization/mobile-independent-language.png)
- [构建与网站地图证据](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/.impeccable/review/internationalization/build-evidence.json)
- [浏览器状态与路由证据](/Users/peipei/mine/wanwan-Workspace/tomoyo-design/.impeccable/review/internationalization/browser-evidence.json)

### 验证边界

浏览器原生 View Transition 的逐帧视觉表现和 `prefers-reduced-motion` 媒体模拟尚未测试；本轮不作跨浏览器引擎的完整动画视觉通过结论。正式自定义域名环境未在本地检查中覆盖。

历史首页与效果库验证继续保存在各自文档中，不替代本次国际化验证。

### 完成钩子的响应式复验

补充检查当前首页：英文 1440px、中文 1280px、中英文 390px，以及英文 320px。五张全页截图均在资源加载完成后采集，并由主执行者和独立审阅者逐张检查；未发现横向溢出、主体裁切或控件重叠。

历史首页构建仍绑定最早的 screenprint 图稿，未纳入后来批准的文案与效果展示布局。用本次截图重跑门禁后得分约 63%，低于 65%，`responsive` 仍未关闭，`finish --disposition ship` 被拒绝。因此本轮工程、语言功能和静态响应式回归通过，不等于旧图稿的一致性验收通过。详细证据、原始尺寸及实际收尾状态见[完成检查记录](../.impeccable/review/internationalization/finish-review.md)。

### 开发服务持续刷新排查

2026-10-28 在 `127.0.0.1:3002` 复现开发页面持续刷新：浏览器反复输出 Fast Refresh、HMR connected 和 Analytics 初始化，页面难以停留。应用源码未发现自动刷新循环，语言代理也没有相互重定向。仅在原端口重启开发进程、保留源码及构建缓存后恢复；首页语言切换、目录、详情和独立提示词语言操作均正常，空闲观察没有新增刷新日志。

现有证据支持旧开发进程的热更新状态异常，但没有捕获旧连接的 WebSocket 消息，不能将具体原因断定为某个依赖缺陷。该次处理未修改应用逻辑。后续调整语言代理、Next 配置或依赖后，除生产构建外，还应验证正在运行的开发页面；若出现同样症状，先检查开发服务及浏览器日志，再重启对应项目进程，不应通过移除语言切换或加载动画掩盖问题。

### 浏览器默认语言补充验证

2026-10-28 开启浏览器语言检测并移除固定英文重定向后，再次通过 `pnpm check`、44 项测试和 `pnpm build`。本地开发服务的 17 组 HTTP 检查全部通过：覆盖中文地区变体、英文、不支持或无效偏好、语言优先级、URL 前缀优先、路径及参数保留和关闭的语言 cookie；每个重定向目标均返回 200，没有继续跳转。

实际浏览器访问 `/` 后进入 `/zh`；点击英文入口后保持 `/en?prompt=zh`，页面状态为 `data-entry-kind=language`、`data-motion-phase=complete`。控制台未出现错误、警告或反复 HMR 连接。此次补充路由检查使用开发服务，生产环境执行了构建检查，未额外启动生产服务复测。HTTP 记录见[浏览器语言路由验证](../.impeccable/review/internationalization/browser-language-routing.json)。
