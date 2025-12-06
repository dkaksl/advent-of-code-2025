import { readFileSync } from 'node:fs'

export const solve = () => {
  const input = readFileSync('../inputs/day6.txt', 'utf8')

  const rows = input.split('\n')

  const operators = rows[rows.length - 1].split(/\s+/)

  const totals: number[] = []

  for (let i = 0; i < rows.length - 1; i++) {
    console.log(`getting numbers for row ${i}`)
    const row = rows[i].split(/\s+/).map((n) => parseInt(n))

    for (let ii = 0; ii < row.length; ii++) {
      const current = row[ii]
      const operator = operators[ii]
      if (operator === '+') {
        totals[ii] = totals[ii] ? totals[ii] + current : current
      } else if (operator === '*') {
        totals[ii] = totals[ii] ? totals[ii] * current : current
      }
    }
  }

  console.log(`got total ${totals.reduce((acc, curr) => acc + curr, 0)}`)
}
