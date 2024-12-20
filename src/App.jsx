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
import LayoutAdmin from './component/Admin/layoutadmin';
import './styles/reset.scss';
import Home from './component/Home/home';
import BookTable from './component/Admin/Book/BookTable';
import OrderPage from './pages/order/order';
import ViewDetail from './component/Book/ViewDetail';
import AdminOrderPage from './pages/admin/order/AdminOrderPage';

const Layout = () => {
  return (
    <div className='layout-app'>
      <Header />
      <Outlet />

    </div>
  )
}

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading)

  const getAccount = async () => {
    if (
      window.location.pathname === '/login'
      || window.location.pathname === '/register'
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
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book/:slug",
          element: <BookPage />,
        },
        {
          path: "order",
          element: <OrderPage />,
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
        {
          path: "user",
          element: <ContactPage />,
        },
        {
          path: "book",
          element:
            <ProtectedRoute>
              <BookTable />
            </ProtectedRoute>,
        },
        {
          path: "order",
          element:
            <ProtectedRoute>
              <AdminOrderPage />
            </ProtectedRoute>
          ,
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
      {
        isLoading === false
          || window.location.pathname === '/login'
          || window.location.pathname === '/register'
          || window.location.pathname === '/'
          || window.location.pathname === '/admin'
          || window.location.pathname.startsWith('/book')
          ?
          <RouterProvider router={router} />
          :
          <Loading />
      }
    </>
  )
}
