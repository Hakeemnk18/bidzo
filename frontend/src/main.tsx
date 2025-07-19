import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import allRoutes from './route/Index.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.ts'


const appRouter = createBrowserRouter(allRoutes)

const root = createRoot(document.getElementById('root')!)


root.render(
  <Provider store={store}>

  
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
  </Provider>
)

