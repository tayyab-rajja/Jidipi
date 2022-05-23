import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    signIn,
    UserLoginType
} from "../../lib/user/action";
import {makeSelectSignin} from "../../lib/user/selector";
import {isJudge, isPartner, isReader, isStaff} from "../../lib/user/role";
import styles from "./login.module.scss";

import {useRouter} from 'next/router';
import Image from "next/image";
import {LOGO} from "../../lib/common/env";

const signingSelector = makeSelectSignin();
const LoginPage = (prop: any) => {
    const router = useRouter();
    const signingState = useSelector(signingSelector);
    const dispatch = useDispatch();
    const initUserData: UserLoginType = {
        email: "",
        password: "",
        rememberme: true,
    }
    // const initUserData: UserLoginType = {
    //     email: "judge@deng.in",
    //     password: "ffff1111",
    //     rememberme: true,
    // }
    const [userData, setUserData] = useState(initUserData);
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        forget: "",
    });
    const loginHandler = () => {
        console.log('loginHandler', userData);
        const e = {...errors};
        if (userData.email.trim().length < 5) {
            e.username = "Wrong username!";
            setErrors({...errors, username: "Wrong username!"});
        }
        if (userData.password.trim().length < 5) {
            e.password = "Wrong password!";
        }
        setErrors(e);
        if (userData.email && userData.password) {
            dispatch(signIn(userData));
        }
    };
    useEffect(() => {
        if (signingState.signinFailed) {
            //Display the failed message
            setErrors({
                ...errors,
                password: signingState.message.length > 5 ? signingState.message : "Your login credentials are wrong!"
            });
        } else if (signingState.signinSuccess && signingState.user) {
            const user = signingState.user;
            if (isReader(user)) {
                //Handle for reader
            } else if (isPartner(user)) {
                router.push('/dashboard/partner/overview').then(() => {
                });
                // dispatch(resetState());
            } else if (isStaff(user) || isJudge(user) || isPartner(user)) {
                router.push('/dashboard/post/list/architectures').then(() => {
                });
                // dispatch(resetState());
            }
        }
    }, [signingState]);
    useEffect(() => {
    }, [userData]);
    const [newType, setNewType] = useState("password");
    const srcShowPassword =
        newType === "password" ? "/closed-eye.svg" : "/opened-eye.svg";
    return (
        <div className={`${styles['page-container']}`}>
            <div className={`${styles.page}`}>
                <div className={`${styles['login-container']}`}>
                    <div className={`${styles['left-block']}`}>
                        <div className={`${styles['logo-block']}`}>
                            <div className={`${styles['logo']}`}>
                                <Image width="120" height="50" src={LOGO} alt="JIDIPI"/>
                            </div>
                            <div className={`${styles['title']}`}> Space story</div>
                        </div>
                        <div className={`${styles['text-block']}`}>
                            <span className={`${styles['row-1']}`}>Dear Team</span>
                            <p className={`${styles['row-2']}`}>
                                Please enter your email and password to access the system. This account can only be
                                activated by Jidipi admin.
                            </p>
                            <span className={`${styles['row-3']}`}>- Jidipi Team</span>
                        </div>
                    </div>
                    <div className={`${styles['right-block']}`}>
                        <div className={`${styles['input-block']}`}>
                            <div className={`${styles['enter']}`}>
                                <div className={`${styles['input-container']}`}>
                                    <input onChange={(e) => {
                                        setErrors({...errors, username: ""});
                                        setUserData({...userData, email: e.target.value})
                                    }} type="text" className={`${styles['input-text']}  ${errors.username?styles.error:''} `}
                                           placeholder="Email or User ID"/>
                                    <span
                                        className={`${styles.wrong} ${styles.username}  ${errors.username ? styles.show : ''}`}>{errors.username}</span>
                                </div>
                                <div className={`${styles['input-container']} ${styles['password']}`}>
                                    <input onChange={(e) => {
                                        setErrors({...errors, password: ""});
                                        setUserData({...userData, password: e.target.value})
                                    }} type={newType} className={`${styles['input-password']}  ${errors.password?styles.error:''}`}
                                           placeholder="Password"/>
                                    <div className={`${styles.visibility}`}>
                                        <Image onClick={() => {
                                            setNewType((s) => (s === "password" ? "text" : "password"))
                                        }} src={srcShowPassword} alt="icon" width="16px" height="12px"/>
                                        {/*<img src="./images/icons/close-eye.svg" alt="">*/}
                                    </div>
                                    <span
                                        className={`${styles.wrong} ${styles.password}   ${errors.password ? styles.show : ''}`}>{errors.password}</span>
                                </div>
                            </div>

                            <div className={`${styles['login-block']}`}>
                                <div className={`${styles['remember-password']}`}>
                                    <div className={`${styles['content']}`}>
                                        <div className={`${styles['left-side']}`}>
                                            <input defaultChecked={userData.rememberme}
                                                   onChange={() => setUserData({
                                                       ...userData,
                                                       rememberme: !userData.rememberme
                                                   })}
                                                   type="checkbox"
                                                   className={`${styles['input-checkbox']}`}/>
                                            <span>Remember Me</span>
                                        </div>
                                        <div onClick={() => {
                                            errors.forget === "" ? setErrors({
                                                ...errors,
                                                forget: "Please contact Jidipi Admin to reset your Password."
                                            }) : setErrors({...errors, forget: ""})
                                        }} className={`${styles['forgot-password']}`}> Forgot Password?
                                        </div>
                                    </div>
                                    <span
                                        className={`${styles['info']} ${errors.forget !== "" ? styles['show'] : ""}`}>{errors.forget}</span>
                                </div>
                                <button onClick={() => {
                                    loginHandler()
                                }} type="button"
                                        className={`${styles['login-btn']}`}>Login
                                </button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;