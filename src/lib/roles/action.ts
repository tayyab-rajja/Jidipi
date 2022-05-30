export const FETCH_ROLES = 'rolesAction/FETCH_ROLES';
export const FETCH_ROLES_SUCCESS = 'rolesAction/FETCH_ROLES_SUCCESS';
export const FETCH_ROLES_FAILED = 'rolesAction/FETCH_ROLES_FAILURE';

export const FETCH_PERMISSIONS = 'rolesAction/FETCH_PERMISSIONS';
export const FETCH_PERMISSIONS_SUCCESS =
  'rolesAction/FETCH_PERMISSIONS_SUCCESS';
export const FETCH_PERMISSIONS_FAILED =
  'rolesAction/FETCH_PERMISSIONS_FAILURE';

export const CREATE_ROLE = 'rolesAction/CREATE_ROLE';
export const CREATE_ROLE_SUCCESS = 'rolesAction/CREATE_ROLE_SUCCESS';
export const CREATE_ROLE_FAILED = 'rolesAction/CREATE_ROLE_FAILURE';

export const UPDATE_ROLE = 'rolesAction/UPDATE_ROLE';
export const UPDATE_ROLE_SUCCESS = 'rolesAction/UPDATE_ROLE_SUCCESS';
export const UPDATE_ROLE_FAILED = 'rolesAction/UPDATE_ROLE_FAILURE';

export const DELETE_ROLE = 'rolesAction/DELETE_ROLE';
export const DELETE_ROLE_SUCCESS = 'rolesAction/DELETE_ROLE_SUCCESS';
export const DELETE_ROLE_FAILED = 'rolesAction/DELETE_ROLE_FAILED';

export const CREATE_PERMISSIONS = 'rolesAction/CREATE_PERMISSIONS';
export const CREATE_PERMISSIONS_SUCCESS =
  'rolesAction/CREATE_PERMISSIONS_SUCCESS';
export const CREATE_PERMISSIONS_FAILED =
  'rolesAction/CREATE_PERMISSIONS_FAILURE';

export function fetchRoles() {
  return {
    type: FETCH_ROLES,
  };
}

export function fetchRolesSuccess(roles: any, permissions: any) {
  return {
    type: FETCH_ROLES_SUCCESS,
    roles,permissions
  };
}

export function fetchRolesFailed(err: any) {
  return {
    type: FETCH_ROLES_FAILED,
    err,
  };
}

export function fetchPermissions() {
  return {
    type: FETCH_PERMISSIONS,
  };
}

export function fetchPermissionsSuccess(folders: any) {
  return {
    type: FETCH_PERMISSIONS_SUCCESS,
    folders,
  };
}

export function fetchPermissionsFailed(err: any) {
  return {
    type: FETCH_PERMISSIONS_FAILED,
    err,
  };
}

export function createRole(details: any) {
  return {
    type: CREATE_ROLE,
    details,
  };
}

export function createRoleSuccess(role: any) {
  return {
    type: CREATE_ROLE_SUCCESS,
    role,
  };
}

export function createRoleFailed(err: any) {
  return {
    type: CREATE_ROLE_FAILED,
    err,
  };
}

export function createPermission(details: any) {
  return {
    type: CREATE_PERMISSIONS,
    details,
  };
}

export function createPermissionSuccess(permission: any) {
  return {
    type: CREATE_PERMISSIONS_SUCCESS,
    permission,
  };
}

export function createPermissionFailed(err: any) {
  return {
    type: CREATE_PERMISSIONS_FAILED,
    err,
  };
}

export function updateRole(id: any, details: any) {
  return {
    type: UPDATE_ROLE,
    details,
    id,
  };
}

export function updateRoleSuccess(role: any) {
  return {
    type: UPDATE_ROLE_SUCCESS,
    role,
  };
}

export function updateRoleFailed(err: any) {
  return {
    type: UPDATE_ROLE_FAILED,
    err,
  };
}


export function deleteRole(id: any) {
  return {
    type: DELETE_ROLE,
    id,
  };
}

export function deleteRoleSuccess(id: any) {
  return {
    type: DELETE_ROLE_SUCCESS,
    id,
  };
}

export function deleteRoleFailed(err: any) {
  return {
    type: DELETE_ROLE_FAILED,
    err,
  };
}