import { AUTH_STORAGE_KEYS, USER_ROLE } from '../../constant'

const parseJSON = (value) => {
    if (!value) {
        return null
    }

    try {
        return JSON.parse(value)
    } catch {
        return null
    }
}

export const authSession = {
    getAccessToken() {
        return localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN) || ''
    },

    setAccessToken(token) {
        if (!token) {
            return
        }

        localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, token)
    },

    getUser() {
        return parseJSON(localStorage.getItem(AUTH_STORAGE_KEYS.USER))
    },

    setUser(user) {
        if (!user) {
            return
        }

        localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user))
    },

    clear() {
        localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
        localStorage.removeItem(AUTH_STORAGE_KEYS.USER)
    },

    isAuthenticated() {
        return Boolean(this.getAccessToken())
    },

    isAdmin() {
        return this.getUser()?.maLoaiNguoiDung === USER_ROLE.ADMIN
    },
}
