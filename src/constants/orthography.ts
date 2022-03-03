import { CONFIG } from './config'

export const ORTHOGRAPHY = [
  'ᐁ',
  'ᐯ',
  'ᑌ',
  'ᑫ',
  'ᒉ',
<<<<<<< Updated upstream
  'ee',
  'g',
  'g̱',
  'gw',
  'gy',
=======
  'ᒣ',
  'ᓀ',
  'ᓭ',
  'ᔐ',
  'ᔦ',
>>>>>>> Stashed changes
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
]

if (CONFIG.normalization) {
  ORTHOGRAPHY.forEach(
    (val, i) => (ORTHOGRAPHY[i] = val.normalize(CONFIG.normalization))
  )
}
