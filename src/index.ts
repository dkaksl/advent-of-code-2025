
import { solve as solveDay1Part1 } from './day1/part1'
import { solve as solveDay1Part2 } from './day1/part2'
const main = () => {
    const args = process.argv.slice(2)
    if (args.length !== 2) {
        throw new Error(`invalid number of args: ${args.length}`)
    }

    const day = parseInt(args[0], 10)
    const part = parseInt(args[1], 10)

    if (day === 1) {
        if (part === 1) {
            solveDay1Part1()
        }
        else if (part === 2) {
            solveDay1Part2()
        }

    }
}

export const incrementDial = (current: number) => {
    if (current === 99) {
        return 0
    }

    return current + 1
}

export const decrementDial = (current: number) => {
    if (current === 0) {
        return 99
    }

    return current - 1
}

main()