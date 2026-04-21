import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showtimeId: null,
    selectedSeats: [],
    paymentStatus: 'idle',
    paymentError: '',
}

const ticketBookingSlice = createSlice({
    name: 'ticketBooking',
    initialState,
    reducers: {
        setShowtimeId(state, action) {
            const nextShowtimeId = Number(action.payload) || null
            if (state.showtimeId !== nextShowtimeId) {
                state.showtimeId = nextShowtimeId
                state.selectedSeats = []
                state.paymentStatus = 'idle'
                state.paymentError = ''
            }
        },
        toggleSeatSelection(state, action) {
            const seat = action.payload
            if (!seat || seat.daDat) {
                return
            }

            const existedIndex = state.selectedSeats.findIndex((item) => item.maGhe === seat.maGhe)

            if (existedIndex >= 0) {
                state.selectedSeats.splice(existedIndex, 1)
                return
            }

            state.selectedSeats.push(seat)
        },
        pruneUnavailableSeats(state, action) {
            const unavailableSeatIds = new Set(action.payload || [])
            state.selectedSeats = state.selectedSeats.filter(
                (seat) => !unavailableSeatIds.has(seat.maGhe),
            )
        },
        clearSelectedSeats(state) {
            state.selectedSeats = []
        },
        startPayment(state) {
            state.paymentStatus = 'processing'
            state.paymentError = ''
        },
        paymentSuccess(state) {
            state.paymentStatus = 'success'
            state.paymentError = ''
        },
        paymentFailure(state, action) {
            state.paymentStatus = 'failed'
            state.paymentError = action.payload || 'Thanh toán thất bại'
        },
    },
})

export const {
    setShowtimeId,
    toggleSeatSelection,
    pruneUnavailableSeats,
    clearSelectedSeats,
    startPayment,
    paymentSuccess,
    paymentFailure,
} = ticketBookingSlice.actions

export const selectTicketBookingState = (state) => state.ticketBooking

export default ticketBookingSlice.reducer
