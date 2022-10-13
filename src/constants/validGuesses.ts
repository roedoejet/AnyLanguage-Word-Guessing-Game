import { CONFIG } from './config'

export const VALIDGUESSES = [
"kaaky",,"nitky","këꞋxp","wääjx","tiixy","käjpy","xejty","kutpy","koꞋon","yuuꞋn","katsy","kujup","najan","kujan","këꞋëk",,"xuumy"
]

if (CONFIG.normalization) {
  VALIDGUESSES.forEach(
    (val, i) => (VALIDGUESSES[i] = val.normalize(CONFIG.normalization))
  )
}
