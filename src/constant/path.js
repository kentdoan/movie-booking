export const PUBLIC_PATH = {
    HOME: '/',
    SIGN_IN: '/sign-in',
    REGISTER: '/register',
    MOVIE_DETAIL: '/detail/:id',
    MOVIE_DETAIL_ALIAS: '/chitietphim/:maPhim',
    TICKET_ROOM: '/ticketroom/:id',
    TICKET_ROOM_ALIAS: '/chitietphongve/:maLichChieu',
    PROFILE: '/profile',
    PROFILE_ALIAS: '/thongtincanhan',
    SCHEDULE: '/lich-chieu',
    CINEMA: '/rap-chieu',
    PROMOTION: '/khuyen-mai',
    APP: '/ung-dung',
    SUPPORT: '/ho-tro',
    FORBIDDEN: '/403',
}

export const PRIVATE_PATH = {
    PROFILE: PUBLIC_PATH.PROFILE,
    PROFILE_ALIAS: PUBLIC_PATH.PROFILE_ALIAS,
    TICKET_ROOM: PUBLIC_PATH.TICKET_ROOM,
    TICKET_ROOM_ALIAS: PUBLIC_PATH.TICKET_ROOM_ALIAS,
}

export const ADMIN_PATH = {
    ROOT: '/admin',
    FILMS: '/admin/films',
    ADD_FILM: '/admin/films/addnew',
    EDIT_FILM: '/admin/films/edit/:idFilm',
    SHOWTIME: '/admin/films/showtime/:idFilm',
    USERS: '/admin/quanlynguoidung/index',
}
