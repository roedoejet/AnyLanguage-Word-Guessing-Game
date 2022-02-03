import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'
import { useEffect } from 'react'

type Props = {
  guess: string[]
}

export const CompletedRow = ({ guess }: Props) => {
  const statuses = getGuessStatuses(guess)

  useEffect(() => {
    // Show completed row cell-by-cell
    const cellShowDelay = 300
    const cellsContainer =
      document.querySelectorAll('.completed:not(.displayed)') ?? []
    if (cellsContainer[0]) {
      Array.from(cellsContainer[0].children).forEach((cell, i) => {
        setTimeout(() => {
          cell.classList.add('shown')
        }, cellShowDelay * i)
      })
      cellsContainer[0].classList.add('displayed')
    }
  })

  return (
    <div className="flex justify-center mb-1 completed">
      {guess.map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  )
}
