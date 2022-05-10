interface IProps {}
import styles from "./index.module.scss";
import clsx from "clsx";
import PartnerLogo from 'public/images/top-menu/partner-logo.svg'
import QrCode from 'public/images/top-menu/qr-code.svg'
import BahanceIcon from 'public/images/top-menu/social/behance.svg'
import FacebookIcon from 'public/images/top-menu/social/facebook.svg'
import InstagramIcon from 'public/images/top-menu/social/instagram.svg'
import LinkedInIcon from 'public/images/top-menu/social/linkedin.svg'
import PinterestIcon from 'public/images/top-menu/social/pinterest.svg'
import ShareIcon from 'public/images/top-menu/social/share.svg'
import StarIcon from 'public/images/top-menu/social/star.svg'
import TwitterIcon from 'public/images/top-menu/social/twitter.svg'
import VimeoIcon from 'public/images/top-menu/social/vimeo.svg'
import YoutubeIcon from 'public/images/top-menu/social/youtube.svg'
import Image from "next/image";

export default function Profile({}: IProps) {
    return (
        <div
            className={clsx(
                styles["profile-form-mini"],
                styles["profile-container"]
            )}
        >
            <div
                className={clsx(
                    styles["form-container"],
                    "d-block",
                    "d-lg-none"
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
                            <Image src={ PartnerLogo } alt="partner logo" />
                        </div>

                        <div
                            className={clsx(
                                styles["qr-code"],
                                styles["border-grey"]
                            )}
                        >
                            <Image src={ QrCode } alt="qr code" />
                        </div>
                        <div
                            className={clsx(
                                styles["rating-icons"],
                                "w-100",
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
                                <Image src={ ShareIcon } alt="Share icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles["input-container"], "mb-3")}>
                    <input
                        type="text"
                        className={clsx(styles["custom-input"])}
                        value="T +45 1234 5678    F + 45 1234567"
                    />
                </div>
                <div className={clsx(styles["input-container"], "mb-3")}>
                    <input
                        type="text"
                        className={clsx(styles["custom-input"])}
                        value="contact@copenhagen101.com"
                    />
                </div>
                <div className={clsx(styles["input-container"], "mb-3")}>
                    <input
                        type="text"
                        className={clsx(styles["custom-input"])}
                        value="www.101cph.com"
                    />
                </div>
                <div className={clsx(styles["input-container"], "mb-3")}>
                    <input
                        type="text"
                        className={clsx(styles["custom-input"])}
                        value="101 Copenhagen GmbH"
                    />
                </div>
                <div className={clsx(styles["input-container"], "mb-3")}>
                    <input
                        type="text"
                        className={clsx(styles["custom-input"])}
                        value="Magstraede 10a, 1204 Copenhagen, Demark"
                    />
                </div>
                <div className={clsx(styles["bottom"])}>
                    <div className="d-flex w-100">
                        <div
                            className={clsx(
                                styles["social-icons"],
                                "d-flex",
                                styles["border-grey"],
                                styles["bg-grey"]
                            )}
                        >
                            <div className={styles["icon"]}>
                                <Image src={ FacebookIcon } alt="facebook icon" />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ TwitterIcon } />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ InstagramIcon } />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ PinterestIcon } />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ YoutubeIcon } alt="youtube icon" />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ VimeoIcon } alt="vimeo icon" />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ LinkedInIcon } alt="linkedin icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                            <Image src={ PartnerLogo } alt="partner logo" />
                        </div>
                        <div className="w-100">
                            <div
                                className={clsx(
                                    styles["input-container"],
                                    "mb-3"
                                )}
                            >
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    value="T +45 1234 5678    F + 45 1234567"
                                />
                            </div>
                            <div className={styles["input-container"]}>
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    value="contact@copenhagen101.com"
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
                            <Image src={ QrCode } alt="qr code" />
                        </div>
                    </div>
                </div>

                <div className={clsx(styles["input-container"], "mb-3")}>
                    <input
                        type="text"
                        className={clsx(styles["custom-input"])}
                        value="www.101cph.com"
                    />
                </div>
                <div className={clsx(styles["input-container"], "mb-3")}>
                    <input
                        type="text"
                        className={clsx(styles["custom-input"])}
                        value="101 Copenhagen GmbH"
                    />
                </div>
                <div className={clsx(styles["input-container"], "mb-3")}>
                    <input
                        type="text"
                        className={clsx(styles["custom-input"])}
                        value="Magstraede 10a, 1204 Copenhagen, Demark"
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
                            <div className={styles["icon"]}>
                                <Image src={ FacebookIcon } alt="facebook icon" />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ TwitterIcon } />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ InstagramIcon } />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ PinterestIcon } />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ YoutubeIcon } alt="Youtube icon" />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ VimeoIcon } alt="vimeo icon" />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ LinkedInIcon } alt="linkedin icon" />
                            </div>
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
                                <Image src={ ShareIcon } alt="Share icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={clsx(
                    styles["form-container"],
                    "d-none",
                    "d-xl-block"
                )}
            >
                <div className={clsx(styles["top"], "mb-3")}>
                    <div className={clsx(styles["logo-container"], styles["mr-8"])}>
                        <div
                            className={clsx(
                                styles["mr-4"],
                                styles["logo"],
                                styles["border-grey"]
                            )}
                        >
                            <Image src={ PartnerLogo } alt="partner logo" />
                        </div>
                        <div className="w-100">
                            <div
                                className={clsx(
                                    styles["input-container"],
                                    "mb-3"
                                )}
                            >
                                <input
                                    type="text"
                                    className={clsx(styles["custom-input"])}
                                    value="T +45 1234 5678    F + 45 1234567"
                                />
                            </div>
                            <div className={styles["input-container"]}>
                                <input
                                    type="text"
                                    className={clsx(styles["custom-input"])}
                                    value="contact@copenhagen101.com"
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
                                <Image src={ FacebookIcon } alt="facebook icon" />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ TwitterIcon } />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ InstagramIcon } />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ PinterestIcon } />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ YoutubeIcon } alt="Youtube icon" />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ VimeoIcon } alt="vimeo icon" />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ LinkedInIcon } alt="linkedin icon" />
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className={styles["icon"]}>
                                <Image src={StarIcon} alt="Star icon" />
                            </div>
                            <div className={styles["icon"]}>
                                <Image src={ ShareIcon } alt="Share icon" />
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
                                    value="101 Copenhagen GmbH"
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
                                    value="www.101cph.com"
                                />
                            </div>
                        </div>
                        <div>
                            <div className={styles["input-container"]}>
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    value="Magstraede 10a, 1204 Copenhagen, Demark"
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
                        <Image src={ QrCode } alt="qr code" />
                    </div>
                </div>
            </div>
        </div>
    );
}
