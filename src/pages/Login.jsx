import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Login = () => {
    
  return (
    <div className="container">
            <div className="card">
                <div className="card_title">
                    <h1>Login Account</h1>
                    <span>Don't have an account? <Link to="/signup">Sign up</Link></span>
                </div>
                <div className="form">
                    <form>
                        <input autoFocus type="email" name="email" placeholder="Email" id="email" />
                        <input type="password" name="password" placeholder="Password" id="password" />
                        <button>Login</button>
                    </form>
                </div>  
            </div>
            <ToastContainer />
        </div>
  )
}

export default Login