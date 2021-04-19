import axios from '@/services/axios'

export default {
    syncWithDrive(token) {
        return axios.get('drive/sync', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    syncWithApp(token) {
        return axios.get('app/sync', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    oauth2(token) {
        return axios.get('oauth2callback', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    }
}