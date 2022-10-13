import { CONFIG } from './config'

export const ORTHOGRAPHY = [
"a",
"ä",
"e",
"ë",
"i",
"ï",
"o",
"u",
"p",
"t",
"k",
"ts",
"x",
"m",
"n",
"w",
"y",
"j",
"l",
"r",
"s",
"Ꞌ",
]

if (CONFIG.normalization) {
  ORTHOGRAPHY.forEach(
    (val, i) => (ORTHOGRAPHY[i] = val.normalize(CONFIG.normalization))
  )
}
