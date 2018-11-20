import { workDeskitemInfo } from '../services';

export default {
  namespace: 'workDeskStep',
  state: {
    productInfo: {
      data: {
        backCategoryInfoList: [],
        baseInfo: {},
        groupOtherAttributes: [],
        groupSkuAttributes: [],
        skuInfos: [],
      },
    },
  },

  effects: {
    * workDeskitemInfo({ payload }, { call, put }) {
      const response = yield call(workDeskitemInfo, payload);
      yield put({
        type: 'getworkDeskitemInfo',
        payload: response,
      });
    },
  },

  reducers: {
    getworkDeskitemInfo(state, action) {
      return {
        ...state,
        productInfo: action.payload,
      };
    },
  },
};
