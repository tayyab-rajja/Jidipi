import {FC} from "react";

export const Header: FC<any> = ({}) => {
    return (
        <header className="main-header">
            <nav>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col header-logo text-lg-center">
                            <a className="navbar-brand" href="#"><img src="//upload.jidipi.com/logo/jidipi-logo.png" /></a>
                        </div>
                        <div className="col d-flex">
                            <div className="navbar-profile ms-auto">
                                <div className="avtar-profile">
                                    <a href="#"><img src="//upload.jidipi.com/avatars/default.svg" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}