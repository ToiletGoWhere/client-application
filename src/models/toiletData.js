export default {
  namespace: "toiletData",

  state: {
    login: false,
    currentUser: {},
    gender: "",
    floor: "0",
    currentLocation: { lat: "", lng: "" },
    currentToiletSelected: {},
    currentLocationSelected: { lat: "", lng: "" },
    toiletList: [
      {
        location: [1.29115, 103.78185, 2],
        confirmed: false,
        vote: 0,
        rating: 0,
        numFeedback: 0,
        _id: "5be12b5d919a102aa56ad713",
        toiletType: "male",
        __v: 0,
        distance: 40
      },
      {
        location: [1.29125, 103.78187, 1],
        confirmed: true,
        vote: 5,
        rating: 5.666666666666667,
        numFeedback: 3,
        _id: "5be12c031dcb7e2ad6921d39",
        toiletType: "female",
        __v: 0,
        distance: 51.33959128443111
      }
    ],
    reviewList: [],
    currentRating: "",
    currentReview: "",
    //currentReviewList: [],
    markerList: [],
    updatedResults: false
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
