import { CONFIG } from './config'
import { ALL_48NAMES } from './all48names'

export const VALIDGUESSES = ALL_48NAMES['6chars']

if (CONFIG.normalization) {
  VALIDGUESSES.forEach(
    (val, i) => (VALIDGUESSES[i] = val.normalize(CONFIG.normalization))
  )
}
