import styles from "./Form.module.scss";
import Image from "next/image";
import clsx from "clsx";
import Arrow from "public/images/profile/icons/arrow.svg";
import Search from "public/images/profile/icons/search.svg";

export default function CountrySelect() {
    return (
        <div
            className={clsx(styles["input-container"], "mb-3", styles["ml-8"])}
        >
            <div className={styles["filter-item"]}>
                <div className={styles["select-group"]}>
                    <div
                        className={clsx(
                            styles["select-btn"],
                            styles["border-dashed"]
                        )}
                    >
                        <div className={styles["content"]} onClick={() => {}}>
                            <h3 className={styles["label"]}>Country</h3>
                            <Image src={Arrow} alt="arrow" />
                        </div>
                        <div className={styles["selected-item"]}></div>
                    </div>
                    <div className={styles["select-content"]} id="countries">
                        <div
                            className={clsx(
                                styles["search-container"],
                                styles["bg-grey"]
                            )}
                        >
                            <input
                                type="text"
                                className={styles["border-grey"]}
                                placeholder="Search"
                            />
                            <Image
                                className={styles["search-icon"]}
                                src={Search}
                                alt="search icon"
                            />
                        </div>
                        <div>
                            <div>
                                <div
                                    className={clsx(
                                        styles["item"],
                                        styles["bg-grey"]
                                    )}
                                >
                                    <div className={styles["rating"]}>
                                        {/* <Image
                                                                src="/images/icons/star.svg"
                                                                alt=""
                                                            ></Image> */}
                                    </div>
                                    <div className={styles["flag"]}>
                                        {/* <img
                                                                src="/images/icons/flags/AM.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["short-name"]}>
                                        AM
                                    </div>
                                    <div className={styles["name"]}>
                                        Armenia
                                    </div>
                                </div>
                                <div
                                    className={clsx(
                                        styles["item"],
                                        styles["bg-grey"]
                                    )}
                                >
                                    <div className={styles["rating"]}>
                                        {/* <img
                                                                src="/images/icons/star.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["flag"]}>
                                        {/* <img
                                                                src="/images/icons/flags/SW.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["short-name"]}>
                                        CH
                                    </div>
                                    <div className={styles["name"]}>
                                        Switzerland
                                    </div>
                                </div>
                                <div
                                    className={clsx(
                                        styles["item"],
                                        styles["bg-grey"]
                                    )}
                                >
                                    <div className={styles["rating"]}>
                                        {/* <img
                                                                src="/images/icons/star.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["flag"]}>
                                        {/* <img
                                                                src="/images/icons/flags/CN.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["short-name"]}>
                                        CN
                                    </div>
                                    <div className={styles["name"]}>China</div>
                                </div>
                                <div
                                    className={clsx(
                                        styles["item"],
                                        styles["bg-grey"]
                                    )}
                                >
                                    <div className={styles["rating"]}>
                                        {/* <img
                                                                src="/images/icons/star.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["flag"]}>
                                        {/* <img
                                                                src="/images/icons/flags/DE.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["short-name"]}>
                                        DE
                                    </div>
                                    <div className={styles["name"]}>
                                        Germany
                                    </div>
                                </div>
                                <div
                                    className={clsx(
                                        styles["item"],
                                        styles["bg-grey"]
                                    )}
                                >
                                    <div className={styles["rating"]}>
                                        {/* <img
                                                                src="/images/icons/star.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["flag"]}>
                                        {/* <img
                                                                src="/images/icons/flags/DK.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["short-name"]}>
                                        DK
                                    </div>
                                    <div className={styles["name"]}>
                                        Denmark
                                    </div>
                                </div>
                                <div className="item">
                                    <div className={styles["rating"]}>
                                        {/* <img
                                                                src="/images/icons/star-active.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["flag"]}>
                                        {/* <img
                                                                src="/images/icons/flags/FR.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["short-name"]}>
                                        FR
                                    </div>
                                    <div className={styles["name"]}>France</div>
                                </div>
                                <div className="item">
                                    <div className={styles["rating"]}>
                                        {/* <img
                                                                src="/images/icons/star-active.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["flag"]}>
                                        {/* <img
                                                                src="/images/icons/flags/HK.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["short-name"]}>
                                        HK
                                    </div>
                                    <div className={styles["name"]}>
                                        Hongkong
                                    </div>
                                </div>
                                <div className="item">
                                    <div className={styles["rating"]}>
                                        {/* <img
                                                                src="/images/icons/star-active.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["flag"]}>
                                        {/* <img
                                                                src="/images/icons/flags/IT.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["short-name"]}>
                                        IT
                                    </div>
                                    <div className={styles["name"]}>Italy</div>
                                </div>
                                <div className="item">
                                    <div className={styles["rating"]}>
                                        {/* <img
                                                                src="/images/icons/star-active.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["flag"]}>
                                        {/* <img
                                                                src="/images/icons/flags/MO.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["short-name"]}>
                                        MO
                                    </div>
                                    <div className={styles["name"]}>Macau</div>
                                </div>
                                <div className="item">
                                    <div className={styles["rating"]}>
                                        {/* <img
                                                                src="/images/icons/star-active.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["flag"]}>
                                        {/* <img
                                                                src="/images/icons/flags/TW.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["short-name"]}>
                                        TW
                                    </div>
                                    <div className={styles["name"]}>Taiwan</div>
                                </div>
                                <div className="item">
                                    <div className={styles["rating"]}>
                                        {/* <img
                                                                src="/images/icons/star-active.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["flag"]}>
                                        {/* <img
                                                                src="/images/icons/flags/UK.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["short-name"]}>
                                        UK
                                    </div>
                                    <div className={styles["name"]}>
                                        United Kingdom
                                    </div>
                                </div>
                                <div className="item">
                                    <div className={styles["rating"]}>
                                        {/* <img
                                                                src="/images/icons/star-active.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["flag"]}>
                                        {/* <img
                                                                src="/images/icons/flags/US.svg"
                                                                alt=""
                                                            ></img> */}
                                    </div>
                                    <div className={styles["short-name"]}>
                                        US
                                    </div>
                                    <div className={styles["name"]}>
                                        United States
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
