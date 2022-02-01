import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { ORTHOGRAPHY } from '../../constants/orthography'

import { solution } from '../../lib/words'
import { CONFIG } from '../../constants/config'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[][]
}

function shuffle<T>(array: T[]) {
  const out = Array.from(array)
  for (let i = out.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1))
    const tmp = out[i]
    out[i] = out[r]
    out[r] = tmp
  }
  return out
}
// ORTHOGRAPHY のうち solution.split("") にないもののうち CONFIG.hint をあらかじめ absent にする
// hint が 1 以上ならその数、0～1 なら割合
const absentChars = ORTHOGRAPHY.filter((e) => !solution.includes(e))
const hintNum =
  CONFIG.hint >= 1
    ? Math.floor(CONFIG.hint)
    : Math.floor(absentChars.length * CONFIG.hint)
//  const hintChars = absentChars.sort(_=>Math.random()-0.5).slice(0, hintNum)
const hintChars = shuffle(absentChars).slice(0, hintNum)

export const Keyboard = ({ onChar, onDelete, onEnter, guesses }: Props) => {
  const charStatuses = getStatuses(guesses)

  hintChars.forEach((c) => (charStatuses[c] = 'absent'))

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
        {ORTHOGRAPHY.slice(0, Math.floor(ORTHOGRAPHY.length * 0.4)).map(
          (char) => (
            <Key value={char} onClick={onClick} status={charStatuses[char]} />
          )
        )}
      </div>
      <div className="flex justify-center mb-1">
        {ORTHOGRAPHY.slice(
          Math.floor(ORTHOGRAPHY.length * 0.4),
          Math.floor(ORTHOGRAPHY.length * 0.7)
        ).map((char) => (
          <Key value={char} onClick={onClick} status={charStatuses[char]} />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          Enter
        </Key>
        {ORTHOGRAPHY.slice(
          Math.floor(ORTHOGRAPHY.length * 0.7),
          ORTHOGRAPHY.length
        ).map((char) => (
          <Key value={char} onClick={onClick} status={charStatuses[char]} />
        ))}
        <Key width={65.4} value="DELETE" onClick={onClick}>
          Delete
        </Key>
      </div>
    </div>
  )
}
