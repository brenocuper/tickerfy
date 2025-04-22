import { Navigate } from 'react-router-dom'
import { JSX } from 'react'

import { isAuthenticated } from '../utils/auth'

type Props = {
  children: JSX.Element
}

export function PrivateRoute({ children }: Props) {

  const isAuth = isAuthenticated()

  return isAuth ? children : <Navigate to="/login" replace />
}
