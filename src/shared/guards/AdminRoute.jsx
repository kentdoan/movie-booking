import { Navigate, Outlet } from 'react-router'
import { PUBLIC_PATH } from '@/constant'
import { authSession } from '@/shared/auth'

export const AdminRoute = () => {
    if (!authSession.isAdmin()) {
        return <Navigate to={PUBLIC_PATH.FORBIDDEN} replace />
    }

    return <Outlet />
}
