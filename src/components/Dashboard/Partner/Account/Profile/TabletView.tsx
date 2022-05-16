import styles from "./Profile.module.scss";
import clsx from "clsx";
import PartnerLogo from "public/images/profile/partner-logo.svg";
import QrCode from "public/images/profile/qr-code.svg";
import FacebookIcon from "public/images/icons/social/facebook.svg";
import InstagramIcon from "public/images/icons/social/instagram.svg";
import LinkedInIcon from "public/images/icons/social/linkedin.svg";
import PinterestIcon from "public/images/icons/social/pinterest.svg";
import ShareIcon from "public/images/icons/social/share.svg";
import StarIcon from "public/images/icons/social/star.svg";
import TwitterIcon from "public/images/icons/social/twitter.svg";
import VimeoIcon from "public/images/icons/social/vimeo.svg";
import YoutubeIcon from "public/images/icons/social/youtube.svg";
import Image from "next/image";
import { CompanyAdd } from "types/companyInfoTypes";
import { telephoneFaxFieldFormat } from "src/utils/formats";

interface IProps {
    company: CompanyAdd;
}

export default function TabletView({ company }: IProps) {
    return (
        <div
            className={clsx(
                styles["form-container"],
                "d-none",
                "d-lg-block",
                "d-xl-none"
            )}
        >
            <div className={clsx(styles["top"], "mb-3")}>
                <div className={styles["logo-container"]}>
                    <div
                        className={clsx(
                            styles["mr-4"],
                            styles["logo"],
                            styles["border-grey"]
                        )}
                    >
                        <Image src={PartnerLogo} alt="partner logo" />
                    </div>
                    <div className="w-100">
                        <div
                            className={clsx(styles["input-container"], "mb-3")}
                        >
                            <input
                                type="text"
                                className={styles["custom-input"]}
                                value={telephoneFaxFieldFormat(company)}
                                disabled
                            />
                        </div>
                        <div className={styles["input-container"]}>
                            <input
                                type="text"
                                className={styles["custom-input"]}
                                value={company.email}
                                disabled
                            />
                        </div>
                    </div>
                    <div
                        className={clsx(
                            styles["qr-code"],
                            styles["border-grey"],
                            styles["ml-4"]
                        )}
                    >
                        <Image src={QrCode} alt="qr code" />
                    </div>
                </div>
            </div>

            <div className={clsx(styles["input-container"], "mb-3")}>
                <input
                    type="text"
                    className={clsx(styles["custom-input"])}
                    value={company.website}
                    disabled
                />
            </div>
            <div className={clsx(styles["input-container"], "mb-3")}>
                <input
                    type="text"
                    className={clsx(styles["custom-input"])}
                    value={company.companyName}
                    disabled
                />
            </div>
            <div className={clsx(styles["input-container"], "mb-3")}>
                <input
                    type="text"
                    className={clsx(styles["custom-input"])}
                    value={company.address}
                    disabled
                />
            </div>
            <div className={styles["bottom"]}>
                <div className="d-flex w-100">
                    <div
                        className={clsx(
                            styles["social-icons"],
                            "d-flex",
                            styles["border-grey"],
                            styles["bg-grey"]
                        )}
                    >
                        {company.facebookLink && (
                            <div className={styles["icon"]}>
                                <Image src={FacebookIcon} alt="facebook icon" />
                            </div>
                        )}
                        {company.twitterLink && (
                            <div className={styles["icon"]}>
                                <Image src={TwitterIcon} alt="twitter icon" />
                            </div>
                        )}
                        {company.instagramLink && (
                            <div className={styles["icon"]}>
                                <Image
                                    src={InstagramIcon}
                                    alt="instagram icon"
                                />
                            </div>
                        )}
                        {company.pininterestLink && (
                            <div className={styles["icon"]}>
                                <Image
                                    src={PinterestIcon}
                                    alt="pinterest icon"
                                />
                            </div>
                        )}
                        {company.youtubeLink && (
                            <div className={styles["icon"]}>
                                <Image src={YoutubeIcon} alt="youtube icon" />
                            </div>
                        )}
                        {company.vimeoLink && (
                            <div className={styles["icon"]}>
                                <Image src={VimeoIcon} alt="vimeo icon" />
                            </div>
                        )}
                        {company.linkedLink && (
                            <div className={styles["icon"]}>
                                <Image src={LinkedInIcon} alt="linkedin icon" />
                            </div>
                        )}
                    </div>
                    <div
                        className={clsx(
                            styles["rating-icons"],
                            "d-flex",
                            styles["border-grey"],
                            styles["bg-grey"],
                            styles["ml-4"]
                        )}
                    >
                        <div className={styles["icon"]}>
                            <Image src={StarIcon} alt="Star icon" />
                        </div>
                        <div className={styles["icon"]}>
                            <Image src={ShareIcon} alt="Share icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
