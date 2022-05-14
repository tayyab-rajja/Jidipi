import styles from "./Form.module.scss";
import clsx from "clsx";
import Arrow from "public/images/profile/icons/arrow.svg";
import FacebookIcon from "public/images/profile/social/facebook.svg";
import InstagramIcon from "public/images/profile/social/instagram.svg";
import LinkedInIcon from "public/images/profile/social/linkedin.svg";
import PinterestIcon from "public/images/profile/social/pinterest.svg";
import BehanceIcon from "public/images/profile/social/behance.svg";
import ShareIcon from "public/images/profile/social/share.svg";
import StarIcon from "public/images/profile/social/star.svg";
import TwitterIcon from "public/images/profile/social/twitter.svg";
import VimeoIcon from "public/images/profile/social/vimeo.svg";
import YoutubeIcon from "public/images/profile/social/youtube.svg";
import Image from "next/image";
import { CompanyAdd } from "types/companyInfoTypes";
import LogoContainerDesktop from "./LogoContainerDesktop";
import LogoContainerTablet from "./LogoContainerTablet";
import InputContainer from "./InputContainer";
import CountrySelect from "./CountrySelect";
import GroupsSelect from "./GroupsSelect";
interface IProps {
    handleChange: (prop: string, value: string) => void;
    company: CompanyAdd;
}

const inputContainer: any = {
    Component: InputContainer,
    classes: [styles["mr-8"]],
    prop: "companyName",
    placeholder: "Semi",
    type: "input",
};

export default function Form({ handleChange, company }: IProps) {
    const handleComponent = () => {
        const { Component, classes, prop, placeholder } = inputContainer;
        return (
            <Component
                classes={classes}
                prop={prop}
                handleChange={handleChange}
                value={company[prop]}
                placeholder={placeholder}
            />
        );
    };

    return (
        <div
            className={clsx(styles["tab-content"], clsx("tab-content"))}
            id="myTabContent"
        >
            <div
                className={clsx(
                    "fade",
                    "show",
                    "active",
                    "tab-pane",
                    styles["profile-tab"]
                )}
                role="tabpanel"
                aria-labelledby="profile-tab"
            >
                <div className={styles["profile-form-expanded"]}>
                    <div
                        className={clsx(
                            styles["form-title"],
                            "d-flex",
                            "justify-content-center"
                        )}
                    >
                        BASIC PROFILE
                    </div>
                    <div className={styles["profile-container"]}>
                        <div
                            className={clsx("d-flex", styles["basic-profile"])}
                        >
                            <LogoContainerTablet
                                company={company}
                                handleChange={handleChange}
                            />

                            <LogoContainerDesktop
                                company={company}
                                handleChange={handleChange}
                            />

                            {handleComponent()}
                            <div
                                className={clsx(
                                    styles["input-container"],
                                    "mb-3",
                                    styles["ml-8"]
                                )}
                            >
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Fax"
                                />
                            </div>
                            <div
                                className={clsx(
                                    styles["input-container"],
                                    "mb-3",
                                    styles["mr-8"]
                                )}
                            >
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Company"
                                />
                            </div>
                            <CountrySelect />
                            <div
                                className={clsx(
                                    styles["input-container"],
                                    "mb-3",
                                    styles["mr-8"]
                                )}
                            >
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Address"
                                />
                            </div>
                            <div
                                className={clsx(
                                    styles["input-container"],
                                    "mb-3",
                                    styles["ml-8"]
                                )}
                            >
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Google Map"
                                />
                            </div>
                        </div>
                        <GroupsSelect />
                    </div>
                    <div
                        className={clsx(
                            styles["social-title"],
                            "d-flex",
                            "justify-content-center"
                        )}
                    >
                        SOCIAL MEDIA
                    </div>
                    <div className={styles["social-media-container"]}>
                        <div className={styles["social-input"]}>
                            <div className={styles["social-logo"]}>
                                <Image src={FacebookIcon} alt="facebook-icon" />
                            </div>

                            <div className={styles["input-container"]}>
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Facebook"
                                />
                            </div>
                        </div>
                        <div className={styles["social-input"]}>
                            <div className={styles["social-logo"]}>
                                <Image src={TwitterIcon} alt="twitter icon" />
                            </div>

                            <div className={styles["input-container"]}>
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    value="www.twitter.com/abc"
                                />
                            </div>
                        </div>
                        <div className={styles["social-input"]}>
                            <div className={styles["social-logo"]}>
                                <Image
                                    src={InstagramIcon}
                                    alt="instagram icon"
                                />
                            </div>

                            <div className={styles["input-container"]}>
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Instagram"
                                />
                            </div>
                        </div>
                        <div className={styles["social-input"]}>
                            <div className={styles["social-logo"]}>
                                <Image
                                    src={PinterestIcon}
                                    alt="pinterest icon"
                                />
                            </div>

                            <div className={styles["input-container"]}>
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Pinterest"
                                />
                            </div>
                        </div>
                        <div className={styles["social-input"]}>
                            <div className={styles["social-logo"]}>
                                <Image src={YoutubeIcon} alt="youtube icon" />
                            </div>

                            <div className={styles["input-container"]}>
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Youtube"
                                />
                            </div>
                        </div>
                        <div className={styles["social-input"]}>
                            <div className={styles["social-logo"]}>
                                <Image src={VimeoIcon} alt="vimeo icon" />
                            </div>

                            <div className={styles["input-container"]}>
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Vimeo"
                                />
                            </div>
                        </div>
                        <div className={styles["social-input"]}>
                            <div className={styles["social-logo"]}>
                                <Image src={LinkedInIcon} alt="linkedin icon" />
                            </div>

                            <div className={styles["input-container"]}>
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Linkedin"
                                />
                            </div>
                        </div>
                        <div className={styles["social-input"]}>
                            <div className={styles["social-logo"]}>
                                <Image src={BehanceIcon} alt="behance icon" />
                            </div>

                            <div className={styles["input-container"]}>
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Behance"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
