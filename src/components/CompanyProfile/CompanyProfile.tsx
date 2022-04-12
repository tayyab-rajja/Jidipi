import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import qrCode from "public/images/qrCode.png";
import { postsActionSvG } from "constant/postsActionSvG";

import styles from "./CompanyProfile.module.css";

interface CompanyProfileProps {
  companyImg: string;
  comnanyInfo:
    | {
        address: string;
        IsPartner: boolean;
        companyName: string;
        email: string;
        telephone: string;
        website: string;
        uniqueId: string;
        isDeleted: boolean;
        behancLink: string;
        facebookLink: string;
        googleMapLink: string;
        instagramLink: string;
        linkedLink: string;
        twitterLink: string;
        vimeoLink: string;
        youtubeLink: string;
        pininterestLink: string;
      }
    | undefined;
}

const getLinks = (comnanyInfo: any) => {
  let links = [];
  for (const key in comnanyInfo) {
    if (
      key.toLocaleLowerCase().includes("link") &&
      comnanyInfo[key] &&
      key !== "googleMapLink"
    ) {
      links.push(comnanyInfo[key]);
    }
  }
  return links;
};

const CompanyProfile: FC<CompanyProfileProps> = ({
  companyImg,
  comnanyInfo,
}) => {
  if (!comnanyInfo || comnanyInfo.isDeleted || !companyImg) {
    return null;
  }

  const links = getLinks(comnanyInfo);

  return (
    <div className={styles["CompanyProfile"]}>
      <div className={styles["CompanyProfile-Wrapper"]}>
        <div className={styles["CompanyProfile-CompanyLogo"]}>
          {comnanyInfo.IsPartner ? (
            <Image src={companyImg} width={105} height={105} alt="Company" />
          ) : (
            <Link href={"#"}>
              <a>
                <Image
                  src={companyImg}
                  width={105}
                  height={105}
                  alt="Company"
                />
              </a>
            </Link>
          )}
        </div>
        <a
          className={styles["CompanyProfile-Phone"]}
          href={`tel:${comnanyInfo.telephone}`}
        >
          {comnanyInfo.telephone}
        </a>
        <a
          className={styles["CompanyProfile-Email"]}
          href={`mailto:${comnanyInfo.email}`}
        >
          {comnanyInfo.email}
        </a>
        <div className={styles["CompanyProfile-Links"]}>
          <div className={styles["CompanyProfile-Links_SocialLinks"]}>
            {links.map((item) => (
              <a
                key={item}
                href={`${item}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["CompanyProfile-Button"]}
              >
                link
              </a>
            ))}
          </div>
          {comnanyInfo.IsPartner && (
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
        <p className={styles["CompanyProfile-Name"]}>
          {comnanyInfo.companyName}
        </p>
        <a
          href={`https://${comnanyInfo.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles["CompanyProfile-Site"]}
        >
          {comnanyInfo.website}
        </a>
        <p className={styles["CompanyProfile-Location"]}>
          {comnanyInfo.address}
        </p>
        <div className={styles["CompanyProfile-QrCode"]}>
          <a
            href={`https://${comnanyInfo.website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={qrCode} width={70} height={70} alt="qr-code" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
