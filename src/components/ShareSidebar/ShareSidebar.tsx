import { FC } from "react";
import Link from 'next/link';

import styles from './ShareSidebar.module.css';
import { socialSvg } from "constant/socialSvg";

const ShareSidebar: FC = () => {

    const copyLink = (e: any) => {
        navigator.clipboard.writeText(e.target.textContent);
    }

    return (
        <div className={styles["Sidebar"]}>
            <div className={styles["Sidebar-Title"]}>share</div>
            <ul className={styles["Sidebar-Links"]}>
                <li className={styles["Sidebar-LinksItem"]}>
                    <span className={styles["Sidebar-LinksItem_Icon"]}>
                        {socialSvg["FACEBOOK"]}
                    </span>
                    <span className={styles["Sidebar-LinksItem_Text"]}>
                        <Link href="#"><a>Facebook</a></Link>
                    </span>
                </li>
                <li className={styles["Sidebar-LinksItem"]}>
                    <span className={styles["Sidebar-LinksItem_Icon"]}>
                        {socialSvg["TWITTER"]}
                    </span>
                    <span className={styles["Sidebar-LinksItem_Text"]}>
                        <Link href="#"><a>Twitter</a></Link>
                    </span>
                </li>
                <li className={styles["Sidebar-LinksItem"]}>
                    <span className={styles["Sidebar-LinksItem_Icon"]}>
                        {socialSvg["INSTAGRAM"]}
                    </span>
                    <span className={styles["Sidebar-LinksItem_Text"]}>
                        <Link href="#"><a>Instagram</a></Link>
                    </span>
                </li>
                <li className={styles["Sidebar-LinksItem"]}>
                    <span className={styles["Sidebar-LinksItem_Icon"]}>
                        {socialSvg["PININTEREST"]}
                    </span>
                    <span className={styles["Sidebar-LinksItem_Text"]}>
                        <Link href="#"><a>Pinterest</a></Link>
                    </span>
                </li>
                <li className={styles["Sidebar-LinksItem"]}>
                    <span className={styles["Sidebar-LinksItem_Icon"]}>
                        {socialSvg["EMAIL"]}
                    </span>
                    <span className={styles["Sidebar-LinksItem_Text"]}>
                        <Link href="mailto:mail@mail.com" passHref={true}><a>Email</a></Link>
                    </span>
                </li>
                <li className={styles["Sidebar-LinksItem"]} onClick={copyLink}>
                    <span className={styles["Sidebar-LinksItem_Icon"]}>
                        {socialSvg["LINK"]}
                    </span>
                    <span className={styles["Sidebar-LinksItem_Text"]} >
                        <Link href="#"><a>http://architecture.jidipi.com/j000012394/…</a></Link>
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default ShareSidebar;