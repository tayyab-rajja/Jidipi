import clsx from "clsx";
import { useState } from "react";
import styles from "./index.module.scss";
// import Process from "../Process";

export default ({ Child, Wrapper }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen((value) => !value);
    };
    return (
        <section className={styles["process-section"]}>
            <Wrapper isOpen={isOpen} Child={Child}></Wrapper>

            <div className={clsx(styles["tools"], "text-end")}>
                <button className={styles["btn-process"]} onClick={handleClick}>
                    Process
                </button>
            </div>
        </section>
    );
};
