import { Card } from '@/components/Card'
import { pickRandomUniqueItemsFromArray } from '@/utils'

type Country = {
    capital: string[]
    name: {
        common: string
        official: string
    }
    latlng: [number, number]
}

async function fetchCountriesEur(): Promise<Country[]> {
    const res = await fetch('https://restcountries.com/v3.1/currency/eur')

    if (!res.ok) throw new Error('Failed to fetch data')

    return res.json()
}

const useRandomCountries = async () => {
    const countries = await fetchCountriesEur()
    const randomCountries = pickRandomUniqueItemsFromArray(countries, 4)

    const randomIndex = Math.floor(Math.random() * 5)
    const question = randomCountries[randomIndex]
    const answers = randomCountries

    return {
        question,
        answers,
        randomIndex,
    }
}

async function Game() {
    const { question, answers } = await useRandomCountries()

    return (
        <div className="container mx-auto">
            <div className="flex flex-col gap-8">
                <div className="text-center">
                    <h1 className="text-6xl font-semibold pt-4">{question.name.common}</h1>
                </div>

                <div className="flex flex-col gap-4">
                    {answers.map((country) => (
                        <Card key={country.name.official}>{country.capital[0]}</Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Game
