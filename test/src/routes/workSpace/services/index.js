import { request } from 'doraemon';

export async function queryDetail() {
  return Promise.resolve({
    name: '蜗牛',
    email: 'chendeyu@cai-inc.com',
    mobile: '1234567',
    telphone: '400-322452435',
  });
}

export async function workDeskitemInfo(params) {
  return request('/operating/inspection/bench/next/item/info', {
    params: {
      ...params,
    },
  }).then((res) => {
    if (!res) {
      return [];
    }
    return res;
  });
}
export async function getRullOption(params) {
  return request('/operating/inspection/bench/violation/rule/list', {
    params: {
      ...params,
    },
  }).then((res) => {
    if (!res) {
      return [];
    }
    return res;
  });
}
export async function saveData(params) {
  return request('/operating/inspection/bench/task/save', {
    data: {
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
export async function screenshot(params) {
  return request('/node/nodeTool/screenShot', {
    params: {
      ...params,
    },
    method: 'GET',
  }).then((res) => {
    if (!res) {
      return {};
    }
    return res;
  });
}
