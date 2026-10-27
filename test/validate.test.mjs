import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { check } from "../scripts/validate.mjs";

const text = (packs) => JSON.stringify({ packs }, null, 2) + "\n";
const e = (id, more = {}) => ({ id, repo: `me/${id}`, latest: "1.0.0", ...more });

test("the committed index.json is valid", () => {
  assert.deepEqual(check(fs.readFileSync("index.json", "utf8")), []);
});

test("schema, sorting and formatting", () => {
  assert.deepEqual(check(text([e("a"), e("b", { deprecated: "Use a" })])), []);
  assert.ok(check(text([e("b"), e("a")])).some((p) => p.includes("sorted")));
  assert.ok(check(text([e("a", { latest: "1" })])).length > 0);
  assert.ok(check(JSON.stringify({ packs: [] })).some((p) => p.startsWith("formatting")));
  assert.ok(check("{").some((p) => p.startsWith("not JSON")));
});

test("deprecation, not removal", () => {
  const base = text([e("a"), e("b")]);
  assert.ok(check(text([e("a")]), base).some((p) => p.startsWith("b: entries are never removed")));
  assert.deepEqual(check(text([e("a"), e("b", { deprecated: "gone" })]), base), []);
});
