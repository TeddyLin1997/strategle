import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
import { LayoutContainer, Main, SuspenseContainer } from './index.style'
import ProgressLinear from '@/components/progress-linear'
import ProgressCircular from '@/components/progress-circular'

interface LayoutProps {
  isErrorPage?: boolean
  children?: React.ReactNode
}

const Layout = ({ isErrorPage = false, children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <ProgressLinear />
      <Header />

      <Main>
        { isErrorPage ? children : <Outlet /> }
      </Main>

      <Footer />
      <Toaster position="top-center" reverseOrder={true}/>
    </LayoutContainer>
  )
}

Layout.SuspenseLayout = () => {
  return (
    <Suspense
      fallback={
        <SuspenseContainer>
          <ProgressCircular />
        </SuspenseContainer>
      }>
      <Outlet />
    </Suspense>
  )
}

Layout.ErrorBoundary = () => {
  return (
    <Layout isErrorPage>
      <div>Error</div>
    </Layout>
  )
}

export default Layout
