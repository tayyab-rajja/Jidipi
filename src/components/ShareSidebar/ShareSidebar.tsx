import { FC } from "react";
import clsx from "clsx";
import { 
    FacebookShareButton,
    PinterestShareButton,
    TwitterShareButton, 
    EmailShareButton 
} from 'react-share';

import { socialSvg } from "constant/socialSvg";
import SideBarWrapper from "../SideBarWrapper/SideBarWrapper";

import styles from './ShareSidebar.module.css';

interface Props {
    shareImage: string
}

const ShareSidebar: FC<Props> = ({shareImage}) => {

    const copyLink = (e: any) => {
        navigator.clipboard.writeText(e.target.textContent);
    }

    const currentUrl = window.location.href;

    return (
        <SideBarWrapper>
            <div className={styles["Sidebar"]}>
                <div className={styles["Sidebar-Title"]}>share</div>
                <ul className={styles["Sidebar-Links"]}>
                    <FacebookShareButton url={currentUrl} className={styles["Sidebar-ShareButton"]}>
                        <li className={styles["Sidebar-LinksItem"]}>
                            {socialSvg["FACEBOOK"]}
                            <span className={styles["Sidebar-LinksItem_Text"]}>
                                Facebook
                            </span>
                        </li>
                    </FacebookShareButton>
                    <TwitterShareButton url={currentUrl} title="tweet" className={styles["Sidebar-ShareButton"]}>
                        <li className={styles["Sidebar-LinksItem"]}>
                            {socialSvg["TWITTER"]}
                            <span className={styles["Sidebar-LinksItem_Text"]}>
                                Twitter
                            </span>
                        </li>
                    </TwitterShareButton>
                    <li className={styles["Sidebar-LinksItem"]}>
                        {socialSvg["INSTAGRAM"]}
                        <span className={styles["Sidebar-LinksItem_Text"]}>
                            Instagram
                        </span>
                    </li>
                    <PinterestShareButton url={currentUrl} className={styles["Sidebar-ShareButton"]} media={shareImage}>
                        <li className={styles["Sidebar-LinksItem"]}>
                            {socialSvg["PININTEREST"]}
                            <span className={styles["Sidebar-LinksItem_Text"]}>
                                Pinterest
                            </span>
                        </li>
                    </PinterestShareButton>
                    <EmailShareButton url={currentUrl} className={styles["Sidebar-ShareButton"]}>
                        <li className={styles["Sidebar-LinksItem"]}>
                            {socialSvg["EMAIL"]} 
                            <span className={styles["Sidebar-LinksItem_Text"]}>
                                Email
                            </span>
                        </li>
                    </EmailShareButton>
                    <li className={clsx(styles["Sidebar-LinksItem"], styles["LinkCopied"])} onClick={copyLink}>
                        {socialSvg["LINK"]}
                        <span className={styles["Sidebar-LinksItem_Text"]} >
                            {currentUrl}
                        </span>
                    </li>
                </ul>
            </div>
        </SideBarWrapper>
    )
}
export default ShareSidebar;