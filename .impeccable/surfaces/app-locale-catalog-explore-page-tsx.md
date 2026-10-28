---
version: 1
slug: "app-locale-catalog-explore-page-tsx"
primary_target: "app/[locale]/(catalog)/explore/page.tsx"
related_targets: ["app/[locale]/(catalog)/effects/[slug]/page.tsx","features/catalog","features/effect-detail","components/effects","content/effects"]
---

# 效果库与详情

2026-10-28 用户批准 `.impeccable/mocks/effects-catalog/` 的分类导航、网格与详情布局，并授权实现。模式：Operate。构建路径：code-led。沿用 DESIGN.md；界面支持中英文、键盘、触屏及减少动态效果。第一批为悬停浮起、柔和入场、磨砂玻璃；本轮继续接入已确认的套色印刷与海岸显影。

## Direction contract

THESIS: Keep one category navigation across browsing and editing an effect. A visitor can find a visual, try it, adjust it, and copy its exact instructions.

OWN-WORLD: The approved paper, blue ink, vermilion state marks and condensed typography, with standard links, search, ranges and copy actions. The blue preview holds the print imagery; controls stay stable.

STORY: Browse the available effects, search across both languages, enter a detail, change parameters, copy the matching prompt or share the configuration, and return to the same results. The 2026-10-28 extension adds Editorial style and Bento grid, following architecture stage three; The next extension adds Overprint and Coastal reveal as contained, independently playable opening, entrance, scroll and text scenes.

FIRST VIEWPORT: Compact header and a 246px category rail. Following the user's 2026-10-28 feedback, the default overview features one tall preview beside two horizontal previews; the new pair follows below, and filtered results use a regular grid. Detail retains the rail and places a large canvas beside a 320px grouped parameter panel, with a persistent copy action. Editorial shows a real headline, image, caption and article; Bento shows five content blocks with different spans. Each has baseline comparison and a narrow preview, with readable content at every width. The sequence previews keep the same canvas/panel composition, reuse the approved coast image, and expose only parameters active in the selected scene. Replay/pause remain outside the moving area; scroll uses a keyboard-accessible inner viewport; text switching changes the sample only. Mobile has a category disclosure, one column and a reachable bottom copy action.

FORM: User-pinned React Bits category structure, initially approved linked HTML sketches, refined under docs/experience-upgrade-brief.md. Earlier rejected draw: seed:648b9982cb48d682; it does not override the user's selection. Signature: a small vermilion selection mark and one moving light-paper navigation plate over stable catalog chrome; local heading, canvas or list, and parameter arrivals follow catalog order. Parameter radio groups move one deep-blue plate with light labels sharing its clipping edge. Interrupted selections continue from the visible frame. Locale transitions affect text only; parameter edits do not trigger a page transition. Fixed copy controls keep their viewport positioning, and demonstrations remain inside their own canvas. Motion details and this repair's evidence are recorded in docs/catalog-motion-refinement.md.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Verification

Check catalog/category/detail, live previews, parameter-to-prompt consistency, invalid URL values, sharing and back navigation, locale preservation, copy fallback, empty search, keyboard and reduced motion. Compare the approved sketches at 1440×900 and 390×844; also check 320px and the actual browser viewport. Keep metadata, Google verification, analytics and existing homepage loading behavior intact. No new raster assets needed.

## Sequence motion scope

The focal sequence is registration followed by a paper wipe for Overprint, and image exposure followed by a horizontal closing mask for Coastal reveal. Scene changes preserve the surrounding controls. List previews do not autoplay; replay waits for actual preview resources, with cancellation and a bounded failure exit. Parameter changes settle the current frame before one debounced replay. Scroll work runs only while visible; reduced motion leaves readable static content and immediate sample-language changes. No homepage loading behavior, global identity, or raster source changes.
