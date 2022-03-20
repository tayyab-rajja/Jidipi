import clsx from "clsx";
import { useTranslation } from "next-i18next";

import styles from "./SidebarContent.module.css";

export const SidebarContent = () => {
  const { t } = useTranslation();

  return (
    <div className={styles["SidebarContent"]}>
      <h2 className={styles["SidebarContent-Title"]}>
        {t("Title")}
        <span className={styles["SidebarContent-Count"]}>9999999</span>
      </h2>
      <ul className={styles["SidebarContent-Hero"]}>
        <li>
          <h3
            className={clsx(
              styles["SidebarContent-Subtitle"],
              styles["SidebarContent-Text"]
            )}
          >
            {t("Subtitle")}
            <span className={styles["SidebarContent-Count"]}>100</span>
          </h3>
          <ul className={styles["SidebarContent-Hero"]}>
            <li className={styles["SidebarContent-Text"]}>
              {t("Content")}
              <span className={styles["SidebarContent-Count"]}>100</span>
            </li>
            <li className={styles["SidebarContent-Text"]}>
              {t("Content")}
              <span className={styles["SidebarContent-Count"]}>100</span>
            </li>
            <li className={styles["SidebarContent-Text"]}>
              {t("Content")}
              <span className={styles["SidebarContent-Count"]}>100</span>
            </li>
          </ul>
        </li>
        <li>
          <h3
            className={clsx(
              styles["SidebarContent-Subtitle"],
              styles["SidebarContent-Text"]
            )}
          >
            {t("Subtitle")}
            <span className={styles["SidebarContent-Count"]}>100</span>
          </h3>
          <ul className={styles["SidebarContent-Hero"]}>
            <li className={styles["SidebarContent-Text"]}>
              {t("Content")}
              <span className={styles["SidebarContent-Count"]}>100</span>
            </li>
          </ul>
        </li>
        <li>
          <h3
            className={clsx(
              styles["SidebarContent-Subtitle"],
              styles["SidebarContent-Text"]
            )}
          >
            {t("Subtitle")}
            <span className={styles["SidebarContent-Count"]}>100</span>
          </h3>
          <ul className={styles["SidebarContent-Hero"]}>
            <li className={styles["SidebarContent-Text"]}>
              {t("Content")}
              <span className={styles["SidebarContent-Count"]}>100</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
