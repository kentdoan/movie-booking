import { useQuery } from '@tanstack/react-query'
import { movieService } from '../../../services'

export const useQueryMovieDetail = (maPhim) => {
    return useQuery({
        queryKey: ['movie-detail', maPhim],
        enabled: Boolean(maPhim),
        queryFn: async () => {
            const [detailRes, showtimesRes] = await Promise.all([
                movieService.getMovieDetail(maPhim),
                movieService.getMovieShowtimes(maPhim),
            ])

            return {
                detail: detailRes?.data?.content,
                cinemaSystems: showtimesRes?.data?.content?.heThongRapChieu || [],
            }
        },
    })
}
