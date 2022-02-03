import { CONFIG } from './config'
import { ALL_48NAMES } from './all48names'
import { URL_PARAMS } from '../lib/url_params'

export const WORDS = ALL_48NAMES[CONFIG.wordLength]
  .filter((name_with_group: string) => {
    const word = name_with_group.replace(/_[A-Z]{3}48$/, '')

    const arr = word.split('')
    const s = new Set(arr)
    const no_duplicated_chars = s.size === arr.length

    const all_valid_chars =
      /^[あいうえおかがきぎくぐけげこごさざしじすずせぜそぞただちぢつづってでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろわをん]+$/.test(
        word
      )
    const in_the_group = URL_PARAMS['group']
      ? name_with_group.includes(URL_PARAMS['group'])
      : true

    return no_duplicated_chars && all_valid_chars && in_the_group
  })
  .map((_) => _.replace(/_[A-Z]{3}48$/, ''))

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
