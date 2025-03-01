import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASEURL
import { useRouter } from 'vue-router'

import { useToast } from 'vue-toastification'

const toast = useToast()

/*
 Axios Interceptor to log user out
*/

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
   if (!error.response) {
     // Handle network error (e.g., no internet connection)
     toast.error('Network error: Please check your internet connection.', {
       timeout: 4000
     })
   } else if (error.response.status === 401) {
     // Handle unauthorized error
     toast.error(error.response.data.message, {
       timeout: 4000
     })
     localStorage.clear()
     useRouter.push('/access-denied')
   } 
   }
)
export default axios
