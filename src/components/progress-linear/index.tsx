import { useState, useEffect } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 56px;
  width: 100%;
  z-index: 101;
`

export default function ProgressLinear() {
  const isLoading = false
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(isLoading ? 0 : 100)
  }, [isLoading])

  useEffect(() => {
    if (!isLoading) return

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 30
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => clearInterval(timer)
  }, [isLoading])

  return (
    <Container>
      { isLoading && <LinearProgress variant="determinate" value={progress} /> }
    </Container>
  )
}
