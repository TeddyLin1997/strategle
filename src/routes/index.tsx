import { Suspense, lazy } from 'react'
import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom'
import Layout from '@/pages/layout'
import ErrorBoundary from '@/pages/error'

const SuspenseLayout = () => (
  <Suspense fallback={<>Loading...</>}>
    <Outlet />
  </Suspense>
)

const Home = lazy(() => import('@/pages/home'))
const Economy = lazy(() => import('@/pages/economy'))
const Analysis = lazy(() => import('@/pages/analysis'))
const Community = lazy(() => import('@/pages/community'))
const Protocol = lazy(() => import('@/pages/protocol'))
const UserOverview = lazy(() => import('@/pages/user/overview'))
const UserWallet = lazy(() => import('@/pages/user/wallet'))

const root = (
  <Route path="/"
    element={<Layout />}
    errorElement={<ErrorBoundary />}
  >
    <Route element={<SuspenseLayout />}>
      <Route index element={<Home/>} />
      <Route path="/economy" element={<Economy/>} />
      <Route path="/analysis" element={<Analysis/>} />
      <Route path="/community" element={<Community/>} />
      <Route path="/protocol" element={<Protocol/>} />
      <Route path="/user/overview" element={<UserOverview/>} />
      <Route path="/user/wallet" element={<UserWallet/>} />
    </Route>
  </Route>
)

const router = createBrowserRouter(createRoutesFromElements(root))

const Router = () => (
  <RouterProvider router={router} />
)

export default Router
