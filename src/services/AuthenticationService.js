import axios from '@/services/axios'

export default {
    register(credentials) {
        return axios.post('sign_up', {user: credentials})
    },
    login(credentials) {
        return axios.post('sign_in', {user: credentials})
    },
    googleAuth(user) {
        return axios.post('auth/google', user)
    },
    facebookAuth(token) {
        return axios.post('auth/facebook', {token})
    }
}