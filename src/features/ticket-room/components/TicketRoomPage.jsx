import React, { useEffect, useMemo } from 'react'
import { Alert, Button, Empty, Skeleton, Tag } from 'antd'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { useMutationBookTickets, useQueryTicketRoom } from '../hooks/useTicketRoom'
import {
    clearSelectedSeats,
    paymentFailure,
    paymentSuccess,
    pruneUnavailableSeats,
    selectTicketBookingState,
    setShowtimeId,
    startPayment,
    toggleSeatSelection,
} from '../../../store/ticketBookingSlice'

export const TicketRoomPage = () => {
    const { maLichChieu, id } = useParams()
    const showtimeId = Number(maLichChieu || id)
    const dispatch = useDispatch()
    const { selectedSeats, paymentStatus, paymentError } = useSelector(selectTicketBookingState)
    const { data, isLoading, isError, refetch } = useQueryTicketRoom(showtimeId)
    const bookTicketsMutation = useMutationBookTickets()

    const seats = useMemo(() => data?.danhSachGhe || [], [data])

    const tongTien = useMemo(() => {
        return selectedSeats.reduce((total, seat) => total + Number(seat.giaVe || 0), 0)
    }, [selectedSeats])

    useEffect(() => {
        dispatch(setShowtimeId(showtimeId))
    }, [dispatch, showtimeId])

    useEffect(() => {
        if (!seats.length) {
            return
        }

        const unavailableSeatIds = seats
            .filter((seat) => seat.daDat)
            .map((seat) => seat.maGhe)

        dispatch(pruneUnavailableSeats(unavailableSeatIds))
    }, [dispatch, seats])

    const toggleSeat = (seat) => {
        dispatch(toggleSeatSelection(seat))
    }

    const handlePayment = async () => {
        if (!selectedSeats.length) {
            toast.error('Vui lòng chọn ít nhất 1 ghế trước khi thanh toán')
            return
        }

        dispatch(startPayment())

        try {
            await bookTicketsMutation.mutateAsync({
                maLichChieu: showtimeId,
                danhSachVe: selectedSeats.map((seat) => ({
                    maGhe: seat.maGhe,
                    giaVe: seat.giaVe,
                })),
            })

            dispatch(paymentSuccess())
            dispatch(clearSelectedSeats())
            toast.success('Đặt vé thành công')
            refetch()
        } catch (error) {
            const message =
                error?.response?.data?.content || error?.message || 'Thanh toán thất bại, vui lòng thử lại'

            dispatch(paymentFailure(message))
            toast.error(message)
        }
    }

    if (isLoading) {
        return <Skeleton active paragraph={{ rows: 8 }} />
    }

    if (isError) {
        return <Empty description="Không thể tải thông tin phòng vé" />
    }

    return (
        <section className="space-y-5 pb-10">
            <h1 className="text-xl font-semibold sm:text-2xl">Phòng vé - Mã lịch chiếu: {showtimeId}</h1>

            <div className="flex flex-wrap gap-3 text-xs">
                <Tag color="default">Ghế trống</Tag>
                <Tag color="red">Ghế đã đặt</Tag>
                <Tag color="gold">Ghế VIP</Tag>
                <Tag color="green">Ghế đang chọn</Tag>
            </div>

            <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
                <div className="overflow-x-auto rounded border border-zinc-200 p-2 sm:p-4">
                    <div
                        className="grid w-full min-w-[560px] gap-1.5 sm:gap-2.5 max-[425px]:min-w-full"
                        style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}
                    >
                        {seats.map((seat) => {
                            const isSelected = selectedSeats.some((item) => item.maGhe === seat.maGhe)
                            const isVip = String(seat.loaiGhe || '').toLowerCase() === 'vip'

                            let seatClass =
                                'h-9 min-h-9 rounded text-xs font-semibold transition border border-zinc-200 bg-white text-zinc-700 hover:border-blue-500 max-[425px]:h-6 max-[425px]:min-h-6 max-[425px]:px-0 max-[425px]:text-[10px]'

                            if (seat.daDat) {
                                seatClass = 'h-9 min-h-9 rounded text-xs font-semibold border border-red-300 bg-red-200 text-red-700 cursor-not-allowed max-[425px]:h-6 max-[425px]:min-h-6 max-[425px]:px-0 max-[425px]:text-[10px]'
                            } else if (isSelected) {
                                seatClass = 'h-9 min-h-9 rounded text-xs font-semibold border border-green-500 bg-green-500 text-white max-[425px]:h-6 max-[425px]:min-h-6 max-[425px]:px-0 max-[425px]:text-[10px]'
                            } else if (isVip) {
                                seatClass = 'h-9 min-h-9 rounded text-xs font-semibold border border-yellow-500 bg-yellow-100 text-yellow-800 max-[425px]:h-6 max-[425px]:min-h-6 max-[425px]:px-0 max-[425px]:text-[10px]'
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

                <div className="space-y-4 xl:sticky xl:top-4">
                    <Alert
                        type={paymentStatus === 'failed' ? 'error' : 'info'}
                        showIcon
                        message="Thông tin ghế đã chọn"
                        description={
                            <div className="space-y-1 text-sm">
                                <p>Tổng số ghế đang chọn: {selectedSeats.length}</p>
                                <p>Tổng tiền: {tongTien.toLocaleString('vi-VN')} VND</p>
                                <p>Danh sách ghế: {selectedSeats.map((seat) => seat.tenGhe).join(', ') || 'Chưa chọn'}</p>
                                {paymentError ? <p className="text-red-600">{paymentError}</p> : null}
                            </div>
                        }
                    />

                    <Button
                        type="primary"
                        danger
                        size="large"
                        className="w-full"
                        loading={bookTicketsMutation.isPending || paymentStatus === 'processing'}
                        disabled={!selectedSeats.length}
                        onClick={handlePayment}
                    >
                        Thanh toán
                    </Button>
                </div>
            </div>
        </section>
    )
}
