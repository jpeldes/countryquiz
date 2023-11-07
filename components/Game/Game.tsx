'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { toast } from 'sonner'

import { Card } from '@/components/Card/Card'
import type { Country } from '@/models/Country'
import { isCorrectAnswer } from '@/utils/isCorrectAnswer'

import { useRandomCountries } from './'

const useShuffle = (countries: Country[]) => {
    const { shuffle } = useRandomCountries(countries)

    const [question, setQuestion] = useState<Country>()
    const [answers, setAnswers] = useState<Country[]>()

    const askedQuestions = useRef<Set<Country>>(new Set())

    const hasAskedAllQuestions = askedQuestions.current.size === countries.length

    const [isGameOver, setIsGameOver] = useState(hasAskedAllQuestions)
    const handleGameOver = useCallback(() => {
        setIsGameOver(true)
    }, [])

    const handleShuffle = useCallback(() => {
        console.log('handleShuffle')
        const { question, answers } = shuffle()

        if (hasAskedAllQuestions) return handleGameOver()

        const hasAskedThisQuestion = askedQuestions.current.has(question)
        if (hasAskedThisQuestion) {
            console.log('hasAskedThisQuestion')
            return handleShuffle()
        }

        askedQuestions.current.add(question)

        setQuestion(question)
        setAnswers(answers)
    }, [hasAskedAllQuestions, handleGameOver, shuffle])

    useEffect(() => {
        console.log('onMount shuffles')
        handleShuffle()
    }, [handleShuffle])

    return {
        question,
        answers,
        isLoading: !question && !answers,
        isGameOver,
        shuffle: handleShuffle,
        askedCount: askedQuestions.current.size,
        totalCount: countries.length,
    }
}

export function Game({ countries }: { countries: Country[] }) {
    const { question, answers, shuffle, isLoading, totalCount, askedCount, isGameOver } = useShuffle(countries)

    if (isLoading) return null

    const currentQuestion = question as Country

    const onAnswer = (answer: Country) => {
        const isCorrect = isCorrectAnswer(currentQuestion, answer)

        // Handle toasts
        toast.dismiss()

        if (isCorrect) {
            toast.success(`${answer.capital[0]} is the capital of ${currentQuestion.name.common}`, {
                className: 'bg-success',
            })
        } else {
            toast.error('Try again', { className: 'bg-error' })
        }

        // Shuffle again
        if (isCorrect) {
            shuffle()
        }
    }

    return (
        <div className="container mx-auto">
            <div className="flex flex-col gap-8">
                <div className="text-center">
                    <h1 className="text-6xl font-semibold pt-4">{question?.name?.common}</h1>
                </div>

                {isGameOver && (
                    <div className="text-9xl text-center" role="emoji">
                        🎉
                    </div>
                )}

                {!isGameOver && (
                    <div className="flex flex-col gap-4">
                        {answers?.map((country) => (
                            <Card key={country.name.official} onClick={() => onAnswer(country)}>
                                {country.capital[0]}
                            </Card>
                        ))}
                    </div>
                )}

                <div className="text-center">
                    <span className="bg-accent text-accent-content p-2 px-4 rounded-xl text-lg">
                        {askedCount} / {totalCount}
                    </span>
                </div>
            </div>
        </div>
    )
}
