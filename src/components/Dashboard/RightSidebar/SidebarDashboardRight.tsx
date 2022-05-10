import React, { useEffect, useState } from "react";
import { isJudge, isPartner, isReader, isStaff } from "../../../lib/user/role";
import { PostStatus } from "../../../lib/models/post";
import styles from "./SidebarDashboardRight.module.css";
import { PUT } from "../../../lib/common/api";
import UploadFile from "../File/File";
import dynamic from "next/dynamic";
import { ChatType } from "../Chat/Chat";
import Countdown, { CountdownTimeDeltaOptions } from "react-countdown";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMessage } from "@fortawesome/free-solid-svg-icons";

// import Chat from "../Chat/Chat";
const Chat = dynamic(() => import("../Chat/Chat"), { ssr: false });
/**
 * @param props
 * @constructor
 * props.competition  from post/[id].tsx  post the competition
 * props.user  from post/[id].tsx  post the user
 * props.menus if without competition and user, use the preset menus to render the layout.
 *
 */
const SidebarDashboardRight = (props: any) => {
    const { competition, user, post, awards } = props;
    const [hoverRating, setHoverRating] = useState(0);
    const [ratingError, setRatingError] = useState("");
    const [commentError, setCommentError] = useState("");
    //create an array of 1-10 numbers
    const startCounts = new Array(10).fill(0).map((_, index) => index + 1);

    //the award that is currently being binded to the post.
    const award = awards.find((award: any) => award._id === post.awardId);

    // get awards of the competition
    // Awards under current competition and current page folder.
    useEffect(() => {
        if (!user || !post || !competition) {
            return;
        }
        if (isPartner(user)) {
            // If partner, load the application data from post.
            const application = {
                postId: post._id,
                competitionId: competition._id,
                awardId: post.awardId,
                applicationReason: post.applicationReason,
                status: post.competitionId
                    ? PostStatus.Published
                    : PostStatus.Draft,
            };
            SetApplication(application);
        }
        if (isJudge(user)) {
            SetEvaluation({
                competitionId: post.competitionId,
                postId: post._id,
                rating: post.rating,
                comment: post.comment,
            });
        }
    }, [user, post, competition]);

    // Partner application
    const [application, SetApplication] = useState({
        postId: "",
        competitionId: null,
        awardId: "",
        applicationReason: "",
        status: "",
    });

    async function apply(status: string) {
        const a = { ...application, status };
        console.log(a);
        SetApplication(a);
        try {
            // show a notification UI. notify when success or fail
            const result = await PUT("/competition/apply", a);
            console.log(result);
        } catch (e) {}
    }

    // EOF Partner application

    // Judge evaluation
    const [evaluation, SetEvaluation] = useState({
        competitionId: "",
        postId: "",
        rating: 0,
        comment: "",
    });

    async function reviewDraft() {
        await review(PostStatus.Draft);
    }
    async function reviewPublished() {
        if (!evaluation.rating) {
            console.log("Please rate the post before publishing.");
            return;
        }
        await review(PostStatus.Published);
    }

    async function review(status: string) {
        const result = await PUT("/competition/judge", {
            ...evaluation,
            status,
        });
        console.log("follow action for success for failed", result);
    }

    async function rating(rating: number) {
        const e = { ...evaluation, rating };
        SetEvaluation(e);
        const result = await PUT("/competition/judge", e);
        console.log("follow action for success for failed", result);
    }

    // EOF Judge evaluation
    const ratingColor = (rating: number): string => {
        if (rating <= hoverRating || rating <= evaluation.rating) {
            return "#333";
        }

        return "#999";
    };

    const ratingHoverEffect = (rating: number) => {
        setHoverRating(rating);
    };

    // hide the rating and comment section after a few seconds.
    const runTimer = async () => {
        //wait 3 sec
        await new Promise((resolve) => setTimeout(resolve, 3000));
        //hide the rating and comment section
        setCommentError("");
        setRatingError("");
    };

    // check if empty
    const isError = () => {
        if (evaluation.comment === "") {
            setCommentError("Please write your comment");
            return true;
            runTimer();
        }

        if (evaluation.rating === 0) {
            setRatingError("Please rate before submit");
            return true;
            runTimer();
        }
        return false;
    };

    if (isJudge(user)) {
        return (
            <div className={styles["Sidebar"]}>
                {/* my codes */}

                {/* code a widget */}
                <div className={styles["widget"]}>
                    {/* code a title} */}

                    <h3 className={`${styles["title"]} text-center`}>
                        Deadline
                    </h3>

                    {/* code two deadline dates */}

                    <div className={`${styles["deadline"]} row`}>
                        {/* from */}
                        <div
                            className={`${styles["deadline-date"]} ${styles["right-border"]} col-md-6 text-center`}
                        >
                            <sub className={styles["deadline-date-title"]}>
                                from
                            </sub>
                            <span className={styles["deadline-date-content"]}>
                                {/* {competition.applicationDeadline
                                ? competition.applicationDeadline
                                : "12:12:2012"} */}
                                12:12:2012
                            </span>
                        </div>
                        {/* until */}
                        <div
                            className={`${styles["deadline-date"]} col-md-6 text-center`}
                        >
                            <sub className={styles["deadline-date-title"]}>
                                until
                            </sub>
                            <span className={styles["deadline-date-content"]}>
                                {/* {competition.reviewDeadline
                                ? competition.reviewDeadline
                                : "12:12:2012"} */}
                                12:12:2022
                            </span>
                        </div>
                    </div>

                    {/* code countdown */}
                    <div className={`${styles["countdown"]} text-center`}>
                        <Countdown date={Date.now() + 10000} />
                        <p
                            className={`${styles["cowntdown-text"]} text-center`}
                        >
                            <span className={`${styles["cd-days"]}`}>DAYS</span>

                            <span className={`${styles["cd-hours"]}`}>
                                HOURS
                            </span>

                            <span className={`${styles["cd-minutes"]}`}>
                                MINUTES
                            </span>

                            <span className={`${styles["cd-seconds"]}`}>
                                SECONDS
                            </span>
                        </p>
                    </div>
                </div>

                {/* Code review widget */}
                <div className={styles["widget"]}>
                    {/* code a title */}
                    <h3 className={`${styles["title"]} text-center`}>Review</h3>

                    {/* date and time for review widget */}
                    <div className={`${styles["deadline"]} row`}>
                        {/* from */}
                        <div
                            className={`${styles["deadline-date"]} ${styles["right-border"]} col-md-6 text-center`}
                        >
                            <span className={styles["deadline-date-content"]}>
                                12:12:2012
                            </span>
                        </div>
                        {/* until */}
                        <div
                            className={`${styles["deadline-date"]} col-md-6 text-center`}
                        >
                            <span className={styles["deadline-date-content"]}>
                                04:12:34
                            </span>
                        </div>
                    </div>

                    {/* Judge info for review widget*/}
                    <div className={`${styles["judge-info"]}`}>
                        {/* judge name */}
                        <div
                            className={`${styles["judge-info-name"]} row text-center`}
                        >
                            {/*image of judge profile*/}
                            <Image
                                src="https://via.placeholder.com/150"
                                alt="judge profile"
                                width={50}
                                height={50}
                                className={`${styles["judge-info-image"]} col-md-4 m-auto`}
                            />

                            <span
                                className={`${styles["judge-info-name-content"]} col-md-4`}
                            >
                                John Doe
                            </span>

                            <span
                                className={`${styles["judge-info-name-title"]} col-md-4`}
                            >
                                Judge
                            </span>
                        </div>
                    </div>

                    {/* code a comment box */}
                    <div
                        className={`${styles["comment-box"]} text-center pt-3 pb-3`}
                    >
                        <textarea
                            className={`${styles["comment-box-text"]} text-center`}
                            placeholder="Write your comment here..."
                            value={evaluation.comment}
                            rows={1}
                            cols={50}
                            //defaultValue={evaluation.comment}
                            onChange={(e) =>
                                SetEvaluation({
                                    ...evaluation,
                                    comment: e.target.value,
                                })
                            }
                        />
                        {/* error message */}
                        {commentError && (
                            <span className={styles["comment-box-error"]}>
                                {commentError}
                            </span>
                        )}
                    </div>

                    {/* code a rating widget */}
                    <div className={styles["rating-widget"]}>
                        <div className={styles["main-widget-inner"]}>
                            <div
                                className={`${styles["rate"]} text-center p-3 mt-3`}
                            >
                                <input
                                    className={`${styles["rating"]} text-center`}
                                    type="hidden"
                                    value={evaluation.rating}
                                />

                                {startCounts.map((count, index) => {
                                    return (
                                        <FontAwesomeIcon
                                            color={ratingColor(count)}
                                            key={index}
                                            icon={faStar}
                                            id={`star-${count}`}
                                            onMouseOver={() =>
                                                ratingHoverEffect(count)
                                            }
                                            onClick={() => {
                                                // setSelectedRating(count);
                                                rating(count);
                                            }}
                                            onMouseLeave={() =>
                                                setHoverRating(
                                                    evaluation.rating
                                                )
                                            }
                                        />
                                    );
                                })}

                                {/* <div className="rate_err_msg" style="display: none;">Please Rate before send Review</div> */}
                                {/* error message */}
                                {ratingError && (
                                    <span className={styles["rating-error"]}>
                                        {ratingError}
                                    </span>
                                )}
                            </div>

                            <button
                                className={`w-100 p-3 mt-3 mb-3 text-center ${`${styles["top-submit-btn"]} ${styles["submit-btn"]}`}`}
                                onClick={() => {
                                    if (!isError()) {
                                        reviewDraft();
                                    }
                                }}
                            >
                                <Image
                                    src="/dashboard/right-sidebar/icon-status-save.svg"
                                    alt="submit"
                                    width={30}
                                    height={30}
                                    className={`${styles["submit-btn-icon"]}`}
                                />
                                Save Review As Draft
                            </button>
                            <button
                                className={`w-100 p-3 mt-0 mb-3 text-center ${styles["submit-btn"]}`}
                                onClick={() => {
                                    if (!isError()) {
                                        reviewPublished();
                                    }
                                }}
                            >
                                <Image
                                    src="/dashboard/right-sidebar/icon-status-published.svg"
                                    alt="submit"
                                    width={30}
                                    height={30}
                                    className={`${styles["submit-btn-icon"]}`}
                                />
                                Send Review To JIDIPI
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (isPartner(user)) {
        return (
            <div className={styles["Sidebar"]}>
                <h2>Partner Application</h2>
                <p></p>
                {awards.map((award: any) => (
                    <React.Fragment key={award._id}>
                        <p></p>
                        <button
                            onClick={() => {
                                SetApplication({
                                    ...application,
                                    awardId: award._id,
                                });
                            }}
                            className={`nav-link  ${
                                award._id === application.awardId
                                    ? "active"
                                    : ""
                            }`}
                        >
                            {award.title}
                            {award._id === application.awardId ? "(*)" : ""}
                        </button>
                    </React.Fragment>
                ))
                // competition.awards
                }
                <p></p>
                <textarea
                    value={application.applicationReason}
                    onChange={(e) => {
                        if (e.target.value)
                            SetApplication({
                                ...application,
                                applicationReason: e.target.value,
                            });
                    }}
                />
                <p></p>
                <button
                    onClick={() => {
                        apply(PostStatus.Published);
                    }}
                >
                    Send Application to Competition
                </button>
                <p></p>
                {application.status !== PostStatus.Published && (
                    <button
                        onClick={() => {
                            apply(PostStatus.Draft);
                        }}
                    >
                        Save Draft
                    </button>
                )}
                <p></p>
                <Chat postId={post._id} chatType={ChatType.PartnerChat}></Chat>
            </div>
        );
    }
    return <></>;
};

export default SidebarDashboardRight;
