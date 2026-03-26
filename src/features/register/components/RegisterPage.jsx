import { Button, Input } from 'antd'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { yupResolver } from '@hookform/resolvers/yup'
import { registerFormSchema } from '../schema/registerFormSchema'
// import { userService } from '../services'
import { useNavigate } from 'react-router'
import { PUBLIC_PATH } from '@/constant'
import { useMutationUser } from '../hooks'
// import { toast } from 'sonner'

export const RegisterPage = () => {
    // const [isLoading, setIsLoading] = useState(false)

    const { createUser } = useMutationUser()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onChange', // onChange: Kiểm tra lỗi ngay khi người dùng nhập dữ liệu vào form
        resolver: zodResolver(registerFormSchema), // Sử dụng zod để validate form
        defaultValues: {
            maNhom: 'GP01',
        },
    })

    //  const createUser = useMutation({
    //     mutationFn: (payload) => userService.dangKy(payload),
    // })

    const navigate = useNavigate()

    return (
        <div className="container mx-auto">
            <form
                className="max-w-125 mx-auto space-y-5"
                onSubmit={handleSubmit(async (data) => {
                    // data: giá trị của form
                    // chỉ được thực thi khi form hợp lệ (không có lỗi)
                    // console.log('data', data)

                    // gọi API để đăng ký người dùng
                    // try {
                    //     setIsLoading(true)
                    //     await userService.dangKy(data)
                    //     // điều hướng về trang đăng nhập sau khi đăng ký thành công
                    //     navigate(PUBLIC_PATH.LOGIN)
                    // } catch (error) {
                    //     console.log('error', error)
                    // }finally{
                    //     setIsLoading(false)
                    // }

                    // createUser.muatate(data)
                     createUser.mutate(data, {
                        onSuccess() {
                            console.log('Đăng ký thành công')
                            navigate(PUBLIC_PATH.SIGN_IN)
                        },
                        onError() {
                             console.log('Đăng ký thất bại')
                        },
                    })
                    //toast.success('Đăng ký thành công')
                })}
            >
                <h2 className="text-2xl font-semibold">Đăng ký</h2>
                <div>
                    <label htmlFor="">Họ tên</label>
                    <Controller
                        control={control}
                        name="hoTen"
                        // rules={{
                        //     required: 'Vui lòng nhập họ tên', // required: true, // Bắt buộc phải nhập
                        //     minLength: {
                        //         // minLength: 5, // Ít nhất 5 ký tự
                        //         value: 5,
                        //         message: 'Họ tên phải có ít nhất 5 ký tự',
                        //     },
                        //     maxLength: {
                        //         // maxLength: 20, // Không được vượt quá 20 ký tự
                        //         value: 20,
                        //         message: 'Họ tên không được vượt quá 20 ký tự',
                        //     },
                        //     pattern: {
                        //         value: /^[a-zA-Z\s]+$/, // Chỉ cho phép chữ cái và khoảng trắng
                        //         message: 'Họ tên chỉ được chứa chữ cái và khoảng trắng',
                        //     },
                        // }}
                        render={({ field }) => {
                            // console.log('field', field)
                            return <Input {...field} />
                        }}
                    />
                    <p className="text-red-500 text-xs">{errors.hoTen?.message}</p>
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    {/* <input /> */}
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => {
                            // console.log('field', field)
                            return (
                                <Input
                                    {...field}
                                    // onChange={(ev) => field.onChange(ev.target.value || undefined)}
                                />
                            )
                        }}
                    />
                    <p className="text-red-500 text-xs">{errors.email?.message}</p>
                </div>
                <div>
                    <label htmlFor="">Tài khoản</label>
                    <Controller
                        control={control}
                        name="taiKhoan"
                        render={({ field }) => {
                            // console.log('field', field)
                            return <Input {...field} />
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="">Mật khẩu</label>
                    <Controller
                        control={control}
                        name="matKhau"
                        render={({ field }) => {
                            // console.log('field', field)
                            return <Input type="password" {...field} />
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="">Số điện thoại</label>
                    <Controller
                        control={control}
                        name="soDt"
                        render={({ field }) => {
                            // console.log('field', field)
                            return <Input {...field} />
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="">Mã nhóm</label>
                    <Controller
                        control={control}
                        name="maNhom"
                        render={({ field }) => {
                            // console.log('field', field)
                            return <Input {...field} />
                        }}
                    />
                </div>
                <Button
                    className="w-full"
                    color="red"
                    variant="solid"
                    htmlType="submit"
                    loading={createUser.isPending}
                >
                    Đăng Ký
                </Button>
            </form>
        </div>
    )
}
