import React, {useContext, useEffect, useState} from "react";
import moment from "moment-timezone";
import styles from "./Sidebar.module.scss";
import {Profile} from "./Profile/Profile";
import { UserContext} from "../../../../providers/UserProvider";
import {isJudge, isPartner} from "../../../../lib/user/role";
import {CountDown} from "./CountDown/CountDown";
import {PUT} from "../../../../lib/common/api";
import Image from "next/image";
import IconSave from "../../../../../public/dashboard/images/icon-status-save.svg";
import IconPublished from "../../../../../public/dashboard/images/icon-status-published.svg";
import {PostStatus} from "../../../../lib/models/post";
import ButtonCancelSvg from "../../../../../public/dashboard/images/icons/button-cancel.svg";
import ButtonSaveSvg from "../../../../../public/dashboard/images/icons/button-save.svg";
import SlideSvg from "../../../../../public/dashboard/images/icons/slide.svg";
import {Cookies} from "react-cookie";
const cookies = new Cookies();


interface PostSidebarProps {
    post: any,
    awards: any,
    competition?: any,
    countDown?: any,
}

/**
 * @paraconstructorm props
 * @
 * props.competition  from post/[id].tsx  post the competition
 *
 */
const PostLeftSidebar = (props: PostSidebarProps) => {
    // get user from context
    const userContext: any = useContext(UserContext);
    const user = userContext.user;
    const {post, awards, competition} = props;
    const neverShowAgain = cookies.get('partner-never-show-again');
    function evaluation(e: any) {
        return (
            <>
                <Profile
                    title={'REVIEW'}
                    date={moment.tz(e.ratingAt, 'Europe/Berlin').format('YYYY-MM-DD')}
                    time={moment.tz(e.ratingAt, 'Europe/Berlin').format('HH:MM:SS')}
                    uniqueId={e.judgeId.uniqueId}
                    // uniqueId={post.applicant.uniqueId}
                    name={(e.judgeId.firstName + ' ' + e.judgeId.lastName).trim()}
                    avatar={e.judgeId && e.judgeId.avatar ? e.judgeId.avatar : '//upload.jidipi.com/avatars/default.svg'}
                />

                <div className={`${styles['main-widget-inner']}    bg-white    `}>
                    <div className={` ${styles['widget-text']}  ${styles['widget-border']}   `}>
                        <p>
                            {e.comment}
                        </p>
                    </div>
                </div>
                <div className={`${styles['main-widget-inner']}   `}>
                    <div className={`${styles['rate']}    `}>
                        <div className={`${styles['simple-rating']}  ${styles['star-rating']}    `}>
                            {/*<div> */}
                            {Array.from(Array(10).keys()).map((i) => {
                                return <div key={i}  className={`${styles['icon-star']}  ${e.rating >= (i + 1) ? styles['active-star'] : ''}`}/>
                            })}
                        </div>

                    </div>
                </div>
            </>
        )
    }

    //Not start

    //http://localhost:3001/dashboard/post/616fff3b6d6ce9553bda897b


    // Partner application
    const [application, SetApplication] = useState({
        postId: "",
        competitionId: null,
        awardId: "",
        applicationReason: "",
        applicationStatus: "",
    });



    const ERR = {
        award: 'please select an award',
        reason: 'Please add a brief reason for application',
        replace: 'An application has already been send out. Do you want to replace it and send new application again?',
        send1: 'Your application will be submitted to Jidipi. You can amend or withdraw your application up to the application deadline.',
        send2: 'After the deadline, your application will be considered as final version for evaluation and cannot be changed any more.',
        before: 'Currently Unavailable',
    }
    const [error, setError] = useState<any | undefined>(undefined);

    function apply(status: string) {
        if (!application.awardId) {
            setError('award');
        } else if (!application.applicationReason) {
            setError('reason');
        } else if (status === PostStatus.Published  ) {
              if (application.applicationStatus === PostStatus.Published) setError('replace');
              else if(neverShowAgain) publish(status)
            else setError('send');
        } else if (status === PostStatus.Draft) {
            publish(status);
        }
    }

    async function publish(status: string = PostStatus.Published) {
        try {
            setError(undefined);
            // show a notification UI. notify when success or fail
            await PUT("/competition/apply", {...application, applicationStatus: status});
        } catch (e) {
        }
    }
    async function sendAndDonNotShow() {
          cookies.set('partner-never-show-again',true)  ;
         await publish();
    }


    enum STATUS {
        before,  // partner before competition start,
        doing = 1,
        after = 2,
    }

    const [countDown, setCountDown] = useState<any | undefined>(undefined);
    const [status, setStatus] = useState(STATUS.after);

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
                applicationStatus: post.applicationStatus,
            };
            SetApplication(application);


            if (isJudge(user)) {
                // if (competition && competition.winningStartDate > new Date()) setCountDown(competition.winningStartDate);
            } else if (isPartner(user)) {
                // if (competition)
                if (moment(competition.competitionStartDate).format('YYYYMMDD') > moment().format('YYYYMMDD')) {
                    setCountDown(competition.competitionStartDate);
                    setStatus(STATUS.before);
                } else if (moment(competition.competitionStartDate).format('YYYYMMDD') <= moment().format('YYYYMMDD')
                    && moment(competition.competitionEndDate).format('YYYYMMDD') >= moment().format('YYYYMMDD')
                ) {
                    setStatus(STATUS.doing);
                } else {
                    setStatus(STATUS.after);
                }
                setStatus(STATUS.after)
            }
        }
    }, [user, post, competition]);

    if (!post || !competition) return (<div/>);

    const name = post.applicant ? (post.applicant.firstName + ' ' + post.applicant.lastName).trim() : ''
    const profileWidget = () => (
        <Profile
            title={'APPLICATION'}
            date={post.competitionId && moment.tz(post.competitionId.applicationDate, 'Europe/Berlin').format('YYYY-MM-DD')}
            time={post.competitionId && moment.tz(post.competitionId.applicationDate, 'Europe/Berlin').format('HH:MM:SS')}
            uniqueId={post.applicant && post.applicant.uniqueId}
            // uniqueId={post.applicant.uniqueId}
            name={name}
            avatar={post.applicant && post.applicant.avatar ? post.applicant.avatar : '//upload.jidipi.com/avatars/default.svg'}
        />
    );
    const awardsWidget = () => (
        <div className={`${styles['main-widget-inner']}    `}>
            <div className={`${styles['awards-btn']}    `}>
                {error === 'award' &&
                    <div onClick={() => setError(undefined)}
                         className={`${styles['cover']} text-center`}>
                        <p>{ERR.award}</p></div>}
                {application && awards.map((award: any, index: number) => {
                    return <button key={index}
                                   onClick={() => {
                                       SetApplication({
                                           ...application,
                                           awardId: award._id,
                                       });
                                   }}
                                   className={`btn ${styles['btn']} ${award._id === application.awardId ? styles['active'] : ''}`}>{award.title}
                    </button>
                })}
            </div>
        </div>
    );

    return (
        <div className={`'col-lg'   ${styles['post-sidebar']}   `}>
            <div className={`${styles['main-widget']} ${styles['flex-grow']}   `}>
                {countDown && <CountDown date={countDown}/>}
                {/*EOF COUNTDOWN*/}
                <div className={`${styles['relative']}  `}>
                    {status === STATUS.before &&
                        <div className={`${styles['cover']} ${styles['err-before']}  text-center`}>
                            <p>{ERR.before}</p>
                        </div>
                    }
                    {/*{isPartner(user) && status !== STATUS.after && <>*/}
                    <div className={`${styles['relative']}  `}>
                        {error && ['replace', 'send'].includes(error) &&
                            <div className={`${styles['cover']} text-start `}>
                                <div className="h-100 d-flex flex-column  justify-content-around">
                                {error === 'send' ?
                                     <> <div className={`  ${styles['cover-buttons']}   `}>Do not show this message again
                                <Image className={styles['cover-top-button-icon']} src={SlideSvg} onClick={()=>{sendAndDonNotShow()}}/>
                                </div>
                                    <div><p>{ERR.send1} <br/><br/><br/>
                                        {ERR.send2}</p></div></>

                                    : <p>{ERR.replace}</p>}


                                <div className={`  ${styles['cover-buttons']}  d-flex justify-content-around `}>

                                        <button onClick={() => setError(undefined)} type="button"
                                                className={`  ${styles['btn']} btn btn-light btn-sm `}>
                                            <Image className={styles["cover-button-icon"]} src={ButtonCancelSvg}/>Cancel
                                        </button>


                                        <button onClick={() => {     publish()          }} type="button"
                                                className={`  ${styles['btn']} btn btn-light btn-sm `}>
                                   <Image  className={styles["cover-button-icon"]} src={ButtonSaveSvg} />Confirm
                                        </button>

                                </div>
                                </div>
                            </div>}
                        {profileWidget()}
                        {awardsWidget()}

                        {isPartner(user) && status !== STATUS.after ?
                            <div
                                className={`${styles['main-widget-inner']}   ${styles['bgf1']}  ${styles['widget-text']} ${styles['widget-textarea-main']}    ${styles['flex-grow']}    `}>


                                <div
                                    className={` ${styles['widget-border']} h-100`}>
                                    {error === 'reason' &&
                                        <div onClick={() => setError(undefined)}
                                             className={`${styles['cover']} text-center`}><p>{ERR.reason}</p></div>}
                                    <textarea className="h-100"
                                              placeholder="Please add comment if you like this project."
                                              value={application.applicationReason}
                                              onChange={(e) => {
                                                  SetApplication({
                                                      ...application,
                                                      applicationReason: e.target.value,
                                                  });
                                              }}>
                                    </textarea>
                                </div>


                            </div>

                            :
                            <>
                                <div className={`${styles['main-widget-inner']}    bg-white    `}>
                                    <div className={` ${styles['widget-text']}  ${styles['widget-border']}   `}>
                                        <p>
                                            {post.applicationReason}
                                        </p>
                                    </div>
                                </div>

                                {isPartner(user) && status === STATUS.after && post.evaluations &&
                                    post.evaluations.map((e: any, i: number) => {
                                        return (
                                            <div key={i}        className={`${styles['main-widget']} ${styles['pt-18']}  `}>{evaluation(e)} </div>)
                                    })
                                }
                            </>
                        }
                    </div>
                    {isPartner(user) && status !== STATUS.after && <>
                        {application.applicationStatus !== PostStatus.Published &&
                            <div className={`${styles['main-widget-inner']} text-left   `}>
                                <button onClick={() => {
                                    apply(PostStatus.Draft);
                                }}
                                        className={`${styles['save-review']}  ${styles['save-review-draft']}   d-flex justify-content-center align-items-center  `}>
                                    <Image src={IconSave}/><span>Save Application as Draft</span>
                                </button>
                            </div>
                        }

                        <div className={`${styles['main-widget-inner']}    `}>
                            <button onClick={() => {
                                apply(PostStatus.Published);
                            }}
                                    className={`${styles['save-review']}  ${styles['save-send-review']}   ${application.applicationReason ? styles['commented'] : ''}    d-flex justify-content-center align-items-center  `}>

                                <Image src={IconPublished}/><span>Send Application for Competition</span>
                            </button>
                        </div>
                    </>}

                    {/*</>}*/}
                </div>


            </div>
        </div>)


};
export default PostLeftSidebar;

