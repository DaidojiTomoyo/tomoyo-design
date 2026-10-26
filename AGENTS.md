# Project conventions

- Keep `app/`, `components/`, and future business directories at the project root. Do not create a `src/` directory. The `@/*` import alias resolves from the root.
- Use pnpm and the committed lockfile. Match the Node.js and pnpm versions documented in `README.md` and `package.json`.
- Use ESLint for code checks and Prettier for formatting. Run `pnpm check` and `pnpm build` when validating application changes.
- Read `PRODUCT.md` for confirmed product context. Use `docs/README.md` as the documentation index, `docs/architecture.md` for the technical plan, and `docs/experience-design.md` for page and interaction proposals.
- Keep product facts in root `PRODUCT.md`. Keep detailed plans, reference material, and research under `docs/` with descriptive kebab-case filenames. Draft visual proposals and initialization placeholders are not an approved design system; root `DESIGN.md` belongs to the later design workflow.

## Commit conventions

- Format every commit subject as `type(scope): description`; the scope is required.
- Choose a type that matches the change (for example, `feat`, `fix`, `docs`, or `chore`) and a scope that names the affected module or concern (for example, `preview`, `animation`, `architecture`, or `init`).
- Keep the subject concise. When useful, add a body separated from the subject by a blank line, using `- ...` bullet points to explain the actual changes and their purpose. Omit the body when the subject is sufficient.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
