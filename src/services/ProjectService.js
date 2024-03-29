import axios from '@/services/axios'
export default {
    index(token) {
        return axios.get('project', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    allProjectInfo(token) {
        return axios.get('project/admin/all', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    single(id, token) {
        return axios.get(`project/${id}`, {
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
    invite(invite, token) {
        return axios.get(`project/invite/${invite}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    multipleInvite(projectId, emails, token) {
        return axios.post(`project/invite`, {
            emails: emails,
            projectId: projectId
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    delete(id, token) {
        return axios.delete(`project/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    }
}