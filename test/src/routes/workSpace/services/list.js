import { request } from 'doraemon';

export async function subCount() {
  return request('/operating/inspection/bench/task/sub/count').then((res) => {
    if (!res.success) {
      return {};
    }
    return res;
  });
}
export async function proCount() {
  return request('/operating/inspection/bench/task/item/count').then((res) => {
    if (!res.success) {
      return {};
    }
    return res;
  });
}
export async function workTaskInfo(params) {
  return request('/operating/inspection/bench/task/info', {
    params: {
      ...params,
    },
  }).then((res) => {
    if (!res.success) {
      return {};
    }
    return res;
  });
}
