import { CONFIG } from './config'
import { ALL_48NAMES } from './all48names'
import { URL_PARAMS } from '../lib/urlParams'

function selectWords(name_with_group: string) {
  const word = name_with_group.replace(/_[A-Z]{3}48$/, '')
  const arr = word.split('')
  const s = new Set(arr)
  const no_duplicated_chars = s.size === arr.length
  const all_valid_chars =
    /^[あいうえおかがきぎくぐけげこごさざしじすずせぜそぞただちぢつづってでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろわをん]+$/.test(
      word
    )
  const group_name = URL_PARAMS['group'] || CONFIG.groupName
  const in_the_group = group_name
    ? name_with_group.includes(group_name)
    : true
  return no_duplicated_chars && all_valid_chars && in_the_group
}

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function shuffleWithSeed(array: any[], seed: number) {
  var m = array.length,
    t,
    i
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(seed) * m--)
    // And swap it with the current element.
    t = array[m]
    array[m] = array[i]
    array[i] = t
    ++seed
  }
  return array
}

function random(seed: number) {
  var x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export const WORDS = shuffleWithSeed(ALL_48NAMES[CONFIG.wordLength], 0)
  .filter(selectWords)
  .map((_: string) => _.replace(/_[A-Z]{3}48$/, ''))

if (CONFIG.normalization) {
  WORDS.forEach((val, i) => (WORDS[i] = val.normalize(CONFIG.normalization)))
}

if (CONFIG.shuffle) {
  shuffle(WORDS)
}
