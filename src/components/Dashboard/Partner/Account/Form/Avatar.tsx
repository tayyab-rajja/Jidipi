import { CompanyAdd } from "types/companyInfoTypes";
import Image from "next/image";
import styles from "./Form.module.scss";
import clsx from "clsx";
import DeleteIcon from "public/images/icons/delete.svg";
import UploadLogo from "public/images/profile/upload-logo.svg";
import { useContext, useState } from "react";
import { FileType, UploadState } from "src/lib/file/action";
import { UserContext } from "src/providers/UserProvider";
import FileUploadModal from "src/components/UploadFiles/FileUploadModal";

interface IProps {
    handleChange: (prop: string, value: string) => void;
    handleSave: (prop: string, value: string) => void;
    company: CompanyAdd;
    prop: string;
}

export default function Avatar({
    company,
    handleSave,
    handleChange,
    prop,
}: IProps) {
    const userContext: any = useContext(UserContext);
    const [preview, setPreview] = useState("");
    const user = userContext.user;
    const logoState: UploadState = {
        files: [],
        type: FileType.LOGO,
        companyId: user?.companyId,
    };
    const [showUploadModal, setShowUploadModal] = useState(false);

    const avatarContainer = () => {
        if (company[prop]) {
            return (
                <>
                    <Image src={company[prop]} layout="fill" />
                    <div
                        className={clsx(
                            styles["delete-avatar-container"],
                            "position-absolute"
                        )}
                    >
                        {/* <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleChange(prop, "");
                                handleSave(prop, "");
                            }}
                            className="btn-link position-absolute"
                        >
                            <img src={(DeleteIcon as any).src} />
                        </button> */}
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <span> Logo </span>
                    <span className={clsx(styles["image-container"])}>
                        {preview ? (
                            <img
                                src={preview}
                                className={styles["preview-image"]}
                            />
                        ) : (
                            <Image src={UploadLogo} alt="upload logo" />
                        )}
                    </span>
                </>
            );
        }
    };

    return (
        <>
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
                {showUploadModal && (
                    <FileUploadModal
                        type="company"
                        typeKey="companies"
                        pageType="companies"
                        state={logoState}
                        onClose={() => {
                            setShowUploadModal(false);
                        }}
                        onSelect={(file: any, preview: any) => {
                            handleChange(prop, file.liveURL);
                            setPreview(preview);
                            if (!preview) {
                                handleSave(prop, file.liveURL);
                            }
                            setTimeout(() => {
                                setShowUploadModal(false);
                            });
                        }}
                    />
                )}
                {avatarContainer()}
            </div>
        </>
    );
}
