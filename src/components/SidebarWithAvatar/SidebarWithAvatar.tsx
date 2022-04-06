import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import avatar from './mock-avatar.png';
import { readerPanelSvg } from "constant/readerPanelSvg";
import styles from './SidebarWithAvatar.module.css';

const defaultData = [
    {
        title: 'post',
        icon: 'POST',
        isSelected: false,
    },
    {
        title: 'company',
        icon: 'COMPANY',
        isSelected: false,
    },
    {
        title: 'information',
        icon: 'INFORMATION',
        isSelected: false,
    }
]

const SidebarWithAvatar = () => {

    const [links, setSelectedLink] = useState(defaultData);

    const setSelected = (title: string) => {
        setSelectedLink((prevState) => prevState.map(
            (linkName) => linkName.title === title ? {...linkName, isSelected: true} : {...linkName, isSelected: false})
        )
    }

    return (
        <div className={styles["Sidebar"]}>
            <div className={styles["Profile"]}>
                <div className={styles["Profile-Avatar"]}>
                    <Image src={avatar} alt="avatar" width="100px" height="100px" className={styles["Profile-Avatar_Round"]} />
                </div>
                <div className={styles["Profile-Data"]}>
                    <div className={clsx(styles["Profile-Text"], styles["Text"])}>
                        {readerPanelSvg["USER"]} 
                        <span>Elon Musk</span>
                    </div>
                    <div className={clsx(styles["Profile-Text"], styles["Text"])}>
                        {readerPanelSvg["EMAIL"]} 
                        <span>elon.musk@spacex.com</span>
                    </div>
                </div>
            </div>
            <div className={styles["Favorate-Links"]}>
                <div className={styles["Title"]}>favorate</div>
                <ul className={styles["Links"]}>
                    {links.map(({title, icon, isSelected}, i) => 
                        <li key={i} className={clsx(styles["Links-Item"], isSelected && styles["Selected"])} onClick={() => setSelected(title)}>
                            <span className={styles["Links-Item_Icon"]}>
                                {readerPanelSvg[`${icon}`]}
                            </span>
                            <span className={styles["Links-Item_Text"]}>
                                <Link href="#"><a>{title}</a></Link>
                            </span>
                            <span className={styles["Links-Item_Arrow"]}>
                                {readerPanelSvg["ARROW"]}
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default SidebarWithAvatar;