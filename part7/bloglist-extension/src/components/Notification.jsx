import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const Notification = () => {
  const notification = useContext(NotificationContext)
  if (!notification[0]) {
    return null
  } else if (notification[0].includes('Wrong')) {
    return <div className="error">{notification}</div>
  }
  return <div className="info">{notification}</div>
}

export default Notification
