import styles from "./Form.module.scss";
import clsx from "clsx";
import { CompanyAdd } from "types/companyInfoTypes";
import InputContainer from "./InputContainer";
import { QRCodeSVG } from "qrcode.react";
import { websiteUrlFormat } from "src/utils/formats";
import Avatar from "./Avatar";

interface IProps {
    handleChange: (prop: string, value: string) => void;
    handleSave: (prop: string, value: string) => void;
    company: CompanyAdd;
}

export default function LogoContainer({
    company,
    handleChange,
    handleSave,
}: IProps) {
    const websiteUrl = websiteUrlFormat(company?.website);

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
                <Avatar
                    handleChange={handleChange}
                    handleSave={handleSave}
                    company={company}
                    prop={"logoId"}
                />
                <div className="w-100">
                    <div className={clsx(styles["input-container"], "mb-3")}>
                        <input
                            type="text"
                            className={clsx(
                                styles["custom-input"],
                                styles["border-dashed"]
                            )}
                            defaultValue={`https://partner.jidipi.com/`}
                            disabled
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <InputContainer
                            placeholder="Brand"
                            value={company["brandName"]}
                            prop="brandName"
                            classes={[]}
                            handleChange={handleChange}
                            handleSave={handleSave}
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
                    <InputContainer
                        placeholder="Website"
                        value={company["website"]}
                        prop="website"
                        classes={["mb-3"]}
                        handleChange={handleChange}
                        handleSave={handleSave}
                    />
                    <InputContainer
                        placeholder="Email"
                        value={company["email"]}
                        prop="email"
                        classes={[]}
                        handleChange={handleChange}
                        handleSave={handleSave}
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
                    {company.website ? (
                        <QRCodeSVG value={websiteUrl} size={70} />
                    ) : (
                        <span>QR Code</span>
                    )}
                </div>
            </div>
        </>
    );
}
