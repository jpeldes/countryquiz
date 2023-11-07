import type { Country } from '@/models/Country'

export const isCorrectAnswer = (question: Country, answer: Country) => answer.name.common === question.name.common
