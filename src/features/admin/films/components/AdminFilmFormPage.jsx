import React, { useEffect, useMemo, useState } from 'react'
import {
    Button,
    Card,
    Checkbox,
    Form,
    Input,
    InputNumber,
    Upload,
    message,
} from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import { UploadOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router'
import { ADMIN_PATH } from '@/constant'
import { APP_CONFIG } from '@/config'
import { movieService } from '@/services'

const toInputDate = (value) => {
    if (!value) {
        return ''
    }

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) {
        return ''
    }

    return date.toISOString().slice(0, 10)
}

const toApiDate = (value) => {
    if (!value) {
        return ''
    }

    const [yyyy, mm, dd] = value.split('-')
    return `${dd}/${mm}/${yyyy}`
}

export const AdminFilmFormPage = ({ mode = 'add' }) => {
    const [form] = Form.useForm()
    const { idFilm } = useParams()
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null)
    const isEdit = mode === 'edit'
    const movieId = Number(idFilm)

    const detailQuery = useQuery({
        queryKey: ['admin-film-detail', movieId],
        enabled: isEdit && Boolean(movieId),
        queryFn: async () => {
            const response = await movieService.getMovieDetail(movieId)
            return response?.data?.content
        },
    })

    useEffect(() => {
        if (!detailQuery.data) {
            return
        }

        form.setFieldsValue({
            tenPhim: detailQuery.data.tenPhim,
            trailer: detailQuery.data.trailer,
            moTa: detailQuery.data.moTa,
            ngayKhoiChieu: toInputDate(detailQuery.data.ngayKhoiChieu),
            dangChieu: detailQuery.data.dangChieu,
            sapChieu: detailQuery.data.sapChieu,
            hot: detailQuery.data.hot,
            danhGia: detailQuery.data.danhGia,
        })
    }, [detailQuery.data, form])

    const submitMutation = useMutation({
        mutationFn: async (values) => {
            const formData = new FormData()

            formData.append('tenPhim', values.tenPhim)
            formData.append('trailer', values.trailer || '')
            formData.append('moTa', values.moTa || '')
            formData.append('ngayKhoiChieu', toApiDate(values.ngayKhoiChieu))
            formData.append('sapChieu', String(Boolean(values.sapChieu)))
            formData.append('dangChieu', String(Boolean(values.dangChieu)))
            formData.append('hot', String(Boolean(values.hot)))
            formData.append('danhGia', String(values.danhGia || 0))
            formData.append('maNhom', APP_CONFIG.DEFAULT_GROUP)

            if (isEdit) {
                formData.append('maPhim', String(movieId))
            }

            if (selectedFile) {
                formData.append('File', selectedFile)
            }

            if (isEdit) {
                return movieService.updateMovie(formData)
            }

            return movieService.createMovie(formData)
        },
        onSuccess() {
            message.success(isEdit ? 'Cập nhật phim thành công' : 'Thêm phim thành công')
            navigate(ADMIN_PATH.FILMS)
        },
        onError(error) {
            message.error(error?.response?.data?.content || 'Lưu phim thất bại')
        },
    })

    const uploadProps = useMemo(
        () => ({
            beforeUpload: (file) => {
                setSelectedFile(file)
                return false
            },
            maxCount: 1,
            accept: 'image/*',
        }),
        [],
    )

    return (
        <section className="space-y-4">
            <h1 className="text-3xl font-semibold">Admin - {isEdit ? 'Cập nhật phim' : 'Thêm phim'}</h1>

            <Card loading={detailQuery.isLoading}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => submitMutation.mutate(values)}
                    initialValues={{
                        dangChieu: false,
                        sapChieu: false,
                        hot: false,
                        danhGia: 5,
                    }}
                >
                    <div className="grid gap-4 md:grid-cols-2">
                        <Form.Item
                            label="Tên phim"
                            name="tenPhim"
                            rules={[{ required: true, message: 'Vui lòng nhập tên phim' }]}
                        >
                            <Input placeholder="Nhập tên phim" />
                        </Form.Item>

                        <Form.Item label="Trailer" name="trailer">
                            <Input placeholder="Nhập link trailer" />
                        </Form.Item>

                        <Form.Item
                            label="Ngày khởi chiếu"
                            name="ngayKhoiChieu"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày khởi chiếu' }]}
                        >
                            <Input type="date" />
                        </Form.Item>

                        <Form.Item label="Đánh giá" name="danhGia">
                            <InputNumber min={1} max={10} className="w-full" />
                        </Form.Item>

                        <Form.Item className="md:col-span-2" label="Mô tả" name="moTa">
                            <Input.TextArea rows={4} />
                        </Form.Item>

                        <Form.Item label="Hình ảnh" className="md:col-span-2">
                            <Upload {...uploadProps}>
                                <Button icon={<UploadOutlined />}>Chọn hình</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item name="dangChieu" valuePropName="checked">
                            <Checkbox>Đang chiếu</Checkbox>
                        </Form.Item>

                        <Form.Item name="sapChieu" valuePropName="checked">
                            <Checkbox>Sắp chiếu</Checkbox>
                        </Form.Item>

                        <Form.Item name="hot" valuePropName="checked">
                            <Checkbox>Hot</Checkbox>
                        </Form.Item>
                    </div>

                    <div className="flex gap-2">
                        <Button type="primary" htmlType="submit" loading={submitMutation.isPending}>
                            {isEdit ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                        <Button onClick={() => navigate(ADMIN_PATH.FILMS)}>Hủy</Button>
                    </div>
                </Form>
            </Card>
        </section>
    )
}
