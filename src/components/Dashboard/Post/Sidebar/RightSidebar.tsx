import React, {useContext, useEffect, useState} from "react";
import moment from "moment-timezone";
import styles from "./Sidebar.module.scss";
import {Profile} from "./Profile/Profile";
import {UserContext} from "../../../../providers/UserProvider";
import {isJudge, isPartner} from "../../../../lib/user/role";
import {PostStatus} from "../../../../lib/models/post";
import {PUT} from "../../../../lib/common/api";
import Image from "next/image";
import IconSave from "../../../../../public/dashboard/images/icon-status-save.svg";
import IconPublished from "../../../../../public/dashboard/images/icon-status-published.svg";
import {ChatType} from "../../Chat/Chat";
import {CountDown} from "./CountDown/CountDown";


interface PostRightSidebarProps {
    post:any,
    awards:any,
    competition:any,
}
/**
 * @paraconstructorm props
 * @
 * props.competition  from post/[id].tsx  post the competition
 *
 */
const PostRightSidebar = (props: PostRightSidebarProps) => {
    // get user from context
    const userContext: any = useContext(UserContext);
    const user = userContext.user;

    const {competition,   post, awards} = props;
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
        const a = {...application, status};
        console.log(a);
        SetApplication(a);
        try {
            // show a notification UI. notify when success or fail
            const result = await PUT("/competition/apply", a);
            console.log(result);
        } catch (e) {
        }
    }

    // EOF Partner application

    // Judge evaluation
    const [evaluation, SetEvaluation] = useState({
        competitionId: "",
        postId: "",
        rating: 0,
        comment: "",
    });
    const [ratingAt, setRatingAt] = useState(Date.now());

    useEffect(() => {
        if(post && post.ratingAt) setRatingAt(post.ratingAt);
    },[post])


    useEffect(() => {
        if (post && post.competitionId) {
        }
    }, [post]);

    async function reviewDraft() {
        await review(PostStatus.Draft);
    }

    const [ratingErrorMessage, setRatingErrorMessage] = useState("");
    async function reviewPublished() {
        if (!evaluation.rating) {
            setRatingErrorMessage("Please Rate before send Review");
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
        const e = {...evaluation, rating};
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
            <div className={`'col-lg'   ${styles['post-sidebar']}    ${styles['right']}     `}>

                <CountDown post={post}/>


                <div className={`${styles['main-widget']} ${styles['flex-grow']}   `}>

                    <Profile
                        title={'REVIEW'}
                        date={moment(ratingAt).format('YYYY-MM-DD')}
                        time={moment(ratingAt).format('HH:MM:SS')}
                        uniqueId={user.uniqueId}
                        name={(user.firstName + ' ' + user.lastName).trim()}
                        avatar={user && user.avatar? user.avatar : '//upload.jidipi.com/avatars/default.svg'} />

                        <div className={`${styles['main-widget-inner']}   ${styles['widget-text']}  flex-grow    `}>
                            <div className={`${styles['widget-textarea-main']}  ${styles['widget-border']} h-100`}>
                                    <textarea    className="h-100"  placeholder="Please add comment if you like this project."
                                                   value={evaluation.comment}
                                                   onChange={(e) => {

                                                       SetEvaluation({
                                                           ...evaluation,
                                                           comment: e.target.value,
                                                       });
                                                   }}>
                                    </textarea>
                            </div>
                        </div>
                        <div className={`${styles['main-widget-inner']}   `}>
                            <div className={`${styles['rate']}    `}>
                                <div className={`${styles['simple-rating']}  ${styles['star-rating']}    `}>
                                    {/*<div> */}
                                    {Array.from(Array(10).keys()).map((i) => {
                                        return <div key={i}
                                                    onClick={() => {
                                                        rating(i + 1);
                                                    }}
                                                    className={`${styles['icon-star']}  ${evaluation.rating >= (i + 1) ? styles['active-star'] :  ''}`}></div>;
                                    })}
                                </div>
                                <div onClick={()=>{
                                    setRatingErrorMessage("");
                                    console.log('on click' ,ratingErrorMessage,ratingErrorMessage.length);
                                }} className={`${styles['rate_err_msg']}  ${ratingErrorMessage.length===0?styles['display-none']:''}    `}>Please Rate before send Review</div>


                            </div>
                        </div>

                        <div className={`${styles['main-widget-inner']}    `}>
                            <button onClick={() => {
                                reviewDraft();
                            }}
                                    className={`${styles['save-review']}  ${styles['save-review-draft']}   d-flex justify-content-center align-items-center  `}>
                                <Image src={IconSave}/><span>Save Review as Draft</span>
                            </button>
                        </div>
                        <div className={`${styles['main-widget-inner']}    `}>
                            <button onClick={() => {
                                reviewPublished();
                            }}
                                    className={`${styles['save-review']}  ${styles['save-send-review']} ${evaluation   && evaluation.comment ?styles['commented']:''}    d-flex justify-content-center align-items-center  `}>

                                <Image src={IconPublished}/><span>Send Review to Jidipi</span>
                            </button>
                        </div>

                    </div>


            </div>
        );
    }
    if (isPartner(user)) {
        return (
            <div className={styles["Sidebar"]}>
                <h2>Partner Application</h2>
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
            </div>
        );
    }
    return <></>;
};
export default PostRightSidebar;

