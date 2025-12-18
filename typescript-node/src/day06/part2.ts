import { readFileSync } from 'node:fs'

export const solve = () => {
  const input = readFileSync('../inputs/day6.txt', 'utf8')

  const rows = input.split('\n')
  const rowCount = rows.length
  const lastRow = rows[rowCount - 1]
  const rowWidth = rows[0].length

  let grandTotal = 0
  const operators = []
  console.log(`collecting problem coordinates`)
  for (let columnIndex = 0; columnIndex < rowWidth; columnIndex++) {
    if (!/\s/.test(lastRow[columnIndex])) {
      const remainingColumns = lastRow.slice(columnIndex + 1)
      const nextPlusIndex = remainingColumns.indexOf('+')
      const nextTimesIndex = remainingColumns.indexOf('*')
      let nextOperatorIndex: number | undefined
      if (nextPlusIndex === -1 && nextTimesIndex === -1) {
        nextOperatorIndex = undefined
      } else if (nextPlusIndex === -1) {
        nextOperatorIndex = nextTimesIndex + columnIndex
      } else if (nextTimesIndex === -1) {
        nextOperatorIndex = nextPlusIndex + columnIndex
      } else {
        nextOperatorIndex = Math.min(
          nextPlusIndex + columnIndex,
          nextTimesIndex + columnIndex
        )
      }
      operators.push({
        operator: lastRow[columnIndex],
        index: columnIndex,
        nextOperatorIndex
      })
    }
  }

  for (const { operator, index, nextOperatorIndex } of operators) {
    console.log(
      `operator: ${operator}; index: ${index}; nextIndex: ${nextOperatorIndex}`
    )
    let nextIndex = nextOperatorIndex ?? rowWidth
    const problemNumbers = []

    for (let digitIndex = index; digitIndex < nextIndex; digitIndex++) {
      const columnNumberDigits = []
      for (let rowIndex = 0; rowIndex < rows.length - 1; rowIndex++) {
        const row = rows[rowIndex]
        const c = row[digitIndex]
        if (c) {
          columnNumberDigits.push(c)
        }
      }
      const mergedColumnNumber = columnNumberDigits.join('')
      console.log(
        `extracted number ${mergedColumnNumber} from column ${digitIndex}`
      )
      problemNumbers.push(parseInt(mergedColumnNumber))
    }
    console.log(`problem numbers ${problemNumbers}`)
    const problemTotal =
      operator === '*'
        ? problemNumbers.reduce((acc, curr) => acc * curr, 1)
        : problemNumbers.reduce((acc, curr) => acc + curr, 0)
    console.log(`got problem total ${problemTotal}`)

    grandTotal += problemTotal
  }
  console.log(`grand total ${grandTotal}`)
}
