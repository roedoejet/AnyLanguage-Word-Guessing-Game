import { getGuessStatuses } from './statuses'
// import { solutionIndex } from './words'
import { CONFIG } from '../constants/config'
import { URL_PARAMS } from './urlParams'

export const shareStatus = (guesses: string[][], lost: boolean) => {
  const group_name = URL_PARAMS['group'] || CONFIG.groupName || '48'
  const text =
    `Wordle${group_name} ${
      lost ? 'X' : guesses.length
    }/${CONFIG.tries.toString()}\n` +
    `${window.location.href.replace(/\?.*$/, '')}\n\n` +
    `${generateEmojiGrid(guesses)}`

  if (navigator.share) {
    return navigator.share({ text: text }).then(() => false)
  } else {
    return navigator.clipboard.writeText(text).then(() => true)
  }
}

export const generateEmojiGrid = (guesses: string[][]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
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
