export const solve = (input: string) => {
  const rows = input.split('\n')
  const rowWidth = rows[0].length

  console.log('processing input')
  console.log(rows)

  let splitCount = 0
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
        splitCount++
        const tmp = rows[rowIndex].split('')
        tmp[columnIndex - 1] = '|'
        tmp[columnIndex + 1] = '|'
        rows[rowIndex] = tmp.join('')
      }
    }
  }

  console.log(rows)
  console.log(`beam was split ${splitCount} times`)
}
