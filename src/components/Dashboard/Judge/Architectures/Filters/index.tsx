import globalStyles from "src/components/Dashboard/Filters/index.module.scss";
import SearchFilter from "src/components/Dashboard/Filters/SearchFilter";
import CandidatesFilter from "../../../Filters/CandidatesFilter";
import PlaceholderSelect from "src/components/Dashboard/Filters/PlaceholderSelect";
import AwardData from "constant/filters/award";
import ScoreData from "constant/filters/score";
import RatingData from "constant/filters/rating";
import CommentData from "constant/filters/comment";
import ListIcon from "public/images/icons/list.svg";
import ChatIcon from "public/images/icons/chat.svg";
import StarIcon from "public/images/icons/star.svg";
import ScoreIcon from "public/images/icons/score.svg";
import AwardIcon from "public/images/icons/award.svg";
import { postFilters } from "types/queryParameters";
import { FilterItem } from "constant/filters/interface";
import styles from "./Filters.module.scss";

interface IProps {
    categories: { title: string; _id: string }[];
    handleChange: Function;
    filterParameters: postFilters;
    statuses: { [key: string]: number };
    awards: { _id: string; title: string }[];
}

function Filters({
    categories,
    handleChange,
    filterParameters,
    statuses,
    awards,
}: IProps) {
    RatingData.forEach((item: FilterItem) => {
        item.count = statuses?.[item._id] || 0;
    });
    CommentData.forEach((item: FilterItem) => {
        item.count = statuses?.[item._id] || 0;
    });

    return (
        <div className={globalStyles["filters-container"]}>
            <PlaceholderSelect
                options={awards}
                id="award"
                prop="awardId"
                className="award"
                placeholder="Award"
                handleChange={handleChange}
                icon={AwardIcon}
                value={filterParameters["awardId"]}
                gridClass={styles["award"]}
            />
            <PlaceholderSelect
                options={categories}
                prop="categories"
                id="category"
                className="category"
                placeholder="Categories"
                icon={ListIcon}
                handleChange={handleChange}
                value={filterParameters["categories"]}
                gridClass={styles["category"]}
            />
            <SearchFilter
                handleChange={handleChange}
                value={filterParameters["searchKey"]}
                prop="searchKey"
                gridClass={styles["search-section"]}
            />
            <PlaceholderSelect
                options={ScoreData}
                id="score"
                prop="score"
                className="score"
                placeholder="Score"
                icon={ScoreIcon}
                handleChange={handleChange}
                value={filterParameters["score"]}
                gridClass={styles["score"]}
            />
            <PlaceholderSelect
                options={RatingData}
                id="rating"
                prop="rating"
                className="rating"
                placeholder="Rating"
                icon={StarIcon}
                handleChange={handleChange}
                value={filterParameters["rating"]}
                gridClass={styles["rating"]}
            />
            <PlaceholderSelect
                options={CommentData}
                prop="comment"
                id="comment"
                className="comment"
                placeholder="Comment"
                icon={ChatIcon}
                handleChange={handleChange}
                value={filterParameters["comment"]}
                gridClass={styles["comment"]}
            />
            <CandidatesFilter
                handleChange={handleChange}
                value={filterParameters["candidate"] as string}
                prop="candidate"
                statuses={statuses}
                gridClass={styles["candidates"]}
            />
        </div>
    );
}

export default Filters;
