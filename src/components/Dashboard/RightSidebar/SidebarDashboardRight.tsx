import React, { useEffect, useState } from "react";
import { isJudge, isPartner, isReader, isStaff } from "../../../lib/user/role";
import { PostStatus } from "../../../lib/models/post";
import styles from "./SidebarDashboardRight.module.css";
import { PUT } from "../../../lib/common/api";
import UploadFile from "../File/File";
import dynamic from "next/dynamic";
import { ChatType } from "../Chat/Chat";
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

    if (isJudge(user)) {
        return (
            <div className={styles["Sidebar"]}>
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
                                            <sup>from</sup>2023-01-01
                                        </p>
                                    </div>
                                    <div className="col d-flex justify-content-center align-items-center px-0">
                                        <p>
                                            <sup>until</sup>2023-03-31
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main-widget-inner timer-counter">
                            <div
                                className="uk-grid-small d-flex align-items-center justify-content-center"
                                uk-grid
                                uk-countdown="date: 2022-07-03T09:10:11+00:00"
                            >
                                <div className="timer-counter-grid">
                                    <div className="uk-countdown-number uk-countdown-days"></div>
                                    <div className="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">
                                        Days
                                    </div>
                                </div>
                                <div className="uk-countdown-separator">
                                    &nbsp
                                </div>
                                <div className="timer-counter-grid">
                                    <div className="uk-countdown-number uk-countdown-hours"></div>
                                    <div className="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">
                                        Hours
                                    </div>
                                </div>
                                <div className="uk-countdown-separator">:</div>
                                <div className="timer-counter-grid">
                                    <div className="uk-countdown-number uk-countdown-minutes"></div>
                                    <div className="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">
                                        Minutes
                                    </div>
                                </div>
                                <div className="uk-countdown-separator">:</div>
                                <div className="timer-counter-grid">
                                    <div className="uk-countdown-number uk-countdown-seconds"></div>
                                    <div className="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">
                                        Seconds
                                    </div>
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
                                        <p>2023-03-03</p>
                                    </div>
                                    <div className="col d-flex justify-content-center align-items-center px-0">
                                        <p>12 : 01 : 34</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main-widget-inner bgf1">
                            <div className="steve-job">
                                <div className="row">
                                    <div className="col-12 d-flex align-items-center">
                                        <div className="steve-job-img">
                                            <img src="img/avatar-m-18.png" />
                                        </div>
                                        <p>2ds-29d-000</p>
                                        <p>Steve Paul Jobs</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main-widget-inner widget-text">
                            <div className="widget-textarea-main widget-border">
                                <form>
                                    <textarea placeholder="Please add comment if you like this project."></textarea>

                                    {/* { Modal } */}
                                    <div
                                        className="modal_check show"
                                        id="myModal"
                                        role="dialog"
                                    >
                                        <div className="modal-dialog modal-dialog-centered">
                                            {/* Modal content--> */}
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <p className="d-flex align-items-center">
                                                        Do not show this message
                                                        again
                                                        <label className="switch">
                                                            <input type="checkbox" />
                                                            <span className="slider-on-off round"></span>
                                                        </label>
                                                    </p>
                                                    <div className="modal-text-inner">
                                                        <p>
                                                            Your review will
                                                            send to Jidipi now.
                                                            You can reedit it
                                                            before deadline.
                                                            After deadline, your
                                                            review will be
                                                            published to
                                                            applicants, and will
                                                            been seen by other
                                                            judges.{" "}
                                                        </p>
                                                        <p>
                                                            Send our for sure?
                                                        </p>
                                                    </div>

                                                    <div className="modal_check_btn d-flex align-items-center">
                                                        <button>
                                                            <i className="fas fa-times"></i>{" "}
                                                            Cancel
                                                        </button>
                                                        <button>
                                                            <i className="fas fa-check"></i>{" "}
                                                            Confirm
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!----- modal close ----> */}
                                </form>
                            </div>
                        </div>

                        <div className="main-widget-inner">
                            <div className="rate">
                                <input
                                    className="rating"
                                    type="hidden"
                                    value=""
                                />

                                <div className="rate_err_msg">
                                    Please Rate before send Review
                                </div>
                            </div>
                        </div>

                        <div className="main-widget-inner">
                            <button className="save-review save-review-draft d-flex justify-content-center align-items-center">
                                <img src="img/icon-status-save.svg" />
                                <span>Save Review as Draft</span>
                            </button>
                        </div>
                        <div className="main-widget-inner">
                            <button className="save-review save-send-review d-flex justify-content-center align-items-center">
                                <img src="img/icon-status-published.svg" />
                                <span>Send Review to Jidipi</span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <textarea
                            value={evaluation.comment}
                            onChange={(e) => {
                                if (e.target.value)
                                    SetEvaluation({
                                        ...evaluation,
                                        comment: e.target.value,
                                    });
                            }}
                        />
                        <p></p>
                        {Array.from(Array(10).keys()).map((k) => (
                            <React.Fragment key={k}>
                                <button
                                    onClick={() => {
                                        rating(k);
                                    }}
                                    className={`nav-link  ${
                                        evaluation.rating === k ? "active" : ""
                                    }`}
                                >
                                    {k}
                                    {evaluation.rating === k ? "(*)" : ""}
                                </button>
                            </React.Fragment>
                        ))}
                        <p></p> <p></p>
                        <button
                            onClick={() => {
                                reviewDraft();
                            }}
                        >
                            Save as Draft ....
                        </button>
                        <p></p>
                        <button
                            onClick={() => {
                                reviewPublished();
                            }}
                        >
                            Send to JIDIPI ....
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
