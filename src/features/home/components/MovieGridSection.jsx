import React from 'react'
import { Button, Card, Empty, Skeleton } from 'antd'
import { Link } from 'react-router'
import { PUBLIC_PATH } from '@/constant'

export const MovieGridSection = ({ movies = [], isLoading = false, title = 'Phim nổi bật' }) => {
    return (
        <div className="space-y-4">
            {title ? <h2 className="text-3xl font-bold my-4 text-red-600">{title}</h2> : null}
            {isLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} active paragraph={{ rows: 3 }} />
                    ))}
                </div>
            ) : movies.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {movies.map((movie) => (
                        <Card
                            key={movie.maPhim}
                            hoverable
                            cover={
                                <img
                                    alt={movie.tenPhim}
                                    src={movie.hinhAnh}
                                    className="h-64 object-cover"
                                />
                            }
                            className="shadow-md"
                        >
                            <Card.Meta
                                title={movie.tenPhim}
                                description={
                                    <div className="space-y-2">
                                        <p className="text-sm text-zinc-600 line-clamp-2">{movie.moTa}</p>
                                        <div className="flex gap-2">
                                            <Link
                                                className="flex-1"
                                                to={PUBLIC_PATH.MOVIE_DETAIL.replace(':id', movie.maPhim)}
                                            >
                                                <Button
                                                    color="red"
                                                    variant="solid"
                                                    className="w-full"
                                                    size="small"
                                                >
                                                    Chi tiết
                                                </Button>
                                            </Link>
                                            <Link
                                                className="flex-1"
                                                to={PUBLIC_PATH.MOVIE_DETAIL.replace(':id', movie.maPhim)}
                                            >
                                                <Button
                                                    color="red"
                                                    variant="outlined"
                                                    className="w-full"
                                                    size="small"
                                                >
                                                    Đặt vé
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                }
                            />
                        </Card>
                    ))}
                </div>
            ) : (
                <Empty description="Hiện tại chưa có phim" />
            )}
        </div>
    )
}
