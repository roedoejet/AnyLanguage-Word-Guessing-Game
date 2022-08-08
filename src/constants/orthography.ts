import { CONFIG } from './config'

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

export const TOOLTIPS: any = {
  a: 'this is a tooltip',
}

if (CONFIG.normalization) {
  ORTHOGRAPHY.forEach(
    (val, i) => (ORTHOGRAPHY[i] = val.normalize(CONFIG.normalization))
  )
}
