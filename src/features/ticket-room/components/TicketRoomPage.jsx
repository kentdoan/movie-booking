import React, { useMemo, useState } from 'react'
import { Alert, Empty, Skeleton, Tag } from 'antd'
import { useParams } from 'react-router'
import { useQueryTicketRoom } from '../hooks/useTicketRoom'

export const TicketRoomPage = () => {
    const { maLichChieu, id } = useParams()
    const showtimeId = Number(maLichChieu || id)
    const { data, isLoading, isError } = useQueryTicketRoom(showtimeId)
    const [danhSachGheDangChon, setDanhSachGheDangChon] = useState([])

    const seats = data?.danhSachGhe || []

    const tongTien = useMemo(() => {
        return danhSachGheDangChon.reduce((total, seat) => total + Number(seat.giaVe || 0), 0)
    }, [danhSachGheDangChon])

    const toggleSeat = (seat) => {
        if (seat.daDat) {
            return
        }

        setDanhSachGheDangChon((prev) => {
            const existed = prev.some((item) => item.maGhe === seat.maGhe)
            if (existed) {
                return prev.filter((item) => item.maGhe !== seat.maGhe)
            }

            return [...prev, seat]
        })
    }

    if (isLoading) {
        return <Skeleton active paragraph={{ rows: 8 }} />
    }

    if (isError) {
        return <Empty description="Không thể tải thông tin phòng vé" />
    }

    return (
        <section className="space-y-5 pb-10">
            <h1 className="text-2xl font-semibold">Phòng vé - Mã lịch chiếu: {showtimeId}</h1>

            <div className="flex flex-wrap gap-3 text-xs">
                <Tag color="default">Ghế trống</Tag>
                <Tag color="red">Ghế đã đặt</Tag>
                <Tag color="gold">Ghế VIP</Tag>
                <Tag color="green">Ghế đang chọn</Tag>
            </div>

            <div className="rounded border border-zinc-200 p-4">
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(16, minmax(0, 1fr))',
                        gap: '10px',
                    }}
                >
                    {seats.map((seat) => {
                        const isSelected = danhSachGheDangChon.some((item) => item.maGhe === seat.maGhe)
                        const isVip = String(seat.loaiGhe || '').toLowerCase() === 'vip'

                        let seatClass =
                            'h-9 rounded text-xs font-semibold transition border border-zinc-200 bg-white text-zinc-700 hover:border-blue-500'

                        if (seat.daDat) {
                            seatClass = 'h-9 rounded text-xs font-semibold border border-red-300 bg-red-200 text-red-700 cursor-not-allowed'
                        } else if (isSelected) {
                            seatClass = 'h-9 rounded text-xs font-semibold border border-green-500 bg-green-500 text-white'
                        } else if (isVip) {
                            seatClass = 'h-9 rounded text-xs font-semibold border border-yellow-500 bg-yellow-100 text-yellow-800'
                        }

                        return (
                            <button
                                key={seat.maGhe}
                                className={seatClass}
                                disabled={seat.daDat}
                                onClick={() => toggleSeat(seat)}
                                type="button"
                                title={`${seat.tenGhe} - ${seat.giaVe?.toLocaleString('vi-VN')} VND`}
                            >
                                {seat.tenGhe}
                            </button>
                        )
                    })}
                </div>
            </div>

            <Alert
                type="info"
                showIcon
                message="Thông tin ghế đã chọn"
                description={
                    <div className="space-y-1">
                        <p>Tổng số ghế đang chọn: {danhSachGheDangChon.length}</p>
                        <p>Tổng tiền: {tongTien.toLocaleString('vi-VN')} VND</p>
                        <p>
                            Danh sách ghế: {danhSachGheDangChon.map((seat) => seat.tenGhe).join(', ') || 'Chưa chọn'}
                        </p>
                    </div>
                }
            />
        </section>
    )
}
