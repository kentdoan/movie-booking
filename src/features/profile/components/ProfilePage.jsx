import { Button, Card, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutationUpdateProfile, useQueryProfile } from '../hooks/useProfile'

export const ProfilePage = () => {
    const { data, isLoading, isError } = useQueryProfile()
    const updateMutation = useMutationUpdateProfile()

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDT: '',
            maNhom: 'GP01',
            maLoaiNguoiDung: 'KhachHang',
            hoTen: '',
        },
    })

    useEffect(() => {
        if (!data) {
            return
        }

        reset({
            taiKhoan: data.taiKhoan || '',
            matKhau: data.matKhau || '',
            email: data.email || '',
            soDT: data.soDT || data.soDt || '',
            maNhom: data.maNhom || 'GP01',
            maLoaiNguoiDung: data.maLoaiNguoiDung || 'KhachHang',
            hoTen: data.hoTen || '',
        })
    }, [data, reset])

    if (isError || !data) {
        return <p>Không thể tải thông tin tài khoản.</p>
    }

    return (
        <section className="space-y-5">
            <h1 className="text-2xl font-semibold sm:text-3xl">Thông tin cá nhân</h1>

            <Card loading={isLoading}>
                <Form layout="vertical" onFinish={handleSubmit((formValues) => {
                    updateMutation.mutate(formValues, {
                        onSuccess() {
                            message.success('Cập nhật thông tin thành công')
                        },
                        onError(error) {
                            const errorMessage = error?.response?.data?.content || 'Cập nhật thông tin thất bại'
                            message.error(errorMessage)
                        },
                    })
                })}>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Form.Item label="Tài khoản">
                            <Controller
                                name="taiKhoan"
                                control={control}
                                render={({ field }) => <Input {...field} disabled />}
                            />
                        </Form.Item>

                        <Form.Item label="Họ tên">
                            <Controller
                                name="hoTen"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                        </Form.Item>

                        <Form.Item label="Email">
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                        </Form.Item>

                        <Form.Item label="Số điện thoại">
                            <Controller
                                name="soDT"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                        </Form.Item>

                        <Form.Item label="Mật khẩu">
                            <Controller
                                name="matKhau"
                                control={control}
                                render={({ field }) => <Input.Password {...field} />}
                            />
                        </Form.Item>

                        <Form.Item label="Mã nhóm">
                            <Controller
                                name="maNhom"
                                control={control}
                                render={({ field }) => <Input {...field} disabled />}
                            />
                        </Form.Item>
                    </div>

                    <Button type="primary" htmlType="submit" loading={updateMutation.isPending} className="w-full sm:w-auto">
                        Cập nhật
                    </Button>
                </Form>
            </Card>
        </section>
    )
}
