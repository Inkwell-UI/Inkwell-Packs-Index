# Inkwell Packs Index

The curated `index.json` of community node packs that the Inkwell editor reads for discovery. The full design is in `Inkwell Design Spec.md` (workspace root), section "Node packs". Where this file and the spec disagree, the spec wins; fix this file.

## Contents and commands

- `index.json`: `{ "packs": [ { "id", "repo": "owner/name", "latest": "1.2.3", "description"?, "deprecated"?: "<reason>" } ] }`, the Spec's `PackIndex` (SPEC-CHANGES W2). A pack's release is the asset `pack.zip` on the tag `v<version>` (Spec `packAssetUrl`).
- `yarn validate` (`scripts/validate.mjs index.json [--base <old index.json>]`): schema, sorting, formatting and, with `--base`, that no entry was removed. `yarn test`: tests of the validator. `inkwell-spec` is `link:../Inkwell-Spec` (run `yarn build` there first).
- CI: `.github/workflows/validate.yml` checks out Inkwell-Spec beside this repo, builds it and validates against the pull request's target branch.

## Rules that are easy to break

- **Data only.** The index lists packs; it never contains pack code or copies of packs.
- **Entries point to GitHub release assets,** not the GitHub API.
- **Listings arrive by pull request.** Validate each entry against the index schema from `inkwell-spec` in CI; reject entries that fail.
- **Never remove an entry silently.** Mark it deprecated with a reason, so existing projects still resolve their lockfiles.
- **Keep it boring:** sorted by pack id, stable formatting, one entry per pack, so diffs stay readable.
- **Trust labels** (official, verified, community) come later; don't add them until the spec defines them.

## Agent logging (required for all agents and subagents, any model)
Log your work in `d:\Mods\Inkwell\agents-logs\YYYY-MM-DD.md` (today's date).
1. Log one entry per user request, including short follow-ups ("try this fix", "yes do it"). Write it before your first edit for that request, not after. Only log when you actually write something (files, code, config); if the request is research only, don't log. Before writing, open today's log; if it doesn't exist, create it with the heading `# Agent log — YYYY-MM-DD`.
2. Append (never edit or delete) one entry:
   ```
   ## HH:MM · agent|subagent (model-id)[, spawned by agent HH:MM]
   - **User request:** one-line summary
   - **Doing:** one or two lines on how you're fulfilling it
   ```
3. Say `subagent` if another agent spawned you automatically, otherwise `agent`.
4. The entry may be written by a haiku model.
