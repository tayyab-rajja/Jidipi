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

export default function DesktopView() {
    return (
        <div className={clsx(styles["form-container"], "d-none", "d-xl-block")}>
            <div className={clsx(styles["top"], "mb-3")}>
                <div className={clsx(styles["logo-container"], styles["mr-8"])}>
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
                                className={clsx(styles["custom-input"])}
                                defaultValue="T +45 1234 5678    F + 45 1234567"
                                disabled
                            />
                        </div>
                        <div className={styles["input-container"]}>
                            <input
                                type="text"
                                className={clsx(styles["custom-input"])}
                                defaultValue="contact@copenhagen101.com"
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={clsx(
                        styles["social-container"],
                        styles["border-grey"],
                        styles["bg-grey"],
                        styles["ml-8"]
                    )}
                >
                    <div className="d-flex">
                        <div className={styles["icon"]}>
                            <Image src={FacebookIcon} alt="facebook icon" />
                        </div>
                        <div className={styles["icon"]}>
                            <Image src={TwitterIcon} alt="twitter icon" />
                        </div>
                        <div className={styles["icon"]}>
                            <Image src={InstagramIcon} alt="instagram icon" />
                        </div>
                        <div className={styles["icon"]}>
                            <Image src={PinterestIcon} />
                        </div>
                        <div className={styles["icon"]}>
                            <Image src={YoutubeIcon} alt="Youtube icon" />
                        </div>
                        <div className={styles["icon"]}>
                            <Image src={VimeoIcon} alt="vimeo icon" />
                        </div>
                        <div className={styles["icon"]}>
                            <Image src={LinkedInIcon} alt="linkedin icon" />
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className={styles["icon"]}>
                            <Image src={StarIcon} alt="Star icon" />
                        </div>
                        <div className={styles["icon"]}>
                            <Image src={ShareIcon} alt="Share icon" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["bottom"]}>
                <div className="w-100 mr-8">
                    <div className="d-flex mb-3">
                        <div
                            className={clsx(
                                styles["input-container"],
                                styles["mr-8"],
                                styles["large-input"]
                            )}
                        >
                            <input
                                type="text"
                                className={styles["custom-input"]}
                                defaultValue="101 Copenhagen GmbH"
                                disabled
                            />
                        </div>

                        <div
                            className={clsx(
                                styles["input-container"],
                                styles["small-input"],
                                styles["ml-8"]
                            )}
                        >
                            <input
                                type="text"
                                className={styles["custom-input"]}
                                defaultValue="www.101cph.com"
                                disabled
                            />
                        </div>
                    </div>
                    <div>
                        <div className={styles["input-container"]}>
                            <input
                                type="text"
                                className={styles["custom-input"]}
                                defaultValue="Magstraede 10a, 1204 Copenhagen, Demark"
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={clsx(
                        styles["qr-code"],
                        styles["border-grey"],
                        styles["ml-8"]
                    )}
                >
                    <Image src={QrCode} alt="qr code" />
                </div>
            </div>
        </div>
    );
}
