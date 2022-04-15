import {HYDRATE} from "next-redux-wrapper";
import {Action, AnyAction, combineReducers} from "redux";
import userReducer, {UserStateType} from "./user/reducer";
import {UserDraft} from "./user/action";

export interface RootStateType {
    user: UserStateType | null,
}

interface RootAction extends Action {
    type: string
    payload?: UserDraft | null,
}

const initialRootState: RootStateType = {
    user: null
}
const rootReducer = (
    state:any , //  = initialRootState,
    action: any
): RootStateType => {
    if (action.type === HYDRATE) {
        return {...state, ...action.payload}
    }
    return combineReducers({user: userReducer})(state, action)
}
export default rootReducer