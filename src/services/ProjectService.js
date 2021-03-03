import axios from '@/services/axios'
export default {
    index(token) {
        return axios.get('project', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    post(data, token) {
        return axios.post('project', data, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    put(data, token) {
        return axios.put('project', data, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    delete(id, token) {
        return axios.delete('project', id, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    }
}