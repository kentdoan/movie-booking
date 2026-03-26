import { Link, Outlet } from 'react-router'
import { ADMIN_PATH } from '@/constant'

export const AdminLayout = () => {
	return (
		<div className="min-h-screen bg-zinc-100">
			<header className="border-b bg-white">
				<div className="container mx-auto flex items-center justify-between py-4">
					<h1 className="text-2xl font-semibold">Bảng điều khiển quản trị</h1>
					<nav className="space-x-4 text-sm font-medium">
						<Link to={ADMIN_PATH.FILMS}>Phim</Link>
						<Link to={ADMIN_PATH.ADD_FILM}>Thêm phim</Link>
						<Link to={ADMIN_PATH.USERS}>Người dùng</Link>
					</nav>
				</div>
			</header>

			<main className="container mx-auto py-6">
				<Outlet />
			</main>
		</div>
	)
}
