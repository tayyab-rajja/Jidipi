import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../Table.module.scss";
import clsx from "clsx";

const cateogoryItemStyle = (userCategoryAccess: any, categoryId: any) => {
    const exist = userCategoryAccess.some((c: any) => c === categoryId);
    if (exist) {
        return {
            backgroundColor: "#373737",
        };
    }
    return null;
};

export default ({
    item,
    calculatePositionOfStickyHeaders,
    config,
    setUpdating,
    setSelectedItem,
    createUpdateItem,
    team,
    index,
}: any) => {
    const [folders, setFolders] = useState([]);
    // @ts-ignore
    let allFolders = useSelector((state) => state.folders.folders);
    const [competitionsPages, setCompetitionsPages] = useState([]);

    useEffect(() => {
        setFolders(() => {
            if (allFolders?.length) {
                return allFolders.filter(
                    (f: any) =>
                        f.pageType === "PRODUCT" || f.pageType === "PROJECT"
                );
            }
        });
    }, [allFolders]);

    useEffect(() => {
        setCompetitionsPages(() => {
            if (item && item.competitionPageFolderIds) {
                return item.competitionPageFolderIds;
            } else {
                return [];
            }
        });
    }, [item.competitionPageFolderIds]);

    const updateCategoryAccessDB = (competitionsPages: any) => {
        const updatedItem = {
            ...item,
            competitionPageFolderIds: competitionsPages,
            userId: item._id,
            username: item.email,
            teamId: team._id,
        };
        setUpdating(true);
        createUpdateItem(updatedItem);
        setTimeout(() => {
            setUpdating(false);
        }, 1000);
    };

    const updateCategoryAccess = (event: any, category: any) => {
        event.stopPropagation();
        let result: any;
        const categoryExist = !!competitionsPages.find(
            (c) => c === category._id
        );
        if (categoryExist) {
            setCompetitionsPages((competitionsPages) => {
                result = competitionsPages.filter((c) => c !== category._id);
                if (item._id !== "new_user") {
                    updateCategoryAccessDB(result);
                } else {
                    setSelectedItem((value: any) => {
                        return {
                            ...value,
                            competitionPageFolderIds: result,
                        };
                    });
                }
                return result;
            });
        } else {
            setCompetitionsPages((competitionsPages) => {
                result = [...competitionsPages, category._id];
                if (item._id !== "new_user") {
                    updateCategoryAccessDB(result);
                } else {
                    setSelectedItem((value: any) => {
                        return {
                            ...value,
                            competitionPageFolderIds: result,
                        };
                    });
                }
                return result;
            });
        }
    };
    return (
        <td
            className={`text-center ${styles["cateogory-access"]} ${
                index === 0 ? styles["first-cell"] : ""
            }`}
            style={{
                ...calculatePositionOfStickyHeaders(config),
                verticalAlign: "middle",
            }}
        >
            {folders?.map((c: any) => {
                return (
                    <span
                        key={c._id}
                        className={styles["cateogory-item"]}
                        style={
                            cateogoryItemStyle(competitionsPages, c._id) as any
                        }
                        onClick={(event) => updateCategoryAccess(event, c)}
                    >
                        {c.title.split("")[0].toUpperCase()}
                    </span>
                );
            })}
        </td>
    );
};
