import React, { useMemo, useState } from 'react'
import { Button, Card, Empty, Skeleton, Tabs } from 'antd'
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

    return (
        <div className="space-y-4">
            {title ? <h2 className="text-3xl font-bold text-red-600">{title}</h2> : null}
            {isLoading ? (
                <Skeleton active />
            ) : normalizedSystems.length > 0 ? (
                <div className="grid gap-4 rounded-lg border p-4 lg:grid-cols-[260px_1fr]">
                    <Tabs
                        tabPosition="left"
                        activeKey={activeSystem?.maHeThongRap}
                        onChange={setSelectedCinemaSystem}
                        items={normalizedSystems.map((system) => ({
                            key: system.maHeThongRap,
                            label: (
                                <div className="flex items-center gap-2">
                                    <img
                                        src={system.logo}
                                        alt={system.tenHeThongRap}
                                        className="h-7 w-7 object-contain"
                                    />
                                    <span className="text-xs font-medium">{system.tenHeThongRap}</span>
                                </div>
                            ),
                        }))}
                    />

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">{activeSystem?.tenHeThongRap}</h3>
                        {selectedSystemShowtimes.length > 0 ? (
                            selectedSystemShowtimes.map((cluster) => (
                                <Card key={cluster.maCumRap} size="small">
                                    <div className="space-y-2">
                                        <h4 className="font-semibold">{cluster.tenCumRap}</h4>
                                        <p className="text-xs text-zinc-500">{cluster.diaChi}</p>
                                        <div className="space-y-2">
                                            {cluster.danhSachPhim?.slice(0, 4).map((movie) => (
                                                <div key={movie.maPhim} className="rounded border p-2">
                                                    <p className="mb-1 text-sm font-medium">{movie.tenPhim}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {movie.lstLichChieuTheoPhim
                                                            ?.slice(0, 6)
                                                            .map((showtime) => (
                                                                <Link
                                                                    key={showtime.maLichChieu}
                                                                    to={PUBLIC_PATH.TICKET_ROOM.replace(
                                                                        ':id',
                                                                        showtime.maLichChieu,
                                                                    )}
                                                                >
                                                                    <Button size="small" type="primary">
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
