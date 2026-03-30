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
        <section className="space-y-8">
            {/* Banner Carousel */}
            {isLoading ? (
                <Skeleton.Image active={true} style={{ width: '100%', height: 400 }} />
            ) : banners.length > 0 ? (
                <Carousel autoplay autoplaySpeed={5000} style={{ background: '#000' }}>
                    {banners.map((banner) => (
                        <div key={banner.maBanner} className="w-full h-full">
                            <img
                                alt={banner.tenBanner}
                                src={banner.hinhAnh}
                                className="w-full h-full"
                            />
                        </div>
                    ))}
                </Carousel>
            ) : null}

            <MovieGridSection movies={movies.slice(0, 12)} isLoading={isLoading} />

            <CinemaShowtimesSection cinemaSystems={cinemaSystems} isLoading={isLoading} />
        </section>
    )
}
