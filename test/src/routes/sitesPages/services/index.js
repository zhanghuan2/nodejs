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
  return request('/decorate/decorate/site/search', {
    data: {
      ...params,
    },
    method: 'POST',
  }).then((res) => {
    if (!res.success) {
      return [];
    }
    const arr = res.data.data.map((item, index) => {
      return {
        ...item,
        key: index,
        index: index + 1,
      };
    });
    return {
      total: res.data.total,
      data: arr,
    };
  });
}
export async function getChildDiscode(params) {
  return request('/operating/common/district/sub', {
    params: {
      ...params,
    },
  }).then((res) => {
    if (!res) {
      return {};
    }
    return res;
  });
}
export async function create(params) {
  return request('/decorate/decorate/site/create', {
    params: {
      ...params,
    },
    method: 'POST',
  }).then((res) => {
    if (!res) {
      return {};
    }
    return res;
  });
}
export async function getDiscode(params) {
  return request('/operating/common/district/top', {
    params: {
      ...params,
    },
  }).then((res) => {
    if (!res) {
      return {};
    }
    return res;
  });
}
