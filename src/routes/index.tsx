import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/pages/layout'
import Error from '@/pages/error'
import Home from '@/pages/home'
import Market from '@/pages/market'


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
    ],
  },
])

const Router = () => (
  <RouterProvider router={router} />
)

export default Router
