import { CONFIG } from './config'

export const ORTHOGRAPHY = [
  'a',
  'e',
  'i',
  'o',
  'u',
  'ʉ',
  'a̠',
  'e̠',
  'i̠',
  'o̠',
  'u̠',
  'ʉ̠',
  'b',
  'h',
  'k',
  'kw',
  'm',
  'n',
  'p',
  'r',
  's',
  't',
  'ts',
  'w',
  'y',
  'ʔ',
]

if (CONFIG.normalization) {
  ORTHOGRAPHY.forEach(
    (val, i) => (ORTHOGRAPHY[i] = val.normalize(CONFIG.normalization))
  )
}
