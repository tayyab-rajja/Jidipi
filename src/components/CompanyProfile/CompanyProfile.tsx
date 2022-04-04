import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./CompanyProfile.module.css";

interface CompanyProfileProps {
  companyImg: string;
}

const CompanyProfile: FC<CompanyProfileProps> = ({ companyImg }) => {
  return (
    <div className={styles["CompanyProfile"]}>
      <div className={styles["CompanyProfile-Wrapper"]}>
        <div className={styles["CompanyProfile-CompanyLogo"]}>
          <Image src={companyImg} width={105} height={105} alt="Company" />
        </div>
        <p className={styles["CompanyProfile-Phone"]}>+39 0362 3721</p>
        <p className={styles["CompanyProfile-Email"]}>
          contact@copenhagen101.com
        </p>
        <div className={styles["CompanyProfile-Links"]}>
          <Link href="#">
            <a href="" className={styles["CompanyProfile-Link"]}></a>
          </Link>
          <Link href="#">
            <a href="" className={styles["CompanyProfile-Link"]}></a>
          </Link>
          <Link href="#">
            <a href="" className={styles["CompanyProfile-Link"]}></a>
          </Link>
          <Link href="#">
            <a href="" className={styles["CompanyProfile-Link"]}></a>
          </Link>
        </div>
        <p className={styles["CompanyProfile-Name"]}>
          contact@copenhagen101.com
        </p>
        <p className={styles["CompanyProfile-Site"]}>www.cassina.com/en</p>
        <p className={styles["CompanyProfile-Location"]}>
          Via Luigi Busnelli 1, 20821 Meda, Italy
        </p>
        <div className={styles["CompanyProfile-QrCode"]}></div>
      </div>
    </div>
  );
};

export default CompanyProfile;
