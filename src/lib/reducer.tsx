import { HYDRATE } from "next-redux-wrapper";
import { Action, combineReducers } from "redux";
import usersReducer from "./users/reducer";
import userReducer from "./user/reducer";
import { UserDraft } from "./user/action";
import { fileReducer } from "./file/reducer";
import { companyReducer } from "./company/reducer";

export interface RootStateType {
    user: any | null;
}

interface RootAction extends Action {
    type: string;
    payload?: UserDraft | null;
}

const initialRootState: RootStateType = {
    user: null,
};
const rootReducer = (
    state: any, //  = initialRootState,
    action: any
): RootStateType => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload,
            ...action.detail,
            ...action.file,
        };
    }
    return combineReducers({
        user: userReducer,
        file: fileReducer,
        users: usersReducer,
        company: companyReducer,
    })(state, action);
};
export default rootReducer;
