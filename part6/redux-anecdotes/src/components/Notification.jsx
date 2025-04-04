import { useSelector } from "react-redux"
const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 8,
    borderRadius: 8,
    margin: 8,
    borderWidth: 1
  }

  if (!notification.message) {
    return null
  }

  return (
    <div style={style}>
     {notification.message}
    </div>
  )
}

export default Notification
