import styles from "./index.module.scss";
import clsx from "clsx";

interface IProps {
    statuses: any;
}

export default ({ statuses }: IProps) => {
    console.log(statuses);
    return (
        <>
            <div className={styles["process-list"]}>
                <div className={styles["item"]}>
                    <label>ARCHITECTURES</label>
                    <div
                        className={`${clsx(
                            styles["progress-bar"],
                            styles["architectures"]
                        )} progress-bar`}
                    >
                        <div className={styles["active"]}>
                            <span>1872</span>
                        </div>
                        <span>3642</span>
                    </div>
                </div>
                <div className={styles["item"]}>
                    <label>INTERIORS</label>
                    <div
                        className={`${clsx(
                            styles["progress-bar"],
                            styles["interiors"]
                        )} progress-bar`}
                    >
                        <div className={styles["active"]}>
                            <span>7231</span>
                        </div>
                        <span>2731</span>
                    </div>
                </div>
                <div className={styles["item"]}>
                    <label>CONSTRUCTION</label>
                    <div className={`${styles["progress-bar"]} progress-bar`}>
                        <span>4632</span>
                    </div>
                </div>
                <div className={styles["item"]}>
                    <label>ELECTRONICS</label>
                    <div className={`${styles["progress-bar"]} progress-bar`}>
                        <span>1231</span>
                    </div>
                </div>
                <div className={styles["item"]}>
                    <label>FURNITURE</label>
                    <div className={`${styles["progress-bar"]} progress-bar`}>
                        <span>7231</span>
                    </div>
                </div>
                <div className={styles["item"]}>
                    <label>GOODS</label>
                    <div className={`${styles["progress-bar"]} progress-bar`}>
                        <span>1872</span>
                    </div>
                </div>
            </div>
            <div className={styles["deadline"]}>
                <div className={styles["item"]}>
                    <div className={`${styles["progress-bar"]} progress-bar`}>
                        <div className={styles["active"]}></div>
                    </div>
                    <label>Deadline 35 Days</label>
                </div>
            </div>
        </>
    );
};
