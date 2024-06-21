import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Signin from './pages/Signin';
import MovieLists from './pages/MovieLists';
import AdminRoute from './protectedRoutes/AdminRoute';
import AdminLayout from './layouts/AdminLayout';
import TheatresPage from './pages/TheatresPage';
import UsersListPage from './pages/UsersListPage';
import ReportPage from './pages/ReportPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    element : <AdminLayout />,
    children: [
      {
        path: '/movies',
        element: <AdminRoute><MovieLists /></AdminRoute>
      },
      {
        path: '/theatres',
        element: <AdminRoute><TheatresPage /></AdminRoute>
      },
      {
        path: '/users',
        element: <AdminRoute><UsersListPage /></AdminRoute>
      },
      {
        path: '/report',
        element: <AdminRoute><ReportPage /></AdminRoute>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer autoClose={1000}  position="bottom-left" />
  </React.StrictMode>
)
