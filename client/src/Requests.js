import axios from 'axios';
import { API_URL } from './Config';
const USER_TOKEN = localStorage.getItem('token');
const BASE = new URL(API_URL);

const request = axios.create({
  baseURL: BASE.toLocaleString(),
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': USER_TOKEN
  }
}
);

const Requests = {
  post(endpoint, data) {
    return request.post(endpoint, data);
  }
}

export default Requests;