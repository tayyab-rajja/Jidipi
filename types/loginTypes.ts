// TODO: ask about other types
export type MemberType = "MEMBER" | string;
export type UserRoleType = "reader" | string;

export interface IUserRoles {
  title: UserRoleType;
  _id: string;
}

export interface ILoginError {
  error: string;
}

export interface ILoginSuccess {
  token: string;
  user: IUserFromToken;
}

export interface IUserFromToken {
  _id: string;
  isCompanyAdmin?: boolean;
  memberType?: MemberType;
  isActive?: boolean;
  isDeleted?: boolean;
  isVerified: boolean;
  roles: IUserRoles[];
  competitionPageFolderIds?: string[];
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  registrationDate?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
  visitedPosts: number;
  readerPosts: number;
  facebookEmail?: string;
  facebookId?: string;
}
