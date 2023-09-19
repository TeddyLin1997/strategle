import Header from './header'
import Footer from './footer'
import { Outlet } from 'react-router-dom'
import { LayoutContainer, Main } from './index.style'

interface LayoutProps {
  isErrorPage?: boolean
  children?: React.ReactNode
}

const Layout = ({ isErrorPage = false, children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />

      <Main>
        { isErrorPage ? children : <Outlet /> }
      </Main>

      <Footer />
    </LayoutContainer>
  )
}

export default Layout
