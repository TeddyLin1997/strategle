import styled from 'styled-components'
import { ChangeEvent, useMemo, useState } from 'react'
import { TextField, Button } from '@mui/material'
import QuestionIcon from '@/assets/images/question.png'
import { CHAIN_INFO } from '@/global/chain'
import WalletContainer from '@/context/walletContext'
import { checksumAddress } from '@/utils'
// import { TOKEN_INFO } from '@/global/token'
// import { Contract, parseUnits, parseEther } from 'ethers'
import { parseEther } from 'ethers'
import toast from 'react-hot-toast'

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

const Send = () => {
  // chain
  const wallet = WalletContainer.useContainer()
  const chainInfo = CHAIN_INFO[wallet.chainId]

  // from address
  const fromAddress = wallet.account

  // to address
  const [toAddress, setToAddress] = useState('')
  const checksumToAddress = useMemo(() => checksumAddress(toAddress), [toAddress])
  const onChangeToAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setToAddress(event.target.value)
  }

  // assets token contract
  const [assets] = useState(chainInfo?.coin?.name || '-')
  // const tokenContract = useMemo(() => {
  //   const tokenContract = new Contract(tokenContractAddress, tokenContractABI, signer)
  //   const tokenBalance = await tokenContract.balanceOf(account)
  // }, [assets])

  // amount
  const [amount, setAmount] = useState('')
  const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }


  const sendTransaction = async () => {
    if (assets === chainInfo?.coin?.name) sendNativeToken()
    else sendERC20Token()
  }

  // send native token
  async function sendNativeToken () {
    if (!wallet.signer) return toast.error('wallet is empty.')
    const valueInWei = parseEther(amount)
    const transaction = {
      to: checksumToAddress,
      value: valueInWei,
    }

    await wallet.signer.sendTransaction(transaction)
    toast.success('success')
  }


  // send ERC-20 token
  async function sendERC20Token () {
    // const tokenAmount = parseUnits('100', 18)
    // const tokenTransaction = await tokenContract.transfer(toAddress, tokenAmount)
  }

  return (
    <Container>
      <div className="mb-4 pb-2 text-center font-black text-2xl border-b">SEND</div>

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
        <TextField value={amount} onChange={onChangeAmount} variant="outlined" color="secondary" size="small" sx={inputStyle} placeholder="0.00" />
      </FormItem>

      <FormItem>
        <SendButton variant="contained" color="secondary" size="large" onClick={sendTransaction}>
          Send
        </SendButton>
      </FormItem>

    </Container>
  )
}

export default Send
