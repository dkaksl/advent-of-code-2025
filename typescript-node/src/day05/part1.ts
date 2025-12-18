import { readFileSync } from "node:fs";

export const solve = () => {
  const input = readFileSync("../inputs/day5.txt", "utf8");

  let available: string[] = [];
  const rows = input.split("\n");

  const ranges = [];

  console.log("getting ranges");
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (/^\s*$/.test(row)) {
      console.log(
        `found separator; breaking from range parsing loop at line ${i}`
      );
      available = rows.slice(i + 1);
      console.log(`available ID count: ${available.length}`);
      break;
    }

    const range = row.split("-");
    const from = parseInt(range[0]);
    const to = parseInt(range[1]);

    ranges.push({ from, to });
  }
  console.log(`got ${ranges.length} ranges`);

  let freshCount = 0;
  console.log("evaluating available IDs");
  for (const row of available) {
    const id = parseInt(row);
    for (const range of ranges) {
      if (id >= range.from && id <= range.to) {
        freshCount++;
        break;
      }
    }
  }

  console.log(`fresh ingredient count: ${freshCount}`);
};
