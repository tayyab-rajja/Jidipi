import { useState, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import AwardFilter from "./AwardFilter";
import CategoryFilter from "./CategoryFilter";
import SearchFilter from "./SearchFilter";
import ScoreFilter from "./ScoreFilter";
import RatingFilter from "./RatingFilter";
import CommentFilter from "./CommentFilter";
import CandidatesFilter from "./CandidatesFilter";

export default () => {
    const [openedSelect, setOpenedSelect] = useState("");
    const architecturesFilter = useRef<HTMLDivElement | null>(null);
    const openSelect = (listId: string): void => {
        setOpenedSelect((value: string): string => {
            if (value === listId) {
                return "";
            } else {
                return listId;
            }
        });
    };
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            const targetElement = target as HTMLElement;
            const item = targetElement.closest(
                `.${styles["item"]}`
            ) as HTMLElement;
            if (item) {
                setOpenedSelect("");
                const selectGroup = targetElement.closest(
                    `.${styles["select-group"]}`
                ) as HTMLElement;
                const content = selectGroup.querySelector(
                    `.${styles["content"]}`
                ) as HTMLElement;
                const selectedItem = selectGroup.querySelector(
                    `.${styles["selected-item"]}`
                ) as HTMLElement;
                if (selectedItem) {
                    content.classList.add(styles["hide"]);
                    selectedItem.classList.add(styles["show-flex"]);
                    selectedItem.innerHTML = `<h3 class="${styles["label"]}">
                        ${item.innerText}
                        </h3> <img src="/images/filters/xmark.svg"  onclick="removeSelectedAward()">`;
                }
            }
        };
        architecturesFilter.current?.addEventListener("click", clickHandler);

        return () => {
            architecturesFilter.current?.removeEventListener(
                "click",
                clickHandler
            );
        };
    }, []);
    return (
        <div
            className={styles["architectures-filter"]}
            ref={architecturesFilter}
        >
            <AwardFilter openSelect={openSelect} openedSelect={openedSelect} />
            <CategoryFilter
                openSelect={openSelect}
                openedSelect={openedSelect}
            />
            <SearchFilter openSelect={openSelect} openedSelect={openedSelect} />
            <ScoreFilter openSelect={openSelect} openedSelect={openedSelect} />
            <RatingFilter openSelect={openSelect} openedSelect={openedSelect} />
            <CommentFilter
                openSelect={openSelect}
                openedSelect={openedSelect}
            />
            <CandidatesFilter
                openSelect={openSelect}
                openedSelect={openedSelect}
            />
        </div>
    );
};
