import { readFileSync } from 'node:fs'

const main = () => {
    const input = readFileSync("input.txt", "utf8")

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

const incrementDial = (current: number) => {
    if (current === 99) {
        return 0
    }

    return current + 1
}

const decrementDial = (current: number) => {
    if (current === 0) {
        return 99
    }

    return current - 1
}

main()