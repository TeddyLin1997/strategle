import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/pages/layout'
import Error from '@/pages/error'
import Home from '@/pages/home'
import Market from '@/pages/market'
import Protocol from '@/pages/protocol'
import Portfolio from '@/pages/portfolio'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'market',
        element: <Market />,
      },
      {
        path: 'portfolio',
        element: <Portfolio />,
      },
      {
        path: 'protocol',
        element: <Protocol />,
      },
    ],
  },
])

const Router = () => (
  <RouterProvider router={router} />
)

export default Router
