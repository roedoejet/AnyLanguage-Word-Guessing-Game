import { useEffect, useContext } from 'react'

import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'

import ConfigContext from '../../context/ConfigContext'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[][]
  solution: string
}

export const Keyboard = ({ onChar, onDelete, onEnter, guesses, solution }: Props) => {
  const languageConfig = useContext(ConfigContext)
  const charStatuses = getStatuses(solution, guesses, languageConfig.orthographyPattern)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      }
      // Take away key event listener for now
      // else {
      //   const key = e.key.toUpperCase()
      //   if (key.length === 1 && key >= 'A' && key <= 'Z') {
      //     onChar(key)
      //   }
      // }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1">
        {languageConfig.orthography.slice(0, Math.floor(languageConfig.orthography.length * 0.4)).map(
          (char) => (
            <Key value={char} key={`key-${char}`} onClick={onClick} status={charStatuses[char]} />
          )
        )}
      </div>
      <div className="flex justify-center mb-1">
        {languageConfig.orthography.slice(
          Math.floor(languageConfig.orthography.length * 0.4),
          Math.floor(languageConfig.orthography.length * 0.7)
        ).map((char) => (
          <Key value={char} key={`key-${char}`} onClick={onClick} status={charStatuses[char]} />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          Enter
        </Key>
        {languageConfig.orthography.slice(
          Math.floor(languageConfig.orthography.length * 0.7),
          languageConfig.orthography.length
        ).map((char) => (
          <Key value={char} key={`key-${char}`} onClick={onClick} status={charStatuses[char]} />
        ))}
        <Key width={65.4} value="DELETE" onClick={onClick}>
          Delete
        </Key>
      </div>
    </div>
  )
}
