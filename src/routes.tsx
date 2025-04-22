import { createBrowserRouter, Navigate } from 'react-router-dom'

import { PrivateRoute } from './routes/PrivateRoutes'

import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
])