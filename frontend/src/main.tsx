import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import allRoutes from './route/Index.tsx'
import './index.css'


const appRouter = createBrowserRouter(allRoutes)

const root = createRoot(document.getElementById('root')!)


root.render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
)

