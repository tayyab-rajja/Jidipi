import { FC, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import QRCode from "react-qr-code";

import { postsActionSvG } from "constant/postsActionSvG";
import { CompanyInfo } from "types/companyInfoTypes";

import closeIcon from "public/images/closeIcon.svg";
import styles from "./CompanyProfile.module.css";

interface CompanyProfileProps {
  comnanyInfo?: CompanyInfo | null;
}

const getLinks = (comnanyInfo: any) => {
  let links = [];

  for (const key in comnanyInfo) {
    const isAvlailablekKey =
      key.toLocaleLowerCase().includes("link") &&
      comnanyInfo[key] &&
      key !== "googleMapLink";

    if (isAvlailablekKey) {
      links.push({
        //TODO: Set icons for sosial sites
        icon: key.slice(0, 3),
        link: comnanyInfo[key],
      });
    }
  }

  return links;
};

const CompanyProfile: FC<CompanyProfileProps> = ({ comnanyInfo }) => {
  const { t } = useTranslation();
  const [viewGoogleMap, setViewGoogleMap] = useState(false);

  if (!comnanyInfo) {
    return null;
  }

  const companyImg = comnanyInfo?.avatar;
  const links = getLinks(comnanyInfo);

  return (
    <>
      {!viewGoogleMap ? (
        <div className={styles["CompanyProfile"]}>
          <div className={styles["CompanyProfile-CompanyLogo"]}>
            {/* TODO: Add link to company page in our site */}
            <Link
              href={comnanyInfo?.isMember && !comnanyInfo.IsPartner ? "#" : "#"}
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
            {t(comnanyInfo?.telephone)} {t(comnanyInfo?.fax)}
          </div>
          <div className={styles["CompanyProfile-Email"]}>
            {comnanyInfo?.email && (
              <a href={`mailto:${comnanyInfo.email}`}>{t(comnanyInfo.email)}</a>
            )}
          </div>
          <div className={styles["CompanyProfile-Links"]}>
            <div className={styles["CompanyProfile-Links_SocialLinks"]}>
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
            {comnanyInfo?.IsPartner && !comnanyInfo?.isMember && (
              // TODO: add logic to share and add to favorite companies
              <div className={styles["CompanyProfile-Links_Actions"]}>
                <button className={styles["CompanyProfile-Button"]}>
                  {postsActionSvG["SHARE"]}
                </button>
                <button className={styles["CompanyProfile-Button"]}>
                  {postsActionSvG["FAVORITE"]}
                </button>
              </div>
            )}
          </div>
          <div className={styles["CompanyProfile-Name"]}>
            {t(comnanyInfo?.companyName)}
          </div>
          <div className={styles["CompanyProfile-Site"]}>
            {comnanyInfo?.website && (
              <a
                href={`https://${comnanyInfo.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(comnanyInfo.website)}
              </a>
            )}
          </div>
          <div
            className={styles["CompanyProfile-Location"]}
            onClick={() => setViewGoogleMap(true)}
          >
            {t(comnanyInfo?.address)}
          </div>
          <div className={styles["CompanyProfile-QrCode"]}>
            {comnanyInfo?.website && (
              <a
                href={`https://${comnanyInfo.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <QRCode size={70} value={comnanyInfo.website} />
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className={styles["GoogleMap"]}>
          {comnanyInfo?.googleMapLink.includes("iframe") ? (
            <div
              dangerouslySetInnerHTML={{ __html: comnanyInfo?.googleMapLink }}
            />
          ) : (
            <iframe src={comnanyInfo?.googleMapLink} />
          )}
          <button
            className={styles["GoogleMap-CloseButton"]}
            onClick={() => setViewGoogleMap(false)}
          >
            <Image src={closeIcon} width={17} height={17} alt="Close" />
          </button>
          <p className={styles["GoogleMap-Loading"]}>
            {comnanyInfo?.googleMapLink ? "Loading..." : "No location"}
          </p>
        </div>
      )}
    </>
  );
};

export default CompanyProfile;
