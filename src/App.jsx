import { Route, Routes } from 'react-router'
import { MainLayout } from './layout/MainLayout'

import { PUBLIC_PATH } from '@/constant'
import { RegisterPage } from '@/features/register'
import { SignInPage } from '@/features/sign-in'

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<h1 className="h-[3000px]">Home</h1>} />
                <Route path={PUBLIC_PATH.SIGN_IN} element={<SignInPage/>} />
                <Route path={PUBLIC_PATH.REGISTER} element={<RegisterPage />} />
            </Route>
        </Routes>
    )
}

export default App
