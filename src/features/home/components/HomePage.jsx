import React from 'react'
import { Carousel, Empty, Skeleton } from 'antd'
import { useQueryHomeData } from '../hooks/useQueryHomeData'
import { MovieGridSection } from './MovieGridSection'
import { CinemaShowtimesSection } from './CinemaShowtimesSection'

export const HomePage = () => {
    const { data, isLoading, isError } = useQueryHomeData()

    if (isError) {
        return (
            <div className="py-10">
                <Empty description="Không thể tải dữ liệu trang chủ" />
            </div>
        )
    }

    const banners = data?.banners || []
    const movies = data?.movies || []
    const cinemaSystems = data?.cinemaSystems || []

    return (
        <section className="space-y-6 sm:space-y-8">
            {/* Banner Carousel */}
            {isLoading ? (
                <div className="home-banner overflow-hidden rounded-xl">
                    <Skeleton.Image active={true} style={{ width: '100%', height: 180 }} />
                </div>
            ) : banners.length > 0 ? (
                <div className="home-banner overflow-hidden rounded-xl border border-zinc-200 bg-black shadow-sm">
                    <Carousel autoplay autoplaySpeed={5000} style={{ background: '#000' }}>
                        {banners.map((banner) => (
                            <div key={banner.maBanner} className="w-full h-full">
                                <img
                                    alt={banner.tenBanner}
                                    src={banner.hinhAnh}
                                    className="h-[170px] w-full object-cover sm:h-[260px] lg:h-[420px]"
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
            ) : null}

            <MovieGridSection movies={movies.slice(0, 12)} isLoading={isLoading} />

            <CinemaShowtimesSection cinemaSystems={cinemaSystems} isLoading={isLoading} />
        </section>
    )
}
