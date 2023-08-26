import styled from 'styled-components'

const ContainerWrapper = styled.div`
  margin: 0 auto;
  padding: 76px 20px 18px;
  max-width: 1240px;
`

const Container = ({ children }) => {
  return (
    <ContainerWrapper>
      {children}
    </ContainerWrapper>
  )
}

export default Container
