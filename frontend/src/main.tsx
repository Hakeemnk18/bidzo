import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import allRoutes from './route/Index.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { SocketContext, SocketProvider } from './store/useSocket.tsx'


const appRouter = createBrowserRouter(allRoutes)

const root = createRoot(document.getElementById('root')!)


root.render(
  <Provider store={store}>
    <SocketProvider>
      <StrictMode>
        <RouterProvider router={appRouter} />
      </StrictMode>
    </SocketProvider>

  </Provider>

)

