import { useMutation, useQuery } from '@tanstack/react-query'
import { bookingService } from '@/services'

export const useQueryTicketRoom = (maLichChieu) => {
    return useQuery({
        queryKey: ['ticket-room', maLichChieu],
        enabled: Boolean(maLichChieu),
        queryFn: async () => {
            const response = await bookingService.getTicketRoom(maLichChieu)
            return response?.data?.content
        },
    })
}

export const useMutationBookTickets = () => {
    return useMutation({
        mutationFn: (payload) => bookingService.bookTickets(payload),
    })
}
