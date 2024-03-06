import { render, screen } from '@testing-library/react'
import App from './App'
import { ORTHOGRAPHY } from './constants/orthography'
import { WORDS } from './constants/wordlist'
import { ORTHOGRAPHY_PATTERN } from './lib/tokenizer'
import { CONFIG } from './constants/config'
import chalk from 'chalk'

test('renders game', () => {
  render(<App />)
  const linkElement = screen.getByText(/gameName/i)
  expect(linkElement).toBeInTheDocument()
})

test('no surprise characters', () => {
  let wordsWithSurpriseCharacters: string[][] = []
  WORDS.forEach((word) => {
    let characterList = word.split(ORTHOGRAPHY_PATTERN).filter((x) => x)
    let noSurprises = characterList.every((character) =>
      ORTHOGRAPHY.includes(character)
    )
    if (!noSurprises) {
      let surpriseCharacters = characterList.filter(
        (x) => !ORTHOGRAPHY.includes(x)
      )
      console.log(
        `The word ${word} has the following characters that are not in your declared orthography: ${surpriseCharacters}`
      )
      wordsWithSurpriseCharacters.push(characterList)
    }
  })
  expect(wordsWithSurpriseCharacters).toEqual([])
})

test('all words are correct length', () => {
  let wordsLongerThanDefinedLength: string[][] = []
  WORDS.forEach((word) => {
    let characterList = word.split(ORTHOGRAPHY_PATTERN).filter((x) => x)
    let isCorrectLength = characterList.length === CONFIG.wordLength
    if (!isCorrectLength) {
      console.log(
        `The word ${word} is ${characterList.length} characters long, but your game has chosen a word length of ${CONFIG.wordLength}`
      )
      wordsLongerThanDefinedLength.push(characterList)
    }
  })
  expect(wordsLongerThanDefinedLength).toEqual([])
})

test('date is valid', () => {
  expect(new Date(CONFIG.startDate).valueOf()).toBeTruthy()
})
