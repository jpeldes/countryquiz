export function pickRandomUniqueItemsFromArray<GivenType>(arr: GivenType[], numItems: number) {
    if (numItems <= 0 || numItems > arr.length) {
        throw new Error('Invalid number of items to pick')
    }

    const shuffledArray = arr.slice() // Create a shallow copy of the input array

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))

        ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]] // Shuffle the array
    }

    return shuffledArray.slice(0, numItems) // Return the first numItems from the shuffled array
}
