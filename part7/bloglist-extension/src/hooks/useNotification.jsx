//  -- React Query -- \\
import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

export const useNotification = () => {
  const [_, dispatch] = useContext(NotificationContext)

  return (message, seconds) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: message })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, seconds * 1000)
  }
}
