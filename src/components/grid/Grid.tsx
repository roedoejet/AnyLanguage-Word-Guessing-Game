import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'
import { SETTINGS } from '../../constants/settings'

type Props = {
  guesses: string[][]
  currentGuess: string[]
  solution: string
}

export const Grid = ({ solution, guesses, currentGuess }: Props) => {
  const empties =
    guesses.length < SETTINGS.tries - 1
      ? Array.from(Array(SETTINGS.tries - 1 - guesses.length))
      : []

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow solution={solution} key={i} guess={guess} />
      ))}
      {guesses.length < SETTINGS.tries && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
