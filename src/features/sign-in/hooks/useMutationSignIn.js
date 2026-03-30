import { useMutation } from '@tanstack/react-query'
import { userService } from '../service'
import { toast } from 'sonner'
import { authSession } from '../../../shared/auth'

export const useMutationSignIn = () => {
  return useMutation({
    mutationFn: (payload) => userService.dangNhap(payload),
    onSuccess(response) {
      const user = response?.data?.content || {}

      authSession.setAccessToken(user.accessToken)
      authSession.setUser(user)

      toast.success('Đăng nhập thành công')
    },
    onError(error) {
      const message = error?.response?.data?.content || 'Đăng nhập thất bại'
      toast.error(message)
    },
  })
}
