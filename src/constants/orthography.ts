import { CONFIG } from './config'

export const ORTHOGRAPHY = [
  'a',
  'â',
  'à',
  'b',
  'c',
  'd',
  'e',
  'é',
  'è',
  'ê',
  'ë',
  'ē',
  'f',
  'g',
  'h',
  'i',
  'j',
  'l',
  'm',
  'n',
  'o',
  'ó',
  'ò',
  'ô',
  'ō',
  'p',
  'q',
  'r',
  's',
  't',
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
