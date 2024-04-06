import { Link } from '@mui/material'

const Rules = () => {
  return (
    <div className="Protocol-Rules">
      <pre className="mb-6 font-bold text-4xl text-center">Protocol Rules</pre>
      <div className="mb-10 px-6 py-4 bg-gray-bg border border-gray-1 rounded-2xl">

        <div className="mb-2 font-bold text-lg">Description : </div>
        <p className="mb-8">
        We are an automated trading team for project pages with over a decade of experience. Utilizing our own developed trading model, which has been backtested, we achieve an annualized return rate of over 12%. With the STRAG Protocol, you can join this project by minting $STRAG tokens. The team will provide you with a 12% annualized return rate, with the option to withdraw your earnings at any time. The treasury is managed using smart contracts, with profits injected into it quarterly. You can monitor the treasury's operation on-chain.
        </p>

        <section className="mb-8 flex justify-evenly gap-10">

          <article className="w-2/5">
            <div className="mb-2 text-lg font-bold">Join STRAG Protocol steps : </div>
            <ul className="ml-8 list-disc leading-[2]">
              <li>Have USDT tokens.</li>
              <li><Link>Mint</Link> &nbsp; Use $USDT to mint $STRAG.</li>
              <li><Link>Stake</Link> &nbsp; Stake STRAG tokens.</li>
              <li><Link>claim</Link> &nbsp; Claim rewards.</li>
            </ul>
          </article>

          <article className="w-2/5">
            <div className="mb-2 text-lg font-bold">Exit STRAG Protocol steps : </div>
            <ul className="ml-8 list-disc leading-[2]">
              <li>Apply to unstake STRAG tokens.</li>
              <li>Wait for 180 days.</li>
              <li>Withdraw STRAG tokens.</li>
            </ul>
          </article>

        </section>

        <section className="flex justify-evenly gap-10">

          <article className="w-2/5">
            <div className="mb-2 text-lg font-bold">Why Choose STRAG Protocol :</div>
            <ul className="ml-8 list-disc leading-relaxed">
              <li>We offer a high APY of 12%.</li>
              <li>STRAG tokens can be exchanged 1:1 with USDT, eliminating concerns about price fluctuations.</li>
              <li>Earnings can be claimed and withdrawn at any time.</li>
              <li>The treasury's fund flow is transparent and publicly accessible.</li>
            </ul>
          </article>

          <article className="w-2/5">
            <div className="mb-2 text-lg font-bold">Tips : </div>
            <ul className="ml-8 list-disc leading-relaxed">
              <li>Token supply is limited to 3,600,000.</li>
              <li>Minimum staking period is 365 days.</li>
              <li>Unstaking requires a 180-day waiting period.</li>
              <li>The team will inject investment rewards quarterly.</li>
            </ul>
          </article>

        </section>
      </div>
    </div>
  )
}

export default Rules
