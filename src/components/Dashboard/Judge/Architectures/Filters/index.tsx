import styles from "./index.module.scss";
import AwardFilter from "./AwardFilter";
import CategoryFilter from "./CategoryFilter";
import SearchFilter from "./SearchFilter";
import ScoreFilter from "./ScoreFilter";
import RatingFilter from "./RatingFilter";
import CommentFilter from "./CommentFilter";
import CandidatesFilter from "./CandidatesFilter";

export default () => {
    return (
        <div
            className={styles["architectures-filter"]}
        >
            <AwardFilter />
            <CategoryFilter />
            <SearchFilter />
            <ScoreFilter />
            <RatingFilter />
            <CommentFilter />
            <CandidatesFilter />
        </div>
    );
};
