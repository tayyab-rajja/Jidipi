import styles from "./Form.module.scss";
import clsx from "clsx";
import { CompanyAdd } from "types/companyInfoTypes";
import UploadLogo from "public/images/profile/upload-logo.svg";
import Image from "next/image";
import InputContainer from "./InputContainer";
import { QRCodeSVG } from "qrcode.react";
import { websiteUrlFormat } from "src/utils/formats";

interface IProps {
    handleChange: (prop: string, value: string) => void;
    handleSave: (prop: string, value: string) => void;
    company: CompanyAdd;
}

export default function LogoContainerTablet({ company, handleChange, handleSave }: IProps) {
    const websiteUrl = websiteUrlFormat(company?.website);
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
                    defaultValue={`https://partner.jidipi.com/`}
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

            <InputContainer
                placeholder="Brand"
                value={company["brand"]}
                prop="brand"
                classes={["mb-3", "d-flex", "d-xl-none", "w-100"]}
                handleChange={handleChange}
                handleSave={handleSave}
            />
        </>
    );
}
