import { userService as baseUserService } from '@/services'

export const userService = {
    dangNhap: (payload) => baseUserService.signIn(payload),
}
