import { Country } from '@/models/Country'

import { isCorrectAnswer } from './'

const countryA: Country = {
    capital: ['Tallinn'],
    latlng: [0, 0],
    name: { common: 'Estonia', official: 'Republic of Estonia' },
}
const countryB: Country = {
    capital: ['Riga'],
    latlng: [0, 0],
    name: { common: 'Latvia', official: 'Republic of Latvia' },
}

it('should find correct answer', () => {
    expect(isCorrectAnswer(countryA, countryA)).toBe(true)
    expect(isCorrectAnswer(countryB, countryB)).toBe(true)
})

it('should detect incorrect answer', () => {
    expect(isCorrectAnswer(countryA, countryB)).toBe(false)
    expect(isCorrectAnswer(countryB, countryA)).toBe(false)
})
