import { CONFIG } from '../../constants/config'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500">
        This is an open source clone of the game Wordle adapted to{' '}
        {CONFIG.language} by{' '}
        <a href={CONFIG.authorWebsite} className="underline font-bold">
          {CONFIG.author}.
        </a>{' '}
        <br />
        Check out{' '}
        <a
          href="https://github.com/hannahcode/word-guessing-game"
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
        and customize it for another language!
        <br />
        <br />
        The words for this Wordle were sourced from{' '}
        <a href={CONFIG.wordListSourceLink} className="underline font-bold">
          {CONFIG.wordListSource}
        </a>
        . Or,
        {' you can also '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold"
        >
          play the original here
        </a>
      </p>
    </BaseModal>
  )
}
