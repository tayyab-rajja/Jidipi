import { FC } from "react";
import { useRouter } from "next/router";
import Masonry from "react-masonry-css";

import { useCompanyPosts } from "src/api/useCompanyPosts";

import Card from "src/components/Card";
import PostsLoading from "src/components/PostsLoading/PostsLoading";

import styles from "./CardsTab.module.css";

interface CardsTabProps {
  pageFolderId: string;
  folder: string;
}

export const CardsTab: FC<CardsTabProps> = ({ pageFolderId, folder }) => {
  const { query } = useRouter();

  const { data, isValidating } = useCompanyPosts(
    pageFolderId,
    query?.partner as string
  );

  if (isValidating) {
    return (
      <div className={styles["CardsTab"]}>
        <PostsLoading />
      </div>
    );
  }

  return (
    <div className={styles["CardsTab"]}>
      <Masonry
        breakpointCols={{
          default: 5,
          1980: 4,
          1268: 3,
          960: 2,
          500: 1,
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data.map(({ title, categories, image, id, slug }) => (
          <div key={id}>
            <Card
              id={id}
              folder={folder}
              slug={slug}
              title={title}
              categories={categories}
              image={image}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};
