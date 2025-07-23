import './App.css'
import Footer from './features/shared/components/Footer';
import Navbar from './features/shared/components/Navbar'
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useStoreDispatch } from './hooks/useStore';
import { login, logout } from './features/shared/slices/authSlice';
import ErrorBoundary from './features/shared/components/ErrorBoundary';
import { clearToken, isTokenValid } from './utils/tokenHelpers';




function App() {

  const dispatch = useStoreDispatch()

  useEffect(() => {

    let tokenValid = isTokenValid()
    console.log("token is valid ",tokenValid)
    if (tokenValid) {

      const name = localStorage.getItem("userName");
      const role = localStorage.getItem("userRole");
      dispatch(login({ name, role }));

    }else{
      dispatch(logout())
      clearToken()
    }

  }, []);


  return (
    <>
      <ErrorBoundary >


        <ToastContainer position="top-right" autoClose={3000} />
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-1">
            <Outlet />
          </main>

          <Footer />
        </div>

      </ErrorBoundary>
    </>
  )
}

export default App
