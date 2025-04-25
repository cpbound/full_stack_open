//  -- React Query -- \\
import { createContext, useReducer } from 'react'
import { notificationReducer } from '../reducers/notificationReducer'

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
