import {
    call,
    put,
    select,
    takeLatest,
    takeEvery,
    all,
} from "redux-saga/effects";
import { makeSelectUserToken } from "src/lib/user/selector";

import request from "src/utils/request";

import {
    UPDATE_USER,
    updateUserSuccess,
    updateUserFailed,
    SEARCH_USERS,
    searchUsersSuccess,
    searchUsersFailed,
    UPDATE_USER_ROLE,
    updateUserRoleSuccess,
    updateUserRoleFailed,
    FETCH_USERS_FOR_SPECIFIC_ROLE,
    fetchUsersForSpecificRoleSuccess,
    fetchUsersForSpecificRoleFailed,
} from "./action";

import { getQueryString } from "src/utils/queryString";

function* updateUser(action: any): Generator<any> {
    const requestUrl = `user/${action.id || action.details._id}`;
    const authToken = yield select(makeSelectUserToken());

    const requestOptions = {
        method: "PUT",
        body: JSON.stringify(action.details),
    };
    try {
        const user: any = yield call(
            request,
            requestUrl,
            authToken,
            requestOptions
        );
        yield put(updateUserSuccess(user.user));
    } catch (err) {
        yield put(updateUserFailed(err));
    }
}

function* updateUserRole(action: any): Generator {
    const requestUrl = `user/${action.id}/modifyRole`;
    const authToken = yield select(makeSelectUserToken());

    const requestOptions = {
        method: "PUT",
        body: JSON.stringify({ masterRoleId: action.masterRoleId }),
    };
    try {
        const user: any = yield call(
            request,
            requestUrl,
            authToken,
            requestOptions
        );
        yield put(updateUserRoleSuccess(user.user));
    } catch (err) {
        yield put(updateUserRoleFailed(err));
    }
}

function* searchUsers(action: any): Generator {
    const url = `user/filterByParams?searchKey=${action.searchKey}&pageSize=${action.pageSize}&pageNumber=${action.pageNumber}`;
    const authToken = yield select(makeSelectUserToken());
    try {
        const response: any = yield call(request, url, authToken, {});
        yield put(searchUsersSuccess(response.masterRoles));
    } catch (err) {
        yield put(searchUsersFailed(err));
    }
}

function* fetchUsersForSpecificRole(action: any): Generator {
    // const { pageSize = 50, pageNumber = 0, role } = action.filters;
    // const url = `user/filterByParams?pageSize=${pageSize}&pageNumber=${pageNumber}&${role}=true`;
    const role = action.role;
    let url = `user/filterByParams?${role}=true`;
    if (action.filters) {
        Object.entries(action.filters).forEach(([key, value]) => {
            url += `&${key}=${value}`;
        });
    }
    const authToken = yield select(makeSelectUserToken());
    try {
        const response: any = yield call(request, url, authToken, {});
        const { users, total, pageNumberBack, statuses } = response;
        yield put(
            fetchUsersForSpecificRoleSuccess({
                users,
                total,
                pageNumberBack,
                statuses,
            })
        );
    } catch (err) {
        yield put(fetchUsersForSpecificRoleFailed(err));
    }
}

export default function* userSaga() {
    yield all([
        takeLatest(UPDATE_USER, updateUser),
        takeLatest(SEARCH_USERS, searchUsers),
        takeLatest(UPDATE_USER_ROLE, updateUserRole),
        takeLatest(FETCH_USERS_FOR_SPECIFIC_ROLE, fetchUsersForSpecificRole),
    ]);
}
