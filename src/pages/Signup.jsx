import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from '../utils'
import Loader from './Loader'

const Signup = () => {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [loaderHandle, setLoaderHandle] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo }
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo)
    }
    const handleSignup = async (e) => {
        e.preventDefault()
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError("All Field Required");
        }
        setLoaderHandle(true)
        try {
            const url = "https://auth-app-backend-seven.vercel.app/auth/signup"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json()
            console.log(result);
            const { success, message,error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {navigate('/')}, 500);
            } else if(error) {
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(success);
            }

            setLoaderHandle(false)
        } catch (error) {
            console.log("Error Signup : " + error);
            setLoaderHandle(false)
        }
    }
    return (
        <div className="container">
            <div className="card">
                <div className="card_title">
                    <h1>Create Account</h1>
                    <span>Already have an account? <Link to="/">Sign In</Link></span>
                </div>
                <div className="form">
                    <form onSubmit={handleSignup}>
                        <input autoFocus onChange={handleChange} value={signupInfo.name} type="text" name="name" id="name" placeholder="Name" />
                        <input onChange={handleChange} value={signupInfo.email} type="email" name="email" placeholder="Email" id="email" />
                        <input onChange={handleChange} value={signupInfo.password} type="password" name="password" placeholder="Password" id="password" />
                        <button>Sign Up</button>
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

export default Signup