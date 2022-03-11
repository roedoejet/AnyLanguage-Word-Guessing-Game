import { CONFIG } from './config'

export const ORTHOGRAPHY = [
  'a',
  'b',
  'c',
  'd',
  'dj',
  'dr',
  'e',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'lj',
  'm',
  'n',
  'ng',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'tj',
  'u',
  'v',
  'w',
  'y',
  'z',
]

if (CONFIG.normalization) {
  ORTHOGRAPHY.forEach(
    (val, i) => (ORTHOGRAPHY[i] = val.normalize(CONFIG.normalization))
  )
}
