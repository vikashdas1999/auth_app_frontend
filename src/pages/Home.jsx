import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import GetQuiz from '../component/GetQuiz';

const Home = () => {

  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    handleSuccess('Logout succesfully')
    setTimeout(() => {
      navigate('/')
    }, 1000);
  }
  // const fetchProduct = async () => {
  //   try {
  //      const url = "https://auth-app-backend-seven.vercel.app/products" 
  //      const headers = {
  //       headers:{
  //         'Authorization':localStorage.getItem('token')
  //       }
  //      }
  //      const response = await fetch(url,headers);
  //      const result = await response.json()
  //      console.log(result);
  //   } catch(err){
  //     handleError(err)
  //   }
  // }
  // useEffect(() => {
  //   fetchProduct()
  // },[])
  return (
    <div>
      {/* <h1>{loggedInUser}</h1> */}
      <h1>Welcome Home</h1>
      {/* <button onClick={handleLogout}>Logout</button> */}
      <ToastContainer />
    </div>

  )
}

export default Home