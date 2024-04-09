import { Link } from '@mui/material'

const Rules = () => {
  return (
    <div className="Protocol-Rules">
      <pre className="mb-6 font-bold text-4xl text-center">Protocol Rules</pre>
      <div className="mb-10 px-6 py-4 bg-gray-bg border border-gray-1 rounded-2xl">

        <div className="mb-2 font-bold text-lg">Description : </div>
        <p className="mb-8 ml-4">
        We are an automated trading team for project pages with over a decade of experience. Utilizing our own developed trading model, which has been backtested, we achieve an annualized return rate of over 12%. With the STRAG Protocol, you can join this project by minting $STRAG tokens. The team will provide you with a 12% annualized return rate, with the option to withdraw your earnings at any time. The treasury is managed using smart contracts, with profits injected into it quarterly. You can monitor the treasury's operation on-chain.
        </p>

        <section className="mb-8 flex justify-evenly gap-10">

          <article className="w-2/5">
            <div className="mb-2 flex items-center gap-2 text-lg font-bold">
              <img src="/logo.ico" className="w-5 h-5" />
              <span>Join STRAG Protocol steps :</span>
            </div>

            <ul className="ml-8 list-disc leading-[2]">
              <li>Have USDT tokens.</li>
              <li><Link href="/protocol?tab=Portfolio&action=Mint" className="cursor-pointer">Mint</Link> &nbsp; Use $USDT to mint $STRAG.</li>
              <li><Link href="/protocol?tab=Portfolio&action=Stake" className="cursor-pointer">Stake</Link> &nbsp; Stake STRAG tokens.</li>
              <li><Link href="/protocol?tab=Portfolio&action=Claim" className="cursor-pointer">Claim</Link> &nbsp; Claim rewards.</li>
            </ul>
          </article>

          <article className="w-2/5">
            <div className="mb-2 flex items-center gap-2 text-lg font-bold">
              <img src="/logo.ico" className="w-5 h-5" />
              <span>Exit STRAG Protocol steps : </span>
            </div>

            <ul className="ml-8 list-disc leading-[2]">
              <li>Apply to unstake STRAG tokens.</li>
              <li>Withdraw STRAG tokens.</li>
            </ul>
          </article>

        </section>

        <section className="flex justify-evenly gap-10">

          <article className="w-2/5">
            <div className="mb-2 flex items-center gap-2 text-lg font-bold">
              <img src="/logo.ico" className="w-5 h-5" />
              <span>Why Choose STRAG Protocol : </span>
            </div>

            <ul className="ml-8 list-disc leading-relaxed">
              <li>We offer a high APY of 12%.</li>
              <li>Earnings can be claimed and withdrawn at any time.</li>
              <li>The treasury's fund flow is publicly accessible.</li>
              <li>STRAG tokens can be exchanged 1:1 with USDT, eliminating concerns about price fluctuations.</li>
            </ul>
          </article>

          <article className="w-2/5">
            <div className="mb-2 flex items-center gap-2 text-lg font-bold">
              <img src="/logo.ico" className="w-5 h-5" />
              <span>Tips : </span>
            </div>
            <ul className="ml-8 list-disc leading-relaxed">
              <li>Token supply is limited to 5,000,000.</li>
              <li>The team will inject investment rewards quarterly.</li>
            </ul>
          </article>

        </section>
      </div>
    </div>
  )
}

export default Rules
