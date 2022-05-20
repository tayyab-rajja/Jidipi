import styles from "./Profile.module.scss";
import clsx from "clsx";
import PartnerLogo from "public/images/profile/partner-logo.svg";
import ShareIcon from "public/images/icons/social/share.svg";
import StarIcon from "public/images/icons/social/star.svg";
import Image from "next/image";
import { CompanyAdd } from "types/companyInfoTypes";
import { telephoneFaxFieldFormat, websiteUrlFormat } from "src/utils/formats";
import { QRCodeSVG } from "qrcode.react";
import config from "../config";

interface IProps {
    company: CompanyAdd;
}

export default function MobileView({ company }: IProps) {
    const websiteUrl = websiteUrlFormat(company?.website);
    const icons = config.icons(company);
    return (
        <div className={clsx(styles["form-container"], "d-block", "d-lg-none")}>
            <div className={clsx(styles["top"], "mb-3")}>
                <div className={styles["logo-container"]}>
                    <div
                        className={clsx(
                            styles["mr-4"],
                            styles["logo"],
                            styles["border-grey"],
                            "position-relative"
                        )}
                    >
                        {company.avatar && (
                            <Image src={company.avatar} alt="partner logo" layout="fill" />
                        )}
                    </div>

                    <div
                        className={clsx(
                            styles["qr-code"],
                            styles["border-grey"]
                        )}
                    >
                        <a href={websiteUrl} target="_blank" rel="noreferrer">
                            <QRCodeSVG value={websiteUrl} size={70} />
                        </a>
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
                            <Image src={ShareIcon} alt="Share icon" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx(styles["input-container"], "mb-3")}>
                <input
                    type="text"
                    className={clsx(styles["custom-input"])}
                    value={telephoneFaxFieldFormat(company)}
                    disabled
                />
            </div>
            <div className={clsx(styles["input-container"], "mb-3")}>
                <input
                    type="text"
                    className={clsx(styles["custom-input"])}
                    value={company.email}
                    disabled
                />
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
                        {icons.map((iconItem) => {
                            const { icon, prop, alt, id } = iconItem;
                            return (
                                prop && (
                                    <a
                                        href={prop}
                                        target="_blank"
                                        rel="noreferrer"
                                        key={id}
                                    >
                                        <div className={styles["icon"]}>
                                            <Image src={icon} alt={alt} />
                                        </div>
                                    </a>
                                )
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
