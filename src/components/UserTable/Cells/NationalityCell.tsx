import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "../Table.module.scss";
import { useContext } from "react";
import Context from "../TableContext";
export default function NationalityCell({
    item,
    calculatePositionOfStickyHeaders,
    config,
    index,
}: any) {
    // @ts-ignore
    const { countries } = useContext(Context);
    // const countries = useSelector((state: any) => state.company.countries);
    const country =
        countries.find((country: any) => country._id === item.location) ??
        ({} as any);

    return (
        <td
            className={`text-center ${styles["nationality-td"]} ${
                index === 0 ? styles["first-cell"] : ""
            }`}
            style={{
                ...calculatePositionOfStickyHeaders(config),
                verticalAlign: "middle",
            }}
        >
            <img
                src={
                    country.avatar ||
                    "https://upload.jidipi.com/categories/location/worldwide.svg"
                }
                alt={"nationality"}
                width={28}
                loading="lazy"
            />
        </td>
    );
}
