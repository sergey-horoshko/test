import request from '@/utils/request';

export function resetPassword(data) {
  return request({
    url: '/password/email/',
    method: 'post',
    data,
  });
}

export function changePassword(data) {
  return request({
    url: '/password/reset',
    method: 'post',
    data,
  });
}
