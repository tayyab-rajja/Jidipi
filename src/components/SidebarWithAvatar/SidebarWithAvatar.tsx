import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import avatar from './mock-avatar.png';
import { categoriesSvg } from "constant/categoriesSvg";
import styles from './SidebarWithAvatar.module.css';

const SidebarWithAvatar = () => {
    return (
        <div className={styles["Sidebar"]}>
            <div className={styles["Profile"]}>
                <div className={styles["Profile-Avatar"]}>
                    <Image src={avatar} alt="avatar" width="100px" height="100px" className={styles["Profile-Avatar_Round"]} />
                </div>
                <div className={styles["Profile-Data"]}>
                    <div className={clsx(styles["Profile-Text"], styles["Text"])}>
                        {categoriesSvg["DESIGNER"]} 
                        <span>Elon Musk</span>
                    </div>
                    <div className={clsx(styles["Profile-Text"], styles["Text"])}>
                        <span>elon.musk@spacex.com</span>
                    </div>
                </div>
            </div>
            <div className={styles["Favorate-Links"]}>
                <div className={styles["Title"]}>favorate</div>
                <ul className={styles["Links"]}>
                    <li className={styles["Links-Item"]}>
                        <span className={styles["Links-Item_Icon"]}>
                            {/* Icon to be added */}
                        </span>
                        <span className={styles["Links-Item_Text"]}>
                            <Link href="#"><a>post</a></Link>
                        </span>
                    </li>
                    <li className={styles["Links-Item"]}>
                        <span className={styles["Links-Item_Icon"]}>
                            {/* Icon to be added */}
                        </span>
                        <span className={styles["Links-Item_Text"]}>
                            <Link href="#"><a>company</a></Link>
                        </span>
                    </li>
                    <li className={styles["Links-Item"]}>
                        <span className={styles["Links-Item_Icon"]}>
                            {/* Icon to be added */}
                        </span>
                        <span className={styles["Links-Item_Text"]}>
                            <Link href="#"><a>information</a></Link>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SidebarWithAvatar;