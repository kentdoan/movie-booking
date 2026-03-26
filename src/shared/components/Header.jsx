import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { APP_CONFIG } from '@/config'
import { PUBLIC_PATH } from '@/constant'
import { Button } from 'antd'

// import { PUBLIC_PATH } from '../../constant/path'
// import { APP_CONFIG } from '../../config/appConfig'

export const Header = () => {
    const navigate = useNavigate()
    return (
        <header className="shadow" style={{ minHeight: APP_CONFIG.HEADER_HEIGHT }}>
            <div className="container mx-auto flex items-center justify-between h-full">
                <h1 className="text-4xl font-semibold">
                    <Link to={PUBLIC_PATH.HOME}>Movie</Link>
                </h1>
                <nav className="space-x-5">
                    <NavLink to={PUBLIC_PATH.SCHEDULE}>Lịch Chiếu</NavLink>
                    <NavLink to={PUBLIC_PATH.CINEMA}>Rạp Chiếu</NavLink>
                    <NavLink to={PUBLIC_PATH.PROMOTION}>Khuyến Mãi</NavLink>
                    <NavLink to={PUBLIC_PATH.APP}>Ứng Dụng</NavLink>
                    <NavLink to={PUBLIC_PATH.SUPPORT}>Hỗ Trợ</NavLink>
                </nav>
                <div className="space-x-4">
                    <Button
                        color="red"
                        variant="solid"
                        onClick={() => navigate(PUBLIC_PATH.SIGN_IN)}
                    >
                        Đăng Nhập
                    </Button>
                    <Button
                        color="red"
                        variant="outlined"
                        onClick={() => navigate(PUBLIC_PATH.REGISTER)}
                    >
                        Đăng Ký
                    </Button>
                </div>
            </div>
        </header>
    )
}
