import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { ADMIN_PATH, PRIVATE_PATH, PUBLIC_PATH } from '../../constant'
import { Button } from 'antd'
import { authSession } from '../auth'

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
        <header className="border-b border-zinc-200 bg-white/95 shadow-sm backdrop-blur">
            <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between lg:min-w-0 lg:flex-1">
                        <h1 className="text-2xl font-semibold sm:text-3xl">
                            <Link to={PUBLIC_PATH.HOME}>Movie</Link>
                        </h1>
                        <nav className="no-scrollbar flex items-center gap-2 overflow-x-auto text-sm sm:gap-4 sm:text-base lg:justify-center">
                            <NavLink to={PUBLIC_PATH.SCHEDULE} className="whitespace-nowrap rounded px-2 py-1 hover:bg-zinc-100">
                                Lịch Chiếu
                            </NavLink>
                            <NavLink to={PUBLIC_PATH.CINEMA} className="whitespace-nowrap rounded px-2 py-1 hover:bg-zinc-100">
                                Rạp Chiếu
                            </NavLink>
                        </nav>
                    </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:justify-end lg:pl-4 max-[425px]:grid max-[425px]:w-full max-[425px]:grid-cols-2">
                    {isAuthenticated ? (
                        <>
                            <span className="w-full text-xs font-medium text-zinc-700 sm:w-auto sm:text-sm max-[425px]:col-span-2">
                                Xin chào, {user?.hoTen || user?.taiKhoan}
                            </span>
                            <Button
                                color="red"
                                variant="outlined"
                                size="small"
                                className="max-[425px]:w-full"
                                onClick={() => navigate(PRIVATE_PATH.PROFILE)}
                            >
                                Hồ sơ
                            </Button>
                            {isAdmin ? (
                                <Button
                                    color="red"
                                    variant="solid"
                                    size="small"
                                    className="max-[425px]:w-full"
                                    onClick={() => navigate(ADMIN_PATH.FILMS)}
                                >
                                    Quản trị
                                </Button>
                            ) : null}
                            <Button color="red" variant="solid" size="small" className="max-[425px]:w-full" onClick={handleLogout}>
                                Đăng xuất
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="red"
                                variant="solid"
                                size="small"
                                className="max-[425px]:w-full"
                                onClick={() => navigate(PUBLIC_PATH.SIGN_IN)}
                            >
                                Đăng nhập
                            </Button>
                            <Button
                                color="red"
                                variant="outlined"
                                size="small"
                                className="max-[425px]:w-full"
                                onClick={() => navigate(PUBLIC_PATH.REGISTER)}
                            >
                                Đăng ký
                            </Button>
                        </>
                    )}
                </div>
                </div>
            </div>
        </header>
    )
}
