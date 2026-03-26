import { Route, Routes } from 'react-router'
import { MainLayout } from './layout/MainLayout'
import { AuthLayout } from './layout/AuthLayout'
import { AdminLayout } from './layout/AdminLayout'

import { ADMIN_PATH, PRIVATE_PATH, PUBLIC_PATH } from '@/constant'
import { RegisterPage } from '@/features/register'
import { SignInPage } from '@/features/sign-in'
import { HomePage } from '@/features/home'
import { MovieDetailPage } from '@/features/movie-detail'
import { TicketRoomPage } from '@/features/ticket-room'
import { ProfilePage } from '@/features/profile'
import { SchedulePage } from '@/features/schedule'
import { CinemaPage } from '@/features/cinema'
import { ForbiddenPage } from '@/features/auth'
import { AdminFilmFormPage, AdminFilmsPage } from '@/features/admin/films'
import { AdminShowtimePage } from '@/features/admin/showtime'
import { AdminUsersPage } from '@/features/admin/users'
import { AdminRoute, GuestOnlyRoute, RequireAuth } from '@/shared/guards'

const NotFoundPage = () => {
    return (
        <section className="space-y-3 text-center py-20">
            <h1 className="text-4xl font-semibold">404</h1>
            <p>Không tìm thấy trang bạn yêu cầu.</p>
        </section>
    )
}

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path={PUBLIC_PATH.HOME} element={<HomePage />} />
                <Route path={PUBLIC_PATH.SCHEDULE} element={<SchedulePage />} />
                <Route path={PUBLIC_PATH.CINEMA} element={<CinemaPage />} />
                <Route path={PUBLIC_PATH.MOVIE_DETAIL} element={<MovieDetailPage />} />
                <Route path={PUBLIC_PATH.MOVIE_DETAIL_ALIAS} element={<MovieDetailPage />} />
                <Route path={PUBLIC_PATH.FORBIDDEN} element={<ForbiddenPage />} />
            </Route>

            <Route element={<GuestOnlyRoute />}>
                <Route element={<AuthLayout />}>
                    <Route path={PUBLIC_PATH.SIGN_IN} element={<SignInPage />} />
                    <Route path={PUBLIC_PATH.REGISTER} element={<RegisterPage />} />
                </Route>
            </Route>

            <Route element={<RequireAuth />}>
                <Route element={<MainLayout />}>
                    <Route path={PRIVATE_PATH.PROFILE} element={<ProfilePage />} />
                    <Route path={PRIVATE_PATH.PROFILE_ALIAS} element={<ProfilePage />} />
                    <Route path={PRIVATE_PATH.TICKET_ROOM} element={<TicketRoomPage />} />
                    <Route path={PRIVATE_PATH.TICKET_ROOM_ALIAS} element={<TicketRoomPage />} />
                </Route>
            </Route>

            <Route element={<RequireAuth />}>
                <Route element={<AdminRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route path={ADMIN_PATH.FILMS} element={<AdminFilmsPage />} />
                        <Route path={ADMIN_PATH.ADD_FILM} element={<AdminFilmFormPage mode="add" />} />
                        <Route path={ADMIN_PATH.EDIT_FILM} element={<AdminFilmFormPage mode="edit" />} />
                        <Route path={ADMIN_PATH.SHOWTIME} element={<AdminShowtimePage />} />
                        <Route path={ADMIN_PATH.USERS} element={<AdminUsersPage />} />
                    </Route>
                </Route>
            </Route>

            <Route element={<MainLayout />}>
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}

export default App
