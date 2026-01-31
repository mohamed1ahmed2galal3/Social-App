import React, { useContext } from 'react'
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from "@heroui/react"
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

export default function Navbar() {

  const { isLoggedIn, setIsLoggedIn , setUserData} = useContext(AuthContext)

  function logOut() {
    localStorage.removeItem('token')
    setIsLoggedIn(false);
    setUserData(null);
  }

  return (
    <HeroNavbar
      className="bg-white border-b border-gray-100 px-3 py-2 shadow-sm"
    >

      {/* Brand */}
      <NavbarBrand>
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 tracking-tight"
        >
          Social<span className="text-blue-500">App</span>
        </Link>
      </NavbarBrand>

      {/* Links */}
      <NavbarContent
        className="hidden sm:flex items-center gap-5"
        justify="end"
      >
        {isLoggedIn ? (
          <>
            <NavbarItem>
              <Link
                to="profile"
                className="text-md font-medium text-gray-600 hover:text-blue-500 transition-colors"
              >
                Profile
              </Link>
            </NavbarItem>

            <NavbarItem>
              <button
                onClick={logOut}
                className="cursor-pointer text-md font-medium text-gray-600 hover:text-red-500 transition-colors"
              >
                Log out
              </button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link
                to="login"
                className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
              >
                Login
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Link
                to="register"
                className="px-4 py-2 rounded-full text-sm font-medium
                           border border-blue-500 text-blue-500
                           hover:bg-blue-500 hover:text-white
                           transition-all duration-200"
              >
                Register
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

    </HeroNavbar>
  )
}
