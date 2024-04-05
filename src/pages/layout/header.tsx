import { MouseEvent, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HeaderWrapper, HeaderContainer, LogoWrapper, Navigation, NavItem, ConnectWallet, WalletContent, WalletItem, AccountContainer, ChainItem } from './header.style'
import { Dialog, DialogContent, DialogTitle, Button, Popover, Typography, Chip } from '@mui/material'
import { CHAIN_INFO, CHAIN_INFO_LIST } from '@/global/chain'
import LogoImg from '@/assets/images/strategle.png'
import MetaMaskImg from '@/assets/images/metamask.png'
import PersonIcon from '@mui/icons-material/Person'
import Badge from '@mui/material/Badge'
import WalletContainer from '@/context/walletContext'

const anchorOrigin = { vertical: 'bottom', horizontal: 'left' } as const
const anchorStyle = { top: 8 }

const navLinks = [
  { key: 'market', path: '/', text: 'Market' },
  { key: 'economy', path: '/economy', text: 'Economy' },
  // { key: 'analysis', path: '/analysis', text: 'Analysis' },
  // { key: 'community', path: '/community', text: 'Community' },
  { key: 'protocol', path: '/protocol', text:
    <Badge badgeContent=" DeFi" color="primary">
      <div>STRAG Protocol</div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </Badge>

  },
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

  const isConnect = wallet.account !== ''
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
            <NavItem to={item.path} key={item.key} className={({ isActive }) => isActive ? 'active' : '' }>
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
              { CHAIN_INFO[wallet.chainId]?.name || 'no support' }
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
            <NavLink to="/user">
              <Button variant="contained" size="small">
                <PersonIcon style={{ width: '20px', height: '20px', marginRight: '.6rem' }} />
                <span>{ellipsisAddress}</span>
              </Button>
            </NavLink>

          </AccountContainer>
        }

        {/* 連接錢包 */}
        { !isConnect && <ConnectWallet variant="contained" size="small" onClick={handleOpen}>Connect wallet</ConnectWallet> }

        {/* 連接錢包 dialog */}
        <Dialog onClose={handleClose} open={isOpenDialog}>
          <DialogTitle sx={{ fontSize: '18px', textAlign: 'center' }}>
            Please connect wallet
          </DialogTitle>
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
