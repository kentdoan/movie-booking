import React from 'react'
import { Empty } from 'antd'
import { useQueryHomeData } from '../../home/hooks/useQueryHomeData'
import { MovieGridSection } from '../../home/components/MovieGridSection'

export const SchedulePage = () => {
    const { data, isLoading, isError } = useQueryHomeData()

    if (isError) {
        return <Empty description="Không thể tải danh sách phim" />
    }

    return (
        <section className="space-y-6">
            <MovieGridSection movies={data?.movies || []} isLoading={isLoading} title="Danh sách phim" />
        </section>
    )
}
