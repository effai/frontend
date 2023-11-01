import axios from 'axios';

export interface AxiosError {
  response?: {
    data: {
      message?: string;
    };
  };
}

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});

export default axiosClient;
