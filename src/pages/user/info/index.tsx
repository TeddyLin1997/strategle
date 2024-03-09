import Container from '@/components/container'


const Info = () => {
  // import { useSnackbar } from 'notistack'
  // const { enqueueSnackbar } = useSnackbar()
  // const handleCopyAddress = () => {
  //   navigator.clipboard.writeText(wallet.account)
  //   enqueueSnackbar('copied')
  // }
  return (
    <Container>
      <div>
        <pre>
        1.帳號名稱
        2.個人簡介
        3.關注人
        4.個人貼文
        5.收藏貼文
        </pre>
      </div>
    </Container>
  )
}

export default Info
