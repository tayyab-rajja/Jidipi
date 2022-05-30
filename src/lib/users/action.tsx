export const UPDATE_USER = "userActions/UPDATE_USER";
export const UPDATE_USER_SUCCESS = "userActions/UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "userActions/UPDATE_USER_FAILED";

export const SEARCH_USERS = "userActions/SEARCH_USERS";
export const SEARCH_USERS_SUCCESS = "userActions/SEARCH_USERS_SUCCESS";
export const SEARCH_USERS_FAILED = "userActions/SEARCH_USERS_FAILED";

export const FETCH_USERS_FOR_SPECIFIC_ROLE =
    "userActions/FETCH_USERS_SPECIFIC_TO_ROLE";
export const FETCH_USERS_FOR_SPECIFIC_ROLE_SUCCESS =
    "userActions/FETCH_USERS_SPECIFIC_TO_ROLE_SUCCESS";
export const FETCH_USERS_FOR_SPECIFIC_ROLE_FAILED =
    "userActions/FETCH_USERS_SPECIFIC_TO_ROLE_FAILED";

export const UPDATE_USER_ROLE = "userActions/UPDATE_USER_ROLE";
export const UPDATE_USER_ROLE_SUCCESS = "userActions/UPDATE_USER_ROLE_SUCCESS";
export const UPDATE_USER_ROLE_FAILED = "userActions/UPDATE_USER_ROLE_FAILED";


export function updateUser(details: any, id: any) {
    return {
        type: UPDATE_USER,
        details,
        id,
    };
}

export function updateUserSuccess(user: any) {
    return {
        type: UPDATE_USER_SUCCESS,
        user,
    };
}

export function updateUserFailed(error: any) {
    return {
        type: UPDATE_USER_FAILED,
        error,
    };
}

export function searchUsers(searchKey: any, pageSize: any, pageNumber: any) {
    return {
        type: SEARCH_USERS,
        searchKey,
        pageSize,
        pageNumber,
    };
}

export function searchUsersSuccess(user: any) {
    return {
        type: SEARCH_USERS_SUCCESS,
        user,
    };
}

export function searchUsersFailed(error: any) {
    return {
        type: SEARCH_USERS_FAILED,
        error,
    };
}

export function fetchUsersForSpecificRole(role: any, filters: any) {
    return {
        type: FETCH_USERS_FOR_SPECIFIC_ROLE,
        role,
        filters,
    };
}

export function fetchUsersForSpecificRoleSuccess(result: any) {
    return {
        type: FETCH_USERS_FOR_SPECIFIC_ROLE_SUCCESS,
        result,
    };
}

export function fetchUsersForSpecificRoleFailed(error: any) {
    return {
        type: FETCH_USERS_FOR_SPECIFIC_ROLE_FAILED,
        error,
    };
}

export function updateUserRole(id: any, masterRoleId: any) {
    return {
        type: UPDATE_USER_ROLE,
        masterRoleId,
        id,
    };
}

export function updateUserRoleSuccess(user: any) {
    return {
        type: UPDATE_USER_ROLE_SUCCESS,
        user,
    };
}

export function updateUserRoleFailed(error: any) {
    return {
        type: UPDATE_USER_ROLE_FAILED,
        error,
    };
}

