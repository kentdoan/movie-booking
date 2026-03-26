import React, { useState } from 'react'
import {
    Button,
    Form,
    Input,
    Modal,
    Popconfirm,
    Select,
    Space,
    Table,
    message,
} from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { APP_CONFIG } from '@/config'
import { userService } from '@/services'

export const AdminUsersPage = () => {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(8)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [form] = Form.useForm()
    const queryClient = useQueryClient()

    const usersQuery = useQuery({
        queryKey: ['admin-users', search, page, pageSize],
        queryFn: async () => {
            const response = await userService.getUsersPaged({
                tuKhoa: search,
                soTrang: page,
                soPhanTuTrenTrang: pageSize,
            })
            return response?.data?.content
        },
    })

    const userTypesQuery = useQuery({
        queryKey: ['user-types'],
        queryFn: async () => {
            const response = await userService.getUserTypes()
            return response?.data?.content || []
        },
    })

    const saveMutation = useMutation({
        mutationFn: (payload) => {
            if (editingUser) {
                return userService.updateUserByAdmin(payload)
            }
            return userService.addUser(payload)
        },
        onSuccess() {
            message.success(editingUser ? 'Cập nhật người dùng thành công' : 'Thêm người dùng thành công')
            setIsModalOpen(false)
            form.resetFields()
            setEditingUser(null)
            queryClient.invalidateQueries({ queryKey: ['admin-users'] })
        },
        onError(error) {
            message.error(error?.response?.data?.content || 'Lưu người dùng thất bại')
        },
    })

    const deleteMutation = useMutation({
        mutationFn: (taiKhoan) => userService.deleteUser(taiKhoan),
        onSuccess() {
            message.success('Xóa người dùng thành công')
            queryClient.invalidateQueries({ queryKey: ['admin-users'] })
        },
        onError(error) {
            message.error(error?.response?.data?.content || 'Xóa người dùng thất bại')
        },
    })

    const openAddModal = () => {
        setEditingUser(null)
        form.resetFields()
        form.setFieldsValue({
            maNhom: APP_CONFIG.DEFAULT_GROUP,
            maLoaiNguoiDung: 'KhachHang',
        })
        setIsModalOpen(true)
    }

    const openEditModal = (record) => {
        setEditingUser(record)
        form.setFieldsValue({
            taiKhoan: record.taiKhoan,
            matKhau: record.matKhau || '',
            email: record.email,
            soDt: record.soDt,
            hoTen: record.hoTen,
            maLoaiNguoiDung: record.maLoaiNguoiDung,
            maNhom: APP_CONFIG.DEFAULT_GROUP,
        })
        setIsModalOpen(true)
    }

    const columns = [
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
        },
        {
            title: 'Loại người dùng',
            dataIndex: 'maLoaiNguoiDung',
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button size="small" onClick={() => openEditModal(record)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xóa người dùng"
                        description="Bạn chắc chắn muốn xóa người dùng này?"
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={() => deleteMutation.mutate(record.taiKhoan)}
                    >
                        <Button size="small" danger loading={deleteMutation.isPending}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h1 className="text-3xl font-semibold">Admin - Quản lý người dùng</h1>
                <Space>
                    <Input.Search
                        allowClear
                        placeholder="Tìm theo tài khoản, email..."
                        onSearch={(value) => {
                            setPage(1)
                            setSearch(value)
                        }}
                        style={{ width: 280 }}
                    />
                    <Button type="primary" onClick={openAddModal}>
                        Thêm người dùng
                    </Button>
                </Space>
            </div>

            <Table
                rowKey="taiKhoan"
                loading={usersQuery.isLoading}
                columns={columns}
                dataSource={usersQuery.data?.items || []}
                pagination={{
                    current: page,
                    pageSize,
                    total: usersQuery.data?.totalCount || 0,
                    onChange: (nextPage, nextPageSize) => {
                        setPage(nextPage)
                        setPageSize(nextPageSize)
                    },
                }}
            />

            <Modal
                title={editingUser ? 'Cập nhật người dùng' : 'Thêm người dùng'}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
                confirmLoading={saveMutation.isPending}
                width={720}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => saveMutation.mutate(values)}
                >
                    <div className="grid gap-3 md:grid-cols-2">
                        <Form.Item
                            label="Tài khoản"
                            name="taiKhoan"
                            rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]}
                        >
                            <Input disabled={Boolean(editingUser)} />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="matKhau"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Email không hợp lệ' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="soDt"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Họ tên"
                            name="hoTen"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Loại người dùng" name="maLoaiNguoiDung">
                            <Select
                                options={(userTypesQuery.data || []).map((type) => ({
                                    label: type.tenLoai,
                                    value: type.maLoaiNguoiDung,
                                }))}
                            />
                        </Form.Item>

                        <Form.Item label="Mã nhóm" name="maNhom">
                            <Input disabled />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </section>
    )
}
