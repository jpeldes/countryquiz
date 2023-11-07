'use client'

import { useCallback } from 'react'

import type { Country } from '@/models/Country'
import { pickRandomUniqueItemsFromArray } from '@/utils'

export const useRandomCountries = (countries: Country[]) => {
    const shuffle = useCallback(() => {
        const randomCountries = pickRandomUniqueItemsFromArray(countries, 4)
        const randomIndex = Math.floor(Math.random() * 4)
        const question = randomCountries[randomIndex]
        const answers = randomCountries
        return { question, answers, randomIndex }
    }, [countries])

    return {
        shuffle,
    }
}
