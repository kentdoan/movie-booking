import React from 'react'
import { Button, Card, Empty, Skeleton } from 'antd'
import { Link } from 'react-router'
import { PUBLIC_PATH } from '../../../constant'

export const MovieGridSection = ({ movies = [], isLoading = false, title = 'Phim nổi bật' }) => {
    return (
        <div className="space-y-3 sm:space-y-4">
            {title ? <h2 className="my-2 text-xl font-bold text-red-600 sm:my-4 sm:text-3xl">{title}</h2> : null}
            {isLoading ? (
                <div className="grid grid-cols-1 gap-3 min-[540px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} active paragraph={{ rows: 3 }} />
                    ))}
                </div>
            ) : movies.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 min-[540px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {movies.map((movie) => (
                        <Card
                            key={movie.maPhim}
                            hoverable
                            cover={
                                <img
                                    alt={movie.tenPhim}
                                    src={movie.hinhAnh}
                                    className="h-52 w-full object-cover sm:h-56 lg:h-60"
                                />
                            }
                            className="overflow-hidden rounded-xl shadow-md"
                            styles={{ body: { padding: '12px' } }}
                        >
                            <Card.Meta
                                title={
                                    <h3 className="line-clamp-2 min-h-11 text-base font-semibold leading-5">
                                        {movie.tenPhim}
                                    </h3>
                                }
                                description={
                                    <div className="space-y-2">
                                        <p className="line-clamp-3 min-h-15 text-sm text-zinc-600">{movie.moTa}</p>
                                        <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2">
                                            <Link
                                                className="w-full"
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
                                                className="w-full"
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
