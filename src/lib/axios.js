import axios from "axios";

export const api = axios.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api',
})

// Thêm interceptor để tự động thêm header vào tất cả các request
api.interceptors.request.use((config)=>{
    config.headers = {
        ...config.headers,
        TokenCybersoft:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4OCIsIkhldEhhblN0cmluZyI6IjEwLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4ODk5ODQwMDAwMCIsIm5iZiI6MTc2MDAyOTIwMCwiZXhwIjoxNzg5MTQ2MDAwfQ.l0zPoFdAw1Eg4yqbHAPSHOZJeapIOhcC-It_UzWyRMg',
    }
    return config
})

// api.post('url', payload)