import clsx from "clsx";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

import { categoriesSvg } from "constant/categoriesSvg";

import styles from "./Card.module.css";

interface CardProps {
  title: string;
  className?: string;
  image: string;
  categories: {
    title: string;
    type: string;
  }[];
}

export const Card = ({
  className,
  title,
  categories,
  image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAD0CAMAAAAL4oIDAAAAOVBMVEXAwMD///+7u7vJycnu7u7Pz8/7+/v19fXS0tK+vr7x8fG6urrd3d34+PjCwsLGxsbl5eXY2Njo6OhvnUvPAAABN0lEQVR4nO3Yy46CMABAUeRd3vj/HzuIksxMlMTNmHbO2SB00xvSBptlAAAAAAAAAAAAAAAAAAAAAAAAAAAAwN8J+blPz+9NYShPddOnZ/ieUF7OxdczVK/VEfa0L5dQ6KPsya/NU+Ocx9nTvFg7Rcw99dAuCfXUcwh5m07PELa7fEymZ917umR6yv3L5t4xJtBzWUI/3Te6bqoT6Nm2hMdrWfMliZ7DHOY6oZ4lz8KSUM+8PS7qZHr2jTsrk+hpyqHYc7Iq/p5xKLIQjoEu9p7rFL4PrLeeSP//bD31Gn4OTF3MPdc5/B5Z61h7QlU9GZmqdopy/VT9cVzwuNzcfvR5lO9nbJpu03RluV2Oc7f7EUKM51XnIuvJ5uLcp+cHAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8cXFZgNlyZfDNsAAAAASUVORK5CYII=",
}: CardProps) => {
  const { t } = useTranslation();

  return (
    <div className={clsx(styles.Card, className && className)}>
      <Image
        layout="responsive"
        width={500}
        height={500}
        src={image}
        alt="Card Img"
      />
      <h3 className={styles["Card-Title"]}>{t(title)}</h3>
      <ul className={styles["Card-Info"]}>
        {categories.map(({ type, title }, index) => (
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
