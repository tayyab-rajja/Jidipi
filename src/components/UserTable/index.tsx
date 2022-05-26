import React, { useRef, useState, useCallback, useEffect } from "react";
import useScrollable from "src/hooks/useScrollable";
import styles from "src/components/UserTable/Table.module.scss";
import clsx from "clsx";
import Row from "./Row";
// import { useContextMenu } from 'react-contexify';
// import ContextMenu from 'components/ContextMenu';
import { insertInsideArray } from "src/utils/array";

export default ({
    team,
    // index,
    tableData,
    items,
    setItems,
    setInitalItemProps,
    // moveUp,
    // moveDown,
    contextData,
    // setContextData,
    createUpdateItem,
    getItems,
    // menuId,
    targetRole,
}: any) => {
    const table = useRef<any>();
    const tableHeaderRow = useRef<any>();
    const tableRows = useRef<any[]>([]);
    const [selectedItem, setSelectedItem] = useState(null);
    // const [isUsersFetched, setIsUsersFetched] = useState(false)
    // const { show } = useContextMenu({
    //     id: menuId,
    // });

    // Make table scrollable by dragging the click.
    useScrollable(table);

    // Sometimes the content width of the cell is much bigger than given in the
    // config file, so the next element left position will be less than expected.
    // so we need to recalculate the cell left position if it's sticky.
    useEffect(() => {
        tableRows.current = tableRows.current.slice(0, items.length);
        if (tableRows.current.length) {
            let allTime = 0;
            Array.from(tableRows.current).forEach((row: any, i: number) => {
                var start = window.performance.now();
                reCalculatePositionOfStickyHeaders(Array.from(row.children));
                var end = window.performance.now();
                allTime += end - start;
            });
            // console.log(allTime)
            const headerTableData = Array.from(
                (tableHeaderRow.current as any).children
            );
            reCalculatePositionOfStickyHeaders(headerTableData);
            // make scroll left the most possible
            (table.current as any).scrollLeft = (
                table.current as any
            ).offsetWidth;
            // setIsUsersFetched(true)
        }
    }, [items]);

    const reCalculatePositionOfStickyHeaders = useCallback(
        (headerTableData) => {
            let totalWidths = 0;
            headerTableData.forEach((child: any, i: any) => {
                const nextChild = headerTableData[i + 1];
                if (
                    child.style.position === "sticky" &&
                    nextChild.style.position === "sticky"
                ) {
                    totalWidths += child.offsetWidth;
                    nextChild.style.left = totalWidths + "px";
                }
            });
        },
        []
    );

    //   calculate sticky headers position to left
    //   start from 0, first item will "position: 0px"
    //   then will follow by the width if previous elements
    //   if first header width = 60px, so the second header position = 60px;
    //   third header will be equal (first item width + second item width) and so on.

    const calculatePositionOfStickyHeaders = useCallback((header) => {
        let left = 0;
        let zIndex = 20;
        if (header.sticky) {
            for (let i = 0; i < header.index; i++) {
                const element = getConfig(i);
                left += element.style.minWidth;
                zIndex--;
            }
            const style = {
                ...header.style,
                position: "sticky",
                left,
                zIndex,
            };
            return style;
        }
        return null;
    }, []);

    const getConfig = useCallback((i) => {
        return tableData.headers[Object.keys(tableData.headers)[i]];
    }, []);

    // Calculate the style of thead => tr => td
    const headerTdStyle = useCallback((header) => {
        return {
            ...calculatePositionOfStickyHeaders(header),
            ...header.style,
        };
    }, []);

    const handleRowClick = useCallback((item) => {
        setSelectedItem((value) => {
            if (value === item) {
                return null;
            }
            return item;
        });
    }, []);

    // const handleContextMenu = useCallback((event, data) => {
    //     setContextData(data);
    //     show(event);
    // }, []);

    const addNewMember = useCallback(() => {
        const item = setInitalItemProps("new_user");
        const newItems = insertInsideArray(
            [...items].filter((f) => f._id !== "new_user"),
            contextData.index + 1,
            item
        );
        setItems(newItems);
        setSelectedItem(item);
    }, [items, contextData?.index]);

    const addOldMember = useCallback(() => {
        const id = "existing_user";
        const item = setInitalItemProps(id);
        const newItems = insertInsideArray(
            [...items].filter((f) => f._id !== id),
            contextData.index + 1,
            item
        );
        setItems(newItems);
        setSelectedItem(item);
    }, [items, contextData?.index]);

    const onClear = useCallback(
        (id) => {
            if (id) {
                const newItems = items.filter((item: any) => item._id !== id);
                return setItems(newItems);
            }
        },
        [items]
    );

    return (
        <div className={clsx(styles["table-container"], "px-3")}>
            {/* <ContextMenu
                menuId={menuId}
                contextData={contextData}
                addNewMember={addNewMember}
                addOldMember={addOldMember}
                moveUp={moveUp}
                moveDown={moveDown}
                users={items}
                isStaff={tableData.isStaff}
            /> */}
            <div
                className={clsx(
                    styles["bg-dark"],
                    "text-white",
                    "d-flex",
                    "align-items-center",
                    styles["table-header"]
                )}
            >
                <h6 className="text-center w-100 m-0">{team.name}</h6>
            </div>
            <div
                className={clsx(
                    styles["judge-table"],
                    "table-responsive",
                    "w-100"
                )}
                ref={table}
            >
                <table className="table">
                    <thead>
                        <tr
                            className={clsx(
                                "text-center",
                                styles["bg-light-gray"]
                            )}
                            ref={tableHeaderRow}
                        >
                            {Object.keys(tableData.headers).map((h, i) => (
                                <th
                                    key={i}
                                    style={headerTdStyle(tableData.headers[h])}
                                    scope="col"
                                    className={clsx(
                                        styles["table-header-td"],
                                        i === 0 ? styles["first-cell"] : ""
                                    )}
                                >
                                    {tableData.headers[h].name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {/* <tbody>
                        {items.map((user: any, i: number) => {
                            return (
                                <Row
                                    key={user._id}
                                    item={user}
                                    team={team}
                                    tableData={tableData}
                                    setSelectedItem={setSelectedItem}
                                    selectedItem={selectedItem}
                                    onClick={handleRowClick}
                                    index={i}
                                    onClear={onClear}
                                    calculatePositionOfStickyHeaders={
                                        calculatePositionOfStickyHeaders
                                    }
                                    createUpdateItem={createUpdateItem}
                                    getItems={getItems}
                                    items={items}
                                    targetRole={targetRole}
                                    setItems={setItems}
                                    table={table}
                                    setInitalItemProps={setInitalItemProps}
                                    innerRef={(el: any) =>
                                        (tableRows.current[i] = el)
                                    }
                                />
                            );
                        })}
                        <tr className={styles["table-footer"]}>
                            <td
                                className={styles["first-cell"]}
                                colSpan={11}
                            ></td>
                        </tr>
                    </tbody> */}
                </table>
            </div>
        </div>
    );
};
