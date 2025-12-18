import { readFileSync } from 'node:fs'

export const solve = () => {
    const input = readFileSync("../inputs/day2.txt", "utf8")

    const invalidIDsums = []

    for (const rangeString of input.split(",")) {
        const range = rangeString.split("-")
        const from = parseInt(range[0])
        const to = parseInt(range[1])

        const rangeInvalidIDs: number[] = []

        for (let current = from; current <= to; current++) {
            const numberString = current.toString()
            const stringLength = numberString.length

            for (let chunkCount = 2; chunkCount <= stringLength; chunkCount++) {
                const chunkSize = stringLength / chunkCount
                if (chunkSize % 1 !== 0) {
                    continue
                }
                const chunks = getChunks(numberString, chunkSize)
                if (chunks.every((chunk) => chunk === chunks[0])) {
                    console.log(`got a repeating pattern in ${current}; chunks: ${chunks}`)
                    rangeInvalidIDs.push(current)
                    break
                }
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


const getChunks = (str: string, chunkSize: number) => {
    const chunks = []
    for (let i = 0; i < str.length; i += chunkSize) {
        chunks.push(str.slice(i, i + chunkSize))
    }
    return chunks
}