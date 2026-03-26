import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { ADMIN_PATH, PRIVATE_PATH, PUBLIC_PATH } from '@/constant'
import { Button } from 'antd'
import { authSession } from '@/shared/auth'

// import { PUBLIC_PATH } from '../../constant/path'
// import { APP_CONFIG } from '../../config/appConfig'

export const Header = () => {
    const navigate = useNavigate()
    const user = authSession.getUser()
    const isAuthenticated = authSession.isAuthenticated()
    const isAdmin = authSession.isAdmin()

    const handleLogout = () => {
        authSession.clear()
        navigate(PUBLIC_PATH.HOME)
    }

    return (
        <header className="shadow" >
            <div className="container mx-auto my-4 flex h-full items-center justify-between">
                <h1 className="text-4xl font-semibold">
                    <Link to={PUBLIC_PATH.HOME}>Movie</Link>
                </h1>
                <nav className="flex items-center gap-5">
                    <NavLink to={PUBLIC_PATH.SCHEDULE}>Lịch Chiếu</NavLink>
                    <NavLink to={PUBLIC_PATH.CINEMA}>Rạp Chiếu</NavLink>
                </nav>
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <span className="text-sm font-medium">Xin chào, {user?.hoTen || user?.taiKhoan}</span>
                            <Button
                                color="red"
                                variant="outlined"
                                onClick={() => navigate(PRIVATE_PATH.PROFILE)}
                            >
                                Hồ sơ
                            </Button>
                            {isAdmin ? (
                                <Button
                                    color="red"
                                    variant="solid"
                                    onClick={() => navigate(ADMIN_PATH.FILMS)}
                                >
                                    Quản trị
                                </Button>
                            ) : null}
                            <Button color="red" variant="solid" onClick={handleLogout}>
                                Đăng xuất
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="red"
                                variant="solid"
                                onClick={() => navigate(PUBLIC_PATH.SIGN_IN)}
                            >
                                Đăng nhập
                            </Button>
                            <Button
                                color="red"
                                variant="outlined"
                                onClick={() => navigate(PUBLIC_PATH.REGISTER)}
                            >
                                Đăng ký
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
