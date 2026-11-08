import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { useI18n } from '../i18n/I18nContext'
import { languageNames, languages, type Language } from '../i18n/language'

type LanguageSelectorProps = {
  size: 'small' | 'medium'
}

export function LanguageSelector({ size }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useI18n()

  return (
    <TextField
      select
      size={size}
      label={t('language')}
      value={language}
      onChange={(event) => setLanguage(event.target.value as Language)}
      sx={{ minWidth: { xs: '100%', sm: 170 } }}
    >
      {languages.map((item) => (
        <MenuItem key={item} value={item}>
          {languageNames[item]}
        </MenuItem>
      ))}
    </TextField>
  )
}
