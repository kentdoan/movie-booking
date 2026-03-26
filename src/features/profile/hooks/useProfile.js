import { useMutation, useQuery } from '@tanstack/react-query'
import { userService } from '@/services'

export const useQueryProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await userService.getAccountInfo()
            return response?.data?.content
        },
    })
}

export const useMutationUpdateProfile = () => {
    return useMutation({
        mutationFn: (payload) => userService.updateAccount(payload),
    })
}
