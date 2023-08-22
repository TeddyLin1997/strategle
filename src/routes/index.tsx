import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/pages/layout'
import Error from '@/pages/error'
import Home from '@/pages/home'


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
    ],
  },
])

const Router = () => (
  <RouterProvider router={router} />
)

export default Router
