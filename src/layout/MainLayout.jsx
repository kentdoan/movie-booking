import React from 'react'
import { Outlet } from 'react-router'
import { Footer, Header } from '@/shared/components'

// import { Footer } from '@/shared/components/Footer'
// import { Header } from '@/shared/components/Header'
// import { Header } from '../shared/components/Header'

export const MainLayout = () => {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Header />
            <div className="overflow-auto grow flex-1">
                <main className="container mx-auto py-5 h-full">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}
