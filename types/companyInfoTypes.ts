export interface CompanyInfo {
    _id: string;
    partnerId: string;
    avatar: string;
    fax: string;
    address: string;
    isMember: string;
    IsPartner: boolean;
    companyName: string;
    email: string;
    telephone: string;
    website: string;
    uniqueId: string;
    isDeleted: boolean;
    behancLink: string;
    facebookLink: string;
    googleMapLink: string;
    instagramLink: string;
    linkedLink: string;
    twitterLink: string;
    vimeoLink: string;
    youtubeLink: string;
    pininterestLink: string;
}

export interface CompanyAdd
    extends Omit<
        CompanyInfo,
        | "_id"
        | "isMember"
        | "IsPartner"
        | "partnerId"
        | "uniqueId"
        | "isDeleted"
    > {
    brandName: string;
    label: string;
    groups: any[];
    profileUrl: string;
    partnerUrl: string;
    country: string;
    qrCode: string;
    qrLink: string;
    status: string;
    publishedDate: string;
    scheduledDate: string;
    isActive: boolean;
    logoId: string | null;
    _id: undefined;
    description: string;
    [index: string]: any
}
