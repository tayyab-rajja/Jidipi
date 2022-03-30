import { FC } from "react";
import Link from 'next/link';

import styles from './ShareSidebar.module.css';

const ShareSidebar: FC = () => {

    const copyLink = (e: any) => {
        navigator.clipboard.writeText(e.target.textContent);
    }

    return (
        <div className={styles["Sidebar"]}>
            <div className={styles["Sidebar-Title"]}>share</div>
            <ul className={styles["Sidebar-Links"]}>
                <li className={styles["Links-Item"]}>
                    <span className={styles["Links-Item_Icon"]}>
                        {/* Icon to be added */}
                    </span>
                    <span className={styles["Links-Item_Text"]}>
                        <Link href="#"><a>Facebook</a></Link>
                    </span>
                </li>
                <li className={styles["Links-Item"]}>
                    <span className={styles["Links-Item_Icon"]}>
                        {/* Icon to be added */}
                    </span>
                    <span className={styles["Links-Item_Text"]}>
                        <Link href="#"><a>Twitter</a></Link>
                    </span>
                </li>
                <li className={styles["Links-Item"]}>
                    <span className={styles["Links-Item_Icon"]}>
                        {/* Icon to be added */}
                    </span>
                    <span className={styles["Links-Item_Text"]}>
                        <Link href="#"><a>Instagram</a></Link>
                    </span>
                </li>
                <li className={styles["Links-Item"]}>
                    <span className={styles["Links-Item_Icon"]}>
                        {/* Icon to be added */}
                    </span>
                    <span className={styles["Links-Item_Text"]}>
                        <Link href="#"><a>Pinterest</a></Link>
                    </span>
                </li>
                <li className={styles["Links-Item"]}>
                    <span className={styles["Links-Item_Icon"]}>
                        {/* Icon to be added */}
                    </span>
                    <span className={styles["Links-Item_Text"]}>
                        <Link href="mailto:mail@mail.com" passHref={true}><a>Email</a></Link>
                    </span>
                </li>
                <li className={styles["Links-Item"]} onClick={copyLink}>
                    <span className={styles["Links-Item_Icon"]}>
                        {/* Icon to be added */}
                    </span>
                    <span className={styles["Links-Item_Text"]} >
                        <Link href="#"><a>http://architecture.jidipi.com/j000012394/…</a></Link>
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default ShareSidebar;