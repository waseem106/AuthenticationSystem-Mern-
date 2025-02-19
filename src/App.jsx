import './App.css'
import Dashborad from './pages/Dashborad';
import Home from './pages/Home'
import Login from './pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from './pages/Profile';
import { AdminRoute, ProtectedRoute } from './routes/protectedRoutes'


function App() {

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path:'/dashboard',
      element:(
        <AdminRoute>
          <Dashborad/>
        </AdminRoute>
      )
    },
    {
      path:'/profile',
      element:(
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
      )
    }
  ])

  return (
    <>
      <RouterProvider router={route} />
      <ToastContainer />
    </>
  )
}

export default App
