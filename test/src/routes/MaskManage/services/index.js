import { request } from 'doraemon';

export async function queryDetail() {
  return Promise.resolve({
    name: '蜗牛',
    email: 'chendeyu@cai-inc.com',
    mobile: '1234567',
    telphone: '400-322452435',
  });
}

export async function getInfo(params) {
  return request('/operating/inspection/result/get', {
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
export async function getSPUTable1Info(params) {
  return request('/operating/inspection/sku/attr/paging', {
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
export async function getSPUTable2Info(params) {
  return request('/operating/inspection/sku/price/paging', {
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
export async function getmaskList(params) {
  return request('/operating/inspection/task/paging', {
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
export async function treeList(params) {
  return request('/operating/common/category/top', {
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
export async function treequery(params) {
  return request('/operating/common/category/sub', {
    params: {
      ...params,
    },
  }).then((res) => {
    if (!res) {
      return {};
    }
    return res.data;
  });
}
export async function treeSearch(params) {
  return request('/operating/common/category/tree', {
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
export async function supplierList(params) {
  return request('/operating/common/supplier/list', {
    data: {
      ...params,
    },
    method: 'POST',
  }).then((res) => {
    if (!res) {
      return {};
    }
    return res.data;
  });
}
export async function saveForm(params) {
  return request('/operating/inspection/task/save', {
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
export async function getTotalServ(params) {
  return request('/operating/inspection/task/item/total', {
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
export async function getUserList(params) {
  return request('/operating/common/user/operator/list', {
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
export async function saveTask(params) {
  return request('/operating/inspection/task/sub/save', {
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
export async function cancelTask(params) {
  return request('/operating/inspection/task/cancel', {
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
export async function exportExl(params) {
  return request('/operating/inspection/result/export', {
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
export async function getModalDetail(params) {
  return request('/operating/inspection/task/detail', {
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
