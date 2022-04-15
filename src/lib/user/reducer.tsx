import {
    INITIAL_LOAD_USER_DONE,
    RESET_STATE,
    SIGNIN,
    SIGNIN_FAILED,
    SIGNIN_SUCCESS, SIGNOUT,
    UserAction,
    UserDraft
} from "./action";
import produce, {enableES5} from "immer";
import {ErrorAction} from "../common/action";


const initialState: UserDraft =
    {
        createdUser: undefined,
        initialLoadUserDone: false,
        message: undefined,
        resetError: undefined,
        resetFail: false,
        resetFailed: false,
        resetSuccess: false,
        reseting: false,
        signinFailed: false,
        signinSuccess: false,
        signingIn: false,
        signingUp: false,
        signupFailed: false,
        signupSuccess: false,
        token: "",
        user: null
    }
// const userReducer =
//     (state: UserStateType = initialState,
//      action: UserAction):   UserStateType => {
//         switch (action.type) {
//             case HYDRATE:
//                 // Attention! This will overwrite client state! Real apps should use proper reconciliation.
//                 return {...state, ...action.payload};
//             case SIGNIN_SUCCESS:
//                 return {...state, user: action.payload};
//             default:
//                 return state;
//         }
//     };
// export default userReducer;
// https://lukeliutingchun.medium.com/next-js-setting-up-a-redux-store-with-combinereducers-615b30e4432d
// const initialState = {
//     user: null
// }
const userReducer = (state = initialState, action: UserAction) =>
  produce(state, (draft:UserDraft) => {
       switch (action.type) {
           case SIGNIN:
               draft.signingIn = true;
               draft.signinSuccess = false;
               draft.signinFailed = false;
               break;

           case SIGNIN_SUCCESS:
               draft.signingIn = false;
               draft.signinSuccess = true;
               draft.signinFailed = false;
               // Add all properties of the signin response to the root level of state
               // if (action.payload) Object.assign(draft, action.payload);

               if (action.payload) draft.user = action.payload;
                   // Object.assign(draft, action.payload);
               // console.log("signin success", draft.user);
               break;
           case SIGNIN_FAILED:
               draft.signingIn = false;
               draft.signinSuccess = false;
               draft.signinFailed = true;
               if (action.error) draft.message = action.error.message;
               break;
           case RESET_STATE:
               draft.signingIn = false;
               draft.signinSuccess = false;
               draft.signinFailed = false;
               draft.message = null;
               draft.signingUp = false;
               draft.createdUser = null;
               draft.reseting = false;
               draft.resetFail = false;
               draft.resetSuccess = false;
               draft.resetError = '';
               break;
           case INITIAL_LOAD_USER_DONE:
               draft.initialLoadUserDone = true;
               if (action.payload)  draft.user= action.payload;
               break;

           case SIGNOUT:
               // Object.assign(draft, initialState);
               draft.initialLoadUserDone = true;

           default:
               break;
       }
    })


// const userReducer = (state = initialState, action: UserAction): UserStateType => {
//
//         switch (action.type) {
//             case SIGNIN_SUCCESS:
//                 console.log("userReducer: SIGNIN_SUCCESS", {...state, ...action.payload});
//                 return {
//                     ...state,
//                     user: action.payload
//                 }
//             default:
//                 return state
//         }
//
// }
export default userReducer;