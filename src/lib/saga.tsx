import {all, AllEffect, ForkEffect} from "@redux-saga/core/effects";
import {userSaga} from "./user/saga";
import {fileSaga} from "./file/saga";
import {fork} from "child_process";

function* rootSaga(): Iterator<
    AllEffect<Iterator<ForkEffect<never>, any, undefined>>
    > {

    yield all([
        userSaga(),
        fileSaga(),
    ])

}

// function* rootSaga () {
//     yield [
//         fork(fileSaga()), // saga1 can also yield [ fork(actionOne), fork(actionTwo) ]
//         // fork(saga2),
//     ];
// }
export default rootSaga


