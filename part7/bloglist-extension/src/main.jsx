import { NotificationContextProvider } from './contexts/NotificationContext'
import { Query, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { UserContextProvider } from './contexts/UserContext'
import { Container, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import theme from './theme'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container>
      <Router>
        <UserContextProvider>
          <QueryClientProvider client={queryClient}>
            <NotificationContextProvider>
              <App />
            </NotificationContextProvider>
          </QueryClientProvider>
        </UserContextProvider>
      </Router>
    </Container>
  </ThemeProvider>
)
