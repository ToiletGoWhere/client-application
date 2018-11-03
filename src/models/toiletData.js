export default {
  namespace: "toiletData",

  state: {
    login: false,
    gender: "male",
    floor: "0",
    currentLocation: { lat: "", lng: "" },
    currentToiletSelected: {},
    toiletList: [],
    reviewList: [],
    currentRating: "",
    currentReview: ""
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
