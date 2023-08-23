import { HeaderContainer, LogoWrapper, Navigation, NavItem, ConnectWallet, WalletContainer, WalletItem } from './header.style'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useWallet } from '@/hooks/useWallet'
import LogoImg from '@/assets/images/strategle.png'
import MetaMaskImg from '@/assets/images/metamask.png'
import { useState } from 'react'

const navLinks = [
  { key: 'home', path: '/', text: '首頁' },
  { key: 'market', path: '/market', text: '市場' },
]

const walletList = [
  {
    name: 'MetaMask',
    icon: MetaMaskImg,
  }
]

const Header = () => {
  const wallet = useWallet()

  // dialog
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const handleOpen = () => setIsOpenDialog(true)
  const handleClose = () => setIsOpenDialog(false)

  // connect
  const handleConnect = () => {
    wallet.connect()
    handleClose()
  }


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

      <ConnectWallet variant="contained" size="small" onClick={handleOpen}>連接錢包</ConnectWallet>

      <Dialog onClose={handleClose} open={isOpenDialog}>
        <DialogTitle sx={{ fontSize: '18px', textAlign: 'center' }}>
          請選擇連接錢包
        </DialogTitle>
        <DialogContent>
          <WalletContainer>
            {walletList.map(item => (
              <WalletItem key={item.name} onClick={handleConnect}>
                <img className="wallet-icon" src={item.icon} />
                <div className="wallet-name">{item.name}</div>
              </WalletItem>
            ))}
          </WalletContainer>
        </DialogContent>
      </Dialog>

    </HeaderContainer>
  )
}

export default Header
