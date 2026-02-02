import { Outlet, useLocation } from 'react-router-dom'

import { AuthGuard } from '@/components/auth-guard'
import { useTransitionControl } from '@/contexts'
import { BlankLayout, DefaultLayout } from '@/layouts'
import { getRouteMeta } from '@/router/routeMeta'

export default function Layout() {
  const location = useLocation()
  const routeMeta = getRouteMeta(location.pathname)

  const { isThemeSwitching } = useTransitionControl()

  if (!routeMeta?.layout || routeMeta.layout === 'default') {
    return (
      <AuthGuard>
        <DefaultLayout>
          <div style={{ viewTransitionName: isThemeSwitching ? 'none' : 'page' }}>
            <Outlet />
          </div>
        </DefaultLayout>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <BlankLayout>
        <Outlet />
      </BlankLayout>
    </AuthGuard>
  )
}
