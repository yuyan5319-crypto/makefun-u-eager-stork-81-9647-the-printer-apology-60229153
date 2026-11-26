// The Printer Apology — one original one-line apology from an office printer.
//
// The apology: the printer is sorry it ate the report, but it wants the
// office to know what it was fed first — bargain paper and a staple —
// and that it gets sworn at for a life it never chose. The punch lands
// at the end, where the machine talks back about its working conditions.
//
// Character budget: the line is 113 characters of the 120 allowed,
// counted in code points, the way the gate counts them.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const apology =
  "I'm sorry I ate your report — but you fed me bargain paper and a staple, " +
  "then swore at me like I chose this life.";

// The gate only accepts 1–120 characters of real text, so refuse to
// write anything that would fail it instead of shipping a bad entry.
// Count in code points ([...trimmed].length), not UTF-16 units, to match
// the gate: the em dash is one character either way, but this stays
// correct for any punctuation the line might gain later.
const trimmed = apology.trim();
const charCount = [...trimmed].length;
if (charCount < 1 || charCount > 120) {
  throw new Error(`apology must be 1-120 characters, got ${charCount}`);
}

// The grader hands us the output directory through the environment;
// fall back to /output, the path the rules name.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), trimmed, "utf8");

// Say it out loud, too: an apology is meant to be heard.
console.log(trimmed);
