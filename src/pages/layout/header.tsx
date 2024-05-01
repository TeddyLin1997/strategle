import { MouseEvent, useState } from 'react'
import { HeaderWrapper, HeaderContainer, LogoWrapper, NavItem, ConnectWallet, WalletContent, WalletItem, ChainItem, UserItem, Protocol } from './header.style'
import { Dialog, DialogContent, DialogTitle, Button, Popover, Typography, Chip } from '@mui/material'
import { CHAIN_INFO, CHAIN_INFO_LIST } from '@/global/chain'
import LogoImg from '@/assets/images/logo-icon.png'
import MenuImg from '@/assets/images/menu.png'
import MetaMaskImg from '@/assets/images/metamask.png'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import WalletContainer from '@/context/walletContext'
import Drawer from '@mui/material/Drawer'
import { NavLink } from 'react-router-dom'

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

  // mobile meun
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  return (
    <HeaderWrapper>

      <HeaderContainer>
        <LogoWrapper to="/" draggable="false">
          <img className="logo-img" src={LogoImg} />
          <div>
            <div className="logo-title">STRATEGLE</div>
            <div className="logo-sub-title">DeFi Bank</div>
          </div>
        </LogoWrapper>

        {/* Mobile Meun */}
        <img src={MenuImg} onClick={() => setOpenMobileMenu(true)} width="32px" height="32px" className="ml-auto sm:hidden cursor-pointer hover:opacity-80 transition-all"/>
        <Drawer anchor="right" open={openMobileMenu} onClose={() => setOpenMobileMenu(false)}>
          <div className="p-5 w-screen h-screen flex flex-col items-center gap-8 bg-bg text-white">
            <div className="mb-6 flex flex-col items-center">
              <img className="mb-3 w-14 h-14" src={LogoImg} />
              <div className="text-3xl text-primary font-black">STRATEGLE</div>
              <div className="text-xl text-primary-dark font-bold">DeFi Bank</div>
            </div>

            {navLinks.map(item => (
              <NavLink to={item.path} key={item.key} className="block font-bold hover:text-[#b28905]" onClick={() => setOpenMobileMenu(false)}>
                <div className="w-fit text-2xl">
                  {item.text}
                </div>
              </NavLink>
            ))}
          </div>
        </Drawer>

        {/* Desktop Menu */}
        <menu className="hidden sm:flex items-center">
          {navLinks.map(item => (
            <NavItem to={item.path} key={item.key} className="hover:text-[#b28905]">
              {item.text}
            </NavItem>
          ))}
        </menu>

        {/* 錢包狀態 */}
        { isConnect &&
        <section className="ml-auto hidden sm:flex items-center gap-4">
          {/* chain switch */}
          <Button onClick={openPopover} variant="outlined" size="small">
            { CHAIN_INFO[wallet.chainId] && <img className="mr-1 w-6 h-auto rounded-full" src={CHAIN_INFO[wallet.chainId]?.icon} /> }
            { CHAIN_INFO[wallet.chainId]?.name || 'No support' }
          </Button>
          <Popover
            open={chainMenuOpen}
            anchorEl={chainMenuElement}
            onClose={closePopover}
            anchorOrigin={anchorOrigin}
            sx={anchorStyle}
          >
            <div>
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
        </section>
        }

        {/* 連接錢包 */}
        { !isConnect && <ConnectWallet className="!hidden sm:!block" variant="contained" size="small" onClick={handleOpen}>Connect wallet</ConnectWallet> }
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
