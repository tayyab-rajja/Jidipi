import React, {FC} from "react";
import {CDN_URL} from "../../../../lib/common/env";
import {inspect} from "util";
import styles  from  "./Header.module.scss";

export const Header: FC<any> = ({user}) => {
    return (
        <div className={styles['header']}>
            <nav>
                <div className={styles['logo']}>jidipi</div>
                <div className={styles['tools']}>
                    <div className={styles['avatar']}>
                        <img src={user && user.avatar ? user.avatar : CDN_URL + '/avatars/default.svg'}/>
                    </div>
                </div>
            </nav>
        </div>
        // <header className="main-header">
        //     <nav>
        //         <div className="container-fluid">
        //             <div className="row">
        //                 <div className="col header-logo text-lg-center">
        //                     <a className="navbar-brand" href="#"><img src="//upload.jidipi.com/logo/jidipi-logo.png" /></a>
        //                 </div>
        //                 <div className="col d-flex">
        //                     <div className="navbar-profile ms-auto">
        //                         <div className="avtar-profile">
        //                             <a href="#"><img src="//upload.jidipi.com/avatars/default.svg" /></a>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </nav>
        // </header>
    );
}