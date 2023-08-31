import { FooterContainer } from './footer.style'

const Footer = () => {
  return (
    <FooterContainer>{`© ${new Date().getUTCFullYear()} Strategle.com`}</FooterContainer>
  )
}

export default Footer
