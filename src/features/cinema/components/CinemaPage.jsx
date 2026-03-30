import React from 'react'
import { Empty } from 'antd'
import { useQueryHomeData } from '../../home/hooks/useQueryHomeData'
import { CinemaShowtimesSection } from '../../home/components/CinemaShowtimesSection'

export const CinemaPage = () => {
    const { data, isLoading, isError } = useQueryHomeData()

    if (isError) {
        return <Empty description="Không thể tải thông tin rạp chiếu" />
    }

    return (
        <section className="space-y-6">
            <CinemaShowtimesSection
                cinemaSystems={data?.cinemaSystems || []}
                isLoading={isLoading}
                title="Hệ thống rạp và lịch chiếu"
            />
        </section>
    )
}
