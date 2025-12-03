import { readFileSync } from 'node:fs'

export const solve = () => {
    const input = readFileSync("../inputs/day3.txt", "utf8")

    const allJoltages: number[] = []

    for (const row of input.split("\n")) {
        const joltages = []
        const batteries = row.split("").map(s => parseInt(s))
        const { n, index } = getFirstMax(batteries, 12)
        let i = index
        joltages.push(n)
        while (joltages.length < 12) {
            const { n, index } = getFirstMax(batteries.slice(i + 1), 12 - joltages.length)
            joltages.push(n)
            i = index + i + 1
        }

        console.log(`given batteries ${batteries.join("")}, got joltages ${joltages}`)
        allJoltages.push(parseInt(joltages.join("")))
    }
    console.log(`joltages sum: ${allJoltages.reduce((acc, curr) => acc += curr, 0)}`)

}


const getFirstMax = (numbers: number[], remainderRange: number) => {
    let max = 0
    for (let i = 0; i < numbers.length - remainderRange + 1; i++) {
        const n = numbers[i]
        if (n > max) {
            max = n
        }
    }
    const index = numbers.indexOf(max)

    return { n: max, index }
}

