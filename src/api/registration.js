import request from '@/utils/request';

export function RegistrationRequest(data) {
  return request({
    url: '/register/',
    method: 'post',
    data,
  });
}
