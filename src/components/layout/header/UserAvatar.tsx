import type { MenuProps } from 'antd'

import { App, Button, Dropdown } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'

import { Icon } from '@/components/icon'
import { useUserStore } from '@/stores/userStore'

export default function UserDropdown() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { userInfo, logout } = useUserStore(
    useShallow(state => ({
      userInfo: state.userInfo,
      logout: state.logout,
    })),
  )
  const { modal } = App.useApp()

  // 处理菜单点击事件
  const handleClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'userCenter':
        navigate('/user-center', { viewTransition: true })
        break
      case 'logout':
        modal.confirm({
          title: t('common.logoutConfirm'),
          onOk: () => {
            logout()
          },
        })
        break
    }
  }

  const items: MenuProps['items'] = [
    {
      key: 'userCenter',
      label: t('common.userCenter'),
      icon: <Icon icon="icon-park-outline:user" className="mr-0.5" />,
      onClick: handleClick,
    },
    {
      key: 'logout',
      label: t('common.logout'),
      icon: <Icon icon="icon-park-outline:logout" className="mr-0.5" />,
      onClick: handleClick,
    },
  ]

  return (
    <Dropdown
      placement="bottomRight"
      overlayStyle={{
        minWidth: '100px',
        maxWidth: '200px',
      }}
      menu={{ items }}
    >
      <div>
        <Button
          type="text"
          icon={(
            <Icon
              icon="icon-park-outline:user"
              className="text-base dark:text-theme-dark text-theme"
            />
          )}
        >
          <span className="pl-2 font-400">
            {userInfo?.nickName || userInfo?.username}
          </span>
        </Button>
      </div>
    </Dropdown>
  )
}
