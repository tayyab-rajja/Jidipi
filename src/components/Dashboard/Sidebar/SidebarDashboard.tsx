import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { readerPanelSvg } from "constant/readerPanelSvg";
import styles from "./SidebarDashboard.module.scss";
import { isJudge, isPartner } from "../../../lib/user/role";
import { useRouter } from "next/router";
import moment from "moment-timezone";

// const defaultData = [
//     {
//         title: 'post',
//         icon: 'POST',
//         isSelected: false,
//     },
//     {
//         title: 'company',
//         icon: 'COMPANY',
//         isSelected: false,
//     },
//     {
//         title: 'information',
//         icon: 'INFORMATION',
//         isSelected: false,
//     }
// ]
/**
 * @paraconstructorm props
 * @
 * props.competition  from post/[id].tsx  post the competition
 * props.user  from post/[id].tsx  post the user
 * props.menus if without competition and user, use the preset menus to render the layout.
 *
 */
const SidebarDashboard = (props: any) => {
    const router = useRouter();
    const { competition, user, post, menus, awards } = props;
    
    useEffect(() => {
        if (!router.query.competitionId && menus?.length) {
            let menu = menus[0];
            if (menu.links.length) {
                let link = menu.links[1];
                if (link) {
                    // router.query.competitionId = link.title;
                    // router.push(router);
                    router.replace({
                        query: { ...router.query, competitionId: link.title }
                    })
                }
            }
        }
    }, []);
    if (menus)
        return (
            <div className={styles["Sidebar"]} suppressHydrationWarning={true}>
                <div className={styles["Profile"]}>
                    <div className={styles["Profile-Avatar"]}>
                        <Image
                            src={"/images/avatars-icons/mock-avatar.png"}
                            alt="avatar"
                            width="100px"
                            height="100px"
                            className={styles["Profile-Avatar_Round"]}
                        />
                    </div>
                    <div className={styles["Profile-Data"]}>
                        <div
                            className={clsx(
                                styles["Profile-Text"],
                                styles["Text"]
                            )}
                        >
                            {readerPanelSvg["USER"]}
                            <span>Elon Musk</span>
                        </div>
                        <div
                            className={clsx(
                                styles["Profile-Text"],
                                styles["Text"]
                            )}
                        >
                            {readerPanelSvg["EMAIL"]}
                            <span>elon.musk@spacex.com</span>
                        </div>
                    </div>
                </div>

                {menus.map((menu: any, index: number) => (
                    <div key={index} className={styles["menu"]}>
                        <h2>{menu.title}</h2>
                        <div className={styles["menu-list"]}>
                            <ul>
                                {menu.links.map(
                                    ({ title, link, icon }: any, i: any) => (
                                        <Link key={i} href={link}>
                                            <li
                                                className={clsx(
                                                    router.query
                                                        .competitionId ===
                                                        title &&
                                                        styles["active"]
                                                )}
                                                key={i}
                                            >
                                                <div
                                                    className={`${styles["icon"]} me-3`}
                                                >
                                                    {readerPanelSvg[icon]}
                                                </div>
                                                <span>{title}</span>
                                            </li>
                                        </Link>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        );
    return (<div className="col-lg left-sidebar bg-white pt-20">
        <div className="main-widget-grid">
            <div className="main-widget">
                <div className="widget-title text-center">
                    <h3>APPLICATION</h3>
                </div>

                <div className="main-widget-inner bgf1">
                    <div className="date-and-time">
                        <div className="row mx-0">
                            <div className="col d-flex justify-content-center align-items-center px-0">
                                <p>{moment.tz(post.competitionId.applicationDate, 'Europe/Berlin').format('YYYY-MM-DD')}</p>
                            </div>
                            <div className="col d-flex justify-content-center align-items-center px-0">
                                <p>{moment.tz(post.competitionId.applicationDate, 'Europe/Berlin').format('HH:MM:SS')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-widget-inner bgf1">
                    <div className="steve-job">
                        <div className="row">
                            <div className="col-12 d-flex align-items-center">
                                <div className="steve-job-img">
                                    <img src={post.applicant && post.applicant.avatar? post.applicant.avatar: '//upload.jidipi.com/avatars/default.svg'}/>
                                </div>
                                <p>{post.companyId.partnerId}</p>
                                <p>{(post.applicant.firstName+ ' '+post.applicant.lastName).trim()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-widget-inner ">
                    <div id="awards-btn" className="awards-btn">
                        {awards.map((award: any, index: number) => {
                           return <button key={index} className={`btn ${award._id === post.awardId ? 'active':''}`}>{award.title}</button>
                        })}
                    </div>
                </div>

                <div className="main-widget-inner widget-text bgf1">
                    <div className="widget-text-main widget-border">
                        <p>
                            {post.applicationReason}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>)

    return <></>;
};

export default SidebarDashboard;

