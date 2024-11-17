import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login/login';
import RegisterPage from './pages/login/register';
import { doGetAccountAction } from './redux/account/accountSlice';
import { callFetchAccount } from './service/api';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './component/protectedroute/protectedroute';
import NotFound from './component/notfound/notfound';
import Loading from './component/loading/loading';
import AdminPage from './pages/admin/admin';
import { useSelector } from "react-redux";

const Layout = () => {
  return (
    <div className='layout-app'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)

  const getAccount = async () => {
    if (window.location.pathname === '/login'
    )
      return;
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
      errorElement: <NotFound />,
      children: [
      ],
    },

    {
      path: "/admin",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
        },
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
      {isAuthenticated === true
        || window.location.pathname === '/login'
        ?
        <RouterProvider router={router} />
        :
        <Loading />
      }
    </>
  )
}
