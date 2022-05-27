/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import produce from "immer";

import {
    FETCH_COMPANIES,
    FETCH_COMPANIES_SUCCESS,
    FETCH_GROUPS,
    FETCH_GROUPS_SUCCESS,
    CREATE_COMPANY_SUCCESS,
    UPDATE_COMPANY_SUCCESS,
    UPDATE_STATUS,
    FETCH_COMPANY,
    FETCH_COMPANY_SUCCESS,
    FETCH_ABOUT,
    FETCH_ABOUT_SUCCESS,
    DELETE_COMPANY_SUCCESS,
    FETCH_USERS_SUCCESS,
    CREATE_USER_SUCCESS,
    CREATE_USER,
    FETCH_PAGES_SUCCESS,
    CLEAR_COMPANY,
    FETCH_COUNTRIES_SUCCESS,
    UPDATE_COMPANY,
    UPDATE_COMPANY_EDIT,
} from "./actions";

export const initialState = {
    list: [],
    fetching: false,
    fetchSuccess: false,
    fetchFailed: false,
    statusText: null,
    groups: [],
    statuses: {
        all: 0,
        mine: 0,
        trash: 0,
        draft: 0,
        finished: 0,
        deactivated: 0,
        published: 0,
        scheduled: 0,
    },
    createSuccess: false,
    company: null,
    about: null,
    users: [],
    posts: [],
    pageFolders: [],
    pageList: [],
    total: 0,
    countries: [],
    pageNumberNew: 0,
    updateAction: null,
    pageNumberBack: 0,
    createdUser: null,
    submitting: false,
    createFailed: false,
    createError: "",
};

/* eslint-disable default-case, no-param-reassign */
export const companyReducer = (state = initialState, action: any) =>
    // eslint-disable-next-line consistent-return
    produce(state, (draft) => {
        switch (action.type) {
            case FETCH_COMPANIES:
                if (!action.filters.reload) {
                    draft.fetching = true;
                    draft.fetchSuccess = false;
                    draft.fetchFailed = false;
                    draft.list = [];
                }
                break;

            case FETCH_COMPANIES_SUCCESS:
                draft.fetching = false;
                draft.fetchSuccess = true;
                draft.fetchFailed = false;
                draft.list = action.details.companies.reverse();
                draft.statuses = action.details.statuses;
                draft.total = action.details.total;
                draft.pageNumberBack = action.details.pageNumberBack;
                break;

            case DELETE_COMPANY_SUCCESS:
                draft.list = draft.list.filter(
                    (f: any) => f._id !== action.company._id
                );
                break;
            case FETCH_GROUPS:
                draft.groups = [];
                break;
            case FETCH_GROUPS_SUCCESS:
                draft.groups = action.groups;
                break;
            case FETCH_COMPANY:
                draft.fetching = true;
                draft.company = null;
                break;

            case CREATE_COMPANY_SUCCESS:
                draft.fetching = false;
                draft.createSuccess = true;
                draft.company = action.company;

                break;

            case FETCH_COMPANY_SUCCESS:
                draft.company = action.company;
                draft.pageFolders = action.pageFolders
                    ? action.pageFolders.map((m: any) => {
                          const count = action.posts.find(
                              (p: any) => p._id === m._id
                          );
                          return {
                              ...m,
                              count: count ? count.count : 0,
                          };
                      })
                    : [];
                break;

            case UPDATE_STATUS:
                draft.createSuccess = false;
                draft.createdUser = null;
                // draft.company = null;
                break;
            case UPDATE_COMPANY:
                // Reset to empty before send, then update success setup the action can get music even it's repeat click.
                draft.updateAction = null;
                break;
            case UPDATE_COMPANY_SUCCESS:
                draft.list = draft.list.map((company: any) =>
                    company._id === action.company._id
                        ? { ...company, ...action.company }
                        : company
                ) as never[];

                if (action.action !== undefined && action.action !== "") {
                    draft.updateAction = action.action;
                }
                break;
            case UPDATE_COMPANY_EDIT:
                draft.list = draft.list.map((post: any) => {
                    if (
                        post._id === action.details._id &&
                        !action.details.status
                    ) {
                        if (
                            !post.isEditingAt ||
                            post.isEditingAt < action.details.at
                        ) {
                            post.isEditingAt = action.details.at;
                            post.isEditing = action.details.isEditing;
                        }
                    } else if (
                        post._id === action.details._id &&
                        action.details.status
                    ) {
                        if (
                            !post.statusAt ||
                            post.statusAt < action.details.at
                        ) {
                            post.statusAt = action.details.at;
                            post.status = action.details.status;
                        }
                    }
                    return post;
                }) as never[];
                break;
            case FETCH_USERS_SUCCESS:
                draft.users = action.users;
                break;

            case CREATE_USER:
                draft.submitting = true;
                draft.createSuccess = false;
                draft.createFailed = false;
                draft.createError = "";
                break;

            case CREATE_USER_SUCCESS:
                draft.submitting = false;
                draft.createSuccess = true;
                draft.createFailed = false;
                draft.createError = "";
                draft.createdUser = action.user;
                break;
            case FETCH_ABOUT:
                draft.about = null;
                break;
            case FETCH_ABOUT_SUCCESS:
                draft.about = action.about;
                break;
            case FETCH_PAGES_SUCCESS:
                draft.pageList = action.pageFolders.map(
                    (page: any) => page._id
                );
                break;
            case CLEAR_COMPANY:
                draft.about = null;
                draft.company = null;
                break;
            case FETCH_COUNTRIES_SUCCESS:
                draft.countries = action.list;
                break;
        }
    });
