import styles from "./index.module.scss";
import clsx from "clsx";
import { PageFolder } from "types/pageFolderType";

interface IProps {
    statuses: any;
    menuFolders: PageFolder[];
    competitionPageFolderIds: string[];
}

function Process({ statuses, menuFolders, competitionPageFolderIds }: IProps) {
    let folders: any = [];
    if (competitionPageFolderIds && statuses && menuFolders) {
        folders = menuFolders.map((folder) => {
            const access = competitionPageFolderIds.some(
                (folderId) => folderId === folder._id
            );
            const toEvaluateInAllPages = statuses.toEvaluateInAllPages.find(
                (e: { _id: string; count: number }) => e._id === folder._id
            )?.count;
            const evaluatedInAllPages = statuses.evaluatedInAllPages.find(
                (e: { _id: string; count: number }) => e._id === folder._id
            )?.count;
            const percentage =
                evaluatedInAllPages &&
                toEvaluateInAllPages &&
                (+evaluatedInAllPages / +toEvaluateInAllPages) * 100;
            return {
                ...folder,
                access,
                evaluatedInAllPages,
                toEvaluateInAllPages,
                percentage,
            };
        });
    }
    console.log(folders);
    return (
        <>
            <div className={styles["process-list"]}>
                {folders.map(
                    ({
                        title,
                        toEvaluateInAllPages,
                        evaluatedInAllPages,
                        _id,
                        percentage,
                        access,
                    }: any) => {
                        if (access) {
                            return (
                                <div className={styles["item"]} key={_id}>
                                    <label>{title.toUpperCase()}</label>
                                    <div
                                        className={`${clsx(
                                            styles["progress-bar"],
                                            styles[title]
                                        )} progress-bar`}
                                    >
                                        <div
                                            className={styles["active"]}
                                            style={{
                                                width: percentage ? percentage + "%" : '0%',
                                            }}
                                        >
                                            <span>
                                                {evaluatedInAllPages || 0}
                                            </span>
                                        </div>
                                        <span>{toEvaluateInAllPages || 0}</span>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div className={styles["item"]} key={_id}>
                                    <label>{ title.toUpperCase() }</label>
                                    <div
                                        className={`${styles["progress-bar"]} progress-bar`}
                                    >
                                    </div>
                                </div>
                            );
                        }
                    }
                )}
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
}

export default Process;
