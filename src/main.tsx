import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import '@ant-design/v5-patch-for-react-19'
import 'antd/dist/reset.css'
import 'virtual:uno.css'
import 'virtual:local-icons'
import { createRoot } from 'react-dom/client'

import '@/assets/styles/page-transition.scss'
import { setupI18n } from '@/locales'
import { setupIconifyOffline, setupLoading } from '@/plugins'

import App from './App.tsx'

setupI18n()
setupLoading()
setupIconifyOffline()

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
