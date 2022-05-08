import styles from "./Table.module.scss";
import clsx from "clsx";
import Image from "next/image";
import Row from "./Row";
import { IJudgePost } from "types/judgePost";
import TableHeader from "./TableHeader";
import { sort } from "types/queryParameters";

interface IProps {
    options: IJudgePost[];
    handleSizeChange: Function;
    sort: sort;
}

function Table({ options, handleSizeChange, sort }: IProps) {
    return (
        <div className={styles["architectures-table"]}>
            <div className={styles["table-block"]}>
                <div className={styles["tables"]}>
                    <div id="table-scroll" className={styles["table-scroll"]}>
                        <div className={styles["table-wrap"]}>
                            <table className={styles["main-table"]}>
                                <TableHeader
                                    handleSizeChange={handleSizeChange}
                                    sort={sort}
                                />
                                <tbody>
                                    {options.map((row, i) => (
                                        <Row key={i} data={row} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;
