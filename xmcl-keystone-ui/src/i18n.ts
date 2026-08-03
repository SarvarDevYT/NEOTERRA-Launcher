import { createI18n } from 'vue-i18n'
// @ts-ignore
import en from '../locales/en.yaml'
// @ts-ignore
import ru from '../locales/ru.yaml'

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
    uz: ru,
  },
})

