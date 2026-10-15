import axios from  "axios"

const axiosInstance = axios.create({
    baseURL:"http://localhost:2026",
    withCredentials:true,
    headers:{
        'content-type':"application/json"
    }
})

export default axiosInstance;
