import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import FeedPage from './Pages/FeedPage'
import AuthLayout from './Layout/AuthLayout'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import SinglePostpage from './Pages/SinglePostpage'
import {HeroUIProvider} from "@heroui/react";
import { ProtectedRoute } from './Components/ProtectedRoute';
import { AuthProtectedRoute } from './Components/AuthProtectedRoute'
import ProfilePage from './Pages/ProfilePage';
import UserPostsPage from './Pages/UserPostsPage'
import UpdateProfilePage from './Pages/UpdateProfilePage'
import NotFoundPage from './Pages/NotFoundPage';


export default function App() {


const routers = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      { index: true, element: <ProtectedRoute><FeedPage /></ProtectedRoute> },
      { path: "profile", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: "single-post/:id", element: <ProtectedRoute><SinglePostpage /></ProtectedRoute> },
      { path: "user-posts", element: <ProtectedRoute><UserPostsPage /></ProtectedRoute> },
      { path: "profile/update-profile", element: <ProtectedRoute><UpdateProfilePage /></ProtectedRoute> },
      { path: "*", element: <NotFoundPage /> } // ← هنا لأي route غير معروف
    ]
  },
  {
    path: "",
    element: <AuthLayout />,
    children: [
      { path: "register", element: <AuthProtectedRoute><RegisterPage /></AuthProtectedRoute> },
      { path: "login", element: <AuthProtectedRoute><LoginPage /></AuthProtectedRoute> },
      { path: "*", element: <NotFoundPage /> } // ← هنا برضو لأي route auth غير معروف
    ]
  }
])


  return <>
  <HeroUIProvider>
    <RouterProvider router={routers}></RouterProvider>
  </HeroUIProvider>
  </> 
}
