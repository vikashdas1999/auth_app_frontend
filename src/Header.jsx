import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from './assets/logo.png'
import { handleSuccess } from './utils'

const Header = () => {
    const [loggedInUser, setLogInUser] = useState(false)
    const [userId, setUserId] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        setUserId(sessionStorage.getItem('userId'));
        if (sessionStorage.getItem('token')) {
            setLogInUser(true)
        } else {
            setLogInUser(false)
        }
    })


    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('loggedInUser')
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('newUser')
        handleSuccess('Logout succesfully')
        setTimeout(() => {
            navigate('/')
        }, 1000);
    }
    return (
        <>
            <header className='flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
                <div className='flex flex-wrap items-center justify-between gap-5 w-full'>
                    <Link to="">
                        <img src={logo} alt="logo" className='w-24' />
                    </Link>

                    <div id="collapseMenu"
                        className='max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>
                        <button id="toggleClose" className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black" viewBox="0 0 320.591 320.591">
                                <path
                                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                    data-original="#000000"></path>
                                <path
                                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                    data-original="#000000"></path>
                            </svg>
                        </button>

                        <ul
                            className='lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>

                            {
                                userId ? <>
                                    <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
                                        <Link to="/" className='hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]'>Home</Link>
                                    </li>
                                    <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
                                        <Link to="/add" className='hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]'>Add Quiz</Link>
                                    </li>
                                    <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
                                        <Link to={`/play-quiz/${userId}`} className='hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]'>Play Quiz</Link>
                                    </li>
                                </> : ''
                            }
                        </ul>
                    </div>

                    <div className='flex max-lg:ml-auto space-x-3'>
                        {
                            loggedInUser ?
                                <button onClick={handleLogout} className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>
                                    Logout</button> :
                                <>
                                    <Link to="/" className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>Login</Link>
                                    <Link to="/signup" className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>Sign up</Link>
                                </>
                        }

                    </div>
                </div>
            </header>
            <Outlet />
        </>
    )
}

export default Header