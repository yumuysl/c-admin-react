import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import { DEFAULT_LOCALE } from '@/constants/app'
import enUS from '@/locales/langs/en-US.json'
import zhCN from '@/locales/langs/zh-CN.json'
import { useAppStore } from '@/stores/appStore'

const { currentLocale } = useAppStore.getState()

const locales = {
  'en-US': {
    translation: enUS,
  },
  'zh-CN': {
    translation: zhCN,
  },
}

export const i18n = i18next.use(initReactI18next)

export async function setupI18n() {
  await i18n.init({
    interpolation: {
      escapeValue: false,
    },
    lng: currentLocale || DEFAULT_LOCALE,
    resources: locales,
  })
}
