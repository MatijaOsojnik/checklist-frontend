import axios from '@/services/axios'

export default {
    index() {
        return axios.get('projects')
    },
    post(data) {
        return axios.post('projects', data)
    },
    put(data) {
        return axios.put('projects', data)
    },
    delete(id) {
        return axios.delete('projects', id)
    }
}