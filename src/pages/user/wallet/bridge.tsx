import styled from 'styled-components'
import { TextField, Button } from '@mui/material'
import BridgeIcon from '@/assets/images/bridge.png'

const Container = styled.div`
  padding: 0 0.8rem 0.8rem;
  position: relative;
`

const FormItem = styled.div`
  margin-top: 1.2rem;
`

const FormLabel = styled.div`
  font-size: 1rem;
  font-weight: 500;
`

const AddressLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: #FFC408;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const SendButton = styled(Button)`
  margin-top: 1rem !important;
  width: 210px;


  @media screen and (max-width: 1200px){
    width: 188px;
  }

  @media screen and (max-width: 768px){
    width: 164px;
  }
`

const Image = styled.img`
  width: 45%;
  position: absolute;
  right: 0;
  bottom: 0;
`


const Bridge = () => {
  return (
    <Container>
      <FormItem>
        <FormLabel>
          Send from :
        </FormLabel>
        <AddressLabel>
          0x9B7d9B7442Db594A91Ca5A9ee4B117C65E26721e
        </AddressLabel>
      </FormItem>

      <FormItem>
        <FormLabel>
          Send To :
        </FormLabel>
        <TextField variant="outlined" size="small" sx={{ marginTop: '.4rem' }} placeholder="Enter public address(0x)" />
      </FormItem>

      <FormItem>
        <FormLabel>
          Assets :
        </FormLabel>
        <TextField variant="outlined" size="small" sx={{ marginTop: '.4rem' }} placeholder="Select asset" />
      </FormItem>

      <FormItem>
        <FormLabel>
          Amount :
        </FormLabel>
        <TextField variant="outlined" size="small" sx={{ marginTop: '.4rem' }} placeholder="0.00" />
      </FormItem>

      <FormItem>
        <SendButton variant="contained" size='large'>Send</SendButton>
      </FormItem>

      <Image src={BridgeIcon} />
    </Container>
  )
}

export default Bridge
