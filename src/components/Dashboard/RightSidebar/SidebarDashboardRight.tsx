import React, {useEffect, useState} from "react";
import {isJudge, isPartner, isReader, isStaff} from "../../../lib/user/role";
import {PostStatus} from "../../../lib/models/post";
import styles from "./SidebarDashboardRight.module.css";
import {PUT} from "../../../lib/common/api";
import UploadFile from "../File/File";
import dynamic from "next/dynamic";
import {ChatType} from "../Chat/Chat";
import Countdown, {CountdownTimeDeltaOptions} from "react-countdown";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faMessage} from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";

import IconPublished from "public/dashboard/images/icon-status-published.svg";
import IconSave from "public/dashboard/images/icon-status-save.svg";
import {useCountdown} from "../../../lib/competition/countdown";


// import Chat from "../Chat/Chat";
const Chat = dynamic(() => import("../Chat/Chat"), {ssr: false});
/**
 * @param props
 * @constructor
 * props.competition  from post/[id].tsx  post the competition
 * props.user  from post/[id].tsx  post the user
 * props.menus if without competition and user, use the preset menus to render the layout.
 *
 */
const SidebarDashboardRight = (props: any) => {
    const {competition, user, post, awards} = props;
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


    const [days, hours, minutes, seconds] = useCountdown(post.competitionId.winningEndDate);
    useEffect(() => {
        if(post && post.competitionId){
        }
    }, [post]);
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
    console.log(post);
    console.log(user);
    if (isJudge(user)) {
        return (
            <div className="col-lg right-sidebar pt-20">
                <div className="main-widget-grid">
                    <div className="main-widget">
                        <div className="widget-title text-center">
                            <h3>DEADLINE</h3>
                        </div>
                        <div className="main-widget-inner bgf1">
                            <div className="date-and-time">
                                <div className="row mx-0">
                                    <div className="col d-flex justify-content-center align-items-center px-0">
                                        <p>
                                            <sup>from</sup>{moment.tz(post.competitionId.winningStartDate, 'Europe/Berlin').format('YYYY-MM-DD')}
                                        </p>
                                    </div>
                                    <div className="col d-flex justify-content-center align-items-center px-0">
                                        <p>
                                            <sup>until</sup>{moment.tz(post.competitionId.winningEndDate, 'Europe/Berlin').format('YYYY-MM-DD')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-widget-inner timer-counter">
                        <div className="uk-grid-small d-flex align-items-center justify-content-center uk-grid uk-countdown">
                            <div className="timer-counter-grid uk-first-column">
                                <div className="uk-countdown-number uk-countdown-days"><span>{days}
                                </span>
                                </div>
                                <div className="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">Days
                                </div>
                            </div>
                            <div className="uk-countdown-separator">&nbsp;</div>
                            <div className="timer-counter-grid">
                                <div className="uk-countdown-number uk-countdown-hours"><span>{hours}</span>
                                </div>
                                <div className="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">Hours
                                </div>
                            </div>
                            <div className="uk-countdown-separator">:</div>
                            <div className="timer-counter-grid">
                                <div className="uk-countdown-number uk-countdown-minutes"><span>{minutes}</span>
                                </div>
                                <div
                                    className="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">Minutes
                                </div>
                            </div>
                            <div className="uk-countdown-separator">:</div>
                            <div className="timer-counter-grid">
                                <div className="uk-countdown-number uk-countdown-seconds"><span>{seconds}</span>
                                </div>
                                <div
                                    className="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">Seconds
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main-widget">
                        <div className="widget-title text-center">
                            <h3>REVIEW</h3>
                        </div>
                        <div className="main-widget-inner bgf1">
                            <div className="date-and-time">
                                <div className="row mx-0">
                                    <div className="col d-flex justify-content-center align-items-center px-0">
                                        <p>{moment(post.ratingAt).format('YYYY-MM-DD')}</p>
                                    </div>
                                    <div className="col d-flex justify-content-center align-items-center px-0">
                                        <p>{moment(post.ratingAt).format('HH:MM:SS')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main-widget-inner bgf1">
                            <div className="steve-job">
                                <div className="row">
                                    <div className="col-12 d-flex align-items-center">
                                        <div className="steve-job-img">
                                            {/*<img src="img/avatar-m-18.png">*/}
                                        </div>
                                        <p>2ds-29d-000</p>
                                        <p>{(user.firstName + ' ' + user.lastName).trim()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main-widget-inner widget-text">
                            <div className="widget-textarea-main widget-border">
                                    <textarea
                                        placeholder="Please add comment if you like this project."

                                        value={evaluation.comment}
                                        onChange={(e) => {
                                            if (e.target.value)
                                                SetEvaluation({
                                                    ...evaluation,
                                                    comment: e.target.value,
                                                });
                                        }}>
                                    </textarea>
                            </div>
                        </div>
                        {/*{Array.from(Array(10).keys()).map((k) => (*/}
                        {/*    <React.Fragment key={k}>*/}
                        {/*        <button*/}
                        {/*            onClick={() => {*/}
                        {/*                rating(k);*/}
                        {/*            }}*/}
                        {/*            className={`nav-link  ${*/}
                        {/*                evaluation.rating === k ? "active" : ""*/}
                        {/*            }`}*/}
                        {/*        >*/}
                        {/*            {k}*/}
                        {/*            {evaluation.rating === k ? "(*)" : ""}*/}
                        {/*        </button>*/}
                        {/*    </React.Fragment>*/}
                        {/*))}*/}
                        <div className="main-widget-inner">
                            {/*    <div className="rate">*/}
                            {/*        <input className="rating" type="hidden" value="" />*/}
                            {/*            <div className="rate_err_msg">Please Rate before send Review</div>*/}
                            {/*    </div>*/}
                            <div className="rate">
                                <div className="simple-rating star-rating">
                                    {Array.from(Array(10).keys()).map((i) => {
                                        return     <i key={i}
                                                                  onClick={() => {
                                                                      rating(i+1);
                                                                  }}
                                                      className={`fa-star fas ${evaluation.rating>=(i+1)?'rated':''}`} ></i>;
                                    })}
                                    {/*<i className="fa-star fas"*/}
                                    {/*                                          data-rating="1"></i>*/}
                                    {/*<i*/}
                                    {/*className="fa-star fas" data-rating="2"></i>*/}
                                    {/*<i className="fa-star fas"*/}
                                    {/*                                               data-rating="3"></i><i*/}
                                    {/*className="fa-star fas" data-rating="4"></i><i className="fa-star fas"*/}
                                    {/*                                               data-rating="5"></i><i*/}
                                    {/*className="fa-star fas" data-rating="6"></i><i className="fa-star far"*/}
                                    {/*                                               data-rating="7"></i><i*/}
                                    {/*className="fa-star far" data-rating="8"></i><i className="far fa-star"*/}
                                    {/*                                               data-rating="9"></i><i*/}
                                    {/*className="far fa-star" data-rating="10"></i>*/}
                                </div>


                            </div>
                        </div>

                        <div className="main-widget-inner">
                            <button onClick={() => {
                                reviewDraft();
                            }}
                                    className="save-review save-review-draft d-flex justify-content-center align-items-center">
                                <Image src={IconSave}/><span>Save Review as Draft</span>
                            </button>
                        </div>
                        <div className="main-widget-inner">
                            <button onClick={() => {
                                reviewPublished();
                            }}
                                    className="save-review save-send-review d-flex justify-content-center align-items-center">
                                <Image src={IconPublished}/><span>Send Review to Jidipi</span>
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
