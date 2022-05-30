export const FETCH_COMPANIES = "companyActions/FETCH_COMPANIES";
export const FETCH_COMPANIES_SUCCESS = "companyActions/FETCH_COMPANIES_SUCCESS";
export const FETCH_COMPANIES_FAILED = "companyActions/FETCH_COMPANIES_FAILURE";

export const FETCH_GROUPS = "companyActions/FETCH_GROUPS";
export const FETCH_GROUPS_SUCCESS = "companyActions/FETCH_GROUPS_SUCCESS";
export const FETCH_GROUPS_FAILED = "companyActions/FETCH_GROUPS_FAILURE";

export const CREATE_COMPANY = "companyActions/CREATE_COMPANY";
export const CREATE_COMPANY_SUCCESS = "companyActions/CREATE_COMPANY_SUCCESS";
export const CREATE_COMPANY_FAILED = "companyActions/CREATE_COMPANY_FAILURE";

export const UPDATE_COMPANY = "companyActions/UPDATE_COMPANY";
export const UPDATE_COMPANY_SUCCESS = "companyActions/UPDATE_COMPANY_SUCCESS";
export const UPDATE_COMPANY_FAILED = "companyActions/UPDATE_COMPANY_FAILURE";
export const UPDATE_COMPANY_EDIT = "companyActions/UPDATE_COMPANY_EDIT";
export const UPDATE_PARTNER = "companyActions/UPDATE_PARTNER";

export const DELETE_COMPANY = "companyActions/DELETE_COMPANY";
export const DELETE_COMPANY_SUCCESS = "companyActions/DELETE_COMPANY_SUCCESS";
export const DELETE_COMPANY_FAILED = "companyActions/DELETE_COMPANY_FAILURE";

export const UPDATE_STATUS = "companyActions/UPDATE_STATUS";

export const FETCH_COMPANY = "companyActions/FETCH_COMPANY";
export const FETCH_COMPANY_SUCCESS = "companyActions/FETCH_COMPANY_SUCCESS";
export const FETCH_COMPANY_FAILED = "companyActions/FETCH_COMPANY_FAILURE";

export const FETCH_ABOUT = "companyActions/FETCH_ABOUT";
export const FETCH_ABOUT_SUCCESS = "companyActions/FETCH_ABOUT_SUCCESS";
export const FETCH_ABOUT_FAILED = "companyActions/FETCH_ABOUT_FAILURE";

export const LINK_LOGO = "companyActions/LINK_LOGO";
export const LINK_LOGO_SUCCESS = "companyActions/LINK_LOGO_SUCCESS";
export const LINK_LOGO_FAILED = "companyActions/LINK_LOGO_FAILURE";

export const FETCH_USERS = "companyActions/FETCH_USERS";
export const FETCH_USERS_SUCCESS = "companyActions/FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILED = "companyActions/FETCH_USERS_FAILURE";

export const CREATE_USER = "companyActions/CREATE_USER";
export const CREATE_USER_SUCCESS = "companyActions/CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED = "companyActions/CREATE_USER_FAILURE";

export const FETCH_PAGES = "companyActions/FETCH_PAGES";
export const FETCH_PAGES_SUCCESS = "companyActions/FETCH_PAGES_SUCCESS";
export const FETCH_PAGES_FAILED = "companyActions/FETCH_PAGES_FAILURE";
export const CLEAR_COMPANY = "companyActions/CLEAR_COMPANY";

export const FETCH_COUNTRIES = "companyActions/FETCH_COUNTRIES";
export const FETCH_COUNTRIES_SUCCESS = "companyActions/FETCH_COUNTRIES_SUCCESS";
export const FETCH_COUNTRIES_FAILED = "companyActions/FETCH_COUNTRIES_FAILURE";

export function fetchCompanies(filters: any, clear: any) {
    return {
        type: FETCH_COMPANIES,
        filters,
        clear,
    };
}

export function fetchCompaniesSuccess(details: any) {
    return {
        type: FETCH_COMPANIES_SUCCESS,
        details,
    };
}

export function fetchCompaniesFailed(err: any) {
    return {
        type: FETCH_COMPANIES_FAILED,
        err,
    };
}

export function fetchGroups() {
    return {
        type: FETCH_GROUPS,
    };
}

export function fetchGroupsSuccess(groups: any) {
    return {
        type: FETCH_GROUPS_SUCCESS,
        groups,
    };
}

export function fetchGroupsFailed(err: any) {
    return {
        type: FETCH_GROUPS_FAILED,
        err,
    };
}

export function createCompany(details: any) {
    return {
        type: CREATE_COMPANY,
        details,
    };
}

export function createCompanySuccess(company: any) {
    return {
        type: CREATE_COMPANY_SUCCESS,
        company,
    };
}

export function createCompanyFailed(err: any) {
    return {
        type: CREATE_COMPANY_FAILED,
        err,
    };
}
export function updatePartner(details: any) {
    return {
        type: UPDATE_PARTNER,
        details,
    };
}
export function updateCompany(details: any, review: any) {
    return {
        type: UPDATE_COMPANY,
        details,
        review,
    };
}
export function updateCompanyEdit(details: any) {
    return {
        type: UPDATE_COMPANY_EDIT,
        details,
    };
}

export function updateCompanySuccess(company: any, action: any) {
    return {
        type: UPDATE_COMPANY_SUCCESS,
        company,
        action,
    };
}

export function updateCompanyFailed(err: any) {
    return {
        type: UPDATE_COMPANY_FAILED,
        err,
    };
}

export function updateStatus() {
    return {
        type: UPDATE_STATUS,
    };
}

export function getCompanyById(id: any, status: any) {
    return {
        type: FETCH_COMPANY,
        id,
        status,
    };
}

export function getCompanyByIdSuccess(
    company: any,
    posts: any,
    pageFolders: any
) {
    return {
        type: FETCH_COMPANY_SUCCESS,
        company,
        posts,
        pageFolders,
    };
}

export function getCompanyByIdFailed(err: any) {
    return {
        type: FETCH_COMPANY_FAILED,
        err,
    };
}

export function fetchAbout(id: any) {
    return {
        type: FETCH_ABOUT,
        id,
    };
}

export function fetchAboutSuccess(about: any) {
    return {
        type: FETCH_ABOUT_SUCCESS,
        about,
    };
}

export function fetchAboutFailed(err: any) {
    return {
        type: FETCH_ABOUT_FAILED,
        err,
    };
}

export function linkLogo(companyId: any, logoId: any) {
    return {
        type: LINK_LOGO,
        companyId,
        logoId,
    };
}

export function linkLogoSuccess(details: any) {
    return {
        type: LINK_LOGO_SUCCESS,
        details,
    };
}

export function linkLogoFailed(err: any) {
    return {
        type: LINK_LOGO_FAILED,
        err,
    };
}

export function deleteCompany(companyId: any) {
    return {
        type: DELETE_COMPANY,
        companyId,
    };
}

export function deleteCompanySuccess(company: any) {
    return {
        type: DELETE_COMPANY_SUCCESS,
        company,
    };
}

export function deleteCompanyFailed(err: any) {
    return {
        type: DELETE_COMPANY_FAILED,
        err,
    };
}

export function fetchUsers(companyId: any) {
    return {
        type: FETCH_USERS,
        companyId,
    };
}

export function fetchUsersSuccess(users: any) {
    return {
        type: FETCH_USERS_SUCCESS,
        users,
    };
}

export function fetchUsersFailed(err: any) {
    return {
        type: FETCH_USERS_FAILED,
        err,
    };
}

export function createUser(companyId: any, userDetails: any) {
    return {
        type: CREATE_USER,
        userDetails,
        companyId,
    };
}

export function createUserSuccess(user: any) {
    return {
        type: CREATE_USER_SUCCESS,
        user,
    };
}

export function createUserFailed(error: any) {
    return {
        type: CREATE_USER_FAILED,
        error,
    };
}

export function fetchPages(companyId: any) {
    return {
        type: FETCH_PAGES,
        companyId,
    };
}

export function fetchPagesSuccess(pageFolders: any) {
    return {
        type: FETCH_PAGES_SUCCESS,
        pageFolders,
    };
}

export function fetchPagesFailed(err: any) {
    return {
        type: FETCH_PAGES_FAILED,
        err,
    };
}
export function clearCompany() {
    return {
        type: CLEAR_COMPANY,
    };
}

export function fetchCountries() {
    return {
        type: FETCH_COUNTRIES,
    };
}

export function fetchCountriesSuccess(list: any) {
    return {
        type: FETCH_COUNTRIES_SUCCESS,
        list,
    };
}

export function fetchCountriesFailed(err: any) {
    return {
        type: FETCH_COUNTRIES_FAILED,
        err,
    };
}
