import styles from "./index.module.scss";
import SearchFilter from "./SearchFilter";
import CandidatesFilter from "./CandidatesFilter";
import PlaceholderSelect from "./PlaceholderSelect";
import AwardData from "constant/filters/award";
import ScoreData from "constant/filters/score";
import RatingData from "constant/filters/rating";
import CommentData from "constant/filters/comment";
import ListIcon from "public/images/filters/list.svg";
import ChatIcon from "public/images/filters/chat.svg";
import StarIcon from "public/images/filters/star.svg";
import ScoreIcon from "public/images/filters/score.svg";
import AwardIcon from "public/images/filters/award.svg";

interface IProps {
    categories: { title: string; _id: string }[];
    handleChange: Function;
}

export default ({ categories, handleChange }: IProps) => {
    return (
        <div className={styles["architectures-filter"]}>
            <PlaceholderSelect
                options={AwardData}
                id="award"
                prop="awardId"
                className="award"
                placeholder="Award"
                handleChange={handleChange}
                icon={AwardIcon}
            />
            <PlaceholderSelect
                options={categories}
                prop="categories"
                id="category"
                className="category"
                placeholder="Categories"
                icon={ListIcon}
                handleChange={handleChange}
            />
            <SearchFilter />
            <PlaceholderSelect
                options={ScoreData}
                id="score"
                prop="score"
                className="score"
                placeholder="Score"
                icon={ScoreIcon}
                handleChange={handleChange}
            />
            <PlaceholderSelect
                options={RatingData}
                id="rating"
                prop="rating"
                className="rating"
                placeholder="Rating"
                icon={StarIcon}
                handleChange={handleChange}
            />
            <PlaceholderSelect
                options={CommentData}
                prop="comment"
                id="comment"
                className="comment"
                placeholder="Comment"
                icon={ChatIcon}
                handleChange={handleChange}
            />
            <CandidatesFilter />
        </div>
    );
};
