import { BaseModal } from './BaseModal'
import { CONFIG } from '../../constants/config'
import { useTranslation } from 'react-i18next'
import { localeLanguageKey } from '../../i18n'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const TranslateModal = ({ isOpen, handleClose }: Props) => {
  const { t, i18n } = useTranslation()
  const onChangeValue = (event: any) => {
    i18n.changeLanguage(event.target.value)
    localStorage.setItem(localeLanguageKey, event.target.value)
  }

  const createOption = (code: string, text: string) => {
    return (
      <div key={code}>
        <label>{text}</label>
        <input
          className="m-2"
          checked={
            i18n.language !== undefined && code === i18n.language.split('-')[0]
          }
          type="radio"
          value={code}
          name="lang"
          onChange={(e) => {}}
        />
      </div>
    )
  }

  return (
    <BaseModal
      title={t('pickYourLanguage')}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div
        className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8"
        onChange={onChangeValue}
      >
        {CONFIG.availableLangs.map((x) => createOption(x, t(`languages.${x}`)))}
      </div>
    </BaseModal>
  )
}
