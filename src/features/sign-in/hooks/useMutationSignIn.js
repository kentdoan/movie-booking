import { useMutation } from '@tanstack/react-query'
import { userService } from '../service'
import { toast } from 'sonner'

export const useMutationSignIn = () => {
  return useMutation({
    mutationFn: (payload) => userService.dangNhap(payload),
    onSuccess(){
        toast.success('Đăng nhập thành công')
    },
    onError(error){
        toast.error(error.response.data.content)
    }
  })
}
