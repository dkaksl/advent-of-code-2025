import { readFileSync } from 'node:fs'
import { decrementDial, incrementDial } from './util'

export const solve = () => {
    const input = readFileSync("../inputs/day1.txt", "utf8")

    let current = 50
    let zeroCount = 0

    for (const row of input.split("\n")) {
        const rotationDirection = row.substring(0, 1)
        const rotationSteps = parseInt(row.substring(1), 10)

        for (let i = 0; i < rotationSteps; i++) {
            if (rotationDirection === "L") {
                current = decrementDial(current)
            } else {
                current = incrementDial(current)
            }
        }

        console.log(`the dial was rotated ${rotationDirection}${rotationSteps} to point at ${current}`)
        if (current === 0) {
            zeroCount++
        }
    }

    console.log(`the dial pointed at 0 ${zeroCount} times`)
}
