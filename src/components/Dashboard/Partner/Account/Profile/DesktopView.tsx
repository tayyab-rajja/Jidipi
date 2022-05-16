import styles from "./Profile.module.scss";
import clsx from "clsx";
import PartnerLogo from "public/images/profile/partner-logo.svg";
import QrCode from "public/images/profile/qr-code.svg";
import ShareIcon from "public/images/icons/social/share.svg";
import StarIcon from "public/images/icons/social/star.svg";
import Image from "next/image";
import { CompanyAdd } from "types/companyInfoTypes";
import { telephoneFaxFieldFormat } from "src/utils/formats";
import config from "../config";

interface IProps {
    company: CompanyAdd;
}

export default function DesktopView({ company }: IProps) {
    const icons = config.icons(company);

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
                                value={telephoneFaxFieldFormat(company)}
                                disabled
                            />
                        </div>
                        <div className={styles["input-container"]}>
                            <input
                                type="text"
                                className={clsx(styles["custom-input"])}
                                value={company.email}
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
                        {icons.map((iconItem) => {
                            const { icon, prop, alt } = iconItem;
                            return (
                                prop && (
                                    <a href={prop} target="_blank">
                                        <div className={styles["icon"]}>
                                            <Image src={icon} alt={alt} />
                                        </div>
                                    </a>
                                )
                            );
                        })}
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
                                value={company.companyName}
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
                                value={company.website}
                                disabled
                            />
                        </div>
                    </div>
                    <div>
                        <div className={styles["input-container"]}>
                            <input
                                type="text"
                                className={styles["custom-input"]}
                                value={company.address}
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
