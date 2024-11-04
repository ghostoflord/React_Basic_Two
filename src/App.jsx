import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login/login';
import RegisterPage from './pages/login/register';




const Layout = () => {
  return (
    <>
      main page
    </>
  )
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404 not found hoi dan it</div>,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
