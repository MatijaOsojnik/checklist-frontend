import axios from 'axios'
let baseurl = ''
if(process.env.NODE_ENV === 'production'){
    baseurl = 'https://checky-backend.herokuapp.com/api'
}else {
    baseurl = 'http://localhost:5000/api'
}

const axiosInstance = axios.create({
    baseURL: baseurl,
    timeout: 10000
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('checklist-jwt') || ''
    console.log(token)
    if (token) {
        config.headers.Authorization = `JWT ${token}`
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

export default axiosInstance

// export default() => {
//     return axios.create({
//         baseURL: `http://localhost:8082/`
//     })
// }