import WalletContainer from '@/context/walletContext'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Wallet {
  icon: string
  name: string
  rdns: string
  uuid: string
  provider: any
}

interface ConntectWalletDialogProps {
  isOpen: boolean
  onClose: () => void
}

const ConntectWalletDialog = ({ isOpen, onClose }: ConntectWalletDialogProps) => {
  const { t } = useTranslation()

  const [walletList, setWalletList] = useState<Wallet[]>([])

  const { connect } = WalletContainer.useContainer()
  const handleWallet = (wallet: Wallet) => {
    window.ethereum = wallet.provider
    setTimeout(() => {
      connect()
      onClose()
    }, 200)
  }

  useEffect(() => {
    window.addEventListener('eip6963:announceProvider', (event: any) => {
      const { info, provider } = event.detail
      setWalletList(prev => [...prev, { ...info, provider }])
    })

    window.dispatchEvent(new Event('eip6963:requestProvider'))
  }, [])

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ fontSize: '18px', textAlign: 'center' }}>{t('please_connect_wallet')}</DialogTitle>
      <DialogContent>
        {walletList.length === 0 && <div className="font-bold text-down text-xl">Need to install browser wallet first !</div>}
        {walletList.length > 0 && walletList.map(wallet => (
          <div
            key={wallet.uuid}
            className="mb-3 px-4 py-2 flex items-center gap-3 border border-gray-1 rounded-lg hover:bg-primary-light cursor-pointer"
            onClick={() => handleWallet(wallet)}
          >
            <img src={wallet.icon} className="w-8 h-8" />
            <span className="text-lg font-bold">{wallet.name}</span>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  )
}

export default ConntectWalletDialog
