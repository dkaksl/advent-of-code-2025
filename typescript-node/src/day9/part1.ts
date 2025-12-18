export const solve = (input: string) => {
  const rows = input.split('\n')
  const coordinates = []
  for (const row of rows) {
    const numbers = row.split(',')
    coordinates.push({ x: parseInt(numbers[0]), y: parseInt(numbers[1]) })
  }

  let maxArea = 0
  for (let i = 0; i < coordinates.length; i++) {
    for (let ii = 0; ii < coordinates.length; ii++) {
      if (i === ii) {
        continue
      }

      const a = coordinates[i]
      const b = coordinates[ii]
      const area = Math.abs(a.x - b.x + 1) * Math.abs(a.y - b.y + 1)
      if (area > maxArea) {
        console.log(`${area}\t > ${maxArea}`)
        maxArea = area
      }
    }
  }
  console.log(`max area: ${maxArea}`)
}
