import IRole from "./role";

export default interface IUser {
    competitionPageFolderIds?: string[];
    createdAt: string;
    email: string;
    firstName: string;
    isActive: boolean;
    isCompanyAdmin: boolean;
    isDeleted: boolean;
    isVerified: boolean;
    lastLoginAt: string;
    lastName: string;
    location: string;
    memberType: string;
    passwordChangedAt: Date;
    registrationDate: Date;
    roles: IRole[];
    uniqueId: string;
    updatedAt: Date;
    username: Date;
    _id: Date;
}
