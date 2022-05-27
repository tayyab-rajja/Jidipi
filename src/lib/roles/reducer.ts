import produce from "immer";

import {
    FETCH_ROLES,
    FETCH_ROLES_SUCCESS,
    FETCH_ROLES_FAILED,
    FETCH_PERMISSIONS,
    FETCH_PERMISSIONS_SUCCESS,
    FETCH_PERMISSIONS_FAILED,
    CREATE_PERMISSIONS,
    CREATE_ROLE,
    CREATE_ROLE_FAILED,
    CREATE_ROLE_SUCCESS,
    CREATE_PERMISSIONS_SUCCESS,
    CREATE_PERMISSIONS_FAILED,
    UPDATE_ROLE,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_FAILED,
    DELETE_ROLE,
    DELETE_ROLE_SUCCESS,
    DELETE_ROLE_FAILED,
} from "./action";

export const initialState = {
    roles: [],
    role: null,
    fetching: false,
    fetchSuccess: false,
    fetchFailed: false,
    statusText: null,
    submitting: false,
    createSuccess: false,
    createFailed: false,
    createError: "",
    permissions: [],
};

/* eslint-disable default-case, no-param-reassign */
const foldersReducer = (state = initialState, action: any) =>
    // eslint-disable-next-line consistent-return

    produce(state, (draft) => {
        switch (action.type) {
            case FETCH_ROLES:
                draft.fetching = true;
                draft.fetchSuccess = false;
                draft.fetchFailed = false;
                draft.roles = [];
                break;

            case FETCH_ROLES_SUCCESS:
                draft.fetching = false;
                draft.fetchSuccess = true;
                draft.fetchFailed = false;
                draft.roles = action.roles;
                draft.permissions = action.permissions;
                break;

            case FETCH_ROLES_FAILED:
                draft.fetching = false;
                draft.fetchSuccess = false;
                draft.fetchFailed = true;
                draft.statusText = action.statusText;
                break;

            case CREATE_ROLE:
                draft.submitting = true;
                draft.createFailed = false;
                draft.createSuccess = false;
                draft.createError = "";
                break;
            case CREATE_ROLE_SUCCESS:
                draft.submitting = false;
                draft.createFailed = false;
                draft.createSuccess = true;
                draft.roles.push(action.role as never);

                draft.createError = "";
                break;
            case CREATE_ROLE_FAILED:
                draft.submitting = false;
                draft.createFailed = true;
                draft.createSuccess = false;
                draft.createError = action.error;
                break;
            case UPDATE_ROLE:
                draft.submitting = true;
                draft.createFailed = false;
                draft.createSuccess = false;
                draft.createError = "";
                break;
            case UPDATE_ROLE_SUCCESS:
                draft.submitting = false;
                draft.createFailed = false;
                draft.createSuccess = true;
                draft.roles = draft.roles.map((role: any) => {
                    if (role._id === action.role._id) {
                        role = { ...action.role };
                    }
                    return role;
                }) as never[];
                draft.createError = "";
                break;
            case UPDATE_ROLE_FAILED:
                draft.submitting = false;
                draft.createFailed = true;
                draft.createSuccess = false;
                draft.createError = action.error;
                break;
            case DELETE_ROLE:
                draft.submitting = true;
                draft.createFailed = false;
                draft.createSuccess = false;
                draft.createError = "";
                break;
            case DELETE_ROLE_SUCCESS:
                draft.submitting = false;
                draft.createFailed = false;
                draft.createSuccess = true;
                draft.roles = draft.roles
                    .filter((role: any) => role._id !== action.id)
                    .map((role) => {
                        return role;
                    });
                draft.createError = "";
                break;
            case DELETE_ROLE_FAILED:
                draft.submitting = false;
                draft.createFailed = true;
                draft.createSuccess = false;
                draft.createError = action.err;
                break;

            case FETCH_PERMISSIONS:
                break;
            case FETCH_PERMISSIONS_SUCCESS:
                break;
            case CREATE_PERMISSIONS_SUCCESS:
                break;
        }
    });

export default foldersReducer;
