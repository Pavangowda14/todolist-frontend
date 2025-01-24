import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { UserContextProvider } from './context/userContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </UserContextProvider>
  </StrictMode>,
)
