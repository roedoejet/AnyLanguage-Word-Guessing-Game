import Countdown from 'react-countdown'
import { useContext } from 'react'

import ConfigContext from '../../context/ConfigContext'

import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { useWordOfTheDay } from '../../lib/words'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[][]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  solution: string
  solutionIndex: number
  handleShare: () => void
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  solution,
  solutionIndex,
  handleShare,
}: Props) => {

  const languageConfig = useContext(ConfigContext)
  const wordOfTheDay = useWordOfTheDay(languageConfig)

  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal title="Statistics" isOpen={isOpen} handleClose={handleClose}>
        <StatBar gameStats={gameStats} />
      </BaseModal>
    )
  }

  return (
    <BaseModal title="Statistics" isOpen={isOpen} handleClose={handleClose}>
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-gray-900">
        Guess Distribution
      </h4>
      <Histogram gameStats={gameStats} />
      {(isGameLost || isGameWon) && (
        <div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
              onClick={() => {
                // update this so it's a direct search
                window.open(languageConfig?.wordListSourceSearchLink.replace("___", solution));
              }}
            >
              Look up <strong>{solution}</strong> in {languageConfig?.language}
            </button>
          </div>
          <div className="mt-5 sm:mt-6 columns-2">
            <div>
              <h5>New word in</h5>
              <Countdown
                className="text-lg font-medium text-gray-900"
                date={wordOfTheDay?.tomorrow}
                daysInHours={true}
              />
            </div>
            <button
              type="button"
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => {
                shareStatus(languageConfig?.language, solution, solutionIndex, guesses, isGameLost, languageConfig?.orthographyPattern)
                handleShare()
              }}
            >
              Share
            </button>
          </div>
        </div>
      )}
    </BaseModal>
  )
}
