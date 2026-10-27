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
