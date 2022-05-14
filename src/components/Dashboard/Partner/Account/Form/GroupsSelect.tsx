import styles from "./Form.module.scss";
import clsx from "clsx";
import Image from "next/image";
import Arrow from "public/images/icons/arrow.svg";

export default function GroupSelect() {
    return (
        <div className={styles["input-container"]}>
            <div
                className={clsx(styles["filter-item"], styles["groups-filter"])}
            >
                <div className={styles["select-group"]} onClick={() => {}}>
                    <div
                        className={clsx(
                            styles["select-btn"],
                            styles["border-dashed"]
                        )}
                    >
                        <div className={styles["content"]}>
                            <h3 className={styles["label"]}>Groups</h3>
                            <Image src={Arrow} alt="arrow icon" />
                        </div>
                        <div
                            className={clsx(
                                styles["selected-item"],
                                styles["bg-grey"]
                            )}
                        ></div>
                    </div>
                    <div
                        className={clsx(
                            styles["select-content"],
                            styles["types"]
                        )}
                        id="types"
                    >
                        <div className={styles["buttons"]}>
                            <button className={styles["arch"]}>
                                Architect
                            </button>
                            <button className={styles["decor"]}>
                                Decorator
                            </button>
                            <button className={styles["planner"]}>
                                Planner
                            </button>
                            <button className={styles["engineer"]}>
                                Engineer
                            </button>
                            <button className={styles["contractor"]}>
                                Contractor
                            </button>
                            <button className={styles["manufacturer"]}>
                                Manufacturer
                            </button>
                            <button className={styles["software"]}>
                                Software
                            </button>
                            <button className={styles["designer"]}>
                                Designer
                            </button>
                            <button className={styles["photo"]}>
                                Photographer
                            </button>

                            <button className={styles["retail"]}>
                                Retailer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
