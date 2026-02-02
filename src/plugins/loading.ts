import { i18n } from '@/locales'

export function setupLoading() {
  const loading = document.querySelector('#Loading')

  if (loading) {
    loading.querySelector('.preload__logo')!.innerHTML = '<img src="/logo.svg" alt="logo">'
    loading.querySelector('.preload__name')!.innerHTML = i18n.t('common.projectName')
    loading.querySelector('.preload__text')!.innerHTML = i18n.t('common.loading')
  }
}

export function hideLoading() {
  const loading = document.querySelector('#Loading')
  loading?.classList.add('is-hide')
  setTimeout(() => {
    loading?.remove()
  }, 300)
}
