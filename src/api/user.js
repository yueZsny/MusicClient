import { request } from '../utils/request';

export const userInfo = function () {
  request.get('/api/users').then(res => {
    console.log(res.data);
    return res.data;
  })
}

export const postUser = (data) => {
  return request.post('/api/postUsers', data).then(res => {
    console.log(res.data);
    return res.data;
  })
}

export const loginUser = (data) => {
  return request.post('/api/login', data).then(res => {
    console.log(res.data);
    return res.data;
  })
}
