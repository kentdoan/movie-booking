import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { userService } from '../services'

export const useMutationUser = () => {
    const createUser = useMutation({
        mutationFn: (payload) => userService.dangKy(payload),
        onSuccess() {
            toast.success('Đăng ký thành công')
        },
        onError(error) {
            const message = error?.response?.data?.content || 'Đăng ký thất bại'
            toast.error(message)
        },
    })

    const updateUser = useMutation({
        mutationFn: (payload) => userService.capNhatNguoiDung(payload),
    })

    const deleteUser = useMutation({
        mutationFn: (taiKhoan) => userService.xoaNguoiDung(taiKhoan),
    })

    return { createUser, updateUser, deleteUser }
}
