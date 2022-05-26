import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "../Table.module.scss";

export default ({
    item,
    calculatePositionOfStickyHeaders,
    config,
    index,
}: any) => {
    // @ts-ignore
    const countries = useSelector((state) => state.company.countries);
    const country = useMemo(() => {
        const country = countries.find(
            (country: any) => country._id === item.location
        );
        return country ? country : {};
    }, [item.location, countries]);

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
};
