import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { store } from './store'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retryOnMount: false, // Không tự động retry khi component mount lại
            refetchOnWindowFocus: false, // Không tự động refetch khi cửa sổ được focus lại
        }
    }
})

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
                <Toaster
                    position='top-right' // vị trí hiển thị toast
                    duration={2000} // Thời gian hiển thị toast (ms)
                    richColors // Sử dụng màu sắc phong phú cho các loại toast
                />
            </BrowserRouter>
        </QueryClientProvider>
    </Provider>,
)
