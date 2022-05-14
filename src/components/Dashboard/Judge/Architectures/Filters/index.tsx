import styles from "./index.module.scss";
import SearchFilter from "./SearchFilter";
import CandidatesFilter from "./CandidatesFilter";
import PlaceholderSelect from "./PlaceholderSelect";
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

interface IProps {
    categories: { title: string; _id: string }[];
    handleChange: Function;
    filterParameters: postFilters;
    statuses: { [key: string]: number };
    awards: { _id: string; title: string }[]
}

function Filters({
    categories,
    handleChange,
    filterParameters,
    statuses,
    awards
}: IProps) {
    RatingData.forEach((item: FilterItem) => {
        item.count = statuses?.[item._id] || 0;
    });
    CommentData.forEach((item: FilterItem) => {
        item.count = statuses?.[item._id] || 0;
    });

    return (
        <div className={styles["architectures-filter"]}>
            <PlaceholderSelect
                options={awards}
                id="award"
                prop="awardId"
                className="award"
                placeholder="Award"
                handleChange={handleChange}
                icon={AwardIcon}
                value={filterParameters["awardId"]}
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
            />
            <SearchFilter
                handleChange={handleChange}
                value={filterParameters["searchKey"]}
                prop="searchKey"
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
            />
            <CandidatesFilter
                handleChange={handleChange}
                value={filterParameters["candidate"] as string}
                prop="candidate"
                statuses={statuses}
            />
        </div>
    );
}

export default Filters;
