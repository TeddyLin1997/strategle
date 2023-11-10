import styled from 'styled-components'
import { TextField, Button } from '@mui/material'
import DonateIcon from '@/assets/images/donate.png'
import { useWallet } from '@/hooks/useWallet'
import { CHAIN_INFO } from '@/global/chain'

const Container = styled.div`
  padding: 0 0.8rem 0.8rem;
  position: relative;
`

const FormItem = styled.div`
  margin-top: 1.2rem;
`

const FormLabel = styled.div`
  font-size: 1rem;
  font-weight: 700;
`

const AddressLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #306F7D;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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


const Donate = () => {
  // chain
  const wallet = useWallet()
  const chainInfo = CHAIN_INFO[wallet.chainId]

  // address
  const toAddress = '0x9b7d9b7442db594a91ca5a9ee4b117c65e26721e'
  const fromAddress = wallet.account


  return (
    <Container>
      <FormItem>
        <FormLabel>Chain Name :</FormLabel>
        <BlockchainLabel>
          <img className="blockchain-icon" src={chainInfo.icon} />
          <div className="blockchain-name">{chainInfo.name}</div>
        </BlockchainLabel>
      </FormItem>

      <FormItem>
        <FormLabel>Send From :</FormLabel>
        <AddressLabel>{fromAddress}</AddressLabel>
      </FormItem>

      <FormItem>
        <FormLabel>Send To :</FormLabel>
        <AddressLabel>{toAddress}</AddressLabel>
      </FormItem>

      <FormItem>
        <FormLabel>Assets :</FormLabel>
        <TextField variant="outlined" color="secondary" size="small" sx={{ marginTop: '.4rem' }} placeholder="Select asset" />
      </FormItem>

      <FormItem>
        <FormLabel>Amount :</FormLabel>
        <TextField variant="outlined" color="secondary" size="small" sx={{ marginTop: '.4rem' }} placeholder="0.00" />
      </FormItem>

      <FormItem>
        <SendButton variant="contained" color="secondary" size='large'>Send</SendButton>
      </FormItem>

      <Image src={DonateIcon} />
    </Container>
  )
}

export default Donate
