import styles from "../Sidebar.module.scss";
import moment from "moment-timezone";
import React from "react";
import {useCountdown} from "../../../../../lib/competition/countdown";
import {isPartner} from "../../../../../lib/user/role";


export const CountDown = (props: any) => {
    const date = props.date;
    const [days, hours, minutes, seconds] = useCountdown(date);

    return (<div className={styles['main-widget']}>
        <div className={`${styles['widget-title']} text-center `}>
            <h3>DEADLINE</h3>
        </div>
        <div className={`${styles['main-widget-inner']}  ${styles['bgf1']}   `}>
            <div className={styles['date-and-time']}>
                <div className={`row  mx-0 `}>
                    <div className="col d-flex justify-content-center align-items-center px-0">
                        <p>
                            <sup>from</sup>{moment.tz(date, 'Europe/Berlin').format('YYYY-MM-DD')}
                        </p>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center px-0">
                        <p>
                            <sup>until</sup>{moment.tz(date, 'Europe/Berlin').format('YYYY-MM-DD')}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className={`${styles['main-widget-inner']}  ${styles['timer-counter']}   `}>
            <div className="  d-flex align-items-center justify-content-center uk-grid uk-countdown">
                <div className={styles['timer-counter-grid']}>
                    <div className={styles['uk-countdown-number']}><span>{days}
                                </span>
                    </div>
                    <div className={styles['uk-countdown-label']}>Days
                    </div>
                </div>
                <div className={styles['uk-countdown-separator']}>&nbsp;</div>
                <div className="timer-counter-grid">
                    <div className={styles['uk-countdown-number']}><span>{hours}</span>
                    </div>
                    <div className={styles['uk-countdown-label']}>Hours
                    </div>
                </div>
                <div className={styles['uk-countdown-separator']}>:</div>
                <div className="timer-counter-grid">
                    <div className={styles['uk-countdown-number']}><span>{minutes}</span>
                    </div>
                    <div className={styles['uk-countdown-label']}>Minutes
                    </div>
                </div>
                <div className={styles['uk-countdown-separator']}>:</div>
                <div className="timer-counter-grid">
                    <div className={styles['uk-countdown-number']}><span>{seconds}</span>
                    </div>
                    <div className={styles['uk-countdown-label']}>Seconds
                    </div>
                </div>
            </div>
        </div>
    </div>)
}