import { useSelector } from "react-redux"
const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 8,
    borderRadius: 8,
    margin: 24,
    borderWidth: 1
  }

  if (!notification) {
    return null
  }

  return (
    <div style={style}>
     {notification}
    </div>
  )
}

export default Notification
