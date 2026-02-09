import React, { useContext, useEffect, useState } from 'react'
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@heroui/react"
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

export default function Navbar() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
  if(darkMode){
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [darkMode]);



  const { isLoggedIn, setIsLoggedIn, setUserData } = useContext(AuthContext)

  function logOut() {
    localStorage.removeItem('token')
    setIsLoggedIn(false);
    setUserData(null);
  }

  return (
    <HeroNavbar 
      maxWidth="xl"
      className=" px-3 shadow-sm "
    >
      {/* Mobile Toggle */}
      <NavbarMenuToggle className="sm:hidden" />

      {/* Brand */}
      <NavbarBrand>
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight dark:text-white"
        >
          Social<span className="text-blue-500">App</span>
        </Link>
      </NavbarBrand>

      {/* Desktop Links */}
      <NavbarContent
        className="hidden sm:flex items-center gap-5"
        justify="end"
      >
        {isLoggedIn ? (
          <>
            <NavbarItem>
              <Link
                to="profile"
                className="text-sm font-medium text-slate-600 hover:text-blue-500 transition dark:text-white"
              >
                Profile
              </Link>
            </NavbarItem>

            <NavbarItem>
              <button
                onClick={logOut}
                className="cursor-pointer text-sm font-medium text-slate-600 hover:text-red-500 transition dark:text-white"
              >
                Log out
              </button>
            </NavbarItem>
            <NavbarItem>
              <button
                onClick={() => setDarkMode(prev => !prev)}
                className="cursor-pointer text-sm font-medium text-slate-600 hover:text-blue-500 transition dark:text-white"
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>

            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link
                to="login"
                className="text-sm font-medium text-slate-600 hover:text-blue-500 transition dark:text-white"
              >
                Login
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Link
                to="register"
                className="px-4 py-2 rounded-full text-sm font-medium
                           border border-blue-500 text-blue-500
                           hover:bg-blue-500 hover:text-white transition dark:text-white"
              >
                Register
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {isLoggedIn ? (
          <>
            <NavbarMenuItem>
              <Link to="profile" className="cursor-pointer text-sm font-medium text-slate-600 hover:text-blue-500 transition dark:text-white">Profile</Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <button
                onClick={() => setDarkMode(prev => !prev)}
                className="cursor-pointer text-sm font-medium text-slate-600 hover:text-blue-500 transition dark:text-white"
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </NavbarMenuItem>

            <NavbarMenuItem>
              <button className='cursor-pointer text-sm font-medium text-slate-600 hover:text-red-500 transition dark:text-white' 
              onClick={logOut}>Log out</button>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <Link to="login">Login</Link>
            </NavbarMenuItem>

            <NavbarMenuItem>
              <Link to="register">Register</Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </HeroNavbar>
  )
}
