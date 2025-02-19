import React from 'react'
import Header from '../components/Header'
import LoginCard from '../components/LoginCard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  return (
    <div style={{height:'100%',width:'100%'}} >
      <Header/>
      <div className="flex items-center justify-center h-[100%] mt-20"> {/* Centering the card */}
        <LoginCard />
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Login
