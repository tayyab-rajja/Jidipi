import { MouseEventHandler, useState } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";

interface IProps {
    options: number[];
    onPageSizeChange: Function;
    pageSize: number;
}

function PageSize({ options, onPageSizeChange, pageSize }: IProps) {
    const [showOptions, setShowOptions] = useState(false);
    const changePageSizeHandler: MouseEventHandler<HTMLDivElement> = () => {
        setShowOptions((value) => !value);
    };

    const handlePageSize = (size: number) => {
        onPageSizeChange(size);
        setShowOptions(false);
    };
    return (
        <div className={styles["per-page-section"]}>
            <div className={styles["per-page"]}>
                <div className={styles["label"]}>Posts per Page</div>
                <div className={styles["custom-select"]}>
                    <div
                        className={`${styles["form-select"]} form-select`}
                        onClick={changePageSizeHandler}
                    >
                        {pageSize}
                    </div>
                    <ul
                        id="options"
                        className={clsx(
                            styles["options"],
                            showOptions && styles["open"]
                        )}
                    >
                        {options.map((o) => (
                            <li
                                onClick={() => handlePageSize(o)}
                                className={clsx(
                                    pageSize === o && styles["active"]
                                )}
                                key={o}
                            >
                                {o}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PageSize;
