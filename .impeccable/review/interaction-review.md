disposition: fix

Missing input: no standalone QUALITY BAR card exists. Browser interaction was not delegated; this review uses the supplied captures, read-only DOM samples, and source. Reduced-motion and clipboard-denial branches were inspected in code, not forced in the browser. The old hero diff is historical evidence only.

## persistence

Pass for provenance and capture evidence. PRODUCT.md exists; DESIGN.md describes the same screenprint world. The approved choice is recorded in the surface contract and homepage brief. The build state points to `app/[locale]/page.tsx`; comps is explicitly skipped because the approved comp predates the state, every later phase is closed, and no phase has a forced record. The historical hero gate is 0.8977. The entry-path migration does not establish the quality of this extension; this is a new full review.

All eight required files were opened and validated: desktop 1280×1623, zh-desktop 1280×1576, mobile 390×2921, zh-mobile 390×2757, en-320 320×3124, zh-320 320×2791, hero-repro 1586×992, and zh-glass-prompt 1280×2072. Each shows the document top and expected language/state, with no blank regions, arrival occlusion, or visible horizontal overflow. The last capture shows Chinese UI, glass selected, and an expanded English prompt. Files contain valid JPEG images despite their `.png` names. The DOM layout checks report matching document/viewport widths, scrollY 0, and ink-pass opacity 0 for the sampled responsive captures.

`concept-seed --check-seed seed:74003f5a2999bf99` returned SEED KNOWN with exit 0. The parent reports final `pnpm check` and `pnpm build` passing, `/en` and `/zh` generated statically, `/` redirecting to `/en`, and `/fr` returning 404. No second detector pass was run; the supplied active-hook result has no deterministic findings.

## fidelity

Independent comp inventory: warm paper field; compressed dark-blue lettering; compact wordmark/navigation; vermilion registration frame; title and counter in the upper margin; a broad textured ultramarine stage; three numbered presets at left; a large landscape-and-text paper specimen floating over a dashed reference outline; small right-side annotations; an immediately adjacent prompt strip with a solid vermilion Copy action; three oversized category headings below.

The fresh final diff scores 0.8919. Its four missing/contradicted regions were opened as paired crops and judged explicitly below; the old hero report does not override these captures.

| Salient element | Classification | Evidence |
| --- | --- | --- |
| TYPE | match / adaptation | English retains the condensed heavy display character, narrower specimen headings, and monospaced annotations. The self-hosted Chinese face preserves weight and hierarchy; script-specific lettering is an adaptation authorized by the user's multilingual request. |
| MATERIAL | match | All three spec plates are referenced in source and visibly shipped: paper grain, blue grain, and coastal print. The real paper plate also modulates the irregular frame. No gradient or vector illustration substitutes for the plates. |
| GROUND | match | The final report measures dominant `#f7e8d8` in both comp and build; the net paper field stays warm cream. The rendered blue is somewhat quieter, but remains an ink surface rather than a flat replacement. |
| Header and navigation | adaptation | Wordmark, genuine anchors, note, and dot remain. EN / 中文 adds an authorized language control. The nav-note crop is labeled contradicted because its old coordinate now contains the switch; the complete capture shows the note moved left intact. This is an approved extension, not lost content. |
| Frame, upper title, counter, stage, side notes | match | Reading order, wide stage, rough vermilion frame, registration geometry, and hierarchy remain identifiable at 1586×992. |
| Blue-grain region | match | The paired crop labeled missing visibly contains irregular raster ink grain. The source uses the specified `blue-grain.png` at 0.48 opacity; texture remains perceptible across the stage. The missing verdict is not supported by the crop. |
| Presets, specimen, coast image, outline | match | The same landscape-and-text card remains central; a stable outer button owns hit testing while its inner surface moves. The glass capture retains the content box and line breaks. |
| Card-mark region | match | The paired crop labeled contradicted retains a complete short vermilion rounded rule of the same visual role and width. Small-band color/resampling drift does not establish a geometry or material replacement. |
| Prompt strip, Copy, Replay | adaptation | The primary action and adjacent replay remain visible; the larger bold copy label follows the recorded accessibility adaptation. Compact layouts reorder actions before the wrapped summary, as the responsive contract permits. |
| Category index | match / adaptation | Oversized three-part taxonomy and lists remain. The missing category-overline is the explicitly removed eyebrow, recorded in the brief and required by the craft floor; its removal is intentional. |
| Prompt workspace and instructions | adaptation | These implement the product's inspect/copy/use sequence below the first viewport. Actual presets are underlined; inert vocabulary is labeled honestly. |
| Arrival registration motion | contradicted | New keyframes replace the centering transform and end at a different position from the resting rule; the resulting end jump violates the current motion thesis. See fix 2. |
| UI/prompt language independence | contradicted | Explicit prompt choices survive UI navigation, but the effective default does not. See fix 1. |

THESIS is kept: the specimen leads and copying follows immediately. OWN-WORLD is kept in type, assets, frame, and color. STORY is kept for selecting, replaying, inspecting, and copying, with the language-preservation defect below. FIRST VIEWPORT keeps the category index in the desktop opening and the main actions reachable on compact screens. FORM has a verified seed and consistent responsive translation; the new arrival endpoint still needs correction.

The three-round soft→glass→lift samples select the expected effect on all nine clicks, with hitY fixed at 149.671875 and opacity continuing from in-flight values. The recorded interruption moves from opacity 0.825367 / translateY 2.09559 to 0.919267 / 0.968791 rather than resetting to an invisible first frame. These are DOM samples, not a performance trace or a guarantee of 60 fps. The controller ignores same-effect replay while demonstrating, reads the current frame before cancellation, and settles to a visible end state. Keyboard Enter retains focus on effect-preview with a solid outline. The supplied console error list is empty.

Cursor and focus are stable by construction: button descendants inherit the pointer cursor, the animated surface cannot take pointer events, and Copy uses an in-flight guard plus ARIA state without changing to a native disabled cursor. Copy failure opens and selects the readable prompt; this recovery was source-inspected only. Reduced-motion branches leave the content and static glass visible, cancel displacement, and retain focus/status feedback. `useSyncExternalStore` supplies a deterministic initial server snapshot and restores URL state on hydration; explicit query state is therefore a client restoration, not a server-selected preview.

## ceiling

No separate quality-bar comparison is possible because no card was supplied. Against the approved world, the real raster field, irregular ink frame, registration geometry, compressed lettering, and bounded paper-reveal entrance use its native devices. The focal sequence is specific to the printed specimen; the guide animation is confined to three step numbers. No looping decoration or repeated whole-section reveal was added. The arrival endpoint defect prevents calling the motion finish complete. No invented commercial claims or unsupported live categories appear, and the removed eyebrow remains absent.

## material_fixes

| Order | Priority | Material fix and acceptance condition |
| --- | --- | --- |
| 1 | P2 | **Preserve the effective prompt locale when changing UI locale** — `components/home/language-switch.tsx:9` carries only the raw suffix, while `components/home/use-home-selection.ts:25` falls back to the current UI locale. Starting at `/en` with its default English prompt and clicking 中文 therefore goes to `/zh` and silently changes the prompt to Chinese. Build the language URLs with the current resolved prompt locale, preserving the existing effect and hash. Verify both directions without first touching the prompt selector, plus an explicit opposite-language choice. This is required by the current brief's independent-language and preservation promise. |
| 2 | P2 | **End registration motion at the resting transform** — `app/globals.css:1488` animates only rotate/scale, replacing `.registration-mark`'s `translateY(-50%)` at line 209. When the 520ms animation ends, the mark jumps upward by half its height (about 8.5px at 1586px). Include the centering translate in both keyframes or animate independent rotate/scale properties. Verify the final animated frame and the resting frame have the same position, including a fresh load without early interaction. This is required by the new homepage motion thesis and continuity floor. |

## keep

Keep the approved paper/ink plates and rough frame, the fixed preview hit area, current-frame interruption, same-effect replay guard, glass content dimensions, semantic localized controls, visible default content, and the desktop-to-320px task order while applying these two fixes.
