import { call, put, select, takeLatest, all } from "redux-saga/effects";

import request from "src/utils/request";

import { makeSelectUserToken } from "src/lib/user/selector";

import {
    FETCH_COMPANIES,
    fetchCompaniesSuccess,
    fetchCompaniesFailed,
    FETCH_GROUPS,
    fetchGroupsSuccess,
    fetchGroupsFailed,
    CREATE_COMPANY,
    createCompanySuccess,
    createCompanyFailed,
    UPDATE_COMPANY,
    UPDATE_PARTNER,
    updateCompanyFailed,
    updateCompanySuccess,
    FETCH_COMPANY,
    getCompanyByIdSuccess,
    getCompanyByIdFailed,
    FETCH_ABOUT,
    fetchAboutSuccess,
    fetchAboutFailed,
    LINK_LOGO,
    linkLogoSuccess,
    linkLogoFailed,
    DELETE_COMPANY,
    deleteCompanySuccess,
    deleteCompanyFailed,
    FETCH_USERS,
    fetchUsersSuccess,
    fetchUsersFailed,
    CREATE_USER,
    createUserSuccess,
    createUserFailed,
    FETCH_PAGES,
    fetchPagesSuccess,
    fetchPagesFailed,
    FETCH_COUNTRIES,
    fetchCountriesSuccess,
    fetchCountriesFailed,
} from "./actions";
import { getQueryString } from "src/utils/queryString";

function* fetchCompanies(action: any): Generator<any, any, any> {
    const params = getQueryString(action.filters);
    const requestUrl = `company?${params}`;
    const authToken = yield select(makeSelectUserToken());
    try {
        const response = yield call(request, requestUrl, authToken, {});
        yield put(
            fetchCompaniesSuccess({
                companies: response.companies,
                statuses: response.statuses,
                total: response.total,
                pageNumberBack: response.pageNumberBack,
            })
        );
    } catch (err) {
        yield put(fetchCompaniesFailed(err));
    }
}

function* fetchGroups(): Generator<any, any, any> {
    const authToken = yield select(makeSelectUserToken());
    try {
        const response = yield call(request, `group`, authToken, {});
        yield put(fetchGroupsSuccess(response.groups));
    } catch (err) {
        yield put(fetchGroupsFailed(err));
    }
}

function* updateCompany(action: any): Generator<any, any, any> {
    const authToken = yield select(makeSelectUserToken());

    const requestUrl = action.review
        ? `company/${action.details._id}?review=true`
        : `company/${action.details._id}`;

    const requestOptions = {
        method: "PUT",
        body: JSON.stringify(action.details),
    };
    try {
        const response = yield call(
            request,
            requestUrl,
            authToken,
            requestOptions
        );
        yield put(
            updateCompanySuccess(response.company, action.details.action)
        );
    } catch (err) {
        yield put(updateCompanyFailed(err));
    }
}
function* updatePartner(action: any): Generator<any, any, any> {
    const authToken = yield select(makeSelectUserToken());
    const requestUrl = `company/${action.details._id}/partner`;
    const requestOptions = {
        method: "PUT",
        body: JSON.stringify(action.details),
    };
    try {
        const response = yield call(
            request,
            requestUrl,
            authToken,
            requestOptions
        );
        yield put(updateCompanySuccess(response.company, ""));
    } catch (err) {
        yield put(updateCompanyFailed(err));
    }
}

function* deleteCompany(action: any): Generator<any, any, any> {
    const authToken = yield select(makeSelectUserToken());

    const requestUrl = `company/${action.companyId}`;

    const requestOptions = {
        method: "DELETE",
    };

    try {
        const response = yield call(
            request,
            requestUrl,
            authToken,
            requestOptions
        );
        yield put(deleteCompanySuccess(response.company));
    } catch (err) {
        yield put(deleteCompanyFailed(err));
    }
}

function* createCompany(action: any): Generator<any, any, any> {
    const authToken = yield select(makeSelectUserToken());

    const requestUrl = `company`;
    const requestOptions = {
        method: "POST",
        body: JSON.stringify(action.details),
    };

    try {
        const response = yield call(
            request,
            requestUrl,
            authToken,
            requestOptions
        );
        yield put(createCompanySuccess(response.company));
    } catch (err) {
        yield put(createCompanyFailed(err));
    }
}

function* getCompanyById(action: any): Generator<any, any, any> {
    const authToken = yield select(makeSelectUserToken());
    const url = action.status
        ? `company/${action.id}?status=true`
        : `company/${action.id}`;

    try {
        const response = yield call(request, url, authToken, {});
        const { company, posts, pageFolders, publishedAbout } = response;
        company.bothPublished =
            company.status === "PUBLISHED" &&
            publishedAbout &&
            publishedAbout.status === "PUBLISHED";

        yield put(getCompanyByIdSuccess(company, posts, pageFolders));
    } catch (err) {
        yield put(getCompanyByIdFailed(err));
    }
}

function* fetchAbout(action: any): Generator<any, any, any> {
    const authToken = yield select(makeSelectUserToken());
    try {
        const response = yield call(
            request,
            `post/${action.id}/about`,
            authToken,
            {}
        );
        yield put(fetchAboutSuccess(response.post));
    } catch (err) {
        yield put(fetchAboutFailed(err));
    }
}

function* linkLogo(action: any): Generator<any, any, any> {
    const authToken = yield select(makeSelectUserToken());

    const requestUrl = `company/${action.logoId}/linkLogo`;

    const requestOptions = {
        method: "PUT",
        body: JSON.stringify({ companyId: action.companyId }),
    };

    try {
        const response = yield call(
            request,
            requestUrl,
            authToken,
            requestOptions
        );
        yield put(linkLogoSuccess(response.company));
    } catch (err) {
        yield put(linkLogoFailed(err));
    }
}

function* fetchUsers(action: any): Generator<any, any, any> {
    const requestUrl = `user/filterByParams?companyId=${action.companyId}&pageSize=200&pageNumber=0&isDeleted=false`;
    const authToken = yield select(makeSelectUserToken());
    try {
        const response = yield call(request, requestUrl, authToken, {});
        yield put(fetchUsersSuccess(response.user));
    } catch (err) {
        yield put(fetchUsersFailed(err));
    }
}

function* createUser(action: any): Generator<any, any, any> {
    const authToken = yield select(makeSelectUserToken());

    const requestUrl = `company/${action.companyId}/register`;

    const requestOptions = {
        method: "POST",
        body: JSON.stringify(action.userDetails),
    };

    try {
        const response = yield call(
            request,
            requestUrl,
            authToken,
            requestOptions
        );
        yield put(createUserSuccess(response.user));
    } catch (err) {
        yield put(createUserFailed(err));
    }
}

function* fetchPages(action: any): Generator<any, any, any> {
    const requestUrl = `pages/companyPages/${action.companyId}`;
    const authToken = yield select(makeSelectUserToken());
    try {
        const response = yield call(request, requestUrl, authToken, {});
        yield put(fetchPagesSuccess(response.pageFolders));
    } catch (err) {
        yield put(fetchPagesFailed(err));
    }
}

function* fetchCountries(): Generator<any, any, any> {
    const authToken = yield select(makeSelectUserToken());
    try {
        const requestUrl = `company/list/countries`;
        const response = yield call(request, requestUrl, authToken, {});
        yield put(fetchCountriesSuccess(response));
    } catch (err) {
        yield put(fetchCountriesFailed(err));
    }
}

export default function* companySagas() {
    yield all([
        takeLatest(FETCH_GROUPS, fetchGroups),
        takeLatest(FETCH_COMPANIES, fetchCompanies),
        takeLatest(CREATE_COMPANY, createCompany),
        takeLatest(UPDATE_COMPANY, updateCompany),
        takeLatest(UPDATE_PARTNER, updatePartner),
        takeLatest(FETCH_COMPANY, getCompanyById),
        takeLatest(FETCH_ABOUT, fetchAbout),
        takeLatest(LINK_LOGO, linkLogo),
        takeLatest(DELETE_COMPANY, deleteCompany),
        takeLatest(CREATE_USER, createUser),
        takeLatest(FETCH_USERS, fetchUsers),
        takeLatest(FETCH_PAGES, fetchPages),
        takeLatest(FETCH_COUNTRIES, fetchCountries),
    ]);
}
