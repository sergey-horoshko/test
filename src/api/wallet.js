import request from '@/utils/request';

export function changeWallets(data) {
  return request({
    url: '/wallets',
    method: 'post',
    data,
  });
}
