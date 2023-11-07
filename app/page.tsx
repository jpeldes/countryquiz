import { Game } from '@/components/Game'
import type { Country } from '@/models/Country'

async function fetchCountriesEur(): Promise<Country[]> {
    const res = await fetch('https://restcountries.com/v3.1/currency/eur')

    if (!res.ok) throw new Error('Failed to fetch data')

    const data = await res.json()
    return data
}

export default async function Home() {
    const countries = await fetchCountriesEur()

    return (
        <main className="pt-6 lg:pt-12 px-4">
            <Game countries={countries} />
        </main>
    )
}
