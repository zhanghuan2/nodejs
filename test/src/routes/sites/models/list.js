import { queryList } from '../services';

export default {
  namespace: 'siteManger',

  state: {
    list: [],
  },

  effects: {
    * getCollect({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'priceList',
        payload: response,
      });
    },
  },

  reducers: {
    priceList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
