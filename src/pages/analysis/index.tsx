import Container from '@/components/container'
import useTitle from '@/hooks/useTitle'

const Analysis = () => {
  useTitle('Analysis')

  return (
    <Container>
      <div>
        <pre>
        台股分類
        多指標 分析符合指標的台股標的
        </pre>
      </div>
    </Container>
  )
}

export default Analysis
