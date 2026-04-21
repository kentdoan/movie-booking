import React from 'react'

export const Footer = () => {
    return (
        <footer className="bg-black px-4 py-4 text-center text-sm text-white sm:text-base">
            <div className="mx-auto w-full max-w-7xl">
                @{new Date().getFullYear()} Movie - All rights reserved
            </div>
        </footer>
    )
}
