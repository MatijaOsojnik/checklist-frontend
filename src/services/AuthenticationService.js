import axios from '@/services/axios'

export default {
    register(credentials) {
        return axios.post('user/register', credentials)
    },
    login(credentials) {
        return axios.post('auth/login', credentials)
    },
    // googleAuth(user) {
    //     return axios.post('auth/google', user)
    // },
    // facebookAuth(token) {
    //     return axios.post('auth/facebook', {token})
    // }
}