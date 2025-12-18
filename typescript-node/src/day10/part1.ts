export const solve = (input: string) => {
  const rows = input.split('\n')

  let presses = 0
  for (const row of rows) {
    console.log(row)
    const match = row.match(/\[(.+)\]\s(.*)\s{(.*)}/)!
    const lightDiagram = match[1]
    const buttons = match[2]
    // const joltages = match[3]
    console.log(lightDiagram)

    const lightDiagramInteger = parseInt(
      lightDiagram.repeat(1).replaceAll('.', '0').replaceAll('#', '1'),
      2
    )
    console.log(lightDiagramInteger)

    const buttonIntegers = []
    for (const buttonDigits of buttons.split(/\s/)) {
      const digits = buttonDigits
        .match(/\((.*)\)/)![1]
        .split(',')
        .map((d) => parseInt(d))

      const digitString = '0'.repeat(lightDiagram.length).split('')
      for (const d of digits) {
        digitString[d] = '1'
      }
      buttonIntegers.push(parseInt(digitString.join(''), 2))
    }
    console.log(buttonIntegers)
    console.log(buttonIntegers.map((i) => i.toString(2)))
  }

  console.log(`presses: ${presses}`)
}
