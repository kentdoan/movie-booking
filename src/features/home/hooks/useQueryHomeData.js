import { useQuery } from '@tanstack/react-query'
import { cinemaService, movieService } from '../../../services'

export const useQueryHomeData = () => {
    return useQuery({
        queryKey: ['home-data'],
        queryFn: async () => {
            const [bannerRes, movieRes, cinemaRes] = await Promise.all([
                movieService.getBanners(),
                movieService.getMovies(),
                cinemaService.getCinemaShowtimes(),
            ])

            return {
                banners: bannerRes?.data?.content || [],
                movies: movieRes?.data?.content || [],
                cinemaSystems: cinemaRes?.data?.content || [],
            }
        },
    })
}
