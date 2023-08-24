import { MouseEvent, useState } from 'react'
import { HeaderContainer, LogoWrapper, Navigation, NavItem, ConnectWallet, WalletContainer, WalletItem, AccountContainer, ChainItem } from './header.style'
import { Dialog, DialogContent, DialogTitle, Button, Popover, Typography, Chip } from '@mui/material'
import { useWallet } from '@/hooks/useWallet'
import { useSnackbar } from 'notistack'
import { CHAIN_INFO, CHAIN_INFO_LIST } from '@/global/chain'
import LogoImg from '@/assets/images/strategle.png'
import MetaMaskImg from '@/assets/images/metamask.png'

const navLinks = [
  { key: 'home', path: '/', text: '首頁' },
  { key: 'market', path: '/market', text: '市場' },
  { key: 'portfolio', path: '/portfolio', text: '投資組合' },
  { key: 'protocol', path: '/protocol', text: 'STRAG 協議' },
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
  const { enqueueSnackbar } = useSnackbar()
  const wallet = useWallet()

  const isConnect = wallet.account !== ''
  const ellipsisAddress = isConnect ? `${wallet.account.slice(0, 5)}...${wallet.account.slice(-4)}` : ''
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(wallet.account)
    enqueueSnackbar('已複製')
  }

  // dialog
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const handleOpen = () => setIsOpenDialog(true)
  const handleClose = () => setIsOpenDialog(false)

  // switch chain
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const openPopover = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const closePopover = () => setAnchorEl(null)


  return (
    <HeaderContainer>
      <LogoWrapper>
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
          <Button onClick={openPopover} variant="outlined" size="small" sx={{ mr: 2 }}>
            { CHAIN_INFO[wallet.chainId] && <img className="current-chain-icon" src={CHAIN_INFO[wallet.chainId]?.icon} /> }
            { CHAIN_INFO[wallet.chainId]?.name || '不支持此網絡' }
          </Button>
          <Button onClick={handleCopyAddress} variant="contained" size="small" sx={{ fontWeight: 'bold' }}>{ellipsisAddress}</Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={closePopover}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            sx={{top: 8}}
          >
            <div style={{ padding: 4 }}>
              {CHAIN_INFO_LIST.map((item) => (
                <ChainItem className={item.id === wallet.chainId ? 'active' : ''} key={item.id} onClick={() => wallet.switchChain(item.id)}>
                  <img className="chain-icon" src={item.icon}  />
                  <Typography className="chain-text" sx={{ py: 1, px: 2,  fontWeight: 'bold', fontSize: 14, }}>{item.name}</Typography>
                </ChainItem>
              ))}
            </div>
          </Popover>
        </AccountContainer>
      }

      {/* 連接錢包 */}
      { !isConnect && <ConnectWallet variant="contained" size="small" onClick={handleOpen}>連接錢包</ConnectWallet> }
      {/* 連接錢包 dialog */}
      <Dialog onClose={handleClose} open={isOpenDialog}>
        <DialogTitle sx={{ fontSize: '18px', textAlign: 'center' }}>
          請選擇連接錢包
        </DialogTitle>
        <DialogContent>
          <WalletContainer>
            {walletList.map(item => {
              const isInstall = item.checkIsInstall()
              const handleInstall = () => window.open(item.installUrl)
              const handleConnect = () => {
                wallet.connect()
                handleClose()
              }

              return (
                <WalletItem key={item.name} onClick={isInstall ? handleConnect : handleInstall}>
                  { !isInstall && <Chip label="未安裝" color="error" size="small" /> }
                  <img className="wallet-icon" src={item.icon} />
                  <div className="wallet-name">{item.name}</div>
                </WalletItem>
              )
            }
            )}
          </WalletContainer>
        </DialogContent>
      </Dialog>

    </HeaderContainer>
  )
}

export default Header
