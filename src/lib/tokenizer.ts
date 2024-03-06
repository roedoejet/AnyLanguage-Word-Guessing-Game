import { ORTHOGRAPHY } from '../constants/orthography'
import { CONFIG } from '../constants/config'

function escapeRegExp(string: string) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export const SORTED_ORTHOGRAPHY = [...ORTHOGRAPHY].sort(
  (a, b) => b.length - a.length
)

const joinedCharacters = CONFIG.escapeSpecialCharacters
  ? SORTED_ORTHOGRAPHY.map((x) => escapeRegExp(x)).join('|')
  : SORTED_ORTHOGRAPHY.join('|')

export const ORTHOGRAPHY_PATTERN = new RegExp('(' + joinedCharacters + ')', 'g')
