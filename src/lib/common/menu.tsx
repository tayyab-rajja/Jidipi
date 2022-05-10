import { User } from "../user/action";
import { isJudge, isPartner } from "../user/role";

export const generateSidebarMenus = (props: any) => {
    const user = props.user;
    let menus: any[] = [];
    if (isJudge(user))
        menus = [
            {
                title: "CANDIDATE",
                links: props.competitions.map((c: any) => {
                    // IF competitionId length is 4, API handle the competitionId as competition title.
                    return {
                        title: c.title,
                        icon: "INFORMATION",
                        isSelected: false,
                        link: `/dashboard/post/list/architectures?competitionId=${c.title}`,
                    };
                }),
            },
        ];
    else if (isPartner(user))
        menus = [
            {
                title: "BLOG",
                links: [
                    {
                        title: "OVERVIEW",
                        icon: "INFORMATION",
                        isSelected: false,
                        link: `/dashboard/partner/overview`,
                    },
                    {
                        title: "POST",
                        icon: "POST",
                        isSelected: false,
                        link: `/dashboard/post/list/architectures`,
                    },
                ],
            },
            {
                title: "MANAGEMENT",
                links: [
                    {
                        title: "CLOUD",
                        icon: "CLOUD",
                        isSelected: false,
                        link: `/dashboard/cloud/post`,
                    },
                    {
                        title: "ACCOUNT",
                        icon: "ACCOUNT",
                        isSelected: false,
                        link: `/dashboard/partner/account/profile`,
                    },
                ],
            },
        ];
    return menus;
};
