import styles from "./index.module.scss";
import clsx from "clsx";

function Wrapper({ isOpen, Child }: any) {
    return (
        <div className={clsx(styles["processing"], isOpen && styles["open"])}>
            {Child}
        </div>
    );
}

export default Wrapper;
