import { Button, TextField } from '@mui/material'

Button

const Mint = () => {
  return (
    <div>
      <div className="mb-4">
        <div className="mb-2 font-bold">Your USDT Balance : </div>
        <div>10,000 USDT</div>
      </div>

      <div className="mb-4">
        <div className="mb-2 font-bold">Mint Amount : </div>
        <TextField size="small" className="bg-white rounded-md" />
      </div>

      <div className="mb-4 text-xs text-primary-light">
        Rate : 1 STRAG = 1 USDT (Equivalent exchange tokens)
      </div>

      <Button variant="contained" size="small">Mint STRAG</Button>
    </div>
  )
}

export default Mint
