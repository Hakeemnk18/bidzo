import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import allRoutes from './route/Index.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import SocketListener from './features/shared/components/SocketListener.tsx'



const appRouter = createBrowserRouter(allRoutes)

const root = createRoot(document.getElementById('root')!)


root.render(
  <Provider store={store}>
      <SocketListener />
      <StrictMode>
        
        <RouterProvider router={appRouter} />
      </StrictMode>
    

  </Provider>

)

