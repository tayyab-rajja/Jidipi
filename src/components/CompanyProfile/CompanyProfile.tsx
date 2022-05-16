import { FC, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

import { postsActionSvG } from "constant/postsActionSvG";
import { CompanyInfo } from "types/companyInfoTypes";

import closeIcon from "public/images/closeIcon.svg";
import styles from "./CompanyProfile.module.css";
import { socialSvg } from "constant/socialSvg";

interface CompanyProfileProps {
    companyInfo?: CompanyInfo | null;
}

const getLinks = (companyInfo: any) => {
    let links = [];

    for (const key in companyInfo) {
        const isAvlailablekKey =
            key.toLocaleLowerCase().includes("link") &&
            companyInfo[key] &&
            key !== "googleMapLink";

        if (isAvlailablekKey) {
            const svgKey =
                key === "linkedLink"
                    ? "LINKEDIN"
                    : key.replace("Link", "").toLocaleUpperCase();

            links.push({
                //TODO: Set icons for sosial sites
                icon: socialSvg[svgKey],
                link: companyInfo[key],
            });
        }
    }

    return links;
};

const CompanyProfile: FC<CompanyProfileProps> = ({ companyInfo }) => {
    const { t } = useTranslation();
    const [viewGoogleMap, setViewGoogleMap] = useState(false);

    if (!companyInfo) {
        return null;
    }

    const companyImg = companyInfo?.avatar;
    const links = getLinks(companyInfo);

    return (
        <>
            {!viewGoogleMap ? (
                <div className={styles["CompanyProfile"]}>
                    <div className={styles["CompanyProfile-CompanyLogo"]}>
                        {/* TODO: Add link to company page in our site */}
                        <Link
                            href={
                                companyInfo?.isMember && !companyInfo.IsPartner
                                    ? "#"
                                    : "#"
                            }
                        >
                            <a>
                                {companyImg && (
                                    <Image
                                        src={companyImg}
                                        width={105}
                                        height={105}
                                        alt="Company"
                                    />
                                )}
                            </a>
                        </Link>
                    </div>
                    <div className={styles["CompanyProfile-Phone"]}>
                        {t(companyInfo?.telephone)} {t(companyInfo?.fax)}
                    </div>
                    <div className={styles["CompanyProfile-Email"]}>
                        {companyInfo?.email && (
                            <a href={`mailto:${companyInfo.email}`}>
                                {t(companyInfo.email)}
                            </a>
                        )}
                    </div>
                    <div className={styles["CompanyProfile-Links"]}>
                        <div
                            className={
                                styles["CompanyProfile-Links_SocialLinks"]
                            }
                        >
                            {links.map(({ icon, link }) => (
                                <a
                                    key={link}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles["CompanyProfile-Button"]}
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                        {companyInfo?.IsPartner && !companyInfo?.isMember && (
                            // TODO: add logic to share and add to favorite companies
                            <div
                                className={
                                    styles["CompanyProfile-Links_Actions"]
                                }
                            >
                                <button
                                    className={styles["CompanyProfile-Button"]}
                                >
                                    {postsActionSvG["SHARE"]}
                                </button>
                                <button
                                    className={styles["CompanyProfile-Button"]}
                                >
                                    {postsActionSvG["FAVORITE"]}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={styles["CompanyProfile-Name"]}>
                        {t(companyInfo?.companyName)}
                    </div>
                    <div className={styles["CompanyProfile-Site"]}>
                        {companyInfo?.website && (
                            <a
                                href={`https://${companyInfo.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t(companyInfo.website)}
                            </a>
                        )}
                    </div>
                    <div
                        className={styles["CompanyProfile-Location"]}
                        onClick={() => setViewGoogleMap(true)}
                    >
                        {t(companyInfo?.address)}
                    </div>
                    <div className={styles["CompanyProfile-QrCode"]}>
                        {companyInfo?.website && (
                            <a
                                href={`https://${companyInfo.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <QRCodeSVG
                                    size={70}
                                    value={companyInfo.website}
                                />
                            </a>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles["GoogleMap"]}>
                    {companyInfo?.googleMapLink.includes("iframe") ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: companyInfo?.googleMapLink,
                            }}
                        />
                    ) : (
                        <iframe src={companyInfo?.googleMapLink} />
                    )}
                    <button
                        className={styles["GoogleMap-CloseButton"]}
                        onClick={() => setViewGoogleMap(false)}
                    >
                        <Image
                            src={closeIcon}
                            width={17}
                            height={17}
                            alt="Close"
                        />
                    </button>
                    <p className={styles["GoogleMap-Loading"]}>
                        {companyInfo?.googleMapLink
                            ? "Loading..."
                            : "No location"}
                    </p>
                </div>
            )}
        </>
    );
};

export default CompanyProfile;
