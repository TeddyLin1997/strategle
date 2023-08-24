import arbitrum from '@/assets/images/arbitrum.png'
import avalanche from '@/assets/images/avalanche.png'
import bsc from '@/assets/images/bsc.png'
import ethereum from '@/assets/images/ethereum.png'
import optimism from '@/assets/images/optimism.png'
import polygon from '@/assets/images/polygon.png'
import zksync from '@/assets/images/zksync.png'

export enum Chain {
  ETH = 1,
  BSC = 56,
  AVAX = 43114,
  Polygon = 137,
  ARB = 42161,
  OP = 10,
  ZK = 324,
  PolygonEVM = -1,
}

type ChainInfo = {
  icon: string
  id: Chain
  name: string
  href: string
  explorer: string
}

export const CHAIN_INFO: { [props: number]: ChainInfo } = {
  [Chain.ETH]: {
    icon: ethereum,
    id: Chain.ETH,
    name: 'Ethereum',
    // href: 'https://mainnet.infura.io/v3/021832fd97e24479889d13082356357f',
    href: 'https://eth.llamarpc.com',
    explorer: 'https://etherscan.io',
  },
  [Chain.BSC]: {
    icon: bsc,
    id: Chain.BSC,
    name: 'BSC',
    href: 'https://bsc-dataseed.binance.org',
    explorer: 'https://bscscan.com',
  },
  [Chain.AVAX]: {
    icon: avalanche,
    id: Chain.AVAX,
    name: 'Avalanche',
    href: 'https://api.avax.network/ext/bc/C/rpc',
    explorer: 'https://avascan.info',
  },
  [Chain.Polygon]: {
    icon: polygon,
    id: Chain.Polygon,
    name: 'Polygon',
    href: 'https://rpc-mainnet.matic.network',
    explorer: 'https://polygonscan.com',
  },
  [Chain.ARB]: {
    icon: arbitrum,
    id: Chain.ARB,
    name: 'Arbitrum',
    href: 'https://arb1.arbitrum.io/rpc',
    explorer: 'https://arbiscan.io',
  },
  [Chain.OP]: {
    icon: optimism,
    id: Chain.OP,
    name: 'Optimism',
    href: 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
  },
  [Chain.ZK]: {
    icon: zksync,
    id: Chain.ZK,
    name: 'ZkSync era',
    href: 'https://mainnet.era.zksync.io',
    explorer: 'https://explorer.zksync.io',
  },
}

export const CHAIN_INFO_LIST = [
  CHAIN_INFO[Chain.ETH],
  CHAIN_INFO[Chain.BSC],
  CHAIN_INFO[Chain.AVAX],
  CHAIN_INFO[Chain.Polygon],
  CHAIN_INFO[Chain.ARB],
  CHAIN_INFO[Chain.OP],
  CHAIN_INFO[Chain.ZK],
]
