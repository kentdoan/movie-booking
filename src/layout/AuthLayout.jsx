import { Outlet } from 'react-router'

export const AuthLayout = () => {
	return (
		<main className="min-h-screen bg-zinc-100 py-12 px-4">
			<div className="mx-auto w-full max-w-3xl rounded-xl bg-white p-8 shadow">
				<Outlet />
			</div>
		</main>
	)
}
