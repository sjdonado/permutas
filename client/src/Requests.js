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
  post(endpoint, data) {
    return request.post(endpoint, data);
  },
  get(endpoint) {
    return request.get(endpoint);
  }
}

export default Requests;