import { readFileSync } from "node:fs";

export const solve = () => {
  const input = readFileSync("../inputs/day4.txt", "utf8");

  const rows = input.split("\n");

  let totalReachableRolls = 0;

  for (let row = 0; row < rows.length; row++) {
    const shelf = rows[row];

    const previousShelf = rows[row - 1];
    const currentShelf = rows[row];
    const nextShelf = rows[row + 1];

    let reachableRolls = 0;
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
        reachableRolls++;
      }
    }
    console.log(`reachable rolls on row ${row}: ${reachableRolls}`);
    totalReachableRolls += reachableRolls;
  }
  console.log(`reachable roll total: ${totalReachableRolls}`);
};
