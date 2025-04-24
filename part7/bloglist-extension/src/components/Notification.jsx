// -- Redux Imports -- \\
import { useSelector, useDispatch } from 'react-redux'
// -- End of Redux Imports -- \\

// -- Redux Notifications -- \\
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

// -- React Notification -- \\
// const Notification = ({ message }) => {
//   if (message === null) {
//     return null
//   } else if (message.includes('failed')) {
//     return <div className="error">{message}</div>
//   }

//   return <div className="info">{message}</div>
// };

export default Notification
