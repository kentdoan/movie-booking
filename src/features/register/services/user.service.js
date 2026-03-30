import { userService as baseUserService } from '../../../services'

export const userService = {
    dangKy: (payload) => baseUserService.signUp(payload),
    capNhatNguoiDung: (payload) => baseUserService.updateUserByAdmin(payload),
    xoaNguoiDung: (taiKhoan) => baseUserService.deleteUser(taiKhoan),
}
