import { CONFIG } from './config'

export const ORTHOGRAPHY = [
  'a',
  'ɛ',
  'e',
  'i',
  'o',
  'ɔ',
  'u',
  "'",
  'b',
  'ch',
  'd',
  'f',
  'g',
  'h',
  'k',
  'l',
  "m",
  'n',
  "p",
  'r',
  's',
  'sh',
  't',
  'w',
  'y',
  ]

if (CONFIG.normalization) {
  ORTHOGRAPHY.forEach(
    (val, i) => (ORTHOGRAPHY[i] = val.normalize(CONFIG.normalization))
  )
}
