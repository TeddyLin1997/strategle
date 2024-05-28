import { TextField, Button } from '@mui/material'
import QuestionIcon from '@/assets/images/question.png'
import { CHAIN_INFO } from '@/global/chain'
import WalletContainer from '@/context/walletContext'

const inputStyle = { width: '100%', marginTop: '.4rem' }

const Swap = () => {
  const wallet = WalletContainer.useContainer()
  const chainInfo = CHAIN_INFO[wallet.chainId]

  return (
    <section>
      <div className="mb-4 pb-2 text-center font-black text-2xl border-b">SWAP</div>

      <article className="mb-5">
        <div className="font-bold">Chain Name :</div>
        <div className="mt-2 flex items-center gap-2">
          <img className="w-8 h-8 rounded-full border border-solid border-secondary" src={chainInfo?.icon || QuestionIcon} />
          <div className="text-xl font-bold text-secondary">{chainInfo?.name || 'No support chain'}</div>
        </div>
      </article>

      <article className="mb-5">
        <div className="font-bold">
          Send From :
        </div>
        <div className="w-full font-bold text-xl text-secondary break-all">
          {wallet.account}
        </div>
      </article>

      <article className="mb-5">
        <div className="font-bold">
          Send To :
        </div>
        <TextField variant="outlined" size="small" sx={inputStyle} placeholder="Enter public address(0x)" />
      </article>

      <article className="mb-5">
        <div className="font-bold">
          Assets :
        </div>
        <TextField variant="outlined" size="small" sx={inputStyle} placeholder="Select asset" />
      </article>

      <article className="mb-5">
        <div className="font-bold">
          Amount :
        </div>
        <TextField variant="outlined" size="small" sx={inputStyle} placeholder="0.00" />
      </article>

      <article className="mb-5">
        <Button variant="contained" color="secondary" size="large">Send</Button>
      </article>

    </section>
  )
}

export default Swap
