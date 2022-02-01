import { render, screen } from '@testing-library/react'
import App from './App'
import { ORTHOGRAPHY } from './constants/orthography'
import { WORDS } from './constants/wordlist'
import { ORTHOGRAPHY_PATTERN } from './lib/tokenizer'

test('renders Not Wordle', () => {
  render(<App />)
  const linkElement = screen.getByText(/Not Wordle/i)
  expect(linkElement).toBeInTheDocument()
})

test('no surprise characters', () => {
  let splitWords = WORDS.map((x: any) =>
    x.split(ORTHOGRAPHY_PATTERN).filter((x: any) => x)
  )
  splitWords.forEach((word: any) => {
    expect(ORTHOGRAPHY).toEqual(expect.arrayContaining(word))
  })
})
