import React from 'react'
import { Outlet } from 'react-router'
import { Footer, Header } from '../shared/components'

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto py-5 flex-1 w-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
