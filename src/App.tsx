import { useState, useEffect, ChangeEvent } from 'react'

import { ConfigContext } from './context/ConfigContext'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { ChartBarIcon } from '@heroicons/react/outline'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { WIN_MESSAGES } from './constants/strings'
import { isWordInWordList, isWinningWord, useWordOfTheDay } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import { useLanguageConfig } from './lib/languageConfig'

import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'

import { SETTINGS } from './constants/settings'
import fvlogo from './logo-fv-black.png'

import '@bcgov/bc-sans/css/BCSans.css'

const ALERT_TIME_MS = 2000

function App() {
  const languageConfig = useLanguageConfig()
  const wordOfTheDay = useWordOfTheDay(languageConfig)
  const [currentGuess, setCurrentGuess] = useState<Array<string>>([])
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [successAlert, setSuccessAlert] = useState('')
  const [guesses, setGuesses] = useState<string[][]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== wordOfTheDay?.solution) {
      return []
    }
    const gameWasWon = loaded.guesses
      .map((guess) => guess.join(''))
      .includes(wordOfTheDay?.solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === 6 && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution: wordOfTheDay?.solution })
  }, [guesses, wordOfTheDay, languageConfig])

  useEffect(() => {
    if (isGameWon) {
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    if (
      currentGuess.length < languageConfig.wordLength &&
      guesses.length < SETTINGS.tries &&
      !isGameWon
    ) {
      let newGuess = currentGuess.concat([value])
      setCurrentGuess(newGuess)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === languageConfig.wordLength)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (
      !isWordInWordList(
        languageConfig.words,
        languageConfig.validGuesses,
        currentGuess.join('')
      )
    ) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }
    const winningWord = isWinningWord(
      wordOfTheDay?.solution,
      currentGuess.join('')
    )

    if (
      currentGuess.length === languageConfig.wordLength &&
      guesses.length < SETTINGS.tries &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === SETTINGS.tries - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  const onLanguageSwitch = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()

    const selectedValue = e.target.value

    if (selectedValue === 'none') {
      return
    }

    window.history.pushState(
      '',
      '',
      `${window.location.pathname}?language=${selectedValue}`
    )
    languageConfig.setGameConfigUpdated(true)

    // Reset state
    setGuesses([])
    setIsGameWon(false)
    setIsGameLost(false)
  }

  return (
    <ConfigContext.Provider value={languageConfig}>
      <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex w-80 mx-auto items-center mb-8">
          <h1 className="text-xl grow font-bold">
            {languageConfig.language} Not-Wordle
          </h1>
          <InformationCircleIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsInfoModalOpen(true)}
          />
          <ChartBarIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsStatsModalOpen(true)}
          />
        </div>
        <Grid
          guesses={guesses}
          solution={wordOfTheDay?.solution}
          currentGuess={currentGuess}
        />
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={guesses}
          solution={wordOfTheDay?.solution}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpen(false)}
          guesses={guesses}
          gameStats={stats}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          solution={wordOfTheDay?.solution}
          solutionIndex={wordOfTheDay?.solutionIndex}
          handleShare={() => {
            setSuccessAlert('Game copied to clipboard')
            return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
          }}
        />
        <AboutModal
          isOpen={isAboutModalOpen}
          handleClose={() => setIsAboutModalOpen(false)}
        />

        <div className="flex items-center border-t-2 mt-6">
          <a
            id="navigate-FV"
            className="mx-auto mt-6 mr-8 flex"
            href={languageConfig?.authorWebsite}
          >
            <img src={fvlogo} alt="FirstVoices" />
          </a>

          <button
            type="button"
            className="mx-auto mt-8 mr-8 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
            onClick={() => setIsAboutModalOpen(true)}
          >
            About this game
          </button>

          <select
            className="mx-auto mt-8 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
            onChange={onLanguageSwitch}
          >
            <option value="none">Select a Language:</option>

            {SETTINGS.allowedSites.map((v) => {
              let selected = false
              if (v.id === languageConfig.languageId) {
                selected = true
              }
              return (
                <option
                  key={`language-${v.id}`}
                  value={v.id}
                  selected={selected}
                >
                  {v.label}
                </option>
              )
            })}
          </select>
        </div>

        <Alert message="Not enough letters" isOpen={isNotEnoughLetters} />
        <Alert message="Word not found" isOpen={isWordNotFoundAlertOpen} />
        <Alert
          message={`The word was ${wordOfTheDay?.solution}`}
          isOpen={isGameLost}
        />
        <Alert
          message={successAlert}
          isOpen={successAlert !== ''}
          variant="success"
        />
        <div
          style={{
            display: new URLSearchParams(window.location.search).get('test')
              ? 'block'
              : 'none',
          }}
        >
          <br />
          <strong>POSSIBLE GUESSES:</strong>
          <br /> {languageConfig?.validGuesses.join(', ')}
          <br />
        </div>
        <div
          style={{
            display: new URLSearchParams(window.location.search).get('debug')
              ? 'block'
              : 'none',
          }}
        >
          <br />
          <strong>SOLUTION:</strong>
          <br /> {wordOfTheDay?.solution}
          <br />
          <strong>WORDS:</strong>
          <br /> {languageConfig?.words.join(', ')}
          <br />
          <strong>POSSIBLE GUESSES:</strong>
          <br /> {languageConfig?.validGuesses.join(', ')}
          <br />
        </div>
      </div>
    </ConfigContext.Provider>
  )
}

export default App
