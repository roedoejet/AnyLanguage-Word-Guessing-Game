import { useContext } from 'react'

import { getGuessStatuses } from '../../lib/statuses'
import { useWordOfTheDay } from '../../lib/words'
import ConfigContext from '../../context/ConfigContext'
import { MiniCell } from './MiniCell'

type Props = {
  guess: string[]
}

export const MiniCompletedRow = ({ guess }: Props) => {
  const languageConfig = useContext(ConfigContext)
  const wordOfTheDay = useWordOfTheDay(languageConfig)
  const statuses = getGuessStatuses(wordOfTheDay?.solution, guess, languageConfig.orthographyPattern)

  return (
    <div className="flex justify-center mb-1">
      {guess.map((letter, i) => (
        <MiniCell key={i} status={statuses[i]} letter={letter} />
      ))}
    </div>
  )
}
