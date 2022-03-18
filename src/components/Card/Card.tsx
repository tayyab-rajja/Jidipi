import clsx from "clsx";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

import { categoriesSvg } from "constant/categoriesSvg";

import styles from "./Card.module.css";

interface CardProps {
  title: string;
  className?: string;
}

export const Card = ({ className, title }: CardProps) => {
  const { t } = useTranslation();

  const testData = [
    {
      title: "February 28, 2022",
      type: "DATE",
    },
    {
      title: "Switzerland",
      type: "LOCATION",
    },
    {
      title: "Houses",
      type: "CATEGORY",
    },
    {
      title: "2016",
      type: "YEAR",
    },
    {
      title: "Bauhaus",
      type: "STYLE",
    },
    {
      title: "ABCDEFG Architects",
      type: "ARCHITECTS",
    },
  ];

  return (
    <div className={clsx(styles.Card, className && className)}>
      <Image
        layout="responsive"
        width={500}
        height={500}
        src=""
        alt="Card Img"
      />
      <h3 className={styles["Card-Title"]}>{t(title)}</h3>
      <ul className={styles["Card-Info"]}>
        {testData.map(({ type, title }, index) => (
          <li key={index}>
            <Link href="#">
              <a className={styles["Card-InfoText"]}>
                {categoriesSvg[type]}
                <span>{t(title)}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
