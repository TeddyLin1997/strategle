import { useEffect } from 'react'
import WebSocketServerContainer from '@/context/wsConext'


const useWebSocket = (callback: (data: string) => void = () => {}, deps: any[]) => {
  const { webSocketServer } = WebSocketServerContainer.useContainer()

  useEffect(() => {
    if (webSocketServer === null) return
    const onMessage = (event: MessageEvent) => callback(event.data)
    webSocketServer.addEventListener('message', onMessage)
    return () => webSocketServer!.removeEventListener('message', onMessage)
  }, [...deps, webSocketServer])
}

export default useWebSocket
