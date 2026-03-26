// import axios from 'axios'

import { api } from "@/lib";

export const userService = {
    // dangKy: (payload) =>
    //     axios.post('https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy', payload, {
    //         headers: {
    //             TokenCybersoft:
    //                 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4OCIsIkhldEhhblN0cmluZyI6IjEwLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4ODk5ODQwMDAwMCIsIm5iZiI6MTc2MDAyOTIwMCwiZXhwIjoxNzg5MTQ2MDAwfQ.l0zPoFdAw1Eg4yqbHAPSHOZJeapIOhcC-It_UzWyRMg',
    //         },
    //     }),

    dangKy: (payload) => api.post('/QuanLyNguoiDung/DangKy', payload),
}
