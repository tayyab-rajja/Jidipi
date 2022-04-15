export const PostStatus = Object.freeze({
    Trash: 'TRASH',
    Draft: 'DRAFT',
    Finished: 'FINISHED',
    Scheduled: 'SCHEDULED',
    Published: 'PUBLISHED',
    Deactivated: 'DEACTIVATED',
    UnSaved: 'UNSAVED',
});
export const PostStatusEnum = Object.values(PostStatus);

export const PageTypes = Object.freeze({
    Project: 'PROJECT',
    Product: 'PRODUCT',
    Information: 'INFORMATION',
    Company: 'COMPANY',
});
export const PageTypesEnum = Object.values(PageTypes);

export const MessageStatus = Object.freeze({
    Team: 'TEAM',
    Partner: 'PARTNER',
})
export const MessageStatusEnum = Object.values(MessageStatus);

export const CoverStatus = Object.freeze({
    YesCover: 'yesCover',
    NoCover: 'noCover',
})
export const CoverStatusEnum = Object.values(CoverStatus);

export const ActivityStatus = Object.freeze({
    Activated: 'Activated',
    Deactivated: 'Deactivated',
})
export const ActivityStatusEnum = Object.values(ActivityStatus);