import './App.css'
import Footer from './features/shared/components/Footer';
import Navbar from './features/shared/components/Navbar'
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';




function App() {


  return (
    <>

      <ToastContainer position="top-right" autoClose={3000} />
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-1">
            <Outlet />
          </main>

          <Footer />
        </div>
      

    </>
  )
}

export default App
