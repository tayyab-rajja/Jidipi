import styles from "../Table.module.scss";

export default ({ calculatePositionOfStickyHeaders, config, index }: any) => {
    return (
        <td
            className={`${index === 0 ? styles["first-cell"] : ""}`}
            style={calculatePositionOfStickyHeaders(config)}
        ></td>
    );
};
