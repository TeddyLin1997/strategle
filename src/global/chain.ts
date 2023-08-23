export enum Chain {
  ETH = 'ETH',
  BSC = 'BSC',
  AVAX = 'AVAX',
  Matic = 'Matic',
  ARB = 'ARB',
  OP = 'OP',
  ZK = 'ZK',
  PolygonEVM = 'PolygonEVM',
}

export const ChainInfo = {
  [Chain.ETH]: {
    icon: '',
    id: 1,
    name: 'Ethereum',
    // href: 'https://mainnet.infura.io/v3/021832fd97e24479889d13082356357f',
    href: 'https://eth.llamarpc.com',
    explorer: 'https://etherscan.io',
  },
  [Chain.BSC]: {
    icon: '',
    id: 56,
    name: 'Binance Smart Chain',
    href: 'https://bsc-dataseed.binance.org',
    explorer: 'https://bscscan.com',
  },
  [Chain.AVAX]: {
    icon: '',
    id: 43114,
    name: 'Avalanche',
    href: 'https://api.avax.network/ext/bc/C/rpc',
    explorer: 'https://avascan.info',
  },
  [Chain.Matic]: {
    icon: '',
    id: 137,
    name: 'Polygon',
    href: 'https://rpc-mainnet.matic.network',
    // href: 'https://polygon.llamarpc.com',
    explorer: 'https://polygonscan.com',
  },
  [Chain.ARB]: {
    icon: '',
    id: 42161,
    name: 'Arbitrum',
    href: 'https://arb1.arbitrum.io/rpc',
    explorer: 'https://arbiscan.io',
  },
  [Chain.OP]: {
    icon: '',
    id: 10,
    name: 'Optimism',
    href: 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
  },
  [Chain.ZK]: {
    icon: '',
    id: 324,
    name: 'ZkSync Era',
    href: 'https://mainnet.era.zksync.io',
    explorer: 'https://explorer.zksync.io',
  },
}
