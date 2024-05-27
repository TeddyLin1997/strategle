import styled from 'styled-components'
import { TextField, Button } from '@mui/material'
import QuestionIcon from '@/assets/images/question.png'
import { CHAIN_INFO } from '@/global/chain'
import WalletContainer from '@/context/walletContext'

const Container = styled.div`
  position: relative;
`

const FormItem = styled.div`
  margin-bottom: 1.2rem;

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`

const FormLabel = styled.div`
  font-size: 1rem;
  font-weight: 700;
`

const AddressLabel = styled.div`
  width: 100%;
  font-size: 1.2rem;
  font-weight: 700;
  color: #306F7D;
  word-break: break-all;
`

const SendButton = styled(Button)`
  margin-top: 1rem !important;
  max-width: 100%;
  width: 210px;


  @media screen and (max-width: 1200px){
    width: 188px;
  }

  @media screen and (max-width: 768px){
    width: 100%;
  }
`

const inputStyle = { width: '100%', marginTop: '.4rem' }

const Donate = () => {
  // chain
  const wallet = WalletContainer.useContainer()
  const chainInfo = CHAIN_INFO[wallet.chainId]

  // address
  const toAddress = '0xC1fF2a5C49e9866Ccb77Ab836506106eCFC4627F'
  const fromAddress = wallet.account


  return (
    <Container>
      <div className="mb-4 pb-2 text-center font-black text-2xl border-b">DONATE</div>

      <FormItem>
        <FormLabel>Chain Name :</FormLabel>
        <div className="mt-2 flex items-center gap-2">
          <img className="w-8 h-8 rounded-full border border-solid border-secondary" src={chainInfo?.icon || QuestionIcon} />
          <div className="text-xl font-bold text-secondary">{chainInfo?.name || 'No support chain'}</div>
        </div>
      </FormItem>

      <FormItem>
        <FormLabel>Send From :</FormLabel>
        <AddressLabel>{fromAddress}</AddressLabel>
      </FormItem>

      <FormItem>
        <FormLabel>Send To :</FormLabel>
        <AddressLabel>STRATEGLE.TECH</AddressLabel>
        <AddressLabel>{`(${toAddress})`}</AddressLabel>
        {/* <TextField
          value={toAddress}
          variant="outlined"
          color="secondary"
          size="small"
          sx={inputStyle}
          disabled
        /> */}
      </FormItem>

      <FormItem>
        <FormLabel>Assets :</FormLabel>
        <TextField variant="outlined" color="secondary" size="small" sx={inputStyle} placeholder="Select asset" />
      </FormItem>

      <FormItem>
        <FormLabel>Amount :</FormLabel>
        <TextField variant="outlined" color="secondary" size="small" sx={inputStyle} placeholder="0.00" />
      </FormItem>

      <FormItem>
        <SendButton variant="contained" color="secondary" size='large'>Send</SendButton>
      </FormItem>
    </Container>
  )
}

export default Donate
