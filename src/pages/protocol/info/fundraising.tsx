import { formatNumber } from '@/utils'
import { ethers } from 'ethers'
import { Link, Button, LinearProgress } from '@mui/material'

interface FundraisingProps {
  treasuryAmount: string
}

const Fundraising = ({ treasuryAmount }: FundraisingProps) => {
  const treasuryBalance = ethers.formatUnits(treasuryAmount, 6)
  const progressValue = Number(treasuryBalance) / 30000 * 100

  return (
    <div className="mb-14">
      <div className="mb-6 text-3xl font-black text-primary-light">Currently in the Fundraising Stage.</div>

      <div className="px-1">
        <section className="mb-2 px-2 flex items-center justify-between font-bold">
          <article>
            <div className="mb-1">FUNDS RAISED</div>
            <div className="text-up font-black">
              <span className="text-2xl">$ {formatNumber(treasuryBalance, 0)}</span> &nbsp;
              <span>USDT</span>
            </div>
          </article>

          <article className="text-right">
            <div className="mb-1">GOAL</div>
            <div className="text-primary-light font-black">
              <span className="text-2xl">$ 30,000</span>&nbsp;
              <span>USDT</span>
            </div>
          </article>
        </section>

        <LinearProgress variant="determinate" value={Math.max(progressValue, 5)} className="!h-3 rounded-xl" color="success" />

        <section className="mt-6 px-2 flex items-center justify-between gap-4">
          <p className="w-3/4">
            Now you can use USDT to mint STARG tokens and stake them. When the treasury assets reach at least 30,000 USDT, we will start the profit-sharing plan. We are still in the fundraising stage, with a cap of 5,000,000 USDT. So seize the opportunity.
          </p>
          <Link href="/protocol?tab=Portfolio&action=Mint" className="cursor-pointer">
            <Button variant="contained">Join Now</Button>
          </Link>
        </section>
      </div>
    </div>
  )
}

export default Fundraising
