import React from 'react'
import { Outlet } from 'react-router-dom'

const Header = () => {
    return (
        <>
            {/* <header>
                <ul>
                    <li>
                        <a>Home</a>
                    </li>
                    <li>
                        <a>Login</a>
                    </li>
                    <li>
                        <a>Signup</a>
                    </li>
                </ul>
            </header> */}
            <Outlet />
        </>
    )
}

export default Header