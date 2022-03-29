import styles from './FavoriteHeader.module.css';
import { categoriesSvg } from 'constant/categoriesSvg';

const FavouriteHeader = () => {
    return (
        <div className={styles["Container"]}>
            <div className={styles["Header-Items"]}>
                <div className={styles["Header-Item"]}>
                    <div className={styles["Header-Icon"]}>
                        {/* Icon to be changed */}
                        {categoriesSvg["DESIGNER"]}
                    </div>
                    <div className={styles["Header-Data"]}>
                        <p className={styles["Header-Text"]}>Registed From</p>
                        <p className={styles["Header-Number"]}>2020</p>
                    </div>
                </div>
                <div className={styles["Header-Item"]}>
                    <div className={styles["Header-Icon"]}>
                        {/* Icon to be added */}
                    </div>
                    <div className={styles["Header-Data"]}>
                        <p className={styles["Header-Text"]}>Login Hours</p>
                        <p className={styles["Header-Number"]}>28</p>
                    </div>
                </div>
                <div className={styles["Header-Item"]}>
                    <div className={styles["Header-Icon"]}>
                        {/* Icon to be added */}
                    </div>
                    <div className={styles["Header-Data"]}>
                        <p className={styles["Header-Text"]}>Visited Post</p>
                        <p className={styles["Header-Number"]}>234</p>
                    </div>
                </div>
                <div className={styles["Header-Item"]}>
                    <div className={styles["Header-Icon"]}>
                        {/* Icon to be added */}
                    </div>
                    <div className={styles["Header-Data"]}>
                        <p className={styles["Header-Text"]}>Favorate Post</p>
                        <p className={styles["Header-Number"]}>45</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavouriteHeader;