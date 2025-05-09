import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0E6BA8',
    },
    secondary: {
      main: '#001C55',
    },
    error: {
      main: '#D72A2A',
    },
    info: {
      main: '#2AD7C3',
    },
    background: {
      default: '#A6E1FA',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
})

export default theme
