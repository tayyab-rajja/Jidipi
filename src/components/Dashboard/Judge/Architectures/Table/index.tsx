import styles from "./Table.module.scss";
import clsx from "clsx";
import ArrowUp from "public/images/table/arrow-up.svg";
import ArrowDown from "public/images/table/arrow-down.svg";
import Image from "next/image";
import Row from './Row'
import { IJudgePost } from "types/judgePost";

interface IProps {
    options: IJudgePost[]
}

export default ({ options }: IProps) => {
    return (
        <div className={styles["architectures-table"]}>
            <div className={styles["table-block"]}>
                <div className={styles["tables"]}>
                    <div id="table-scroll" className={styles["table-scroll"]}>
                        <div className={styles["table-wrap"]}>
                            <table className={styles["main-table"]}>
                                <thead>
                                    <tr>
                                        <th
                                            className={styles["fixed-side"]}
                                            scope="col"
                                        >
                                            <div
                                                className={styles["fix-header"]}
                                            >
                                                <div
                                                    className={clsx(
                                                        styles["item"],
                                                        styles["image"]
                                                    )}
                                                >
                                                    IMAGE
                                                </div>
                                                <div
                                                    className={clsx(
                                                        styles["item"],
                                                        styles["project"]
                                                    )}
                                                >
                                                    <Image
                                                        src={ArrowUp}
                                                        alt="arrow up icon"
                                                    />
                                                    PROJECT
                                                    <Image
                                                        src={ArrowDown}
                                                        alt="arrow down icon"
                                                    />
                                                </div>
                                                <div
                                                    className={clsx(
                                                        styles["item"],
                                                        styles["id"]
                                                    )}
                                                >
                                                    <Image
                                                        src={ArrowUp}
                                                        alt="arrow up icon"
                                                    />
                                                    ID
                                                    <Image
                                                        src={ArrowDown}
                                                        alt="arrow down icon"
                                                    />
                                                </div>
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className={styles["applied"]}
                                        >
                                            <Image
                                                src={ArrowUp}
                                                alt="arrow up icon"
                                            />
                                            APPLIED
                                            <Image
                                                src={ArrowDown}
                                                alt="arrow down icon"
                                            />
                                        </th>
                                        <th
                                            scope="col"
                                            className={styles["company"]}
                                        >
                                            <Image
                                                src={ArrowUp}
                                                alt="arrow up icon"
                                            />
                                            COMPANY
                                            <Image
                                                src={ArrowDown}
                                                alt="arrow down icon"
                                            />
                                        </th>
                                        <th scope="col">LOGO</th>
                                        <th
                                            scope="col"
                                            className={styles["award"]}
                                        >
                                            AWARD
                                        </th>
                                        <th scope="col">
                                            <Image
                                                src={ArrowUp}
                                                alt="arrow up icon"
                                            />
                                            SCORE
                                            <Image
                                                src={ArrowDown}
                                                alt="arrow down icon"
                                            />
                                        </th>
                                        <th scope="col">
                                            <Image
                                                src={ArrowUp}
                                                alt="arrow up icon"
                                            />
                                            RATING
                                            <Image
                                                src={ArrowDown}
                                                alt="arrow down icon"
                                            />
                                        </th>
                                        <th scope="col">EDIT COMMENT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { options.map(row => <Row data={row} />) }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* <div className="per-page-section">
                    <div className="per-page">
                        <div className="label">Posts per Page</div>
                        <div className="custom-select">
                            <div
                                className="form-select"
                                onClick={() => console.log("clicked")}
                            >
                                20
                            </div>
                            <ul id="options" className="options">
                                <li className="active">20</li>
                                <li>100</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="pagination">
                    <div className="item">
                        <div className="content">
                            <img src="/images/icons/angle-left.svg" />
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">199</div>
                    </div>
                    <div className="item active">
                        <div className="content">...</div>
                    </div>
                    <div className="item">
                        <div className="content">21</div>
                    </div>
                    <div className="item">
                        <div className="content">20</div>
                    </div>
                    <div className="item">
                        <div className="content">19</div>
                    </div>
                    <div className="item">
                        <div className="content">18</div>
                    </div>
                    <div className="item">
                        <div className="content">17</div>
                    </div>
                    <div className="item">
                        <div className="content">16</div>
                    </div>
                    <div className="item">
                        <div className="content">15</div>
                    </div>
                    <div className="item">
                        <div className="content">...</div>
                    </div>
                    <div className="item">
                        <div className="content">1</div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <img src="/images/icons/angle-right.svg" />
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};
