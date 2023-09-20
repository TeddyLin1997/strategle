import styled from 'styled-components'

const ContainerWrapper = styled.div`
  margin: 0 auto;
  padding: 20px;
  max-width: 1240px;
`

const Container = ({ children, ...props }) => {
  return (
    <ContainerWrapper {...props}>
      {children}
    </ContainerWrapper>
  )
}

export default Container
