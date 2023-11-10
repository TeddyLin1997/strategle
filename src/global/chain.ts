import arbitrum from '@/assets/images/chain/arbitrum.png'
import avalanche from '@/assets/images/chain/avalanche.png'
import bsc from '@/assets/images/chain/bsc.png'
import ethereum from '@/assets/images/chain/ethereum.png'
import optimism from '@/assets/images/chain/optimism.png'
import polygon from '@/assets/images/chain/polygon.png'
import zksync from '@/assets/images/chain/zksync.png'

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
  rpc: string
  explorer: string
  coin: {
    name: string
    icon: string
  }
}

export const CHAIN_INFO: { [props: number]: ChainInfo } = {
  [Chain.ETH]: {
    icon: ethereum,
    id: Chain.ETH,
    name: 'Ethereum',
    rpc: 'https://mainnet.infura.io/v3/021832fd97e24479889d13082356357f',
    explorer: 'https://etherscan.io',
    coin: {
      name: 'ETH',
      icon: ethereum,
    }
  },
  [Chain.BSC]: {
    icon: bsc,
    id: Chain.BSC,
    name: 'BSC',
    rpc: 'https://bsc-dataseed.binance.org',
    explorer: 'https://bscscan.com',
    coin: {
      name: 'BNB',
      icon: bsc,
    },
  },
  [Chain.AVAX]: {
    icon: avalanche,
    id: Chain.AVAX,
    name: 'Avalanche',
    rpc: 'https://api.avax.network/ext/bc/C/rpc',
    explorer: 'https://avascan.info',
    coin: {
      name: 'AVAX',
      icon: avalanche,
    },
  },
  [Chain.Polygon]: {
    icon: polygon,
    id: Chain.Polygon,
    name: 'Polygon',
    rpc: 'https://rpc-mainnet.matic.network',
    explorer: 'https://polygonscan.com',
    coin: {
      name: 'MATIC',
      icon: polygon,
    },
  },
  [Chain.ARB]: {
    icon: arbitrum,
    id: Chain.ARB,
    name: 'Arbitrum',
    rpc: 'https://arb1.arbitrum.io/rpc',
    explorer: 'https://arbiscan.io',
    coin: {
      name: 'ETH',
      icon: ethereum,
    },
  },
  [Chain.OP]: {
    icon: optimism,
    id: Chain.OP,
    name: 'Optimism',
    rpc: 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
    coin: {
      name: 'ETH',
      icon: ethereum,
    },
  },
  [Chain.ZK]: {
    icon: zksync,
    id: Chain.ZK,
    name: 'ZkSync era',
    rpc: 'https://mainnet.era.zksync.io',
    explorer: 'https://explorer.zksync.io',
    coin: {
      name: 'ETH',
      icon: ethereum,
    },
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
