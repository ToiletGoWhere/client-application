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
                distance: 40,
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
                distance: 51.33959128443111,
            },
        ],
        reviewList: [
            {
                _id: "5be68c721b93089ddf1772ea",
                toilet: "5be12c031dcb7e2ad6921d39",
                user: {
                    username: "user 1",
                    _id: "5be1217958da78269cff3d46",
                    email: "zhibinyu97@gmail.com",
                    avatar: "data:image/png;base64,iVBORw0KGgoAA...",
                },
                content: "It's good",
                rating: 5,
                __v: 0,
            },
            {
                _id: "5be68c7d1b93089ddf1772eb",
                toilet: "5be12c031dcb7e2ad6921d39",
                user: {
                    username: "user 1",
                    _id: "5be1217958da78269cff3d46",
                    email: "zhibinyu97@gmail.com",
                    avatar: "data:image/png;base64,iVBORw0...",
                },
                content: "It's not good",
                rating: 2.5,
                __v: 0,
            },
        ],
        currentRating: "",
        currentReview: "",
        //currentReviewList: [],
        markerList: [],
        updatedResults: false,
    },
=======
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
>>>>>>> 513c8d80e98f140ced56c91cd7545155fb29e561

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
