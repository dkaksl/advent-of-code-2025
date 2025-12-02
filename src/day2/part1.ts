import { readFileSync } from 'node:fs'

export const solve = () => {
    const input = readFileSync("inputs/day2.txt", "utf8")

    const invalidIDsums = []

    for (const rangeString of input.split(",")) {
        const range = rangeString.split("-")
        const from = parseInt(range[0])
        const to = parseInt(range[1])

        const rangeInvalidIDs: number[] = []

        for (let i = from; i <= to; i++) {
            const numberString = i.toString()
            if (numberString.length % 2 !== 0) {
                continue
            }
            const firstHalf = numberString.slice(0, numberString.length / 2)
            const secondHalf = numberString.slice(numberString.length / 2)
            if (firstHalf === secondHalf) {
                rangeInvalidIDs.push(parseInt(numberString))

            }
        }

        const rangeIDSum = rangeInvalidIDs
            .reduce((acc, curr) => acc + curr, 0)
        console.log(`range ${from}-${to} has ${rangeInvalidIDs.length} invalid IDs; sum: ${rangeIDSum}`)
        invalidIDsums.push(rangeIDSum)

    }

    const invalidIDSum = invalidIDsums.reduce((acc, curr) => acc + curr, 0)

    console.log(`invalid IDs total sum: ${invalidIDSum}`)
}
