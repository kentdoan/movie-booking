import { Button, Input } from 'antd'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useNavigate } from 'react-router'
import { PUBLIC_PATH } from '@/constant'
import { useMutationSignIn } from '../hooks'

const signInSchema = z.object({
    taiKhoan: z.string().min(1, 'Vui lòng nhập tài khoản'),
    matKhau: z.string().min(1, 'Vui lòng nhập mật khẩu'),
})

export const SignInPage = () => {
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: zodResolver(signInSchema),
    })

    const signInMutation = useMutationSignIn()

    return (
        <div className="container mx-auto">
            <form
                className="max-w-125 mx-auto space-y-5"
                onSubmit={handleSubmit(async (data) => {
                    signInMutation.mutate(data)
                })}
            >
                <h2 className="text-2xl font-semibold">Đăng nhập</h2>
                <div>
                    <label htmlFor="">Tài khoản</label>
                    <Controller
                        control={control}
                        name="taiKhoan"
                        render={({ field }) => <Input {...field} />}
                    />
                    <p className="text-red-500 text-xs">{errors.taiKhoan?.message}</p>
                </div>
                <div>
                    <label htmlFor="">Mật khẩu</label>
                    <Controller
                        control={control}
                        name="matKhau"
                        render={({ field }) => <Input type="password" {...field} />}
                    />
                    <p className="text-red-500 text-xs">{errors.matKhau?.message}</p>
                </div>
                <Button
                    className="w-full"
                    color="red"
                    variant="solid"
                    htmlType="submit"
                    loading={signInMutation.isPending}
                >
                    Đăng Nhập
                </Button>
            </form>
        </div>
    )
}
