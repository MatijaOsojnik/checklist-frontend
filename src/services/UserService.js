import axios from '@/services/axios'

export default {
    index() {
        return axios.get('users')
    },
    show() {
        return axios.get(`user/me`)
    },
    allUserInfo(token) {
        return axios.get(`user/admin/all`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    put(userId, data) {
        return axios.put(`users/${userId}`, data)
    },
    delete(userId, token) {
        return axios.delete(`user/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    }
    // changeAvatar(user, file) {
    //     return axios.put(`users/${user.id}`, file)
    // }
}