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
            <div className={styles["Links"]}>
                <Link href="#">favorate</Link>
                <Link href="#">post</Link>
                <Link href="#">company</Link>
                <Link href="#">information</Link>
            </div>
        </div>
    )
}

export default SidebarWithAvatar;