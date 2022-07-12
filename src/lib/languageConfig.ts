import { useState, useEffect } from 'react'
import { SETTINGS } from '../constants/settings'

import { defaultLanguageConfig } from '../context/ConfigContext'

export type LanguageConfig = {
  wordLength: number
  orthography: string[]
  words: string[]
  validGuesses: string[]
  language: string
  languageId: string
  authorWebsite: string
  author: string
  wordListSourceSearchLink: string
  wordListSourceLink: string
  wordListSource: string
  setGameConfigUpdated: (v: boolean) => void
  orthographyPattern: RegExp
}

const normalizeAll = (items: string[]) => {
  items.forEach(
    (val: string, i: number) =>
      (items[i] = val.normalize(SETTINGS.normalization))
  )
}

const setOrthographyPattern = (orthography: string[] = []) => {
  const SORTED_ORTHOGRAPHY = [...orthography].sort(
    (a, b) => b.length - a.length
  )

  return new RegExp('(' + SORTED_ORTHOGRAPHY.join('|') + ')', 'g')
}

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export const useLanguageConfig = () => {
  const [gameConfigUpdated, setGameConfigUpdated] = useState(false)
  const [languageConfig, setLanguageConfig] = useState<LanguageConfig>(() => {
    return { ...defaultLanguageConfig, setGameConfigUpdated }
  })

  const fetchGameConfig = () => {
    let params = new URLSearchParams(window.location.search)
    let siteId = params.get('language') || ''

    if (SETTINGS.allowedSites.find((v) => v.id === siteId)) {
      fetch('conf/' + siteId + '.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (externalConf) {
          externalConf.setGameConfigUpdated = setGameConfigUpdated

          if (SETTINGS.normalization) {
            // Normalize orthography
            normalizeAll(externalConf.orthography)

            // Normalize words
            normalizeAll(externalConf.words)

            // Normalize valid guesses
            normalizeAll(externalConf.validGuesses)
          }

          // Set orthography pattern for status matching
          externalConf.orthographyPattern = setOrthographyPattern(
            externalConf.orthography
          )

          // Words
          if (SETTINGS.shuffle) {
            shuffle(externalConf.words)
          }

          setLanguageConfig(externalConf)
          setGameConfigUpdated(false)
        })
    }
  }

  useEffect(() => {
    fetchGameConfig()
  }, [gameConfigUpdated])

  return languageConfig
}
