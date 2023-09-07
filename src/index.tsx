import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { importStyle } from '@/styles'

importStyle()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
