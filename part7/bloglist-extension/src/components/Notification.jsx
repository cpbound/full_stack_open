import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useContext(NotificationContext)
  if (!notification[0]) {
    return null
  } else if (notification[0].includes('Wrong')) {
    return <Alert severity= "error" className="error">{notification[0]}</Alert>
  }
  return <Alert severity= "info" className="info">{notification[0]}</Alert>
}

export default Notification
