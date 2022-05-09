import {all, AllEffect, ForkEffect} from "@redux-saga/core/effects";
import {userSaga} from "./user/saga";

function* rootSaga(): Iterator<
    AllEffect<Iterator<ForkEffect<never>, any, undefined>>
    > {

    yield all([
        userSaga()
    ])

}
export default rootSaga