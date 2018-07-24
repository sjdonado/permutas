import axios from 'axios';
import { API_URL } from './Config';
const BASE = new URL(API_URL);

const request = axios.create({
  baseURL: BASE.toLocaleString(),
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': localStorage.getItem('token')
  }
}
);

const Requests = {
  get(endpoint) {
    return request.get(endpoint);
  },
  post(endpoint, data) {
    return request.post(endpoint, data);
  },
  put(endpoint, data) {
    return request.put(endpoint, data);
  },
  delete(endpoint) {
    return request.delete(endpoint);
  },
}

export default Requests;