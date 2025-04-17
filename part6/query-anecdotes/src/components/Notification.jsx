import { useNotificationValue } from '../NotificationContext'

const Notification = () => {

  const notification = useNotificationValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  // if (true) return null

  return (
    notification ? <div style={style}>{notification}</div> : null
  )
}

export default Notification
