import React from "react";
import {useRouter} from "next/router";
import moment from "moment-timezone";
import styles from "./Sidebar.module.scss";

/**
 * @paraconstructorm props
 * @
 * props.competition  from post/[id].tsx  post the competition
 *
 */
const JudgeSidebar = (props: any) => {
    const router = useRouter();
    const {competition, user, post, menus, awards} = props;


    return (
        <div className={`'col-lg' ${styles['left-sidebar']}     ${styles['pt-20']}`}>
            <div className={styles['main-widget-grid']}>
                <div className={styles['main-widget']}>
                    <div className={`${styles['widget-title']} text-center `}>
                        <h3>APPLICATION</h3>
                    </div>
                    <div className={`${styles['main-widget-inner']}  ${styles['bgf1']}   `}>
                        <div className={styles['date-and-time']}>
                            <div className={`row  mx-0 `}>
                                <div className="col d-flex justify-content-center align-items-center px-0">
                                    <p>{moment.tz(post.competitionId.applicationDate, 'Europe/Berlin').format('YYYY-MM-DD')}</p>
                                </div>
                                <div className="col d-flex justify-content-center align-items-center px-0">
                                    <p>{moment.tz(post.competitionId.applicationDate, 'Europe/Berlin').format('HH:MM:SS')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles['main-widget-inner']}  ${styles['bgf1']}   `}>
                        <div className={`${styles['steve-job']}   `}>
                            <div className="row">
                                <div className="col-12 d-flex align-items-center px-0">
                                    <div className="col d-flex justify-content-center align-items-center px-0">
                                        <div className={`${styles['steve-job-img']}   `}>
                                            <img
                                                src={post.applicant && post.applicant.avatar ? post.applicant.avatar : '//upload.jidipi.com/avatars/default.svg'}/>
                                        </div>
                                    <p>{post.companyId.partnerId}</p>
                                    </div>
                                    <div className="col d-flex justify-content-center align-items-center px-0">
                                    <p>{(post.applicant.firstName + ' ' + post.applicant.lastName).trim()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={`${styles['main-widget-inner']}    `}>
                        <div id="awards-btn" className={`${styles['awards-btn']}    `}>
                            {awards.map((award: any, index: number) => {
                                return <button key={index}
                                               className={`${styles['btn']} ${award._id === post.awardId ? styles['active'] : ''}`}>{award.title}</button>
                            })}
                        </div>
                    </div>


                    <div className={`${styles['main-widget-inner']}  ${styles['bgf1']}  ${styles['widget-text']}   `}>
                        <div className={`${styles['widget-text-main']}  ${styles['widget-border']}   `}>
                            <p>
                                {post.applicationReason}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>)

};

export default JudgeSidebar;

