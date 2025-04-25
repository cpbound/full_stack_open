
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification) {
    return null
  } else if (notification.includes('Wrong')) {
    console.log('failed')
    return <div className="error">{notification}</div>
  }
  return <div className="info">{notification}</div>
}

export default Notification
