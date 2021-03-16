import axios from 'axios'
import {authHeader} from '@/_helpers/auth-header';

export default () => {
  const axio = axios.create({
    baseURL: window.config.site_api,
    withCredentials: false,
    headers: authHeader()    
  })

  return axio;
}