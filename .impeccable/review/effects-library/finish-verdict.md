## verdict

1. **Resolved — compact-preview overlap.** The updated `desktop.png`, `mobile.png`, `narrow-320.png` and `user-1280.png` are valid captures. The trigger now occupies a separate bottom row, and the specimen's complete second body line remains visible at 320px and 1280px. Source reserves a 44px control row; the parent also measured clearance through the reveal travel.
2. **Resolved — dead play affordance.** `effect-preview.tsx` now renders the visible compact trigger inside a labeled native button connected to `controller.current?.replay()`. CSS gives it a 44px hit height and visible focus treatment. The parent supplied successful pointer and keyboard playback evidence; this reviewer did not rerun a browser.
3. **Resolved — documentation persistence, by equivalent placement.** PRODUCT.md now records the implemented catalog, detail, search and parameters; the approved design brief records the page conventions and distinguishes historical sketches from production evidence. The validation record preserves future-effect status and untested environments. Keeping DESIGN.md unchanged is accepted: the documenter's quoted ordinary-extension rule prohibits a DESIGN.md change without durable-system-change approval, while these page conventions are recorded in the approved brief.
4. **Resolved — STORY: restore the saved results position.** The current return-results Link in `effect-detail-page.tsx` explicitly uses `scroll={false}`. After rebuilding and restarting the production application, the parent repeated the exact 1280×720 scenario: catalog scroll 190px → Hover lift detail → “返回浏览结果” → final scroll 190px, observed after the heading and refreshed accessibility state were available. This closes the reported override using inspected source and parent-supplied runtime evidence; the reviewer did not independently run a browser.

## remaining

clear

No visual regressions were identified in the four updated captures. The three original fixes and the targeted return-position finding are closed. Ship covers the scored fixes, not the whole surface.

disposition: ship
