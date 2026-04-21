import React from 'react'
import { Outlet } from 'react-router'
import { Footer, Header } from '../shared/components'

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 sm:px-6 lg:px-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
