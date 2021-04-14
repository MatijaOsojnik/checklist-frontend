import axios from '@/services/axios'

export default {
    register(credentials) {
        return axios.post('user/register', credentials)
    },
    login(credentials) {
        return axios.post('user/login', credentials)
    },
    verify(authenticationCode) {
        return axios.get(`user/verify/${authenticationCode}`)
    },
    sendVerification(email) {
        return axios.post(`user/verify`, {email: email})
    }
    // googleAuth(user) {
    //     return axios.post('auth/google', user)
    // },
    // facebookAuth(token) {
    //     return axios.post('auth/facebook', {token})
    // }
}