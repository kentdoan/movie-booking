import { APP_CONFIG } from '@/config'
import { api } from '@/lib'

export const movieService = {
    getBanners() {
        return api.get('/QuanLyPhim/LayDanhSachBanner')
    },

    getMovies(params = {}) {
        return api.get('/QuanLyPhim/LayDanhSachPhim', {
            params: {
                maNhom: APP_CONFIG.DEFAULT_GROUP,
                ...params,
            },
        })
    },

    getMovieDetail(maPhim) {
        return api.get('/QuanLyPhim/LayThongTinPhim', {
            params: {
                MaPhim: maPhim,
            },
        })
    },

    getMovieShowtimes(maPhim) {
        return api.get('/QuanLyRap/LayThongTinLichChieuPhim', {
            params: {
                MaPhim: maPhim,
            },
        })
    },

    createMovie(formData) {
        return api.post('/QuanLyPhim/ThemPhimUploadHinh', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },

    updateMovie(formData) {
        return api.post('/QuanLyPhim/CapNhatPhimUpload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },

    deleteMovie(maPhim) {
        return api.delete('/QuanLyPhim/XoaPhim', {
            params: {
                MaPhim: maPhim,
            },
        })
    },
}
