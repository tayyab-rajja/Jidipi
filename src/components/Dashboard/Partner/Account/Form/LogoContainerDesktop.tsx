import styles from "./Form.module.scss";
import clsx from "clsx";
import { CompanyAdd } from "types/companyInfoTypes";
import UploadLogo from "public/images/profile/upload-logo.svg";
import Image from "next/image";
import InputContainer from "./InputContainer";

interface IProps {
    handleChange: (prop: string, value: string) => void;
    company: CompanyAdd;
}

export default function LogoContainer({ company, handleChange }: IProps) {
    return (
        <>
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
                    <span className={clsx(styles["image-container"])}>
                        <Image src={UploadLogo} alt="upload logo" />
                    </span>
                </div>
                <div className="w-100">
                    <div className={clsx(styles["input-container"], "mb-3")}>
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
                    <div className={styles["input-container"]}>
                        {/* <input
                            type="text"
                            className={styles["custom-input"]}
                            placeholder="Brand"
                        /> */}
                        <InputContainer
                            placeholder="Brand"
                            value={company["brandName"]}
                            prop="brandName"
                            classes={[]}
                            handleChange={handleChange}
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
                    {/* <div className={clsx(styles["input-container"], "mb-3")}>
                        <input
                            type="text"
                            className={styles["custom-input"]}
                            placeholder="Website"
                        />
                    </div> */}
                    <InputContainer
                        placeholder="Website"
                        value={company["website"]}
                        prop="website"
                        classes={["mb-3"]}
                        handleChange={handleChange}
                    />
                    {/* <div className={styles["input-container"]}>
                        <input
                            type="text"
                            className={styles["custom-input"]}
                            placeholder="Email"
                        />
                    </div> */}
                    <InputContainer
                        placeholder="Email"
                        value={company["email"]}
                        prop="email"
                        classes={[]}
                        handleChange={handleChange}
                    />
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
        </>
    );
}
