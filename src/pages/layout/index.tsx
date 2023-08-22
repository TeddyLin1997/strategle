import Header from './header'
import Footer from './footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <div>layout</div>
      <Header />

      <div>
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default Layout
