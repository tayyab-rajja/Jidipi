import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import qrCode from "public/images/qrCode.png";

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
  if (!comnanyInfo || comnanyInfo.isDeleted) {
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
        <p className={styles["CompanyProfile-Phone"]}>
          {comnanyInfo.telephone}
        </p>
        <p className={styles["CompanyProfile-Email"]}>{comnanyInfo.email}</p>
        <div className={styles["CompanyProfile-Links"]}>
          <div className={styles["CompanyProfile-Links_SocialLinks"]}>
            {links.map((item) => (
              <a
                key={item}
                href={`${item}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                link
              </a>
            ))}
          </div>
          <div className={styles["CompanyProfile-Links_Actions"]}>
            {comnanyInfo.IsPartner ? "show" : "not-show"}
          </div>
        </div>
        <p className={styles["CompanyProfile-Name"]}>
          {comnanyInfo.companyName}
        </p>
        <p className={styles["CompanyProfile-Site"]}>
          <a
            href={`https://${comnanyInfo.website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {comnanyInfo.website}
          </a>
        </p>
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
