import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { CONFIG } from '../../constants/config'
import { useTranslation } from 'react-i18next'
import 'i18next'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

interface Letter {
  letter: string
  highlight: boolean
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  const { t } = useTranslation()
  const firstExampleWord: Letter[] = t('firstExampleWord', {
    returnObjects: true,
  })
  const secondExampleWord: Letter[] = t('secondExampleWord', {
    returnObjects: true,
  })
  const thirdExampleWord: Letter[] = t('thirdExampleWord', {
    returnObjects: true,
  })
  return (
    <BaseModal title={t('howToPlay')} isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500">
        {t('instructions', { tries: CONFIG.tries })}
      </p>

      <div className="flex justify-center mb-1 mt-4">
        {Array.isArray(firstExampleWord) &&
          firstExampleWord.map((el: Letter) => {
            if (el.highlight) {
              return <Cell key={el.letter} value={el.letter} status="correct" />
            } else {
              return <Cell key={el.letter} value={el.letter} />
            }
          })}
      </div>
      <p className="text-sm text-gray-500">{t('correctSpotInstructions')}</p>
      <div className="flex justify-center mb-1 mt-4">
        {Array.isArray(secondExampleWord) &&
          secondExampleWord.map((el) => {
            if (el.highlight) {
              return <Cell key={el.letter} value={el.letter} status="present" />
            } else {
              return <Cell key={el.letter} value={el.letter} />
            }
          })}
      </div>
      <p className="text-sm text-gray-500">{t('wrongSpotInstructions')}</p>

      <div className="flex justify-center mb-1 mt-4">
        {Array.isArray(thirdExampleWord) &&
          thirdExampleWord.map((el) => {
            if (el.highlight) {
              return <Cell key={el.letter} value={el.letter} status="absent" />
            } else {
              return <Cell key={el.letter} value={el.letter} />
            }
          })}
      </div>
      <p className="text-sm text-gray-500">{t('notInWordInstructions')}</p>
    </BaseModal>
  )
}
