// react router dom
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

// components
import './layout.css';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Sidebar from '../Sidebar/Sidebar'

const Layout = () => {
  
  return (
    <>
        <ToastContainer/>
        <Navbar />
        <hr />
        <div className="outlet">
          <Sidebar/> 
          <Outlet/>
        </div>
        <Footer/>
    </>
  )
}



export default Layout