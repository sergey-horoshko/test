import request from '@/utils/request';

export function getProfile() {
  return request({
    url: '/profile/',
    method: 'get',
  });
}

export function logOut() {
  return request({
    url: '/auth/logout/',
    method: 'post',
  });
}
