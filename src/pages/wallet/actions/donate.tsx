import { ChangeEvent, useMemo, useState } from 'react'
import { TextField, Button, MenuItem } from '@mui/material'
import QuestionIcon from '@/assets/images/question.png'
import { CHAIN_INFO } from '@/global/chain'
import WalletContainer from '@/context/walletContext'
import { checksumAddress } from '@/utils'
import { parseEther } from 'ethers'
import toast from 'react-hot-toast'

const inputStyle = { width: '100%', marginTop: '.4rem' }

const Donate = () => {
  // chain
  const wallet = WalletContainer.useContainer()
  const nativeToken = CHAIN_INFO[wallet.chainId]

  // address
  const toAddress = checksumAddress('0xC1fF2a5C49e9866Ccb77Ab836506106eCFC4627F')
  const fromAddress = checksumAddress(wallet.account)

  // amount
  const [amount, setAmount] = useState('')
  const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }


  // assets token contract
  const [assets, setAssets] = useState('native')
  const onChangeAssets = (event: ChangeEvent<HTMLInputElement>) => {
    setAssets(event.target.value)
  }

  const sendTransaction = async () => {
    if (assets === 'native') sendNativeToken()
    else sendERC20Token()
  }

  // send native token
  async function sendNativeToken () {
    if (!wallet.signer) return toast.error('wallet is empty.')
    const valueInWei = parseEther(amount)
    const transaction = {
      to: toAddress,
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

  const tokenList = useMemo(() => {
    return [
      {
        label: nativeToken.coin.name,
        value: 'native',
        icon: nativeToken.coin.icon,
        isNative: '',
      }
    ]
  }, [wallet.chainId])

  return (
    <section>
      <div className="mb-4 pb-2 text-center font-black text-2xl border-b">DONATE</div>

      <article className="mb-5">
        <div className="font-bold">Chain Name :</div>
        <div className="mt-2 flex items-center gap-2">
          <img className="w-8 h-8 rounded-full border border-solid border-secondary" src={nativeToken?.icon || QuestionIcon} />
          <div className="text-xl font-bold text-secondary">{nativeToken?.name || 'No support chain'}</div>
        </div>
      </article>

      <article className="mb-5">
        <div className="font-bold">Send From :</div>
        <div className="w-full font-bold text-lg text-secondary break-all">{fromAddress}</div>
      </article>

      <article className="mb-5">
        <div className="font-bold">Send To :</div>
        <div className="w-full font-bold text-lg text-secondary break-all">{toAddress}</div>
        <div className="px-2 w-fit font-bold bg-secondary text-white break-all rounded">STRATEGLE.Admin</div>
      </article>

      <article className="mb-5">
        <div className="font-bold">Assets :</div>
        <TextField value={assets} onChange={onChangeAssets} variant="outlined" color="secondary" size="small" sx={inputStyle} placeholder="Select token" select >
          {tokenList.map(item => (
            <MenuItem key={item.value} value={item.value}>
              <div className="flex items-center gap-2">
                <img src={item.icon} alt="" className="w-6 h-6" />
                <span>{item.label}</span>
              </div>
            </MenuItem>
          ))}
        </TextField>
      </article>

      <article className="mb-5">
        <div className="font-bold">Amount :</div>
        <TextField value={amount} onChange={onChangeAmount} variant="outlined" color="secondary" size="small" sx={inputStyle} placeholder="0.00" />
      </article>

      <article className="mb-5">
        <Button variant="contained" color="secondary" size="large" onClick={sendTransaction} fullWidth>
          Send
        </Button>
      </article>
    </section>
  )
}

export default Donate
