import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import Image from "next/image";

import PostCategories from "src/components/PostCategories/PostCategories";
import { Categories } from "types/postTypes";

import styles from "./Card.module.css";
import Link from "next/link";

interface CardProps {
  title: string;
  className?: string;
  image?: string;
  id: string;
  folder: string;
  slug: string;
  categories: Categories[];
}

const emptyImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAD0CAMAAAAL4oIDAAAAOVBMVEXAwMD///+7u7vJycnu7u7Pz8/7+/v19fXS0tK+vr7x8fG6urrd3d34+PjCwsLGxsbl5eXY2Njo6OhvnUvPAAABN0lEQVR4nO3Yy46CMABAUeRd3vj/HzuIksxMlMTNmHbO2SB00xvSBptlAAAAAAAAAAAAAAAAAAAAAAAAAAAAwN8J+blPz+9NYShPddOnZ/ieUF7OxdczVK/VEfa0L5dQ6KPsya/NU+Ocx9nTvFg7Rcw99dAuCfXUcwh5m07PELa7fEymZ917umR6yv3L5t4xJtBzWUI/3Te6bqoT6Nm2hMdrWfMliZ7DHOY6oZ4lz8KSUM+8PS7qZHr2jTsrk+hpyqHYc7Iq/p5xKLIQjoEu9p7rFL4PrLeeSP//bD31Gn4OTF3MPdc5/B5Z61h7QlU9GZmqdopy/VT9cVzwuNzcfvR5lO9nbJpu03RluV2Oc7f7EUKM51XnIuvJ5uLcp+cHAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8cXFZgNlyZfDNsAAAAASUVORK5CYII=";

export const Card = ({
  className,
  title,
  id,
  folder,
  slug,
  categories,
  image,
}: CardProps) => {
  const { t } = useTranslation();

  return (
    <div className={clsx(styles.Card, className && className)}>
      <Link
        href={{
          pathname: "/[folder]/[postId]/[slug]",
          query: {
            folder: folder,
            postId: id,
            slug: slug,
          },
        }}
      >
        <a>
          <Image
            className={styles["Card-Image"]}
            layout="responsive"
            width={500}
            height={500}
            src={image ? image : emptyImage}
            alt="Card Img"
          />
          <h3 className={styles["Card-Title"]}>{t(title)}</h3>
        </a>
      </Link>
      <PostCategories categories={categories} />
    </div>
  );
};
