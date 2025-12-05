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

  const sorted = ranges.sort((a, b) => a.from - b.from);
  console.log(sorted);

  const merged = mergeRanges(sorted);
  console.log(`range count after finalizing merge ${merged.length}`);
  console.log(merged);

  let idCount = 0;
  for (const range of merged) {
    const diff = range.to - range.from;
    console.log(`diff ${diff}`);
    idCount += diff + 1;
  }
  console.log(`max fresh ID count ${idCount}`);
};

const mergeRanges = (ranges: { from: number; to: number }[]) => {
  let rangeCount = ranges.length;
  mergeRangesOnce(ranges);
  if (rangeCount > ranges.length) {
    console.log(`range count decreased to ${ranges.length}`);
    mergeRanges(ranges);
  }
  return ranges;
};

const mergeRangesOnce = (ranges: { from: number; to: number }[]) => {
  console.log(`merging ${ranges.length} ranges once`);
  for (let i = 1; i < ranges.length; i++) {
    const previous = ranges[i - 1];
    const current = ranges[i];
    if (current.from === previous.to) {
      ranges[i - 1] = {
        from: previous.from,
        to: previous.to >= current.to ? previous.to : current.to,
      };
      ranges.splice(i, 1);
    }
    if (current.from >= previous.from && current.from < previous.to) {
      ranges[i - 1] = {
        from: previous.from,
        to: previous.to >= current.to ? previous.to : current.to,
      };
      ranges.splice(i, 1);
    }
  }
  return ranges;
};
