// Adopt: https://reactjs.org/docs/context.html

import { useContext } from 'react'
import ConfigContext from '../../context/ConfigContext'

import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  const languageConfig = useContext(ConfigContext)
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500">
        This is an open source clone of the game Wordle adapted to{' '}
        {languageConfig?.language} by{' '}
        <a href={languageConfig?.authorWebsite} className="underline font-bold">
          {languageConfig?.author}
        </a>{' '}
        - check out{' '}
        <a
          href="https://github.com/hannahcode/wordle"
          className="underline font-bold"
        >
          the original code
        </a>{' '}
        by{' '}
        <a
          href="https://www.hannahmariepark.com/"
          className="underline font-bold"
        >
          Hannah Park
        </a>{' '}
        or have a look at{' '}
        <a
          href="https://github.com/roedoejet/AnyLanguage-Wordle"
          className="underline font-bold"
        >
          Aidan Pine's fork
        </a>{' '}
        and customize it for another language! Or,
        {' you can also '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold"
        >
          play the original here
        </a>
        .
      <br />
      <br />
        The words for this Wordle were
        sourced from{' '}
        <a href={languageConfig?.wordListSourceLink} className="underline font-bold">
          {languageConfig?.wordListSource}
        </a>
        .
      </p>
    </BaseModal>
  )
}
