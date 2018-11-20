import { getmaskList } from '../services';

export default {
  namespace: 'maskList',

  state: {
    list: {
      data: [],
    },
    treeNode: [],
  },

  effects: {
    * getmaskList({ payload }, { call, put }) {
      const response = yield call(getmaskList, payload);
      yield put({
        type: 'getmaskListR',
        payload: response,
      });
    },
  },

  reducers: {
    getmaskListR(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
