import { existsSync, readFileSync } from 'node:fs'

const main = () => {
  const args = process.argv.slice(2)
  if (args.length !== 2) {
    throw new Error(`invalid number of args: ${args.length}`)
  }

  const day = parseInt(args[0], 10)
  const part = parseInt(args[1], 10)

  console.log(`solving day ${day} part ${part} challenge`)

  const inputPath = `../inputs/day${day}.txt`

  if (!existsSync(inputPath)) {
    throw new Error(`missing day ${day} input file at ${inputPath}`)
  }

  const input = readFileSync(inputPath, 'utf8')
  require(`./day${day}/part${part}`).solve(input)
}

main()
