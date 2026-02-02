import type { ReactNode } from 'react'

import { Space } from 'antd'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Icon } from '@/components/icon'

interface SearchContainerProps {
  children?: ReactNode
  extra?: ReactNode
  actions?: ReactNode
}

export default function SearchContainer({ children, extra, actions }: SearchContainerProps) {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <div>
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {extra}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-end">
        {actions}
      </div>

      {extra && (
        <div
          className="font-base mr-4 flex grow cursor-pointer select-none items-center justify-center rounded tracking-widest transition-colors duration-300 hover:text-[#1677ff]"
          onClick={() => setIsVisible(!isVisible)}
        >
          <Space>
            <Icon
              icon="icon-park-outline:down"
              className={`transition-transform duration-300 ${isVisible ? 'rotate-180' : ''}`}
            />
            <span>{isVisible ? t('common.collapse') : t('common.expand')}</span>
          </Space>
        </div>
      )}
    </>
  )
}
