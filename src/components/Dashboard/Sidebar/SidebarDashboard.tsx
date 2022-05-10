import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { readerPanelSvg } from "constant/readerPanelSvg";
import styles from "./SidebarDashboard.module.scss";
import { isJudge, isPartner } from "../../../lib/user/role";
import { useRouter } from "next/router";

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
    const { competition, user, post, menus } = props;

    if (competition) {
        const award = props.awards.find(
            (award: any) => award._id === post.awardId
        );
        return (
            <div className={styles["Sidebar"]}>
                <div>
                    <h3>{competition.title}</h3>
                    <p>{competition.competitionStartDate}</p>
                    <p>{competition.competitionEndDate}</p>
                    {isJudge(user) && (
                        <div>
                            <p>AWARD: {award.title}</p>
                            <p>REASON: {post.applicationReason}</p>
                        </div>
                    )}
                    {isPartner(user) && (
                        <div>
                            {post &&
                                post.evaluations &&
                                post.evaluations.map(
                                    (evalution: any, i: number) => {
                                        return (
                                            <div key={i}>
                                                <p>{evalution.rating}</p>
                                                <p>{evalution.comment}</p>
                                            </div>
                                        );
                                    }
                                )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

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
                                                    router.asPath === link &&
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
    return <></>;
};

export default SidebarDashboard;
