export const solve = (input: string) => {
  const rows = input.split('\n')
  const rowWidth = rows[0].length

  console.log('processing input')
  console.log(rows)

  const beamCounts = new Array(rowWidth).fill(0)

  const startingCellIndex = rows[0].indexOf('S')
  beamCounts[startingCellIndex] = 1

  for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < rowWidth; columnIndex++) {
      const aboveCell = rows[rowIndex - 1][columnIndex]
      const currentCell = rows[rowIndex][columnIndex]
      if (
        (aboveCell === 'S' && currentCell === '.') ||
        (aboveCell === '|' && currentCell === '.')
      ) {
        const tmp = rows[rowIndex].split('')
        tmp[columnIndex] = '|'
        rows[rowIndex] = tmp.join('')
      } else if (aboveCell === '|' && currentCell === '^') {
        const previousColumnIndex = columnIndex - 1
        const nextColumnIndex = columnIndex + 1
        beamCounts[previousColumnIndex] += beamCounts[columnIndex]
        beamCounts[nextColumnIndex] += beamCounts[columnIndex]
        beamCounts[columnIndex] = 0
        const tmp = rows[rowIndex].split('')
        tmp[previousColumnIndex] = '|'
        tmp[nextColumnIndex] = '|'
        rows[rowIndex] = tmp.join('')
      }
    }
  }

  const grandTotal = beamCounts.reduce((acc, curr) => acc + curr, 0)
  console.log(`beam grand total: ${grandTotal}`)
}
