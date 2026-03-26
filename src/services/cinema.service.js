import { APP_CONFIG } from '@/config'
import { api } from '@/lib'

export const cinemaService = {
    getCinemaSystems() {
        return api.get('/QuanLyRap/LayThongTinHeThongRap')
    },

    getCinemaClusters(maHeThongRap) {
        return api.get('/QuanLyRap/LayThongTinCumRapTheoHeThong', {
            params: {
                maHeThongRap,
            },
        })
    },

    getCinemaShowtimes(params = {}) {
        return api.get('/QuanLyRap/LayThongTinLichChieuHeThongRap', {
            params: {
                maNhom: APP_CONFIG.DEFAULT_GROUP,
                ...params,
            },
        })
    },
}
