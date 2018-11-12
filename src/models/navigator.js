export default {
    namespace: "navigator",

    state: {
        toiletContributeShow: false,
        toiletInforShow: false,
        toiletOptionsShow: true,
        confirmToiletShow: false,
        reviewInputItemShow: false,
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
    },
};
