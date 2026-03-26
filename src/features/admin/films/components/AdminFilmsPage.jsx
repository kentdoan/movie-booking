import React from 'react'
import { Button, Image, Popconfirm, Space, Table, Tag, message } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { ADMIN_PATH } from '@/constant'
import { movieService } from '@/services'

export const AdminFilmsPage = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const movieQuery = useQuery({
        queryKey: ['admin-films'],
        queryFn: async () => {
            const response = await movieService.getMovies()
            return response?.data?.content || []
        },
    })

    const deleteMutation = useMutation({
        mutationFn: (maPhim) => movieService.deleteMovie(maPhim),
        onSuccess() {
            message.success('Xóa phim thành công')
            queryClient.invalidateQueries({ queryKey: ['admin-films'] })
        },
        onError(error) {
            message.error(error?.response?.data?.content || 'Xóa phim thất bại')
        },
    })

    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            width: 100,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            width: 100,
            render: (value, record) => (
                <Image
                    src={value}
                    alt={record.tenPhim}
                    width={70}
                    height={90}
                    style={{ objectFit: 'cover', borderRadius: 6 }}
                />
            ),
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (_, record) => (
                <Space>
                    {record.dangChieu ? <Tag color="green">Đang chiếu</Tag> : null}
                    {record.sapChieu ? <Tag color="blue">Sắp chiếu</Tag> : null}
                    {record.hot ? <Tag color="red">Hot</Tag> : null}
                </Space>
            ),
        },
        {
            title: 'Đánh giá',
            dataIndex: 'danhGia',
            width: 90,
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: 240,
            render: (_, record) => (
                <Space>
                    <Button
                        size="small"
                        onClick={() =>
                            navigate(ADMIN_PATH.EDIT_FILM.replace(':idFilm', String(record.maPhim)))
                        }
                    >
                        Sửa
                    </Button>
                    <Button
                        size="small"
                        onClick={() =>
                            navigate(ADMIN_PATH.SHOWTIME.replace(':idFilm', String(record.maPhim)))
                        }
                    >
                        Tạo lịch chiếu
                    </Button>
                    <Popconfirm
                        title="Xóa phim"
                        description="Bạn chắc chắn muốn xóa phim này?"
                        onConfirm={() => deleteMutation.mutate(record.maPhim)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button danger size="small" loading={deleteMutation.isPending}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold">Admin - Quản lý phim</h1>
                <Button type="primary" onClick={() => navigate(ADMIN_PATH.ADD_FILM)}>
                    Thêm phim
                </Button>
            </div>

            <Table
                rowKey="maPhim"
                loading={movieQuery.isLoading}
                columns={columns}
                dataSource={movieQuery.data || []}
                pagination={{ pageSize: 8 }}
            />
        </section>
    )
}
