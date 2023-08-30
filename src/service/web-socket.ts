// export const WebSocketServer = new WebSocket('/ws')
export let WebSocketServer = null as WebSocket | null

export const createWebSocketServer = () => {
  const socketServer = new WebSocket('ws://localhost:3000')

  socketServer.onopen = function(event) {
    // socketServer.send('Client Server connection send!')
    console.log('WebSocket connection is open.', event)
  }

  // 連接關閉時的處理
  socketServer.onclose = function(event) {
    console.log('WebSocket connection is closed.', event)
  }

  // 發生錯誤時的處理
  socketServer.onerror = function(event) {
    console.error('WebSocket error:', event)
  }

  WebSocketServer = socketServer
  return WebSocketServer
}





