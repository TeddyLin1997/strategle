import { MouseEvent, useState } from 'react'
import { HeaderWrapper, HeaderContainer, LogoWrapper, Navigation, NavItem, ConnectWallet, WalletContent, WalletItem, AccountContainer, ChainItem, UserItem, Protocol } from './header.style'
import { Dialog, DialogContent, DialogTitle, Button, Popover, Typography, Chip } from '@mui/material'
import { CHAIN_INFO, CHAIN_INFO_LIST } from '@/global/chain'
import LogoImg from '@/assets/images/logo-icon.png'
import MetaMaskImg from '@/assets/images/metamask.png'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import WalletContainer from '@/context/walletContext'

const anchorOrigin = { vertical: 'bottom', horizontal: 'left' } as const
const anchorStyle = { top: 8 }

const navLinks = [
  { key: 'market', path: '/market', text: 'Market' },
  { key: 'economy', path: '/economy', text: 'Economy' },
  // { key: 'analysis', path: '/analysis', text: 'Analysis' },
  // { key: 'community', path: '/community', text: 'Community' },
  { key: 'protocol', path: '/protocol', text: <Protocol>STRAG Protocol</Protocol> },
]

const userMenu = [
  { key: 'wallet', path: '/wallet', text: 'Wallet', icon: <AccountBalanceWalletIcon /> },
]

const walletList = [
  {
    name: 'MetaMask',
    icon: MetaMaskImg,
    checkIsInstall: () => Boolean(window.ethereum && window.ethereum.isMetaMask),
    installUrl: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
  }
]

const Header = () => {
  const wallet = WalletContainer.useContainer()

  const isConnect = Boolean(wallet.account)
  const ellipsisAddress = isConnect ? `${wallet.account.slice(0, 6)} ... ${wallet.account.slice(-6)}` : ''

  // dialog
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const handleOpen = () => setIsOpenDialog(true)
  const handleClose = () => setIsOpenDialog(false)

  // switch chain
  const [chainMenuElement, setChainMenuElement] = useState<HTMLButtonElement | null>(null)
  const chainMenuOpen = Boolean(chainMenuElement)

  const openPopover = (event: MouseEvent<HTMLButtonElement>) => setChainMenuElement(event.currentTarget)
  const closePopover = () => setChainMenuElement(null)

  // user menu
  const [userMenuElement, setUserMenuElement] = useState<HTMLElement | null>(null)
  const userMenuOpen = Boolean(userMenuElement)
  const handleUserMenuOpen = (event: MouseEvent<HTMLElement>) => setUserMenuElement(event.currentTarget)
  const handleUserMenuClose = () => setUserMenuElement(null)

  return (
    <HeaderWrapper>

      <HeaderContainer>
        <LogoWrapper to="/">
          <img className="logo-img" src={LogoImg} />
          <div>
            <div className="logo-title">Strategle</div>
            <div className="logo-sub-title">Future Bank</div>
          </div>
        </LogoWrapper>

        <Navigation>
          {navLinks.map(item => (
            <NavItem to={item.path} key={item.key}>
              {item.text}
            </NavItem>
          ))}
        </Navigation>

        {/* 錢包狀態 */}
        { isConnect &&
        <AccountContainer>
          {/* chain switch */}
          <Button onClick={openPopover} variant="outlined" size="small" sx={{ mr: 2 }}>
            { CHAIN_INFO[wallet.chainId] && <img className="current-chain-icon" src={CHAIN_INFO[wallet.chainId]?.icon} /> }
            { CHAIN_INFO[wallet.chainId]?.name || 'No support' }
          </Button>
          <Popover
            open={chainMenuOpen}
            anchorEl={chainMenuElement}
            onClose={closePopover}
            anchorOrigin={anchorOrigin}
            sx={anchorStyle}
          >
            <div style={{ padding: 4 }}>
              {CHAIN_INFO_LIST.map((item) => (
                <ChainItem className={item.id === wallet.chainId ? 'active' : ''} key={item.id} onClick={() => wallet.switchChain(item.id)}>
                  <img className="chain-icon" src={item.icon}  />
                  <Typography className="chain-text" sx={{ py: 1, px: 2, fontSize: 14, }}>{item.name}</Typography>
                </ChainItem>
              ))}
            </div>
          </Popover>

          {/* User overview */}
          <Button variant="contained" size="small" onClick={handleUserMenuOpen}>{ellipsisAddress}</Button>
          <Popover
            open={userMenuOpen}
            anchorEl={userMenuElement}
            onClose={handleUserMenuClose}
            anchorOrigin={anchorOrigin}
            sx={anchorStyle}
          >
            <div style={{ padding: '6px', width: '164px' }}>
              {userMenu.map((item) => (
                <UserItem key={item.key} to={item.path} onClick={handleUserMenuClose}>
                  {item.icon}
                  <Typography className="chain-text" sx={{ py: 1, px: 2, fontSize: 14, }}>{item.text}</Typography>
                </UserItem>
              ))}
            </div>
          </Popover>
        </AccountContainer>
        }

        {/* 連接錢包 */}
        { !isConnect && <ConnectWallet variant="contained" size="small" onClick={handleOpen}>Connect wallet</ConnectWallet> }
        {/* 連接錢包 dialog */}
        <Dialog onClose={handleClose} open={isOpenDialog}>
          <DialogTitle sx={{ fontSize: '18px', textAlign: 'center' }}>Please connect wallet</DialogTitle>
          <DialogContent>
            <WalletContent>
              {walletList.map(item => {
                const isInstall = item.checkIsInstall()
                const handleInstall = () => window.open(item.installUrl)
                const handleConnect = () => {
                  wallet.connect()
                  handleClose()
                }

                return (
                  <WalletItem key={item.name} onClick={isInstall ? handleConnect : handleInstall}>
                    { !isInstall && <Chip label="Not installed" color="error" size="small" /> }
                    <img className="wallet-icon" src={item.icon} />
                    <div className="wallet-name">{item.name}</div>
                  </WalletItem>
                )
              }
              )}
            </WalletContent>
          </DialogContent>
        </Dialog>

      </HeaderContainer>
    </HeaderWrapper>
  )
}

export default Header
