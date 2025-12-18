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