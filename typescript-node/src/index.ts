const main = () => {
  const args = process.argv.slice(2)
  if (args.length !== 2) {
    throw new Error(`invalid number of args: ${args.length}`)
  }

  const day = parseInt(args[0], 10)
  const part = parseInt(args[1], 10)

  console.log(`solving day ${day} part ${part} challenge`)

  require(`./day${day}/part${part}`).solve()
}

main()
