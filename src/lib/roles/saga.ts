// eslint-disable-next-line no-unused-vars

import {
    call,
    put,
    select,
    takeLatest,
    // eslint-disable-next-line no-unused-vars
    takeEvery,
    all,
} from "redux-saga/effects";

import request from "src/utils/request";
import { makeSelectUserToken } from "src/lib/user/selector";

import {
    FETCH_PERMISSIONS,
    fetchPermissionsSuccess,
    fetchPermissionsFailed,
    FETCH_ROLES,
    fetchRolesSuccess,
    fetchRolesFailed,
    CREATE_ROLE,
    createRoleSuccess,
    createRoleFailed,
    CREATE_PERMISSIONS,
    createPermissionSuccess,
    createPermissionFailed,
    UPDATE_ROLE,
    updateRoleSuccess,
    updateRoleFailed,
    deleteRoleFailed,
    deleteRoleSuccess,
    DELETE_ROLE,
} from "./action";

// eslint-disable-next-line no-unused-vars
function* fetchRoles(action: any): Generator<any, any, any> {
    const url = `roles`;
    const authToken = yield select(makeSelectUserToken());
    try {
        const response = yield call(request, url, authToken, {});
        yield put(fetchRolesSuccess(response.roles, response.permissions));
    } catch (err) {
        yield put(fetchRolesFailed(err));
    }
}

// eslint-disable-next-line no-unused-vars
function* fetchPermissions(action: any): Generator<any, any, any> {
    const url = `permissions`;
    const authToken = yield select(makeSelectUserToken());
    try {
        const response = yield call(request, url, authToken, {});
        yield put(fetchPermissionsSuccess(response.pageFolders));
    } catch (err) {
        yield put(fetchPermissionsFailed(err));
    }
}

function* createRole(action: any): Generator<any, any, any> {
    const authToken = yield select(makeSelectUserToken());
    const url = `roles`;
    const requestOptions = {
        method: "POST",
        body: JSON.stringify(action.details),
    };

    try {
        const response = yield call(request, url, authToken, requestOptions);
        yield put(createRoleSuccess(response.role));
    } catch (err) {
        yield put(createRoleFailed(err));
    }
}

function* updateRole(action: any): Generator<any, any, any> {
    const authToken = yield select(makeSelectUserToken());
    const url = `roles/${action.id}`;
    const requestOptions = {
        method: "PUT",
        body: JSON.stringify(action.details),
    };

    try {
        const response = yield call(request, url, authToken, requestOptions);
        yield put(updateRoleSuccess(response.role));
    } catch (err) {
        yield put(updateRoleFailed(err));
    }
}
function* deleteRole(action: any): Generator<any, any, any> {
    const authToken = yield select(makeSelectUserToken());
    const url = `roles/${action.id}`;
    const requestOptions = {
        method: "DELETE",
    };
    try {
        yield call(request, url, authToken, requestOptions);
        yield put(deleteRoleSuccess(action.id));
    } catch (err) {
        yield put(deleteRoleFailed(err));
    }
}

function* createPermission(action: any): Generator<any, any, any> {
    const authToken = yield select(makeSelectUserToken());
    const url = `permissions`;
    const requestOptions = {
        method: "POST",
        body: JSON.stringify(action.details),
    };

    try {
        const response = yield call(request, url, authToken, requestOptions);

        yield put(createPermissionSuccess(response.pageFolder));
    } catch (err) {
        yield put(createPermissionFailed(err));
    }
}

export default function* rolesSaga() {
    yield all([
        takeLatest(FETCH_ROLES, fetchRoles),
        takeLatest(FETCH_PERMISSIONS, fetchPermissions),
        takeLatest(CREATE_ROLE, createRole),
        takeLatest(CREATE_PERMISSIONS, createPermission),
        takeLatest(UPDATE_ROLE, updateRole),
        takeLatest(DELETE_ROLE, deleteRole),
    ]);
}
