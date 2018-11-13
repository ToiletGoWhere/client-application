export default {
    namespace: "navigator",

    state: {
        toiletContributeShow: false,
        toiletInfoShow: false,
        toiletOptionsShow: false,
        confirmToiletShow: false,
        reviewInputItemShow: false,
        showReviewList: false,
    },

    subscriptions: {
        setup({ dispatch, history }) {
            // eslint-disable-line
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            // eslint-disable-line
            yield put({ type: "save" });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        clear(state) {
            return {
                ...state,
                ...{
                    toiletContributeShow: false,
                    toiletInfoShow: false,
                    toiletOptionsShow: false,
                    confirmToiletShow: false,
                    reviewInputItemShow: false,
                    showReviewList: false,
                },
            };
        },
    },
};
