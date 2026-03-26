import { api } from "@/lib"
// import axios from "axios"

export const userService = {
    // dangNhap: (payload) => {
    //     return axios.post('https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap', payload,{
    //         headers: {
    //             TokenCybersoft:
    //                 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4OCIsIkhldEhhblN0cmluZyI6IjEwLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4ODk5ODQwMDAwMCIsIm5iZiI6MTc2MDAyOTIwMCwiZXhwIjoxNzg5MTQ2MDAwfQ.l0zPoFdAw1Eg4yqbHAPSHOZJeapIOhcC-It_UzWyRMg',
    //         },
    //     })
    // }

    dangNhap: (payload)=> api.post('/QuanLyNguoiDung/DangNhap', payload)
}