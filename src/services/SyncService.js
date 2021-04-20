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
        return axios.post('oauth2callback', {token: token}, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    oauth2Code(token, code) {
                return axios.post('oauth2callback', {
                    code: code,
                }, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                })
    }

}