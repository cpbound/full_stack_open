//  -- React Query -- \\
import { createContext, useReducer, useContext } from 'react'

export const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.payload
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}


export const useNotification = () => {
  const [_, dispatch] = useContext(NotificationContext)

  return (message, seconds) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: message })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, seconds * 1000)
  }
}

export default NotificationContext
