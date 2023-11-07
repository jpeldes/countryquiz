import { pickRandomUniqueItemsFromArray } from './'

it('should pick 4 randoms', () => {
    const arr = [1, 2, 3, 4]
    const numItems = 4

    const result = pickRandomUniqueItemsFromArray<number>(arr, numItems)

    expect(result.includes(1)).toBe(true)
    expect(result.includes(2)).toBe(true)
    expect(result.includes(3)).toBe(true)
    expect(result.includes(4)).toBe(true)
})

it('should throw error if array shorter than numItems', () => {
    const arr = [1, 2]
    const numItems = 100

    expect(() => {
        pickRandomUniqueItemsFromArray(arr, numItems)
    }).toThrow(new Error('Invalid number of items to pick'))
})
