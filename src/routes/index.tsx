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
const Market = lazy(() => import('@/pages/market'))
const Portfolio = lazy(() => import('@/pages/portfolio'))
const Protocol = lazy(() => import('@/pages/protocol'))

const root = (
  <Route path="/"
    element={<Layout />}
    errorElement={<ErrorBoundary />}
  >
    <Route element={<SuspenseLayout />}>
      <Route index element={<Home/>} />
      <Route path="/market" element={<Market/>} />
      <Route path="/portfolio" element={<Portfolio/>} />
      <Route path="/protocol" element={<Protocol/>} />
    </Route>
  </Route>
)

const router = createBrowserRouter(createRoutesFromElements(root))

const Router = () => (
  <RouterProvider router={router} />
)

export default Router
