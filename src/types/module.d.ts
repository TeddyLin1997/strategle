import { EthereumProvider } from 'ethers/providers'
declare module 'react/jsx-runtime' {
  export default any
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}


declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
