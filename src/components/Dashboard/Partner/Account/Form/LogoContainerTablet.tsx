import styles from "./Form.module.scss";
import clsx from "clsx";
import { CompanyAdd } from "types/companyInfoTypes";
import UploadLogo from "public/images/profile/upload-logo.svg";
import Image from "next/image";

interface IProps {
    handleChange: (prop: string, value: string) => void;
    company: CompanyAdd;
}

export default ({ company, handleChange }: IProps) => {
    return (
        <>
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
                    defaultValue={`https://partner.jidipi.com/${company.brandName}`}
                    disabled
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
                    <div className={clsx(styles["input-container"], "mb-3")}>
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
        </>
    );
};
