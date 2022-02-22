import { createContext, useMemo } from 'react'

export const defaultLanguageConfig = {
  language: "",
  languageId: "",
  wordLength: 5,
  words: ["hello"],
  orthography: ["a", "b", "c", "d", "e", "f", "g", "h", "l", "o"],
  validGuesses: ["hello", "world"],
  authorWebsite: "",
  author: "",
  wordListSourceLink: "",
  wordListSource: "",
  orthographyPattern: new RegExp("")
};

export const ConfigContext = createContext(defaultLanguageConfig)

export default ConfigContext