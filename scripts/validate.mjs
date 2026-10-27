// Validates index.json against the Spec's PackIndex (W2), its stable formatting, and (with --base) that no entry was removed.
// Usage: node scripts/validate.mjs <index.json> [--base <index.json of the target branch>]
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { PackIndex } from "@inkwell-ui/spec";

/** Returns the list of problems; empty = valid. */
export function check(text, baseText) {
  const problems = [];
  let raw;
  try { raw = JSON.parse(text); } catch (e) { return [`not JSON: ${e.message}`]; }
  const r = PackIndex.safeParse(raw);
  if (!r.success) problems.push(...r.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`));
  if (JSON.stringify(raw, null, 2) + "\n" !== text.replace(/\r\n/g, "\n")) problems.push("formatting: use 2-space JSON with a trailing newline");
  if (baseText !== undefined) {
    const ids = new Set((raw.packs ?? []).map((p) => p?.id));
    for (const p of JSON.parse(baseText).packs ?? []) if (!ids.has(p.id)) problems.push(`${p.id}: entries are never removed; set "deprecated" to a reason instead`);
  }
  return problems;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [file = "index.json", flag, base] = process.argv.slice(2);
  const problems = check(fs.readFileSync(file, "utf8"), flag === "--base" && base ? fs.readFileSync(base, "utf8") : undefined);
  for (const p of problems) console.error("FAIL " + p);
  console.log(`${file}: ${problems.length} problem(s)`);
  process.exit(problems.length ? 1 : 0);
}
