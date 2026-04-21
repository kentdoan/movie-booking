import { Outlet } from 'react-router'

export const AuthLayout = () => {
	return (
		<main className="min-h-screen bg-zinc-100 px-4 py-6 sm:py-10">
			<div className="mx-auto w-full max-w-3xl rounded-xl bg-white p-4 shadow sm:p-6 lg:p-8">
				<Outlet />
			</div>
		</main>
	)
}
