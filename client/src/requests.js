import axios from 'axios';
import { API_URL } from './Config';
const BASE = new URL(API_URL);

function authorization(token) {
  console.log('TOKEN', token);
  return axios.create({
    baseURL: BASE.toLocaleString(),
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': token
    }
  });
}

const Requests = {
  get(endpoint, token) {
    return authorization(token).get(endpoint);
  },
  post(endpoint, token, data) {
    return authorization(token).post(endpoint, data);
  },
  put(endpoint, token, data) {
    return authorization(token).put(endpoint, data);
  },
  delete(endpoint, token) {
    return authorization(token).delete(endpoint);
  },
}

export default Requests;