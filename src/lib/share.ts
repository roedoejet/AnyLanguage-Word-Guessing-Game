import { getGuessStatuses } from './statuses'
import { SETTINGS } from '../constants/settings'

export const shareStatus = (
  language: string,
  solution: string,
  solutionIndex: number,
  guesses: string[][],
  lost: boolean,
  orthographyPattern: RegExp
) => {
  navigator.clipboard.writeText(
    language +
      ' Wordle ' +
      solutionIndex +
      ' ' +
      `${lost ? 'X' : guesses.length}` +
      '/' +
      SETTINGS.tries.toString() +
      '\n\n' +
      generateEmojiGrid(solution, guesses, orthographyPattern)
  )
}

export const generateEmojiGrid = (
  solution: string,
  guesses: string[][],
  orthographyPattern: RegExp
) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(solution, guess, orthographyPattern)
      return guess
        .map((letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
