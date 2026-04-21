import { configureStore } from '@reduxjs/toolkit'
import ticketBookingReducer from './ticketBookingSlice'

export const store = configureStore({
    reducer: {
        ticketBooking: ticketBookingReducer,
    },
})
