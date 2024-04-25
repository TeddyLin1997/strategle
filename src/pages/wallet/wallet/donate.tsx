import styled from 'styled-components'
import { TextField, Button } from '@mui/material'
import DonateIcon from '@/assets/images/donate.png'
import QuestionIcon from '@/assets/images/question.png'
import { CHAIN_INFO } from '@/global/chain'
import WalletContainer from '@/context/walletContext'

const Container = styled.div`
  position: relative;
`

const FormItem = styled.div`
  margin-bottom: 1.2rem;
  max-width: 60%;

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

const BlockchainLabel = styled.div`
  margin-top: .6rem;
  display: flex;
  align-items: center;

  .blockchain-icon {
    margin-right: .6rem;
    width: 32px;
    border-radius: 50%;
    border: 2px solid #306F7D;
  }

  .blockchain-name {
    font-size: 1.2rem;
    font-weight: 700;
    color: #306F7D;
  }
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

const Image = styled.img`
  width: 30%;
  position: absolute;
  right: 0;
  bottom: 0;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const inputStyle = { width: '100%', marginTop: '.4rem' }

const Donate = () => {
  // chain
  const wallet = WalletContainer.useContainer()
  const chainInfo = CHAIN_INFO[wallet.chainId]

  // address
  const toAddress = '0x9b7d9b7442db594a91ca5a9ee4b117c65e26721e'
  const fromAddress = wallet.account


  return (
    <Container>
      <FormItem>
        <FormLabel>Chain Name :</FormLabel>
        <BlockchainLabel>
          <img className="blockchain-icon w-8 h-8" src={chainInfo?.icon || QuestionIcon} />
          <div className="blockchain-name">{chainInfo?.name || 'No support chain'}</div>
        </BlockchainLabel>
      </FormItem>

      <FormItem>
        <FormLabel>Send From :</FormLabel>
        <AddressLabel>{fromAddress}</AddressLabel>
      </FormItem>

      <FormItem>
        <FormLabel>Send To :</FormLabel>
        <TextField
          value={toAddress}
          variant="outlined"
          color="secondary"
          size="small"
          sx={inputStyle}
          disabled
        />
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

      <Image src={DonateIcon} />
    </Container>
  )
}

export default Donate
