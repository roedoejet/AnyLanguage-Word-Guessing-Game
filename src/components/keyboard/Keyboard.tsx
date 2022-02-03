import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key, LowerKey } from './Key'
import { useEffect } from 'react'
import { ORTHOGRAPHY } from '../../constants/orthography'

import { solution } from '../../lib/words'
import { CONFIG } from '../../constants/config'
import { URL_PARAMS } from '../../lib/url_params'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[][]
}

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// ORTHOGRAPHY のうち solution.split("") にないもののうち CONFIG.hint をあらかじめ absent にする
// hint が 1 以上ならその数、0～1 なら割合
const absentChars = ORTHOGRAPHY.filter((e) => !solution.includes(e))
const hintValue = URL_PARAMS['group'] ? CONFIG.hintForGroup : CONFIG.hint
const hintNum =
  CONFIG.hint >= 1
    ? Math.floor(hintValue)
    : Math.floor(absentChars.length * hintValue)
const hintChars = shuffle(absentChars).slice(0, hintNum)

export const Keyboard = ({ onChar, onDelete, onEnter, guesses }: Props) => {
  const charStatuses = getStatuses(guesses)

  hintChars.forEach((c) => (charStatuses[c] = 'absent'))
  charStatuses['　'] = 'absent'
  console.log(solution)

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
        {'あかがさざただなはばまやら'
          .split('')
          .reverse()
          .map((char) => (
                <Key
                  key={char}
                  value={char}
                  onClick={onClick}
                  status={charStatuses[char]}
                />
          ))}
      </div>
      <div className="flex justify-center mb-1">
        {'いきぎしじちぢにひびみ　り'
          .split('')
          .reverse()
          .map((char) => (
            <Key
              key={char}
              value={char}
              onClick={onClick}
              status={charStatuses[char]}
            />
          ))}
      </div>
      <div className="flex justify-center mb-1">
        {'うくぐすずつづぬふぶむゆる'
          .split('')
          .reverse()
          .map((char) => (
                <Key
                  key={char}
                  value={char}
                  onClick={onClick}
                  status={charStatuses[char]}
                />
          ))}
      </div>
      <div className="flex justify-center mb-1">
        {'えけげせぜてでねへべめ　れ'
          .split('')
          .reverse()
          .map((char) => (
                <Key
                  key={char}
                  value={char}
                  onClick={onClick}
                  status={charStatuses[char]}
                />
          ))}
      </div>
      <div className="flex justify-center mb-1">
        {'おこごそぞとどのほぼもよろ'
          .split('')
          .reverse()
          .map((char) => (
                <Key
                  key={char}
                  value={char}
                  onClick={onClick}
                  status={charStatuses[char]}
                />
          ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} key="ENTER" value="ENTER" onClick={onClick}>
          決定
        </Key>
        {'っょゅゃんをわ'
          .split('')
          .reverse()
          .map((char) => (
                <LowerKey
                  key={char}
                  value={char}
                  onClick={onClick}
                  status={charStatuses[char]}
                />
          ))}
        <Key width={65.4} key="DELETE" value="DELETE" onClick={onClick}>
          削除
        </Key>
      </div>
    </div>
  )
}
