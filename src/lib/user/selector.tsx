import {createSelector} from 'reselect';
import {User, UserDraft} from "./action";

export const selectUser = (state: any) => state.user;

export const makeSelectInitialLoadUserDone = () =>
    createSelector(selectUser, (userState: UserDraft) => userState.initialLoadUserDone);

export const makeSelectUserToken = () =>
    createSelector(selectUser, (userState: UserDraft) => {
        console.log('>>>>>>>>>>>>>>', userState);
        return userState.token;
    } );

// export const makeSelectUserToken = () =>
//     createSelector(selectUser, (userState: UserDraft) => userState.token);


export const makeSelectIsAuthenticated = () =>
    createSelector(selectUser, () => {
        return createSelector(selectUser, (userState: UserDraft) => !!userState.token);
    });
export const makeSelectUserRoles = () =>
    createSelector(selectUser, (userState: UserDraft) => {
        return userState.user ? userState.user.roles : [];
    });
// createSelector(selectUser, userState => userState.user?userState.user.roles:[],);

export const makeSelectBasicUser = () =>
    createSelector(selectUser, (userState: UserDraft) => {
        return userState.user;
        // return ({
        //     token: userState.token,
        //     ...userState.user,
        //     // permissions:.permissions
        // })
    });

export const makeSelectSignin = () =>
    createSelector(selectUser, (userState: UserDraft) => ({
        signingIn: userState.signingIn,
        signinSuccess: userState.signinSuccess,
        signinFailed: userState.signinFailed,
        message: userState.message,
        // roles:userState.user?userState.user.roles:[],
        user: userState.user,
    }));

export const makeSelectSignup = () =>
    createSelector(selectUser, (userState: UserDraft) => ({
        signingUp: userState.signingUp,
        signupSuccess: userState.signupSuccess,
        signupFailed: userState.signupFailed,
        message: userState.message,
        createdUser: userState.createdUser,
    }));

export const makeSelectForgot = () =>
    createSelector(selectUser, (userState: UserDraft) => ({
        reseting: userState.reseting,
        resetFail: userState.resetFail,
        resetSuccess: userState.resetSuccess,
        resetError: userState.resetError,
    }));
