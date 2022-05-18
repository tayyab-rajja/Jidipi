import clsx from "clsx";
import { useState } from "react";
import styles from "./index.module.scss";
// import Process from "../Process";

function TopDropdown({ Child, Wrapper, TopDropdownButtonName }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen((value) => !value);
    };
    return (
        <section className={styles["process-section"]}>
            {Wrapper && <Wrapper isOpen={isOpen} Child={Child}></Wrapper>}

            <div className={clsx(styles["tools"], "text-end")}>
                <button className={styles["btn-process"]} onClick={handleClick}>
                    {TopDropdownButtonName || "TOP MENU"}
                </button>
            </div>
        </section>
    );
}

export default TopDropdown;
