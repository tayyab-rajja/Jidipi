import { FC } from "react";
import useSWR from "swr";
import qs from "qs";

import Masonry from "react-masonry-css";

import Card from "../Card";

import { Post } from "types/postTypes";
import { changePostsData } from "helpers/changePostsData";

import styles from "./HomePageSection.module.css";

const PAGE_SIZE = 9;

interface CardsProps {
  pageFolderId: string;
  pageName: string;
}

export const Cards: FC<CardsProps> = ({ pageFolderId, pageName }) => {
  const requestParams = qs.stringify({
    pageNumber: 0,
    pageSize: PAGE_SIZE,
  });

  const { data: postsData } = useSWR<{ posts: Post[] }>(
    pageFolderId
      ? `${process.env.NEXT_PUBLIC_API_URL}/post/public/${pageFolderId}?${requestParams}`
      : null
  );

  if (!postsData) {
    return <p>loading...</p>;
  }

  return (
    <div className={styles["Cards"]}>
      <Masonry
        breakpointCols={{
          default: 3,
          1800: 3,
          1520: 3,
          1220: 2,
          620: 1,
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {changePostsData(postsData.posts).map(
          ({ title, categories, image, id, slug }) => (
            <div key={id}>
              <Card
                id={id}
                folder={pageName}
                slug={slug}
                title={title}
                categories={categories}
                image={image}
              />
            </div>
          )
        )}
      </Masonry>
    </div>
  );
};
