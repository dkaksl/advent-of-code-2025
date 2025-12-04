import { readFileSync } from "node:fs";

export const solve = () => {
  const input = readFileSync("../inputs/day4.txt", "utf8");

  const rows = input.split("\n");

  let totalRemovedRolls = 0;

  let reachableRollCoordinates = getReachableRollCoordinates(rows);
  while (reachableRollCoordinates.length) {
    const removedRollsCount = removeReachableRolls(
      rows,
      reachableRollCoordinates
    );
    totalRemovedRolls += removedRollsCount;
    reachableRollCoordinates = getReachableRollCoordinates(rows);
  }
  console.log(`removed ${totalRemovedRolls} rolls`);
};

const getReachableRollCoordinates = (rows: string[]) => {
  const reachableRollCoordinates: { row: number; column: number }[] = [];
  for (let row = 0; row < rows.length; row++) {
    const shelf = rows[row];

    const previousShelf = rows[row - 1];
    const currentShelf = rows[row];
    const nextShelf = rows[row + 1];

    for (let column = 0; column < shelf.length; column++) {
      if (currentShelf[column] !== "@") {
        continue;
      }

      let adjacentRollCount = 0;
      if (previousShelf) {
        if (previousShelf[column - 1] === "@") {
          adjacentRollCount++;
        }
        if (previousShelf[column] === "@") {
          adjacentRollCount++;
        }
        if (previousShelf[column + 1] === "@") {
          adjacentRollCount++;
        }
      }
      if (currentShelf) {
        if (currentShelf[column - 1] === "@") {
          adjacentRollCount++;
        }
        if (currentShelf[column + 1] === "@") {
          adjacentRollCount++;
        }
      }
      if (nextShelf) {
        if (nextShelf[column - 1] === "@") {
          adjacentRollCount++;
        }
        if (nextShelf[column] === "@") {
          adjacentRollCount++;
        }
        if (nextShelf[column + 1] === "@") {
          adjacentRollCount++;
        }
      }

      if (adjacentRollCount < 4) {
        reachableRollCoordinates.push({ row, column });
      }
    }
  }

  return reachableRollCoordinates;
};

const removeReachableRolls = (
  rows: string[],
  reachableRollCoordinates: { row: number; column: number }[]
) => {
  const reachableRollCount = reachableRollCoordinates.length;

  reachableRollCoordinates.forEach((c) => {
    const row = rows[c.row];
    const replacement = row.split("");
    replacement[c.column] = ".";
    rows[c.row] = replacement.join("");
  });

  console.log(`removing ${reachableRollCount} rolls`);
  return reachableRollCount;
};
