import axios from 'axios'
const api_url = import.meta.env.VITE_API_URL;
// console.log(api_url)
const axiosBase = axios.create({
  
    baseURL:api_url

})

export default axiosBase