import Image from "next/image";
import clsx from "clsx";
import styles from "./Form.module.scss";
import { CompanyAdd } from "types/companyInfoTypes";
import config from "../config";

interface IProps {
    company: CompanyAdd;
    handleChange: (prop: string, value: string) => void;
    handleSave: (prop: string, value: string) => void;
}

export default function SocialMediaForm({
    company,
    handleChange,
    handleSave,
}: IProps) {
    const socialMediaInputs = config.socialMediaInputs;
    return (
        <>
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
                {socialMediaInputs.map(
                    ({ Component, prop, placeholder, id, icon }) => {
                        return (
                            <Component
                                key={id}
                                prop={prop}
                                placeholder={placeholder}
                                icon={icon}
                                handleChange={handleChange}
                                handleSave={handleSave}
                                value={company[prop]}
                            />
                        );
                    }
                )}
            </div>
        </>
    );
}
