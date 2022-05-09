import {Action} from 'redux'
import {ErrorAction} from "../common/action";

// Signin
export const SIGNIN = 'userActions/SIGNIN';
export const SIGNIN_SUCCESS = 'userActions/SIGNIN_SUCCESS';
export const SIGNIN_FAILED = 'userActions/SIGNIN_FAILURE';

export const SIGNOUT = 'userActions/SIGNOUT';
export const LOAD_USER_FROM_LOCAL_STORAGE =
    'userActions/LOAD_USER_FROM_LOCAL_STORAGE';
export const INITIAL_LOAD_USER_DONE = 'userActions/INITIAL_LOAD_USER_DONE';

// Signup
export const SIGNUP = 'Signup/SIGNUP';
export const SIGNUP_SUCCESS = 'Signup/SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'Signup/SIGNUP_FAILED';

export const FORGOT_PASSWORD = 'userActions/FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'userActions/FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'userActions/FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD = 'userActions/RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'userActions/RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'userActions/RESET_PASSWORD_FAILED';

export const UPDATE_USER = 'userActions/UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'userActions/UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'userActions/UPDATE_USER_FAILED';

export const RESET_STATE = 'userActions/RESET_STATE';

export const SEARCH_USERS = 'userActions/SEARCH_USERS';
export const SEARCH_USERS_SUCCESS = 'userActions/SEARCH_USERS_SUCCESS';
export const SEARCH_USERS_FAILED = 'userActions/SEARCH_USERS_FAILED';

export const FETCH_USERS_FOR_SPECIFIC_ROLE = 'userActions/FETCH_USERS_SPECIFIC_TO_ROLE';
export const FETCH_USERS_FOR_SPECIFIC_ROLE_SUCCESS = 'userActions/FETCH_USERS_SPECIFIC_TO_ROLE_SUCCESS';
export const FETCH_USERS_FOR_SPECIFIC_ROLE_FAILED = 'userActions/FETCH_USERS_SPECIFIC_TO_ROLE_FAILED';

export const UPDATE_USER_ROLE = 'userActions/UPDATE_USER_ROLE';
export const UPDATE_USER_ROLE_SUCCESS = 'userActions/UPDATE_USER_ROLE_SUCCESS';
export const UPDATE_USER_ROLE_FAILED = 'userActions/UPDATE_USER_ROLE_FAILED';

export const FETCH_READERS = 'userActions/FETCH_READERS';
export const FETCH_READERS_SUCCESS = 'userActions/FETCH_READERS_SUCCESS';
export const FETCH_READERS_FAILED = 'userActions/FETCH_READERS_FAILED';

/**
 * User Object
 */
export interface User {
    roles: any[];
    [key: string]: any
}

/**
 * User Model for State
 */
export interface UserDraft {
    initialLoadUserDone: boolean,
    user?: User | null,
    token: string,
    signingUp: boolean;
    signupSuccess: boolean;
    signupFailed: boolean;
    message: any;
    createdUser: any;
    signingIn: boolean;
    signinSuccess: boolean;
    signinFailed: boolean;
    reseting: boolean,
    resetSuccess: boolean,
    resetFailed: boolean;
    resetFail: boolean,
    resetError: any,
}

export interface UserAction extends Action {
    type: string
    payload?: User
    error?: Error
}

export interface UserLoginType {
    email: string,
    password: string,
    rememberme: boolean,
    // type: string | null,
}

export const signIn = (data: UserLoginType): {
    type: string,
    detail: UserLoginType,
} => ({
    type: SIGNIN,
    detail: data,
})
export const signSuccess = (u: User): UserAction => ({
    type: SIGNIN_SUCCESS,
    payload: u
})
export const signFailed = (e: Error): UserAction => ({
    type: SIGNIN_FAILED,
    error: e
})
export const resetState = (): UserAction => ({
    type: RESET_STATE,
})

export const signOut = (): UserAction => ({
    type: SIGNOUT
})
/**
 * Load user from local storage,
 * called on app load
 */
export const loadUserFromLocalStorage = (): UserAction => ({
    type: LOAD_USER_FROM_LOCAL_STORAGE
});
/**
 * Initial load user done
 * @param user
 */
export const initialLoadUserDone = (user: User): UserAction => ({
    type: INITIAL_LOAD_USER_DONE,
    payload: user
});