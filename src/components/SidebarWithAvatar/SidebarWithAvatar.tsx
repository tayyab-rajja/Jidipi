import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import avatar from "./mock-avatar.png";
import { readerPanelSvg } from "constant/readerPanelSvg";
import { useUserData } from "src/api/useUserData";

import styles from "./SidebarWithAvatar.module.css";
import { useRouter } from "next/router";

const defaultData = [
  {
    title: "post",
    icon: "POST",
  },
  {
    title: "company",
    icon: "COMPANY",
  },
  {
    title: "information",
    icon: "INFORMATION",
  },
];

const SidebarWithAvatar = ({}) => {
  const { data: serverData } = useUserData();

  const {
    query: { panel },
  } = useRouter();

  //@ts-ignore
  const currentPage = panel[0];

  return (
    <div className={styles["Sidebar"]}>
      <div className={styles["Profile"]}>
        <div className={styles["Profile-Avatar"]}>
          <Image
            src={serverData?.user?.avatar || avatar}
            alt="avatar"
            width="100px"
            height="100px"
            className={styles["Profile-Avatar_Round"]}
          />
        </div>
        <div className={styles["Profile-Data"]}>
          <div className={clsx(styles["Profile-Text"], styles["Text"])}>
            {readerPanelSvg["USER"]}
            <span>Elon Musk</span>
          </div>
          <div className={clsx(styles["Profile-Text"], styles["Text"])}>
            {readerPanelSvg["EMAIL"]}
            <span>elon.musk@spacex.com</span>
          </div>
        </div>
      </div>
      <div className={styles["Favorate-Links"]}>
        <div className={styles["Title"]}>favorate</div>
        <ul className={styles["Links"]}>
          {defaultData.map(({ title, icon }, i) => (
            <li key={i}>
              <Link href={`/panel/${title}`}>
                <a
                  className={clsx(
                    styles["Links-Item"],
                    title === currentPage && styles["Selected"]
                  )}
                >
                  <span className={styles["Links-Item_Icon"]}>
                    {readerPanelSvg[icon]}
                  </span>
                  <span className={styles["Links-Item_Text"]}>{title}</span>
                  <span className={styles["Links-Item_Arrow"]}>
                    {readerPanelSvg["ARROW"]}
                  </span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarWithAvatar;
