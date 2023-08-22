import React from 'react'
import Navbar from '../Navbar/Navbar'
import {  Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout({userData , setUserData}) {
  let navigate = useNavigate()
  function Logout()
  {
    localStorage.removeItem('userToken')
    setUserData(null)
    navigate('/login')
  }

  return (
    <>
    <div>
        <Navbar userData={userData} Logout={Logout} />
        <div className="container">
            <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>
    </>
  )
}
