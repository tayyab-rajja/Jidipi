import produce from "immer";

import {
    SEARCH_USERS,
    SEARCH_USERS_SUCCESS,
    FETCH_USERS_FOR_SPECIFIC_ROLE,
    FETCH_USERS_FOR_SPECIFIC_ROLE_SUCCESS,
    FETCH_USERS_FOR_SPECIFIC_ROLE_FAILED,
} from "./action";

// The initial state of the App
export const initialState = {
    fetchingUser: false,
    fetchUserSuccess: false,
    fetchingUserFailed: false,
    initialLoadUserDone: false,
    createdUser: null,
    usersList: [],
    pageNumberBack: -1,
    total: 0,
    statuses: {},
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action: any) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SEARCH_USERS:
                draft.usersList = [];
                break;
            case SEARCH_USERS_SUCCESS:
                break;

            case FETCH_USERS_FOR_SPECIFIC_ROLE:
                draft.fetchingUser = true;
                draft.fetchUserSuccess = false;
                draft.fetchingUserFailed = false;
                break;
            case FETCH_USERS_FOR_SPECIFIC_ROLE_SUCCESS:
                draft.fetchingUser = false;
                draft.fetchUserSuccess = true;
                draft.fetchingUserFailed = false;
                draft.usersList = action.result.users;
                draft.pageNumberBack = action.result.pageNumberBack;
                draft.total = action.result.total;
                draft.statuses = action.result.statuses;
                break;
            case FETCH_USERS_FOR_SPECIFIC_ROLE_FAILED:
                draft.fetchingUser = false;
                draft.fetchUserSuccess = false;
                draft.fetchingUserFailed = true;
                break;
        }
    });

export default userReducer;
