import { readFileSync } from 'node:fs'

export const solve = () => {
    const input = readFileSync("../inputs/day3.txt", "utf8")

    const joltages = []

    for (const row of input.split("\n")) {

        const batteries = row.split("")

        let topLeft = 0
        let topRight = 0

        for (let i = 0; i < batteries.length - 1; i++) {
            const currentLeft = parseInt(batteries[i])
            if (currentLeft <= topLeft) {
                continue
            } else {
                topLeft = currentLeft
            }

            let currentTopRight = 0
            for (let ii = i + 1; ii < batteries.length; ii++) {
                const currentRight = parseInt(batteries[ii])
                if (currentRight > currentTopRight) {
                    currentTopRight = currentRight
                }
            }
            topRight = currentTopRight
        }
        console.log(`given batteries ${row}; got top left ${topLeft} and top right ${topRight}`)
        joltages.push(parseInt(`${topLeft}${topRight}`))
    }
    console.log(`joltages sum: ${joltages.reduce((acc, curr) => acc += curr, 0)}`)

}


