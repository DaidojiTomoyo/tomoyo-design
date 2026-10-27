disposition: fix

Calibration uses the supplied risograph board and hero; no dedicated screenprint QUALITY BAR exists. Browser behavior is parent-reported; reduced-motion emulation and copy-denied execution were not tested live.

## persistence

Pass. All ten named captures exist at their stated widths and show the requested content. PRODUCT.md exists. The approved screenprint sidecar records the user's choice. Every phase before review is closed or explicitly skipped, with no forced records; hero scored 0.8977. The parent corroborated `seed:74003f5a2999bf99` with a successful `--check-seed` result. DESIGN.md is correctly deferred until the final verdict.

## fidelity

| Salient element | Classification | Evidence |
| --- | --- | --- |
| Page topology and reading order | match | Compact navigation, margin title/index, broad blue stage, centered landscape specimen, prompt strip, then the three category columns remain in the approved order. |
| TYPE | adaptation | The approved self-hosted font set retains compressed, heavy display lettering and monospaced annotations. Semantic text replaces raster lettering; the first viewport keeps the comp's scale hierarchy. |
| GROUND | match | Same exposed-paper patch averages RGB 244.6/232.3/214.2 in the comp and 244.4/233.5/215.6 in hero-repro; the net rendered ground has no material temperature drift. |
| MATERIAL: paper and coastline | adaptation | The three user-approved production plates are referenced by the implementation and visibly rendered. The coastline preserves the branch, sea, headland, and rocky foreground composition. |
| MATERIAL: blue-grain | adaptation | The final report says missing, but the paired crop visibly contains the approved raster's mottled ink and pale flecks. This is a lower-contrast production stock, not an absent raster or flat CSS substitution; the user's asset approval supports it. |
| Printed frame and registration geometry | contradicted | The comp's irregular vermilion print edge became a clean solid CSS rectangle. The two fine vertical rules continuing through the blue stage from the registration marks are absent. The report's aggregate frame match does not measure these material details. |
| Navigation and header dot | contradicted | Navigation content and wordmark are present. The nav-dot crop confirms the final report's displacement: the dot sits approximately 5px left of its comp position at the comparison scale. |
| Preset index, active mark, and quiet annotations | adaptation | Selection and text synchronize from the same data. Lightened active numbers address contrast; compact screens reflow the index horizontally as required by FORM. |
| Sample-card geometry and rest outline | match | Desktop lift captures retain the wide split image/text card, rounded corners, offset soft depth, and dashed reference outline. |
| Glass specimen content | contradicted | In frosted-glass.png and prompt-expanded.png, the heading gains a third line and the orange specimen mark disappears. The glass-only border reduces the content box; the fixed card height and shrinking mark then break the same-scene comparison promised by STORY. |
| Prompt strip and actions | adaptation | Full-width prompt, vermilion Copy, and outlined Replay remain. The 19px bold Copy label is a documented contrast correction; compact stacking preserves access. |
| Category index | adaptation | Underlined working controls and explanatory text accurately distinguish three live presets from vocabulary. This follows the explicit homepage scope and brief. The category overline separately fails the floor below. |
| Full prompt and how-it-works | adaptation | These are approved functional additions below the comp viewport, with real prompt text, native disclosure, selection fallback, and the stated three-step workflow. |

THESIS and FIRST VIEWPORT hold: the memorable object is the blue printed specimen with its matching words. OWN-WORLD falls short at the frame's print edge and registration continuity. STORY falls short when changing to glass changes the specimen's content layout. FORM holds in the captured compact reflows and code-inspected reduced-motion branch. No commercial claims or fabricated social proof are present. The final detector returned no findings; it was not rerun.

## ceiling

The calibration's physical ink irregularity and continuous registration framing are underused at the outer sheet. Display compression, a substantial specimen, restrained annotation, and raster material are already present. Additional ornament or a new composition is unnecessary.

## material_fixes

1. Fidelity / OWN-WORLD: restore the distressed vermilion frame edge with a raster-based edge or mask and reinstate the two fine stage registration rules; if the approved plates cannot supply that edge, produce: a transparent distressed vermilion frame asset, preserving the current composition and semantic controls.
2. Fidelity / STORY: keep the glass specimen's inner width and spacing identical to the other presets, using a non-layout-affecting border treatment or reserved border space; retain the two-line desktop heading and visible orange mark in both glass captures.
3. Fidelity / nav-dot: align the header dot with the approved comp's position, approximately 5px right at 1586px, while preserving compact-header spacing.
4. Floor / category-intro: remove the small uppercase “Explore effects” eyebrow and its decorative rule above the category headings; place any useful instruction with the existing explanation below the index. The craft floor explicitly bans this pattern even when present in a comp.

## keep

Keep the broad ultramarine specimen, condensed display hierarchy, approved coastline, shared preview/prompt configuration, visible Copy and Replay actions, and responsive single-scene comparison.
