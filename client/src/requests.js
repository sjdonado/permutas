import { API_VERSION } from './config';

function request(path, method, token, data) {
  const params = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  };
  if (data) params.body = JSON.stringify(data);
  return fetch(`${API_VERSION}${path}`, params).then((res) => {
    console.log(res);
    if (res.status === 500) alert('Error en el servidor, intenta más tarde');
    // if (res.status === 400 || res.status === 401 || res.status === 403) alert('Permisos de administrador necesarios');
    return res.json();
  });
}

const Requests = {
  get(endpoint, token) {
    return request(endpoint, 'GET', token);
  },
  post(endpoint, token, data) {
    return request(endpoint, 'POST', token, data);
  },
  put(endpoint, token, data) {
    return request(endpoint, 'PUT', token, data);
  },
  delete(endpoint, token) {
    return request(endpoint, 'DELETE', token);
  },
}

export default Requests;