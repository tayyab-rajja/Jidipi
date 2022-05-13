import styles from "../Sidebar.module.scss";
import moment from "moment-timezone";
import React, {ReactElement} from "react";

interface ProfileProps {
     title: string;
     date: string;
     time: string;
     avatar?: string;
     uniqueId: string;
     name:string

}
export const Profile = (props: ProfileProps) => {
    return (
<>
    <div className={`${styles['widget-title']} text-center `}>
        <h3>{props.title}</h3>
    </div>
    <div className={`${styles['main-widget-inner']}  ${styles['bgf1']}   `}>
        <div className={styles['date-and-time']}>
            <div className={`row  mx-0 `}>
                <div className="col d-flex justify-content-center align-items-center px-0">
                    <p>{props.date}</p>
                </div>
                <div className="col d-flex justify-content-center align-items-center px-0">
                    <p>{props.time}</p>
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
                                src={props.avatar ?? '//upload.jidipi.com/avatars/default.svg'}/>
                        </div>
                        <p>{props.uniqueId}</p>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center px-0">
                        <p>{props.name}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
    );
}