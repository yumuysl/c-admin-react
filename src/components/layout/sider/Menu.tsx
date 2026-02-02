import type { MenuProps } from 'antd'

import { Menu as AntdMenu } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'

import { Icon } from '@/components/icon'
import { useAuthNavigation } from '@/hooks/useAuthNavigation'
import { useUserStore } from '@/stores/userStore'
import { mapTree } from '@/utils/array'
import { isHttpUrl } from '@/utils/string'

import styles from './Menu.module.scss'

export default function Menu() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { userMenus, flatUserMenus } = useUserStore(
    useShallow((state) => ({
      userMenus: state.userMenus,
      flatUserMenus: state.flatUserMenus,
    }))
  )

  const { matchedMenuPath } = useAuthNavigation()

  const selectedKeys = useMemo(() => {
    const selectedItem = flatUserMenus.find(
      (item) => item.path === matchedMenuPath
    )
    return selectedItem ? [selectedItem.id.toString()] : []
  }, [flatUserMenus, matchedMenuPath])

  const defaultOpenKeys = useMemo(() => {
    const selectedItem = flatUserMenus.find(
      (item) => item.path === matchedMenuPath
    )
    return selectedItem?.parentId ? [selectedItem.parentId.toString()] : []
  }, [flatUserMenus, matchedMenuPath])

  const items = useMemo(() => {
    return mapTree(userMenus, (item) => {
      const title = item.i18nKey ? t(item.i18nKey) : item.title
      return {
        key: item.id.toString(),
        label: <span className="text-sm">{title}</span>,
        icon: item.icon && <Icon className="!text-xl" icon={item.icon} />,
        ...(item.parentId ? { title } : {}),
      }
    })
  }, [userMenus, t])

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    const selectedItem = flatUserMenus.find(
      (item) => item.id.toString() === key
    )
    console.log('打印当前item', selectedItem)
    if (
      selectedItem &&
      selectedItem.path &&
      selectedItem.path !== location.pathname
    ) {
      if (isHttpUrl(selectedItem.path)) {
        window.open(selectedItem.path, '_blank')
      } else {
        navigate(selectedItem.path, { viewTransition: true })
      }
    }
  }

  return (
    <AntdMenu
      items={items}
      defaultOpenKeys={defaultOpenKeys}
      selectedKeys={selectedKeys}
      className={`${styles.menuWrapper} !border-r-0`}
      mode="inline"
      onClick={handleClick}
    />
  )
}
