'use client'

import { KeyboardEvent, KeyboardEventHandler, useCallback, useEffect, useRef, useState } from 'react'

import { toast } from 'sonner'

import { Card } from '@/components/Card/Card'
import type { Country } from '@/models/Country'
import { isCorrectAnswer } from '@/utils/isCorrectAnswer'

import { useRandomCountries } from './'
import useDocumentEvent from './hooks/useDocumentEvent'

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
        const { question, answers } = shuffle()

        if (hasAskedAllQuestions) return handleGameOver()

        const hasAskedThisQuestion = askedQuestions.current.has(question)
        if (hasAskedThisQuestion) return handleShuffle()

        askedQuestions.current.add(question)

        setQuestion(question)
        setAnswers(answers)
    }, [hasAskedAllQuestions, handleGameOver, shuffle])

    useEffect(() => {
        if (!question && !isGameOver) {
            handleShuffle()
        }
    }, [question, isGameOver, handleShuffle])

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

    const answersCorrect = useRef<Set<Country>>(new Set())
    const answersWrong = useRef<Set<Country>>(new Set())
    const [answersDisabled, setAnswersDisabled] = useState<Set<Country>>(new Set())

    const currentQuestion = question as Country

    // Create answer handlers

    const onAnswerCorrect = useCallback(
        (answer: Country) => {
            toast.success(`${answer.capital[0]} is the capital of ${currentQuestion.name.common}`)
            answersCorrect.current.add(answer)
            setAnswersDisabled(new Set())
            shuffle()
        },
        [currentQuestion?.name?.common, shuffle]
    )

    const onAnswerWrong = useCallback(
        (answer: Country) => {
            toast.error('Try again', { className: 'bg-error' })
            answersWrong.current.add(answer)
            setAnswersDisabled(new Set(answersDisabled.add(answer)))
        },
        [answersDisabled]
    )

    const onAnswer = useCallback(
        (answer: Country) => {
            toast.dismiss()

            const isCorrect = isCorrectAnswer(currentQuestion, answer)
            if (isCorrect) {
                onAnswerCorrect(answer)
            } else {
                onAnswerWrong(answer)
            }
        },
        [currentQuestion, onAnswerCorrect, onAnswerWrong]
    )

    // Use Keyboard events

    const handleKeyUp: KeyboardEventHandler = useCallback(
        (event) => {
            console.log(event.key)

            if (!answers) return

            if (['1', '2', '3', '4'].includes(event.key)) {
                const answerIndex = Number(event.key) - 1
                const selectedAnswer = answers[answerIndex]
                // Select answer
                onAnswer(selectedAnswer)
            }
        },
        [answers, onAnswer]
    )

    useDocumentEvent<KeyboardEvent>('keyup', handleKeyUp)

    if (isLoading) return null

    return (
        <div className="container mx-auto">
            <div className="flex flex-col gap-8">
                <div className="text-center">
                    <h1 className="text-6xl font-semibold pt-4">{question?.name?.common}</h1>
                </div>

                {isGameOver && (
                    <div className="pt-12 flex flex-col gap-12">
                        <div className="text-9xl text-center animate-bounce" role="emoji">
                            🎉
                        </div>
                        <p className="text-center">Congrats!</p>
                    </div>
                )}

                {!isGameOver && (
                    <div className="flex flex-col gap-4">
                        {answers?.map((country, index) => (
                            <Card
                                key={country.name.official}
                                nr={index + 1}
                                onClick={() => onAnswer(country)}
                                aria-disabled={answersDisabled.has(country)}
                                disabled={answersDisabled.has(country)}
                            >
                                {country.capital[0]}
                            </Card>
                        ))}
                    </div>
                )}

                <div className="flex justify-center gap-4">
                    <span className="rounded-box p-2 px-4 bg-success text-success-content shadow-black shadow-md">
                        {answersCorrect.current.size}
                    </span>
                    <span className="rounded-box p-2 px-4 bg-neutral text-neutral-content shadow-black shadow-md">
                        {askedCount} / {totalCount}
                    </span>
                    <span className="rounded-box p-2 px-4 bg-error text-error-content shadow-black shadow-md">
                        {answersWrong.current.size}
                    </span>
                </div>
            </div>
        </div>
    )
}
