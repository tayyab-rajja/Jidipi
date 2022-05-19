import styles from "./Form.module.scss";
import clsx from "clsx";
import { CompanyAdd } from "types/companyInfoTypes";
import UploadLogo from "public/images/profile/upload-logo.svg";
import DeleteIcon from "public/images/icons/delete.svg";
import Image from "next/image";
import InputContainer from "./InputContainer";
import { QRCodeSVG } from "qrcode.react";
import { websiteUrlFormat } from "src/utils/formats";
import FilteUploadModal from "../../../../UploadFiles/FileUploadModal";
import { useContext, useState } from "react";
import { FileType, UploadState } from "src/lib/file/action";
import { UserContext } from "src/providers/UserProvider";

interface IProps {
    handleChange: (prop: string, value: string) => void;
    company: CompanyAdd;
}

export default function LogoContainer({ company, handleChange }: IProps) {
    const websiteUrl = websiteUrlFormat(company?.website);
    const userContext: any = useContext(UserContext);
    const user = userContext.user;

    const [showUploadModa, setShowUploadModal] = useState(false);
    const logoState: UploadState = {
        files: [], type: FileType.LOGO, companyId: user?.companyId
    };

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
                {showUploadModa && (
                    <FilteUploadModal
                        type="users"
                        typeKey="users"
                        state={logoState}
                        onClose={() => {
                            setShowUploadModal(false);
                        }}
                        onSelect={(file: any) => {
                            handleChange("avatar", file.liveURL);
                            console.log(file)
                            // setShowUploadModal(false);
                        }}
                    />
                )}
                <div
                    className={clsx(
                        styles["mr-4"],
                        styles["logo"],
                        styles["border-grey"],
                        styles["bg-grey"],
                        "position-relative"
                    )}
                    onClick={() => {
                        setShowUploadModal(true);
                    }}
                >
                    {company.avatar ? (
                        <>
                            <Image src={company.avatar} layout="fill" />
                            <div
                                className={clsx(
                                    styles["delete-avatar-container"],
                                    "position-absolute"
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleChange("avatar", "");
                                    }}
                                    className="btn-link position-absolute"
                                >
                                    <img
                                        src={(DeleteIcon as any).src}
                                    />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <span> Logo </span>
                            <span className={clsx(styles["image-container"])}>
                                <Image src={UploadLogo} alt="upload logo" />
                            </span>
                        </>
                    )}
                </div>
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
                    />
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
