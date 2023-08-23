import Header from './header'
import Footer from './footer'
import { Outlet } from 'react-router-dom'
import { LayoutContainer, Main } from './index.style'

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </LayoutContainer>
  )
}

export default Layout
