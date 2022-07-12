import { useContext } from 'react'
import ConfigContext from '../../context/ConfigContext'

import { Cell } from './Cell'

type Props = {
  guess: string[]
}

export const CurrentRow = ({ guess }: Props) => {
  const languageConfig = useContext(ConfigContext)
  const splitGuess = guess
  const emptyCells = Array.from(
    Array(languageConfig?.wordLength - splitGuess.length)
  )

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
