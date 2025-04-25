import { Provider } from 'react-redux'
import { NotificationContextProvider } from './contexts/NotificationContext'
import store from './reducers/store'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </Provider>
)
