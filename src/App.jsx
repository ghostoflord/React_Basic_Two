import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login/login';
import RegisterPage from './pages/login/register';
import { doGetAccountAction } from './redux/account/accountSlice';
import { callFetchAccount } from './service/api';
import { useDispatch } from 'react-redux';
import NotFound from './component/notfound/notfound';
import Loading from './component/loading/loading';
import { useSelector } from "react-redux";
import ContactPage from './pages/contact/contact';
import BookPage from './pages/book/book';
import Header from './pages/header/header';
import Footer from './pages/footer/footer';
import AdminPage from './pages/admin/admin';
import ProtectedRoute from './component/ProtectedRoute';

const Layout = () => {
  return (
    <div className='layout-app'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

const LayoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const user = useSelector(state => state.account.user);
  const userRole = user.role;

  return (
    <div className='layout-app'>
      {isAdminRoute && userRole === 'ADMIN' && <Header />}
      <Header />
      <Outlet />
      <Footer />
      {isAdminRoute && userRole === 'ADMIN' && <Footer />}

    </div>
  )
}

export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)

  const getAccount = async () => {
    if (
      window.location.pathname === '/login'
      || window.location.pathname === '/register'
      || window.location.pathname === '/'
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
        { index: true, element: <ContactPage /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book",
          element: <BookPage />,
        },
      ],
    },

    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
        },
        // {
        //   path: "user",
        //   element: <ContactPage />,
        // },
        // {
        //   path: "book",
        //   element: <BookPage />,
        // },
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
      {
        isAuthenticated === true
          || window.location.pathname === '/login'
          || window.location.pathname === '/register'
          || window.location.pathname === '/'
          ?
          <RouterProvider router={router} />
          :
          <Loading />
      }
    </>
  )
}
