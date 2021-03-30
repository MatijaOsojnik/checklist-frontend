import axios from '@/services/axios'
export default {
    index(token) {
        return axios.get('status', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
}