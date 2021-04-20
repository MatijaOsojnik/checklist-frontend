import axios from '@/services/axios'
export default {
    projects(token) {
        return axios.get('stats/projects', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
}