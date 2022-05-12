import React, {useContext} from "react";
import {useRouter} from "next/router";
import moment from "moment-timezone";
import styles from "./Sidebar.module.scss";
import {Profile} from "./Profile/Profile";
import {UserContext} from "../../../../providers/UserProvider";
import {isJudge} from "../../../../lib/user/role";


interface PostSidebarProps {
    post:any,
    awards:any,
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
    const {  post,  awards} = props;
    console.log(post)
    if(isJudge(user) ){
        return (
            <div className={`'col-lg'   ${styles['post-sidebar']}     ${styles['pt-20']}`}>
                <div className={`${styles['main-widget']} ${styles['flex-grow']}   `}>
                    <Profile
                        title={'APPLICATION'}
                        date={moment.tz(post.competitionId.applicationDate, 'Europe/Berlin').format('YYYY-MM-DD')}
                        time={moment.tz(post.competitionId.applicationDate, 'Europe/Berlin').format('HH:MM:SS')}
                        uniqueId={post.applicant.uniqueId ?? post.companyId.partnerId}
                        // uniqueId={post.applicant.uniqueId}
                        name={(post.applicant.firstName + ' ' + post.applicant.lastName).trim()}
                        avatar={post.applicant && post.applicant.avatar ? post.applicant.avatar : '//upload.jidipi.com/avatars/default.svg'}
                    />

                    <div className={`${styles['main-widget-inner']}    `}>
                        <div  className={`${styles['awards-btn']}    `}>
                            {awards.map((award: any, index: number) => {
                                return <button key={index} className={`btn ${styles['btn']} ${award._id === post.awardId ? styles['active'] : ''}`}>{award.title}</button>
                            })}
                        </div>
                    </div>


                    <div className={`${styles['main-widget-inner']}    ${styles['flex-grow']}  ${styles['bgf1']}  ${styles['widget-text']}   `}>
                        <div className={`${styles['widget-text-main']}  ${styles['widget-border']}   `}>
                            <p>
                                {post.applicationReason}
                            </p>
                        </div>
                    </div>
                </div>
            </div>)
    }else{
        return (<div>Partner</div>);
    }
};
export default PostLeftSidebar;

