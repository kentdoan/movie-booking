import { Navigate, Outlet } from 'react-router'
import { PUBLIC_PATH } from '@/constant'
import { authSession } from '@/shared/auth'

export const GuestOnlyRoute = () => {
    if (authSession.isAuthenticated()) {
        return <Navigate to={PUBLIC_PATH.HOME} replace />
    }

    return <Outlet />
}
