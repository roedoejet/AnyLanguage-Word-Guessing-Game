import { CONFIG } from './config'

//Valid combinations of characters that form the language orthography
export const ORTHOGRAPHY = [
  'a',
  'aa',
  'b',
  'd',
  'e',
  'ee',
  'g',
  'g̱',
  'gw',
  'gy',
  'h',
  'hl',
  'i',
  'ii',
  'j',
  'k',
  'ḵ',
  "k'",
  "ḵ'",
  'kw',
  "kw'",
  'ky',
  "ky'",
  'l',
  "'l",
  'm',
  "'m",
  'n',
  "'n",
  'o',
  'oo',
  'p',
  "p'",
  's',
  't',
  "t'",
  'ts',
  "ts'",
  'u',
  'uu',
  'w',
  "'w",
  'x',
  'x̱',
  'xw',
  'y',
  "'y",
  "'",
  '?',
]

//Symbols on the main keyboard
export const KEY_SYMBOLS = [
  'a',
  'aa',
  'b',
  'd',
  'e',
  'ee',
  'g',
  'gw',
  'gy',
  'h',
  'hl',
  'i',
  'ii',
  'j',
  'k',
  "k'",
  "ḵ'",
  'kw',
  "kw'",
  'ky',
  "ky'",
  'l',
  "'l",
  'm',
  "'m",
  'n',
  "'n",
  'o',
  'oo',
  'p',
  "p'",
  's',
  't',
  "t'",
  'ts',
  "ts'",
  'u',
  'uu',
  'w',
  "'w",
  'x',
  'xw',
  'y',
  "'y",
  "'",
  '?',]

// Combining marks such as diacritics and suffixes
export const COMBINING_MARKS = [
  '\u0331',
]

if (CONFIG.normalization) {
  ORTHOGRAPHY.forEach(
    (val, i) => (ORTHOGRAPHY[i] = val.normalize(CONFIG.normalization))
  )
  KEY_SYMBOLS.forEach(
    (val, i) => (KEY_SYMBOLS[i] = val.normalize(CONFIG.normalization))
  )
  COMBINING_MARKS.forEach(
    (val, i) => (COMBINING_MARKS[i] = val.normalize(CONFIG.normalization))
  )
}
