import styles from "../Table.module.scss";
import clsx from "clsx";
import Image from "next/image";
import ArrowUp from "public/images/icons/arrow-up.svg";
import ArrowDown from "public/images/icons/arrow-down.svg";
import ArrowUpActive from "public/images/icons/arrow-up-active.svg";
import ArrowDownActive from "public/images/icons/arrow-down-active.svg";
import { sort } from "types/queryParameters";

interface IProps {
    handleSizeChange: Function;
    sort: sort;
}

function TableHeader({ handleSizeChange, sort }: IProps) {
    const tableHeaders = {
        fixedSide: [
            {
                id: 1,
                name: "IMAGE",
                style: "image",
                field: "image",
                sortable: false,
            },
            {
                id: 2,
                name: "PROJECT",
                style: "project",
                field: "title",
                sortable: true,
            },
            {
                id: 3,
                name: "ID",
                style: "id",
                field: "postUniqueId",
                sortable: true,
            },
        ],
        scrollableSide: [
            {
                id: 4,
                name: "APPLIED",
                style: "applied",
                field: "publishedDate",
                sortable: true,
            },
            {
                id: 5,
                name: "COMPANY",
                style: "company",
                field: "companyName",
                sortable: true,
            },
            {
                id: 6,
                name: "LOGO",
                style: null,
                field: null,
                sortable: false,
            },
            {
                id: 7,
                name: "AWARD",
                style: "award",
                field: "award",
                sortable: false,
            },
            {
                id: 8,
                name: "SCORE",
                style: null,
                field: "score",
                sortable: true,
            },
            {
                id: 9,
                name: "RATING",
                style: null,
                field: "rating",
                sortable: true,
            },
            {
                id: 10,
                name: "EDIT COMMENT",
                style: null,
                field: null,
                sortable: false,
            },
        ],
    };

    return (
        <thead>
            <tr>
                <th className={styles["fixed-side"]} scope="col">
                    <div className={styles["fix-header"]}>
                        {tableHeaders.fixedSide.map(
                            ({ name, sortable, style, field, id }) => (
                                <div
                                    key={id}
                                    className={clsx(
                                        styles["item"],
                                        styles[style]
                                    )}
                                >
                                    {sortable && (
                                        <Image
                                            className={styles["arrow"]}
                                            src={
                                                sort.field === field &&
                                                sort.order === 1
                                                    ? ArrowUpActive
                                                    : ArrowUp
                                            }
                                            alt="arrow up icon"
                                            onClick={() => {
                                                handleSizeChange(field, 1);
                                            }}
                                        />
                                    )}
                                    {name}
                                    {sortable && (
                                        <Image
                                            className={styles["arrow"]}
                                            src={
                                                sort.field === field &&
                                                sort.order === -1
                                                    ? ArrowDownActive
                                                    : ArrowDown
                                            }
                                            alt="arrow down icon"
                                            onClick={() => {
                                                handleSizeChange(field, -1);
                                            }}
                                        />
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </th>
                {tableHeaders.scrollableSide.map(
                    ({ id, name, sortable, style, field }) => (
                        <th
                            key={id}
                            scope="col"
                            className={clsx(style && styles[style])}
                        >
                            {sortable && (
                                <Image
                                    className={styles["arrow"]}
                                    src={
                                        sort.field === field && sort.order === 1
                                            ? ArrowUpActive
                                            : ArrowUp
                                    }
                                    alt="arrow up icon"
                                    onClick={() => {
                                        handleSizeChange(field, 1);
                                    }}
                                />
                            )}
                            {name}
                            {sortable && (
                                <Image
                                    className={styles["arrow"]}
                                    src={
                                        sort.field === field &&
                                        sort.order === -1
                                            ? ArrowDownActive
                                            : ArrowDown
                                    }
                                    alt="arrow down icon"
                                    onClick={() => {
                                        handleSizeChange(field, -1);
                                    }}
                                />
                            )}
                        </th>
                    )
                )}
            </tr>
        </thead>
    );
}

export default TableHeader;
