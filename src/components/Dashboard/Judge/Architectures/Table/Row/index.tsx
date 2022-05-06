import styles from "../Table.module.scss";
import clsx from "clsx";
import { IJudgePost } from "types/judgePost";
import Image from "next/image";
import Link from "next/link";
interface IProps {
    data: IJudgePost;
}

export default ({ data }: IProps) => {
    const renderStars = () => {
        return new Array(10).fill(0).map((star, i) => {
            return (
                <div
                    key={i}
                    className={clsx(
                        styles["icon-star"],
                        i < data.rating && styles["active-star"]
                    )}
                ></div>
            );
        });
    };
    return (
        <tr id="row_1">
            <th className={styles["fixed-side"]}>
                <div className={styles["fix-side-content"]}>
                    <div className={clsx(styles["content"], styles["image"])}>
                        <Image
                            src={data.featuredImage.liveURL}
                            width={60}
                            height={60}
                        />
                    </div>
                    <div className={clsx(styles["content"], styles["project"])}>
                        <div className={styles["text"]}>{data.title}</div>
                    </div>
                    <div className={clsx(styles["content"], styles["id"])}>
                        {data.postUniqueId}-{data.language}
                    </div>
                </div>
            </th>
            <td>
                <div className={clsx(styles["content"], styles["applied"])}>
                    {data.applicationDate}
                </div>
            </td>
            <td>
                <div className={clsx(styles["content"], styles["company"])}>
                    {data.companyId.companyName}
                </div>
            </td>
            <td>
                <div className={clsx(styles["content"], styles["logo"])}>
                    <Image src={data.companyId.avatar} width={60} height={60} />
                </div>
            </td>
            <td>
                <div className={clsx(styles["content"], styles["award"])}>
                    Best Architecture 2022
                </div>
            </td>
            <td>
                <div className={styles["content"]}>{data.score}</div>
            </td>
            <td>
                <div className={clsx(styles["content"], styles["rating"])}>
                    {renderStars()}
                </div>
            </td>
            <td>
                <div
                    className={clsx(styles["content"], styles["edit-comment"])}
                >
                    <div className={styles["icon"]}>
                        <Link href={"/dashboard/post/" + data._id}>
                            <a className="link"></a>
                        </Link>
                    </div>
                    <div
                        className={clsx(
                            styles["rate-indicator"],
                            data.commetted && styles["active"]
                        )}
                    ></div>
                </div>
            </td>
        </tr>
    );
};
