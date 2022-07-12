import { useContext } from 'react'

import ConfigContext from '../../context/ConfigContext'

import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string[]
  solution: string
}

export const CompletedRow = ({ solution, guess }: Props) => {
  const languageConfig = useContext(ConfigContext)
  const statuses = getGuessStatuses(
    solution,
    guess,
    languageConfig.orthographyPattern
  )

  return (
    <div className="flex justify-center mb-1">
      {guess.map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  )
}
