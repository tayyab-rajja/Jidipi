import styles from "../Table.module.scss";

export default function EmptyCell({
    calculatePositionOfStickyHeaders,
    config,
    index,
}: any) {
    return (
        <td
            className={`${index === 0 ? styles["first-cell"] : ""}`}
            style={calculatePositionOfStickyHeaders(config)}
        ></td>
    );
}
