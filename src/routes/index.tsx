import { lazy } from 'react'
import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import Layout from '@/pages/layout'

const routes = [
  { key: 'home', path: '/', index: true, component: lazy(() => import('@/pages/home')) },
  { key: 'economy', path: '/economy', index: false, component: lazy(() => import('@/pages/economy')) },
  { key: 'analysis', path: '/analysis', index: false, component: lazy(() => import('@/pages/analysis')) },
  { key: 'community', path: '/community', index: false, component: lazy(() => import('@/pages/community')) },
  { key: 'protocol', path: '/protocol', index: false, component: lazy(() => import('@/pages/protocol')) },
  { key: 'user', path: '/user', index: false, component: lazy(() => import('@/pages/user')) },
]

const root = (
  <Route path="/"
    element={<Layout />}
    errorElement={<Layout.ErrorBoundary />}
  >
    <Route element={<Layout.SuspenseLayout />}>
      { routes.map(item =>
        (<Route
          key={item.key}
          index={item.index}
          path={item.path}
          element={<item.component/>}
        />))
      }
    </Route>
  </Route>
)

const router = createBrowserRouter(createRoutesFromElements(root))

const Router = () => (
  <RouterProvider router={router} />
)

export default Router
