import axios from 'axios';
import Cookies from 'js-cookie';

export interface AxiosError {
  response?: {
    data: {
      message?: string;
    };
  };
}

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    Authorization: `Bearer ${Cookies.get('access_token')}`
  }
});

export default axiosClient;
