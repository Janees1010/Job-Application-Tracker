import axios from "axios"

const axiosInstace = axios.create({
     baseURL:"http://localhost:3001"
})


export default axiosInstace