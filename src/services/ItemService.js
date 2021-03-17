import axios from '@/services/axios'
export default {
    allLists(parentItem, token) {
        return axios.post('item/all', {
            parentItem: parentItem
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    allItems(parentItem, token) {
        return axios.post('item/all', {
            parentItem: parentItem
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    single(id, token) {
        return axios.get(`item/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    postList(data, parentId, token) {
        return axios.post('item', {
            parentItem: parentId,
            title: data
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    postItem(data, parentId, token) {
        return axios.post('item', {
            parentItem: parentId,
            title: data
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    put(data, token) {
        return axios.put('item', data, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    },
    delete(id, token) {
        return axios.delete('item', id, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    }
}