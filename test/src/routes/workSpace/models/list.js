import { subCount, proCount, workTaskInfo } from '../services/list';

export default {
  namespace: 'workDesk',

  state: {
    subCount: {},
    proCount: {},
    dataSource: {},
  },

  effects: {
    * subCount({ payload }, { call, put }) {
      const response = yield call(subCount, payload);
      yield put({
        type: 'getsubCount',
        payload: response,
      });
    },
    * proCount({ payload }, { call, put }) {
      const response = yield call(proCount, payload);
      yield put({
        type: 'getproCount',
        payload: response,
      });
    },
    * workTaskInfo({ payload }, { call, put }) {
      const response = yield call(workTaskInfo, payload);
      yield put({
        type: 'getworkTaskInfo',
        payload: response,
      });
    },
  },

  reducers: {
    getsubCount(state, action) {
      return {
        ...state,
        subCount: action.payload,
      };
    },
    getproCount(state, action) {
      return {
        ...state,
        proCount: action.payload,
      };
    },
    getworkTaskInfo(state, action) {
      return {
        ...state,
        dataSource: action.payload,
      };
    },
  },
};
