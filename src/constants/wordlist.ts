import { CONFIG } from './config'
import { ALL_48NAMES } from './all48names'

export const WORDS = ALL_48NAMES['6chars'].filter((x: string) => {
  const arr = x.split('')
  const s = new Set(arr)
  return s.size === arr.length
})

if (CONFIG.normalization) {
  WORDS.forEach((val, i) => (WORDS[i] = val.normalize(CONFIG.normalization)))
}

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

if (CONFIG.shuffle) {
  shuffle(WORDS)
}
