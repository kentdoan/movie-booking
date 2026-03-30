import { api } from '../lib'

export const bookingService = {
    getTicketRoom(maLichChieu) {
        return api.get('/QuanLyDatVe/LayDanhSachPhongVe', {
            params: {
                MaLichChieu: maLichChieu,
            },
        })
    },

    bookTickets(payload) {
        return api.post('/QuanLyDatVe/DatVe', payload)
    },

    createShowtime(payload) {
        return api.post('/QuanLyDatVe/TaoLichChieu', payload)
    },
}
