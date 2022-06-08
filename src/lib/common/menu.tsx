import {isJudge, isPartner} from "../user/role";
import moment from "moment";
import {CDN_URL} from "./env";

export interface LinkProp {
    title: string;
    icon: string;
    isSelected: boolean;
    link: string;
}

export interface MenuProp {
    title: string;
    links: LinkProp[];
}

export const generateSidebarMenus = (props: any) => {
    const user = props.user;
    let menus: MenuProp[] = [];
    if (isJudge(user))
        menus = [
            {
                title: "CANDIDATE",
                links: Array.from(Array(moment().get('year') - 2020).keys()).map((c: any) => ({
                    title: (c + 2020).toString(),
                    icon: CDN_URL + "/dashboard/images/icons/overview-icon.svg",
                    isSelected: false,
                    link: `/dashboard/post/list/architectures?competitionId=${c + 2020}`,
                })),
            },
        ];
    else if (isPartner(user))
        menus = [
            {
                title: "BLOG",
                links: [
                    {
                        title: "OVERVIEW",
                        icon: CDN_URL + "/dashboard/images/icons/overview-icon.svg",
                        isSelected: false,
                        link: `/dashboard/partner/overview`,
                    },
                    {
                        title: "POST",
                        icon: CDN_URL + "/dashboard/images/icons/post-icon.svg",
                        isSelected: false,
                        link: `/dashboard/post/list/architectures`,
                    },
                    {
                        title: "INFORMATION",
                        icon: CDN_URL + "/dashboard/images/icons/info-icon.svg",
                        isSelected: false,
                        link: `/dashboard/post/list/catalogues`,
                    },
                ],
            },
            {
                title: "MANAGEMENT",
                links: [
                    {
                        title: "CLOUD",
                        icon: CDN_URL + "/dashboard/images/icons/overview-icon.svg",
                        isSelected: false,
                        link: `/dashboard/cloud/unconnected`,
                    },
                    {
                        title: "ACCOUNT",
                        icon: CDN_URL + "/dashboard/images/icons/overview-icon.svg",
                        isSelected: false,
                        link: `/dashboard/partner/account/profile`,
                    },
                    {
                        title: "ANALYSE",
                        icon: CDN_URL + "/dashboard/images/icons/overview-icon.svg",
                        isSelected: false,
                        link: `/dashboard/partner/analyse`,
                    },
                ],
            },
        ];
    return menus;
};
