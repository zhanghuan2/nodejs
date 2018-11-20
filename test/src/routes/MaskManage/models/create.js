import { treeList, treequery } from '../services';

export default {
  namespace: 'createTask',

  state: {
    data: {},
    treeNode: [],
  },

  effects: {
    * gettreeList({ payload }, { call, put }) {
      const response = yield call(treeList, payload);
      yield put({
        type: 'gettreeListR',
        payload: response,
      });
    },
    * gettreeListdown({ payload }, { call, put }) {
      const response = yield call(treequery, payload);
      yield put({
        type: 'gettreeListR',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    gettreeListR(state, action) {
      return {
        ...state,
        treeNode: action.payload,
      };
    },
  },
};
