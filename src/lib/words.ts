import { useState, useEffect } from 'react'

export const useWordOfTheDay = (languageConfig: any) => {
  const [solution, setSolution] = useState('');
  const [solutionIndex, setSolutionIndex] = useState(0);
  const [tomorrow, setTomorrow] = useState(0);

  useEffect((() => {
    // January 1, 2022 Game Epoch
    const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
    const now = Date.now()
    const msInDay = 86400000
    const index = Math.floor((now - epochMs) / msInDay)
    const nextday = (index + 1) * msInDay + epochMs

    setSolution(languageConfig.words[index % languageConfig.words.length])
    setSolutionIndex(index)
    setTomorrow(nextday)
  }), [languageConfig]);

  return {
    solution,
    solutionIndex,
    tomorrow
  }
}

export const isWordInWordList = (words: string[], validGuesses: string[], word: string) => {
  return words.includes(word) || validGuesses.includes(word)
}

export const isWinningWord = (solution: string, word: string) => {
  return solution === word
}