import styles from "./index.module.scss";
import clsx from "clsx";

export default ({ isOpen, Child }: any) => {
    console.log(Child)
    return (
        <div className={clsx(styles["processing"], isOpen && styles["open"])}>
            {Child}
        </div>
    );
};
