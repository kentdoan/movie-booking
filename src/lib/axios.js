import axios from "axios";
import { authSession } from '@/shared/auth'

const AUTH_REQUIRED_PATTERNS = [
    '/QuanLyDatVe/DatVe',
    '/QuanLyNguoiDung/ThongTinTaiKhoan',
    '/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
    '/QuanLyNguoiDung/ThemNguoiDung',
    '/QuanLyNguoiDung/XoaNguoiDung',
    '/QuanLyPhim/ThemPhimUploadHinh',
    '/QuanLyPhim/CapNhatPhimUpload',
    '/QuanLyPhim/XoaPhim',
    '/QuanLyDatVe/TaoLichChieu',
]

export const api = axios.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api',
})

// Thêm interceptor để tự động thêm header vào tất cả các request
api.interceptors.request.use((config)=>{
    const accessToken = authSession.getAccessToken()
    const requestUrl = config.url || ''
    const requiresAuth = AUTH_REQUIRED_PATTERNS.some((pattern) => requestUrl.includes(pattern))

    config.headers = {
        ...config.headers,
        TokenCybersoft:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4OCIsIkhldEhhblN0cmluZyI6IjEwLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4ODk5ODQwMDAwMCIsIm5iZiI6MTc2MDAyOTIwMCwiZXhwIjoxNzg5MTQ2MDAwfQ.l0zPoFdAw1Eg4yqbHAPSHOZJeapIOhcC-It_UzWyRMg',
        ...(requiresAuth && accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    }
    return config
})

// api.post('url', payload)