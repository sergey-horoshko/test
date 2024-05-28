import request from '@/utils/request';

export function AuthRequest(data) {
  return request({
    url: '/login/',
    method: 'post',
    data,
  });
}
