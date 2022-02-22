import { useContext } from 'react'

import { Cell } from './Cell'
import ConfigContext from '../../context/ConfigContext'

export const EmptyRow = () => {
  const languageConfig = useContext(ConfigContext)
  const emptyCells = Array.from(Array(languageConfig?.wordLength))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
