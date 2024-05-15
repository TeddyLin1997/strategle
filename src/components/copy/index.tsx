import CopyIcon from '@/assets/images/copy.png'
import toast from 'react-hot-toast'

const Copy = ({ text }: { text: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success(`Copied: ${text}`))
  }
  return (
    <div className="inline-flex p-1 w-5 h-5 bg-primary-light rounded-full cursor-pointer" onClick={copyToClipboard}>
      <img src={CopyIcon} className="m-auto w-3 h-3" />
    </div>
  )
}

export default Copy
