import styled from 'styled-components'
import { ChangeEvent, useState } from 'react'
import { TextField, Button } from '@mui/material'
import SendIcon from '@/assets/images/send.png'
import { CHAIN_INFO } from '@/global/chain'
import WalletContainer from '@/context/walletContext'
// import { TOKEN_INFO } from '@/global/token'
// import { Contract, parseUnits, parseEther } from 'ethers'

const Container = styled.div`
  position: relative;

  @media screen and (max-width: 768px) {
    & .MuiTextField-root {
      width: 100%;
    }
  }
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

const Send = () => {
  // chain
  const wallet = WalletContainer.useContainer()
  const chainInfo = CHAIN_INFO[wallet.chainId]

  // from address
  const fromAddress = wallet.account

  // to address
  const [toAddress, setToAddress] = useState('')
  const onChangeToAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setToAddress(event.target.value)
  }

  // assets token contract
  const [assets] = useState(chainInfo.coin.name)
  // const tokenContract = useMemo(() => {
  //   const tokenContract = new Contract(tokenContractAddress, tokenContractABI, signer)
  //   const tokenBalance = await tokenContract.balanceOf(account)
  // }, [assets])


  const sendTransaction = async () => {
    if (assets === chainInfo.coin.name) sendNativeToken()
    else sendERC20Token()
  }

  // send native token
  async function sendNativeToken () {
    // const toAddress = '目標地址'
    // const valueInWei = parseEther('1.0') // 1 ETH
    // const transaction = {
    //   to: toAddress,
    //   value: valueInWei,
    // }
    // const tx = await signer.sendTransaction(transaction)
  }


  // send ERC-20 token
  async function sendERC20Token () {
    // const tokenAmount = parseUnits('100', 18)
    // const tokenTransaction = await tokenContract.transfer(toAddress, tokenAmount)
  }

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
        <TextField
          value={toAddress}
          onChange={onChangeToAddress}
          variant="outlined"
          color="secondary"
          size="small"
          sx={inputStyle}
          placeholder="Enter public address(0x)" />
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
        <SendButton variant="contained" color="secondary" size="large" onClick={sendTransaction}>
          Send
        </SendButton>
      </FormItem>

      <Image src={SendIcon} />
    </Container>
  )
}

export default Send
