import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login/login';
import RegisterPage from './pages/login/register';
import { doGetAccountAction } from './redux/account/accountSlice';
import { callFetchAccount } from './service/api';
import { useDispatch } from 'react-redux';

const Layout = () => {
  return (
    <div className='layout-app'>
    </div>
  )
}

export default function App() {
  const dispatch = useDispatch();

  const getAccount = async () => {
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data))
    }
  }

  useEffect(() => {
    getAccount();
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404 not found </div>,
      children: [
      ],
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
