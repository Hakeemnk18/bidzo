import './App.css'
import Footer from './features/shared/components/Footer';
import Navbar from './features/shared/components/Navbar'
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useStoreDispatch } from './hooks/useStore';
import { authChecked, login, logout } from './features/shared/slices/authSlice';
import ErrorBoundary from './features/shared/components/ErrorBoundary';
import { clearToken, isTokenValid } from './utils/tokenHelpers';
import { useLocation } from 'react-router-dom';





function App() {

  const dispatch = useStoreDispatch()
  const location = useLocation()
  const HIDDEN_PATHS = ['/user/login', '/user/signup', '/admin/login', '/seller/login','/seller/signup'];

  useEffect(() => {
    
    let tokenValid = isTokenValid()
   
    if (tokenValid) {
      
      const name = localStorage.getItem("userName");
      const role = localStorage.getItem("userRole");
      dispatch(login({ name, role }));

    }else{
      
      dispatch(logout())
      clearToken()
    }

    dispatch(authChecked())
    

  }, []);


  return (
    <>
      <ErrorBoundary >


        <ToastContainer position="top-right" autoClose={1000} />
        <div className="min-h-screen flex flex-col">
          {!HIDDEN_PATHS.includes(location.pathname)  && <Navbar />}
          

          <main className="flex-1">
            <Outlet />
          </main>
         
         {!HIDDEN_PATHS.includes(location.pathname) && <Footer />}
          
        </div>

      </ErrorBoundary>
    </>
  )
}

export default App
