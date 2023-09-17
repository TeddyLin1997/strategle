import { createContext, useEffect, useState } from 'react'
import { isDevelopmentMode } from '@/utils'

type WebSocketServer = WebSocket | null

export interface WebSocketContextProps {
  webSocketServer: WebSocketServer
}

const initWebSocketContext: WebSocketContextProps = {
  webSocketServer: null
}

export const WebSocketContext = createContext(initWebSocketContext)

const WS_URL = isDevelopmentMode() ? 'ws://localhost:3000' : `wss://${location.host}`

export const WebSocketProvider = ({ children }) => {
  const [server, setServer] = useState<WebSocketServer>(null)

  const createWebSocket = () => {
    try { setServer(new WebSocket(WS_URL)) }
    catch { setTimeout(() => createWebSocket(), 3000) }
  }

  useEffect(() => createWebSocket(), [])

  useEffect(() => {
    if (server === null) return

    server.onopen = function(event) {
      console.warn('WebSocket Open.', event)
    }

    server.onerror = function (event) {
      console.warn('WebSocket Error:', event)
    }

    server.onclose = async function (event) {
      if (event.wasClean) console.warn(`Websocket Manual Closed: ${event.code}, Reason: ${event.reason}`)
      else {
        console.warn('WebSocket Error Closed.', event)
        setTimeout(() => createWebSocket(), 10 * 1000)
      }
    }
  }, [server])


  return (
    <WebSocketContext.Provider value={{ webSocketServer: server }}>
      {children}
    </WebSocketContext.Provider>
  )
}
