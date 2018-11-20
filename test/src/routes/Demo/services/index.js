import { request } from 'doraemon';

export async function queryDetail() {
  return Promise.resolve({
    name: '蜗牛',
    email: 'chendeyu@cai-inc.com',
    mobile: '1234567',
    telphone: '400-322452435',
  });
}

export async function queryList(params) {
  return request('/api/test', {
    params: {
      ...params,
    },
  }).then((res) => {
    if (!res) {
      return [];
    }
    return res.map((item, index) => {
      return {
        ...item,
        key: index,
      };
    });
  });
}
