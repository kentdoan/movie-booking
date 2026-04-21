import React from 'react'
import { Link, useParams } from 'react-router'
import { Button, Card, Empty, Grid, Skeleton, Tabs } from 'antd'
import { StarFilled, CalendarOutlined, ThunderboltFilled } from '@ant-design/icons'
import { PUBLIC_PATH } from '../../../constant'
import { useQueryMovieDetail } from '../hooks/useQueryMovieDetail'

export const MovieDetailPage = () => {
    const screens = Grid.useBreakpoint()
    const { maPhim, id } = useParams()
    const movieId = maPhim || id

    const { data, isLoading, isError } = useQueryMovieDetail(movieId)

    if (isError || (!isLoading && !data?.detail)) {
        return (
            <div className="py-10">
                <Empty description="Không thể tải chi tiết phim" />
            </div>
        )
    }

    const detail = data?.detail
    const cinemaSystems = data?.cinemaSystems || []

    const tabItems = cinemaSystems.map((system) => ({
        key: system.maHeThongRap,
        label: system.tenHeThongRap,
        children: (
            <div className="space-y-4">
                {system.cumRapChieu?.length > 0 ? (
                    <div className="space-y-3">
                        {system.cumRapChieu.map((cluster) => (
                            <Card key={cluster.maCumRap} size="small">
                                <div className="space-y-2">
                                    <h4 className="font-semibold">{cluster.tenCumRap}</h4>
                                    <p className="text-xs text-zinc-500">{cluster.diaChi}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {cluster.lichChieuPhim?.map((showtime) => (
                                            <Link
                                                key={showtime.maLichChieu}
                                                to={PUBLIC_PATH.TICKET_ROOM.replace(':id', showtime.maLichChieu)}
                                            >
                                                <Button size="small" type="primary" className="min-w-16">
                                                    {showtime.ngayChieuGioChieu?.slice(11, 16)}
                                                </Button>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Empty description="Không có lịch chiếu" />
                )}
            </div>
        ),
    }))

    return (
        <section className="space-y-6 pb-10">
            {/* Movie Header and Main Info */}
            {isLoading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
                <div className="grid gap-5 md:gap-8 lg:grid-cols-3">
                    {/* Poster */}
                    <div className="lg:col-span-1">
                        <img
                            alt={detail?.tenPhim}
                            src={detail?.hinhAnh}
                            className="w-full rounded-lg shadow-lg object-cover"
                            style={{ aspectRatio: '3/4' }}
                        />
                    </div>

                    {/* Movie Info */}
                    <div className="space-y-4 lg:col-span-2">
                        <div>
                            <h1 className="mb-2 text-2xl font-bold text-red-600 sm:text-3xl lg:text-4xl">{detail?.tenPhim}</h1>
                            <div className="flex flex-wrap gap-4 text-sm text-zinc-600 mb-4">
                                {detail?.sapChieu === true && (
                                    <span className="flex items-center gap-1">
                                        <ThunderboltFilled /> Sắp chiếu
                                    </span>
                                )}
                                {detail?.dangChieu === true && (
                                    <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded">
                                        Đang chiếu
                                    </span>
                                )}
                                {detail?.hot === true && (
                                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-600 rounded">
                                        Hot
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3 border-y py-4">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-4">
                                <span className="w-32 shrink-0 font-semibold">Mô tả:</span>
                                <p className="text-zinc-700">{detail?.moTa}</p>
                            </div>

                            {detail?.danhGia && (
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                                    <span className="w-32 shrink-0 font-semibold">Đánh giá:</span>
                                    <span className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <StarFilled
                                                key={i}
                                                className={i < Math.ceil(detail.danhGia / 2) ? 'text-yellow-400' : 'text-zinc-300'}
                                            />
                                        ))}
                                        <span className="ml-2 font-semibold">{detail?.danhGia}/10</span>
                                    </span>
                                </div>
                            )}

                            {detail?.ngayKhoiChieu && (
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                                    <span className="w-32 shrink-0 font-semibold">Ngày khởi chiếu:</span>
                                    <span className="flex items-center gap-2">
                                        <CalendarOutlined />
                                        {new Date(detail.ngayKhoiChieu).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                            )}
                        </div>

                        {detail?.napChieu === true && (
                            <div className="p-4 bg-green-50 border border-green-200 rounded">
                                <p className="text-green-700 font-semibold">✓ Phim đã chiếu ra rạp</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Showtimes Tabs */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-red-600 sm:text-2xl">Lịch chiếu</h2>
                {isLoading ? (
                    <Skeleton active />
                ) : tabItems.length > 0 ? (
                    <Card className="shadow-md">
                        <Tabs
                            className="movie-detail-tabs"
                            tabPosition={screens.lg ? 'left' : 'top'}
                            defaultActiveKey={tabItems[0]?.key}
                            items={tabItems}
                        />
                    </Card>
                ) : (
                    <Empty description="Không có lịch chiếu" />
                )}
            </div>
        </section>
    )
}
