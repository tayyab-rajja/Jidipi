import React, {FC, ReactElement, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {generateSidebarMenus, MenuProp} from "../../../../lib/common/menu";
import Link from "next/link";
import {UserContext} from "../../../../providers/UserProvider";
import Image from "next/image";
import UserSvg from "/public/dashboard/images/icons/user.svg";
import EnvelopeSvg from "/public/dashboard/images/icons/envelope.svg";
import styles from "./Sidebar.module.scss";
import {isJudge, isPartner} from "../../../../lib/user/role";
import {CDN_URL} from "../../../../lib/common/env";

interface SidebarProps {
    children?: ReactElement | ReactElement[];
    right?: boolean;
}


export const Sidebar: FC<SidebarProps> = ({
                                              children,
                                              right

                                          }) => {
    const router = useRouter();
    const userContext: any = useContext(UserContext);
    const user = userContext.user;
    const [menus, setMenus] = useState<MenuProp[]>(generateSidebarMenus({user}));
    const [cs, setCs] = useState<ReactElement | ReactElement[]>([]);
    const defaultCs = <>
        <div className={styles['left-navbar']}>
            <div className={styles["profile"]}>
                <div className={styles["profile-img"]}>
                    <img src={user && user.avatar ? user.avatar : CDN_URL + '/avatars/default.svg'}/>
                </div>
                <div className={styles["contact-info"]}>
                    <div className={styles["item"]}>
                        <div className={styles["icon"]}>
                            <Image src={UserSvg} alt="username"/>
                        </div>
                        <div className={styles["name"]}>{user && user.firstName} {user && user.lastName}</div>
                    </div>
                    <div className={styles["item"]}>
                        <div className={styles["icon"]}>
                            <Image src={EnvelopeSvg} alt="email"/>
                        </div>
                        <div className={styles["email"]}>{user && user.email}</div>
                    </div>
                </div>
            </div>

            {
                menus.map((menu: any, index: number) => {
                    return (
                        <div key={index} className={styles["menu"]}>
                            <h2>{menu.title}</h2>
                            <div className={styles["menu-list"]}>
                                <ul>
                                    {
                                        menu.links.map((link: any, i: number) => {
                                            return (
                                                <li key={i} className={link.isSelected ? styles["active"] : ''}>
                                                    <Link href={link.link}>
                                                        <a className={styles['menu-item']}>
                                                            <div className={styles['icon']}>
                                                                <img src={link.icon}/>
                                                            </div>
                                                            <div className={styles['menu-container']}>
                                                                <span>{link.title}</span>
                                                                <div className={styles['arrow-right']}></div>
                                                            </div>
                                                        </a>
                                                    </Link>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    </>;
    useEffect(() => {
        if (children !== undefined) {
            setCs(<div className={styles['left-navbar']}>
                {children}
            </div>);

        }
        if (isJudge(user) && !router.query.competitionId && menus?.length) {
            let menu = menus[0];
            if (menu.links.length) {
                let link = menu.links[menu.links.length - 1];
                if (link) {
                    router.replace({
                        query: {...router.query, competitionId: link.title}
                    })
                }
            }
        }
        setCs(defaultCs);
    }, [children]);
    useEffect(() => {
        if (!menus || !menus.length) return;
        let competitionId: string;
        let page: string;
        if (isJudge(user) && router.query.competitionId) {
            competitionId = router.query.competitionId ? router.query.competitionId.toString() : '';
        }
        if (isPartner(user)) {
            if (router.query.page) {
                page = router.query.page ? router.query.page.toString().toLowerCase() : '';
                // TODO should use a global variable to store the project|product|information
                if (['architectures', 'interiors', 'construction', 'electronics', 'furniture', 'goods'].includes(page)) {
                    page = 'post';
                }
                if (['catalogues', 'videos', 'presses', 'news', 'news', 'books', 'events'].includes(page)) {
                    page = 'information';
                }
            } else {
                if (router.pathname.includes('cloud')) page = 'cloud'
                if (router.pathname.includes('overview')) page = 'overview'
                if (router.pathname.includes('account')) page = 'account'
                if (router.pathname.includes('analyse')) page = 'analyse'
            }
        }
        const ms = menus.map((menu: any) => {
            menu.links = menu.links.map((link: any) => {
                return {
                    ...link,
                    isSelected:
                        competitionId && competitionId === link.title
                        || page && page === link.title.toLowerCase()
                };
            })
            return menu;
        });
        setMenus(ms);

    }, [router])

    return (<>
        <div className={styles['left-navbar']}>
            {cs}
        </div>
    </>)


}