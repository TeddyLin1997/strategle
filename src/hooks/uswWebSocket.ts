import { useEffect } from 'react'
import { WebSocketServer } from '@/service/web-socket'

const useWebSocket = (callback: (data: string) => void = () => {}, deps: any[]) => {
  useEffect(() => {
    if (WebSocketServer === null) return
    const onMessage = (event: MessageEvent) => callback(event.data)
    WebSocketServer.addEventListener('message', onMessage)
    return () => WebSocketServer!.removeEventListener('message', onMessage)
  }, [...deps, WebSocketServer])
}

export default useWebSocket
