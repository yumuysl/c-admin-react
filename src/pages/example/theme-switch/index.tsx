import { Switch } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/button'
import { BaseContainer } from '@/components/container'
import { useAnimateTheme } from '@/hooks/useAnimateTheme'

export default function ThemeSwitchExample() {
  const { t } = useTranslation()
  const [animate, setAnimate] = useState(true)

  const {
    triggerRef,
    toggleTheme,
    animateToggleTheme,
  } = useAnimateTheme()

  // 处理点击事件
  function handleClick() {
    if (animate) {
      animateToggleTheme()
    }
    else {
      toggleTheme()
    }
  }

  return (
    <BaseContainer title={t('page.themeSwitchExample.title')}>
      <div className="mb-4 flex items-center gap-2">
        <span>
          {t('page.themeSwitchExample.animate')}
        </span>
        <Switch
          checked={animate}
          onChange={checked => setAnimate(checked)}
        />
      </div>
      <Button ref={triggerRef} onClick={handleClick}>
        {t('page.themeSwitchExample.switch')}
      </Button>
    </BaseContainer>
  )
}
