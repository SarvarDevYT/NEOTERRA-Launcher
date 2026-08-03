// import messages from '@intlify/unplugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'
// @ts-ignore
import en from '../locales/en.yaml'
// @ts-ignore
import uz from '../locales/uz.yaml'

export const i18n = createI18n({
  legacy: false,
  locale: 'uz',
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    en,
    uz,
  },
})

