import styles from "./Form.module.scss";
import clsx from "clsx";
import PartnerLogo from "public/images/profile/partner-logo.svg";
import UploadLogo from "public/images/profile/upload-logo.svg";
import UpdateButton from "public/images/profile/icons/update-button.svg";
import Arrow from "public/images/profile/icons/arrow.svg";
import Search from "public/images/profile/icons/search.svg";
import QrCode from "public/images/profile/qr-code.svg";
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
export default function Form() {
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
                            <div
                                className={clsx(
                                    styles["input-container"],
                                    "mb-3",
                                    "w-100",
                                    "d-flex",
                                    "d-xl-none"
                                )}
                            >
                                <input
                                    type="text"
                                    className={clsx(
                                        styles["custom-input"],
                                        styles["border-dashed"]
                                    )}
                                    placeholder="https://partner.jidipi.com/dua-keu"
                                />
                            </div>
                            <div
                                className={clsx(
                                    styles["small-container"],
                                    "d-flex",
                                    "d-xl-none",
                                    "mb-3",
                                    "w-100"
                                )}
                            >
                                <div
                                    className={clsx(
                                        styles["mr-4"],
                                        styles["logo"],
                                        styles["border-grey"],
                                        styles["bg-grey"]
                                    )}
                                >
                                    <span> Logo </span>
                                    <Image
                                        src={UploadLogo}
                                        alt="upload logo"
                                        width="40"
                                        height="40"
                                    />
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
                                            placeholder="Website"
                                        />
                                    </div>
                                    <div className={styles["input-container"]}>
                                        <input
                                            type="text"
                                            className={styles["custom-input"]}
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                                <div
                                    className={clsx(
                                        styles["ml-4"],
                                        styles["logo"],
                                        styles["border-grey"],
                                        styles["border-dashed"],
                                        styles["bg-grey"]
                                    )}
                                >
                                    <span>QR Code</span>
                                </div>
                            </div>
                            <div
                                className={clsx(
                                    styles["input-container"],
                                    "w-100",
                                    "mb-3",
                                    "d-flex",
                                    "d-xl-none"
                                )}
                            >
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Brand"
                                />
                            </div>

                            <div
                                className={clsx(
                                    styles["logo-container"],
                                    "mb-3",
                                    styles["mr-8"],
                                    "d-none",
                                    "d-xl-flex"
                                )}
                            >
                                <div
                                    className={clsx(
                                        styles["mr-4"],
                                        styles["logo"],
                                        styles["border-grey"],
                                        styles["bg-grey"]
                                    )}
                                >
                                    <span> Logo </span>
                                    <span
                                        className={clsx(
                                            styles["image-container"]
                                        )}
                                    >
                                        <Image
                                            src={UploadLogo}
                                            alt="upload logo"
                                        />
                                    </span>
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
                                            className={clsx(
                                                styles["custom-input"],
                                                styles["border-dashed"]
                                            )}
                                            placeholder="https://partner.jidipi.com/dua-keu"
                                        />
                                    </div>
                                    <div className={styles["input-container"]}>
                                        <input
                                            type="text"
                                            className={styles["custom-input"]}
                                            placeholder="Brand"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                className={clsx(
                                    styles["logo-container"],
                                    "mb-3",
                                    styles["ml-8"],
                                    "d-none",
                                    "d-xl-flex"
                                )}
                            >
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
                                            placeholder="Website"
                                        />
                                    </div>
                                    <div className={styles["input-container"]}>
                                        <input
                                            type="text"
                                            className={styles["custom-input"]}
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                                <div
                                    className={clsx(
                                        styles["ml-4"],
                                        styles["logo"],
                                        styles["border-grey"],
                                        styles["border-dashed"],
                                        styles["bg-grey"]
                                    )}
                                >
                                    <span>QR Code</span>
                                </div>
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
                                    className={clsx(
                                        styles["custom-input"],
                                        "active"
                                    )}
                                    value="Siemens"
                                />
                                <button
                                    className={styles["update-button"]}
                                    onClick={() => {}}
                                >
                                    <Image
                                        src={UpdateButton}
                                        alt="update button"
                                    />
                                </button>
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
                            <div
                                className={clsx(
                                    styles["input-container"],
                                    "mb-3",
                                    styles["ml-8"]
                                )}
                            >
                                <div className={styles["filter-item"]}>
                                    <div className={styles["select-group"]}>
                                        <div
                                            className={clsx(
                                                styles["select-btn"],
                                                styles["border-dashed"]
                                            )}
                                        >
                                            <div
                                                className={styles["content"]}
                                                onClick={() => {}}
                                            >
                                                <h3 className={styles["label"]}>
                                                    Country
                                                </h3>
                                                <Image
                                                    src={Arrow}
                                                    alt="arrow"
                                                />
                                            </div>
                                            <div
                                                className={
                                                    styles["selected-item"]
                                                }
                                            ></div>
                                        </div>
                                        <div
                                            className={styles["select-content"]}
                                            id="countries"
                                        >
                                            <div
                                                className={clsx(
                                                    styles["search-container"],
                                                    styles["bg-grey"]
                                                )}
                                            >
                                                <input
                                                    type="text"
                                                    className={
                                                        styles["border-grey"]
                                                    }
                                                    placeholder="Search"
                                                />
                                                <Image
                                                    className={
                                                        styles["search-icon"]
                                                    }
                                                    src={Search}
                                                    alt="search icon"
                                                />
                                            </div>
                                            <div>
                                                <div>
                                                    <div
                                                        className={clsx(
                                                            styles["item"],
                                                            styles["bg-grey"]
                                                        )}
                                                    >
                                                        <div
                                                            className={
                                                                styles["rating"]
                                                            }
                                                        >
                                                            {/* <Image
                                                                src="/images/icons/star.svg"
                                                                alt=""
                                                            ></Image> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["flag"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/flags/AM.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles[
                                                                    "short-name"
                                                                ]
                                                            }
                                                        >
                                                            AM
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["name"]
                                                            }
                                                        >
                                                            Armenia
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={clsx(
                                                            styles["item"],
                                                            styles["bg-grey"]
                                                        )}
                                                    >
                                                        <div
                                                            className={
                                                                styles["rating"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/star.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["flag"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/flags/SW.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles[
                                                                    "short-name"
                                                                ]
                                                            }
                                                        >
                                                            CH
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["name"]
                                                            }
                                                        >
                                                            Switzerland
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={clsx(
                                                            styles["item"],
                                                            styles["bg-grey"]
                                                        )}
                                                    >
                                                        <div
                                                            className={
                                                                styles["rating"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/star.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["flag"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/flags/CN.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles[
                                                                    "short-name"
                                                                ]
                                                            }
                                                        >
                                                            CN
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["name"]
                                                            }
                                                        >
                                                            China
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={clsx(
                                                            styles["item"],
                                                            styles["bg-grey"]
                                                        )}
                                                    >
                                                        <div
                                                            className={
                                                                styles["rating"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/star.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["flag"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/flags/DE.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles[
                                                                    "short-name"
                                                                ]
                                                            }
                                                        >
                                                            DE
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["name"]
                                                            }
                                                        >
                                                            Germany
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={clsx(
                                                            styles["item"],
                                                            styles["bg-grey"]
                                                        )}
                                                    >
                                                        <div
                                                            className={
                                                                styles["rating"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/star.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["flag"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/flags/DK.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles[
                                                                    "short-name"
                                                                ]
                                                            }
                                                        >
                                                            DK
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["name"]
                                                            }
                                                        >
                                                            Denmark
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <div
                                                            className={
                                                                styles["rating"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/star-active.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["flag"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/flags/FR.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles[
                                                                    "short-name"
                                                                ]
                                                            }
                                                        >
                                                            FR
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["name"]
                                                            }
                                                        >
                                                            France
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <div
                                                            className={
                                                                styles["rating"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/star-active.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["flag"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/flags/HK.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles[
                                                                    "short-name"
                                                                ]
                                                            }
                                                        >
                                                            HK
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["name"]
                                                            }
                                                        >
                                                            Hongkong
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <div
                                                            className={
                                                                styles["rating"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/star-active.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["flag"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/flags/IT.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles[
                                                                    "short-name"
                                                                ]
                                                            }
                                                        >
                                                            IT
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["name"]
                                                            }
                                                        >
                                                            Italy
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <div
                                                            className={
                                                                styles["rating"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/star-active.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["flag"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/flags/MO.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles[
                                                                    "short-name"
                                                                ]
                                                            }
                                                        >
                                                            MO
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["name"]
                                                            }
                                                        >
                                                            Macau
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <div
                                                            className={
                                                                styles["rating"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/star-active.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["flag"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/flags/TW.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles[
                                                                    "short-name"
                                                                ]
                                                            }
                                                        >
                                                            TW
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["name"]
                                                            }
                                                        >
                                                            Taiwan
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <div
                                                            className={
                                                                styles["rating"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/star-active.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["flag"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/flags/UK.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles[
                                                                    "short-name"
                                                                ]
                                                            }
                                                        >
                                                            UK
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["name"]
                                                            }
                                                        >
                                                            United Kingdom
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <div
                                                            className={
                                                                styles["rating"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/star-active.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["flag"]
                                                            }
                                                        >
                                                            {/* <img
                                                                src="/images/icons/flags/US.svg"
                                                                alt=""
                                                            ></img> */}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles[
                                                                    "short-name"
                                                                ]
                                                            }
                                                        >
                                                            US
                                                        </div>
                                                        <div
                                                            className={
                                                                styles["name"]
                                                            }
                                                        >
                                                            United States
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                        <div className={styles["input-container"]}>
                            <div
                                className={clsx(
                                    styles["filter-item"],
                                    styles["groups-filter"]
                                )}
                            >
                                <div
                                    className={styles["select-group"]}
                                    onClick={() => {}}
                                >
                                    <div
                                        className={clsx(
                                            styles["select-btn"],
                                            styles["border-dashed"]
                                        )}
                                    >
                                        <div className={styles["content"]}>
                                            <h3 className={styles["label"]}>
                                                Groups
                                            </h3>
                                            <Image
                                                src={Arrow}
                                                alt="arrow icon"
                                            />
                                        </div>
                                        <div
                                            className={clsx(
                                                styles["selected-item"],
                                                styles["bg-grey"]
                                            )}
                                        ></div>
                                    </div>
                                    <div
                                        className={clsx(
                                            styles["select-content"],
                                            styles["types"]
                                        )}
                                        id="types"
                                    >
                                        <div className={styles["buttons"]}>
                                            <button className={styles["arch"]}>
                                                Architect
                                            </button>
                                            <button className={styles["decor"]}>
                                                Decorator
                                            </button>
                                            <button
                                                className={styles["planner"]}
                                            >
                                                Planner
                                            </button>
                                            <button
                                                className={styles["engineer"]}
                                            >
                                                Engineer
                                            </button>
                                            <button
                                                className={styles["contractor"]}
                                            >
                                                Contractor
                                            </button>
                                            <button
                                                className={
                                                    styles["manufacturer"]
                                                }
                                            >
                                                Manufacturer
                                            </button>
                                            <button
                                                className={styles["software"]}
                                            >
                                                Software
                                            </button>
                                            <button
                                                className={styles["designer"]}
                                            >
                                                Designer
                                            </button>
                                            <button className={styles["photo"]}>
                                                Photographer
                                            </button>

                                            <button
                                                className={styles["retail"]}
                                            >
                                                Retailer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
