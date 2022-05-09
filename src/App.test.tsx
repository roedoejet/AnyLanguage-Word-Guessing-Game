import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Not Wordle', () => {
  render(<App />)
  const linkElement = screen.getByText(/Not-Wordle/i)
  expect(linkElement).toBeInTheDocument()
})

// test('no surprise characters', () => {
//   let splitWords = WORDS.map((x) =>
//     x.split(ORTHOGRAPHY_PATTERN).filter((x) => x)
//   )
//   splitWords.forEach((word) => {
//     expect(ORTHOGRAPHY).toEqual(expect.arrayContaining(word))
//   })
// })
