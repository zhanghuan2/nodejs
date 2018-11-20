import { getInfo, getSPUTable1Info, getSPUTable2Info } from '../services';

export default {
  namespace: 'viewResult',

  state: {
    panel: {
      code: 200,
      data: {
        districts: [],
        categorys: [],
        channels: [],
        suppliers: [],
      },
    },
    table1: {
      data: {
        data: [],
      },
    },
    table2: {
      data: {
        data: [],
      },
    },
  },

  effects: {
    * getTableInfo({ payload }, { call, put }) {
      const response = yield call(getInfo, payload);
      yield put({
        type: 'getInfo',
        payload: response,
      });
    },
    * getinfoTablemsg({ payload }, { call, put }) {
      const response = yield call(getSPUTable1Info, payload);
      yield put({
        type: 'getSPUTable1',
        payload: response,
      });
    },
    * getinfoTablePrice({ payload }, { call, put }) {
      const response = yield call(getSPUTable2Info, payload);
      yield put({
        type: 'getSPUTable2',
        payload: response,
      });
    },
  },

  reducers: {
    getInfo(state, action) {
      return {
        ...state,
        panel: action.payload,
      };
    },
    getSPUTable1(state, action) {
      return {
        ...state,
        table1: action.payload,
      };
    },
    getSPUTable2(state, action) {
      return {
        ...state,
        table2: action.payload,
      };
    },
  },
};
