import { readFileSync } from 'node:fs'

export const solve = () => {
  const input = readFileSync('../inputs/day6.txt', 'utf8')

  const rows = input.split('\n')
  const rowCount = rows.length
  const lastRow = rows[rowCount - 1]
  const rowWidth = rows[0].length

  const numbers = []

  const totals: number[] = []

  let grandTotal = 0
  for (
    let problemIndex = 0;
    problemIndex < lastRow.split(/\s+/).length;
    problemIndex++
  ) {
    const operators = []
    for (let columnIndex = 0; columnIndex < rowWidth; columnIndex++) {
      if (!/\s/.test(lastRow[columnIndex])) {
        const remainingColumns = lastRow.slice(columnIndex)
        const nextPlusIndex = remainingColumns.indexOf('+')
        const nextTimesIndex = remainingColumns.indexOf('*')
        let nextOperatorIndex: number | undefined
        if (nextPlusIndex === -1 && nextTimesIndex === -1) {
          nextOperatorIndex = undefined
        } else if (nextPlusIndex === -1) {
          nextOperatorIndex = nextTimesIndex
        } else if (nextTimesIndex === -1) {
          nextOperatorIndex = nextPlusIndex
        } else {
          nextOperatorIndex = Math.min(nextPlusIndex, nextTimesIndex)
        }
        operators.push({
          operator: lastRow[columnIndex],
          index: columnIndex,
          nextOperatorIndex
        })
      }
    }

    for (const { operator, index, nextOperatorIndex } of operators) {
      let nextIndex = nextOperatorIndex ?? rows.length
      let total = 0
      const numbers: string[] = []
      for (let rowIndex = 0; rowIndex < rows.length - 1; rowIndex++) {
        const row = rows[rowIndex]

        for (let digitIndex = index; digitIndex < nextIndex; digitIndex++) {
          if (!numbers[digitIndex]) {
            numbers[digitIndex] = []
          }
          if (row[digitIndex]) {
            numbers[digitIndex].push(row[digitIndex])
          }
        }
      }
      grandTotal += total
    }
  }

  for (let columnIndex = 0; columnIndex < operators.length; columnIndex++) {
    let columnWidth = 0
    for (let rowIndex = 0; rowIndex < rows.length - 1; rowIndex++) {
      const row = rows[rowIndex].split(/\s+/)
      const rowDigits = row[columnIndex].length
      if (row[columnIndex].length > columnWidth) {
        columnWidth = rowDigits
      }
    }

    const columnNumbers = []

    for (let rowIndex = 0; rowIndex < rows.length - 1; rowIndex++) {
      const row = rows[rowIndex].split(/\s+/)
      for (let digitIndex = 0; digitIndex < columnWidth; digitIndex++) {}
    }
  }
}
