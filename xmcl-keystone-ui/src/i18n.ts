// @ts-ignore
import en from '../locales/en.yaml'
// @ts-ignore
import ru from '../locales/ru.yaml'
// @ts-ignore
import uz from '../locales/uz.yaml'

export const i18n = createI18n({
  legacy: false,
  locale: 'uz',
  fallbackLocale: 'ru',
  silentTranslationWarn: true,
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    en,
    ru,
    uz,
  },
})

