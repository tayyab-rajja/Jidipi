import { FC } from "react";

import styles from './ColorPicker.module.css';
import { sidebarSvg } from "constant/sidebarSvg";

const colors = ["#FF8982", "#FFBF66", "#FFF079", "#68EBA9", "#66F9F2", "#9CDEFC", "#79BFFC", "#AEAFFF", "#FC7095", "#F1F1F1"];

export const ColorPicker: FC = () => {
    return (
        <div className={styles["ColorPicker-Wrapper"]}>
            <div className={styles["ColorPicker-Button"]}>{sidebarSvg["EDIT"]}Edit</div>
            <ul className={styles["ColorPicker-ColorsList"]}>
                {colors.map((color, i) => <li key={i} className={styles["ColorPicker-ColorItem"]} style={{backgroundColor: `${color}`}}></li>)}
            </ul>
            <div className={styles["ColorPicker-Button"]}>{sidebarSvg["DELETE"]}Delete</div>
        </div>
    )
}