export const TOKEN_LIST = [
  {
    name: 'ETH',
    icon: '',
    contractAddress: '',
    contractAbi: '',
  }
]

export const TOKEN_INFO = {}

TOKEN_LIST.forEach(item => {
  TOKEN_INFO[item.name] = item
})
