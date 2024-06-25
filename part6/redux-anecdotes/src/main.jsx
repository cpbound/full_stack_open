import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filters: filterReducer,
  },
})

// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   filters: filterReducer,
// })

// const store = createStore(reducer)

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <div> </div> */}
    <App />
  </Provider>
)
