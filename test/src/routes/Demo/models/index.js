import { queryDetail } from '../services';

export default {
  namespace: 'demoDetail',

  state: {
    orderInfo: {},
  },

  effects: {
    * getOrderInfo({ payload }, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'queryDetail',
        payload: response,
      });
    },
  },

  reducers: {
    queryDetail(state, action) {
      return {
        ...state,
        orderInfo: Object.assign(state.orderInfo, action.payload),
      };
    },
  },
};
