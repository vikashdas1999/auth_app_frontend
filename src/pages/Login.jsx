import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
import Loader from './Loader'

const Login = () => {
    const [signinInfo, setSigninInfo] = useState({
        email: '',
        password: ''
    })
    const [loaderHandle, setLoaderHandle] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySigninInfo = { ...signinInfo }
        copySigninInfo[name] = value;

        if (name === 'email') {
            copySigninInfo[name] = value.toLowerCase(); 
        } else {
            copySigninInfo[name] = value;
        }
        setSigninInfo(copySigninInfo)
        
    }
    const handleSignin = async (e) => {
        e.preventDefault()
        const {email, password } = signinInfo;
        if ( !email || !password) {
            return handleError("All Field Required");
        }
        const lowercaseemail = email.toLowerCase();
        setLoaderHandle(true)
        try {
            const url = "http://localhost:8080/auth/login"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signinInfo)
            })
            const result = await response.json()
            console.log(result);
            
            const { success, message, jwtToken, name, error ,user} = result;
            console.log(user,'userId');
            if (success) {
                handleSuccess(message);                
                localStorage.setItem('token',jwtToken)
                localStorage.setItem('loggedInUser',name)
                localStorage.setItem('userId',user)
                setTimeout(() => {navigate('/add')}, 1000);
            } else if(error) {
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(success);
            }

            setLoaderHandle(false)
        } catch (error) {
            console.log("Error Sign In : " + error);
            setLoaderHandle(false)
            handleError(error)
        }
    }
  return (
    <div className="container-login">
            <div className="card">
                <div className="card_title">
                    <h1>Login Account</h1>
                    <span>Don't have an account? <Link to="/signup">Sign up</Link></span>
                </div>
                <div className="form">
                    <form onSubmit={handleSignin}>
                        <input autoFocus onChange={handleChange} value={signinInfo.email} type="email" name="email" placeholder="Email" id="email" />
                        <input onChange={handleChange} value={signinInfo.password} type="password" name="password" placeholder="Password" id="password" />
                        <button>Login</button>
                    </form>
                </div>  
            </div>
            <ToastContainer />
            {
                loaderHandle ? <Loader /> : ''
            }
        </div>
  )
}

export default Login