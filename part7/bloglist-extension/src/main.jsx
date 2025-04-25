import { Provider } from 'react-redux'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { Query, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import store from './reducers/store'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </Provider>
  </QueryClientProvider>
)
