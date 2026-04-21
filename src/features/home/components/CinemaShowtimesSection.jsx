import React, { useMemo, useState } from 'react'
import { Button, Card, Empty, Grid, Skeleton } from 'antd'
import { Link } from 'react-router'
import { PUBLIC_PATH } from '../../../constant'

const normalizeCinemaSystems = (systems = []) => {
    return systems.map((system) => {
        const clusters = system.cumRapChieu || system.lstCumRap || []

        return {
            ...system,
            cumRapChieu: clusters.map((cluster) => {
                const movies = cluster.danhSachPhim || cluster.lstPhim || []

                return {
                    ...cluster,
                    danhSachPhim: movies.map((movie) => ({
                        ...movie,
                        lstLichChieuTheoPhim:
                            movie.lstLichChieuTheoPhim || movie.lstLichChieu || [],
                    })),
                }
            }),
        }
    })
}

export const CinemaShowtimesSection = ({
    cinemaSystems = [],
    isLoading = false,
    title = 'Lịch chiếu theo hệ thống rạp',
}) => {
    const [selectedCinemaSystem, setSelectedCinemaSystem] = useState('')
    const screens = Grid.useBreakpoint()

    const normalizedSystems = useMemo(
        () => normalizeCinemaSystems(cinemaSystems),
        [cinemaSystems],
    )

    const activeSystem = useMemo(() => {
        return (
            normalizedSystems.find((item) => item.maHeThongRap === selectedCinemaSystem) ||
            normalizedSystems[0]
        )
    }, [normalizedSystems, selectedCinemaSystem])

    const selectedSystemShowtimes = activeSystem?.cumRapChieu || []
    const visibleMovieCount = screens.md ? 4 : 2
    const visibleShowtimeCount = screens.sm ? 6 : 4

    return (
        <div className="space-y-4">
            {title ? <h2 className="text-xl font-bold text-red-600 sm:text-3xl">{title}</h2> : null}
            {isLoading ? (
                <Skeleton active />
            ) : normalizedSystems.length > 0 ? (
                <div className="grid gap-3 rounded-lg border p-2 sm:gap-4 sm:p-4 lg:grid-cols-[260px_minmax(0,1fr)]">
                    <div className="min-w-0">
                        <div className={screens.lg ? 'space-y-2' : 'cinema-system-scroll no-scrollbar flex gap-2 overflow-x-auto pb-1'}>
                            {normalizedSystems.map((system) => {
                                const isActive = activeSystem?.maHeThongRap === system.maHeThongRap

                                return (
                                    <button
                                        key={system.maHeThongRap}
                                        type="button"
                                        onClick={() => setSelectedCinemaSystem(system.maHeThongRap)}
                                        className={`${
                                            screens.lg
                                                ? 'flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left'
                                                : 'flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-left'
                                        } transition ${
                                            isActive
                                                ? 'border-red-500 bg-red-50 text-red-600'
                                                : 'border-zinc-200 bg-white text-zinc-700 hover:border-red-300'
                                        }`}
                                    >
                                        <img
                                            src={system.logo}
                                            alt={system.tenHeThongRap}
                                            className="h-7 w-7 shrink-0 object-contain"
                                        />
                                        <span className={`${screens.lg ? 'truncate text-sm font-medium' : 'max-w-32 truncate text-xs font-medium'}`}>
                                            {system.tenHeThongRap}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="min-w-0 space-y-3">
                        <h3 className="break-words text-base font-semibold sm:text-lg">{activeSystem?.tenHeThongRap}</h3>
                        {selectedSystemShowtimes.length > 0 ? (
                            selectedSystemShowtimes.map((cluster) => (
                                <Card key={cluster.maCumRap} size="small">
                                    <div className="space-y-2">
                                        <h4 className="break-words text-sm font-semibold sm:text-base">{cluster.tenCumRap}</h4>
                                        <p className="break-words text-xs text-zinc-500">{cluster.diaChi}</p>
                                        <div className="space-y-2">
                                            {cluster.danhSachPhim?.slice(0, visibleMovieCount).map((movie) => (
                                                <div key={movie.maPhim} className="rounded border p-2">
                                                    <p className="mb-1 line-clamp-2 text-sm font-medium">{movie.tenPhim}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {movie.lstLichChieuTheoPhim
                                                            ?.slice(0, visibleShowtimeCount)
                                                            .map((showtime) => (
                                                                <Link
                                                                    key={showtime.maLichChieu}
                                                                    to={PUBLIC_PATH.TICKET_ROOM.replace(
                                                                        ':id',
                                                                        showtime.maLichChieu,
                                                                    )}
                                                                >
                                                                    <Button size="small" type="primary" className="min-w-16">
                                                                        {showtime.ngayChieuGioChieu?.slice(11, 16)}
                                                                    </Button>
                                                                </Link>
                                                            ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <div className="flex min-h-40 items-center justify-center rounded border border-dashed border-zinc-200">
                                <Empty description="Hiện tại rạp này chưa có lịch chiếu" />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Empty description="Chưa có dữ liệu hệ thống rạp" />
            )}
        </div>
    )
}
