import { APP_CONFIG } from '../config'
import { api } from '../lib'

export const userService = {
    signIn(payload) {
        return api.post('/QuanLyNguoiDung/DangNhap', payload)
    },

    signUp(payload) {
        return api.post('/QuanLyNguoiDung/DangKy', {
            maNhom: APP_CONFIG.DEFAULT_GROUP,
            ...payload,
        })
    },

    getAccountInfo() {
        return api.post('/QuanLyNguoiDung/ThongTinTaiKhoan')
    },

    updateAccount(payload) {
        return api.put('/QuanLyNguoiDung/CapNhatThongTinNguoiDung', {
            ...payload,
            soDt: payload.soDt || payload.soDT,
        })
    },

    getUsers(params = {}) {
        return api.get('/QuanLyNguoiDung/LayDanhSachNguoiDung', {
            params: {
                MaNhom: APP_CONFIG.DEFAULT_GROUP,
                ...params,
            },
        })
    },

    getUsersPaged(params = {}) {
        return api.get('/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang', {
            params: {
                MaNhom: APP_CONFIG.DEFAULT_GROUP,
                soTrang: 1,
                soPhanTuTrenTrang: 10,
                ...params,
            },
        })
    },

    getUserTypes() {
        return api.get('/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung')
    },

    addUser(payload) {
        return api.post('/QuanLyNguoiDung/ThemNguoiDung', payload)
    },

    updateUserByAdmin(payload) {
        return api.post('/QuanLyNguoiDung/CapNhatThongTinNguoiDung', payload)
    },

    deleteUser(taiKhoan) {
        return api.delete('/QuanLyNguoiDung/XoaNguoiDung', {
            params: {
                TaiKhoan: taiKhoan,
            },
        })
    },
}
