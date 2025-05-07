import { NotificationContextProvider } from './contexts/NotificationContext'
import { Query, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { UserContextProvider } from './contexts/UserContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </QueryClientProvider>
    </UserContextProvider>
  </Router>
)
