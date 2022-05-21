import {useEffect, useState} from "react";
import FormUserData from "../../components/FormUserData";
// import InputUserData from "../../components/InputUserData";
// import RememberMe from "../../components/RememberMe";
import stylesForm from "../../components/FormUserData/FormUserData.module.css";
import ButtonUserData from "../../components/ButtonUserData";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../lib/reducer";
import {
    loadUserFromLocalStorage,
    resetState,
    signIn,
    signOut,
    User,
    UserDraft,
    UserLoginType
} from "../../lib/user/action";
import {makeSelectSignin} from "../../lib/user/selector";
import {isAdmin, isJudge, isPartner, isReader, isStaff} from "../../lib/user/role";

import {useRouter} from 'next/router';

const signingSelector = makeSelectSignin();
const LoginPage = (prop: any) => {
    const router = useRouter();
    const signingState = useSelector(signingSelector);
    const [loginForgotten, setLoginForgotten] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state: RootStateType) => state.user);

    const initUserData: UserLoginType = {
        email: "544-97q@jidipi.com",
        password: "ffff1111",
        rememberme: true,
    }
    // const initUserData: UserLoginType = {
    //     email: "judge@deng.in",
    //     password: "ffff1111",
    //     rememberme: true,
    // }
    const [userData, setUserData] = useState(initUserData);
    const loginHandler = () => {
        dispatch(signIn(userData));
    };
    const logoutHandler = () => {
        dispatch(signOut());
    };
    useEffect(() => {
        if (signingState.signinFailed) {
            //Display the failed message
            console.log(signingState.message);
        } else if (signingState.signinSuccess && signingState.user) {
            const user = signingState.user;
            if (isReader(user)) {
                //Handle for reader
            } else if (  isPartner(user)) {
                router.push('/dashboard/partner/overview').then(() => {
                });
                // dispatch(resetState());
            }else if (isStaff(user) || isJudge(user) || isPartner(user)) {
                router.push('/dashboard/post/list/architectures').then(() => {
                });
                // dispatch(resetState());
            }
        }
    }, [signingState]);
    const goToRecoverPassword = () => setLoginForgotten(prevState => !prevState);
    return (
        <div className="login">
            <FormUserData>
                <>
                    <input type="email" placeholder="Email" onChange={(e)=>setUserData({...userData,email:e.target.value})} ></input>
                    <input type="password" placeholder="Password" onChange={(e)=>setUserData({...userData,password:e.target.value})} ></input>
                    {/*<RememberMe className={stylesForm['Form-Elem']} checkAction={() =>{*/}
                    {/*    setUserData({...userData,rememberme:!userData.rememberme})*/}

                    {/*}}     forgotPasswordAction={goToRecoverPassword}/>*/}

                    <ButtonUserData label='login' action={() => loginHandler()}/>
                    <ButtonUserData label='logout' action={() => logoutHandler()}/>
                </>
            </FormUserData>
        </div>
    )
}

export default LoginPage;