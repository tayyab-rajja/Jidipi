/**
 *
 * https://b97201019.medium.com/next-%E4%BD%BF%E7%94%A8redux-saga%E7%AE%A1%E7%90%86%E9%9D%9E%E5%90%8C%E6%AD%A5%E8%A1%8C%E7%82%BA-313183714a78
 */
import rootReducer from "./reducer";
import rootSaga from "./saga";

import {applyMiddleware, combineReducers, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper, MakeStore } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
// redux/redux.d.ts
import { Task } from 'redux-saga'
import {fileReducer} from "./file/reducer";

declare module 'redux' {
    export interface Store {
        sagaTask: Task
    }
}
export const makeStore: MakeStore<any> = () => {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        combineReducers(
            {
                // rootReducer,
                file:fileReducer,
            }
        ),
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    )
    store.sagaTask = sagaMiddleware.run(rootSaga)
    return store
}
export const wrapper = createWrapper(makeStore, { debug: true })
