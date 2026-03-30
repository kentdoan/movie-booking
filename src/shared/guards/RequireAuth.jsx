import { Navigate, Outlet, useLocation } from 'react-router'
import { PUBLIC_PATH } from '../../constant'
import { authSession } from '../auth'

export const RequireAuth = () => {
    const location = useLocation()

    if (!authSession.isAuthenticated()) {
        return <Navigate to={PUBLIC_PATH.SIGN_IN} replace state={{ from: location }} />
    }

    return <Outlet />
}
