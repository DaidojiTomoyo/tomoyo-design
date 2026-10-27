## verdict

1. **resolved — Preserve the effective prompt locale.** `LanguageSwitch` now writes the current resolved prompt language into each destination URL while retaining valid existing prompt values, effect, and hash. The `languageFix` browser records show `/en` → Chinese UI retaining an English prompt, `/zh` → English UI retaining a Chinese prompt, and `/en?effect=soft-reveal&prompt=zh#effects` → Chinese UI retaining all three values. The fresh expanded-prompt capture visibly retains Chinese UI with an English prompt.
2. **resolved — End registration motion at the resting transform.** Both `register-print` keyframes now include `translateY(-50%)`. Across 55 read-only DOM samples the marker center remains at the heading center, 92.5px, with maximum floating-point deviation of approximately 0.0000038px. The resting center is also 92.5px with `matrix(1, 0, 0, 1, 0, -8.5)` and ink opacity 0. The fresh hero and desktop captures show the correctly centered resting marks. This resolves the endpoint jump; the samples are positional evidence, not a performance trace.
3. **clear — Header-placement regression pass.** After moving `LanguageSwitch` before `brand-note` and transferring the automatic margin to the switch, the latest 1280px English/Chinese and 1586px hero captures show separate, legible language controls, note, and dot without crowding or overlap. The 390px and 320px English/Chinese captures retain the wordmark and language controls on the first row and navigation on the second, with no clipping or visible overflow. The glass/prompt capture has the same intact header. Source inspection confirms the effective-prompt URL handling and the centered registration keyframes remain present; this layout-only batch does not reverse either resolved fix.

## remaining

clear. All eight required captures were reopened again after the header adjustment at their original paths: desktop.png, zh-desktop.png, mobile.png, zh-mobile.png, en-320.png, zh-320.png, hero-repro.png, and zh-glass-prompt.png. They remain valid and show the expected top-of-document content and language/state. The final scoped check found no header crowding, overlap, clipping, or compact-layout regression. No new issue search was performed.

This ship covers the scored fixes and the final header-placement regression check, not the whole surface.

disposition: ship
