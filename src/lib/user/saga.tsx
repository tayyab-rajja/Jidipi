import {
    initialLoadUserDone,
    LOAD_USER_FROM_LOCAL_STORAGE,
    signFailed,
    SIGNIN,
    SIGNOUT,
    signSuccess, User,
    UserDraft,
    UserLoginType
} from "./action";
import {all, ForkEffect, put, takeEvery, takeLatest} from "@redux-saga/core/effects";
import {POST} from "../common/api";
import {getJsonFromLocalStorage, removeFromLocalStorage, storeLocally} from "../common/localStorage";
import Cookies from "js-cookie";
import {GlobalUser} from "../../providers/UserProvider";



function* loadUserFromLocalStorage() {
    console.log("loadUserFromLocalStorage");
    const localUser: User = getJsonFromLocalStorage('user');
    GlobalUser.token= Cookies.get('token') ?? '';
    yield put(initialLoadUserDone(localUser));
}


function* signInSaga(data: {
    type: string,
    detail: UserLoginType,
}) {
    try {

        const res: UserDraft = yield POST('/user/login', data.detail);

        storeLocally('user', res.user);
        storeLocally('token', res.token);

        Cookies.set('token', res.token, {
            path: "/",
        });
        Cookies.set('user', JSON.stringify(res.user), {
            path: "/",
        });
        // useCookies("user", JSON.stringify(res.user), {
        //     path: "/",
        //     maxAge: 3600, // Expires after 1hr
        //     sameSite: true,
        // })
        if (res.user) yield put(signSuccess(res.user))
    } catch (err: any) {
        removeFromLocalStorage('user');
        removeFromLocalStorage('token');
        Cookies.remove('token');
        Cookies.remove('user');
        yield put(signFailed(err))
    }
}

function* signOutSaga() {
    removeFromLocalStorage('user');
    removeFromLocalStorage('token');
    Cookies.remove('token');
    Cookies.remove('user');
}

export function* userSaga(): Iterator<ForkEffect<never>> {
    yield takeLatest(LOAD_USER_FROM_LOCAL_STORAGE, loadUserFromLocalStorage);
    yield takeEvery(SIGNIN, signInSaga);
    yield takeEvery(SIGNOUT, signOutSaga);

}