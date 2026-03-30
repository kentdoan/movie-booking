import React from 'react'
import { useParams } from 'react-router'

export const AdminShowtimePage = () => {
    const { idFilm } = useParams()

    return (
        <section className="space-y-3">
            <h1 className="text-3xl font-semibold">Admin - Tạo lịch chiếu</h1>
            <p>Đang tạo lịch chiếu cho phim: {idFilm}</p>
        </section>
    )
}
