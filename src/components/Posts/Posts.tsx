import { changePostsData } from "helpers/changePostsData";
import { useRouter } from "next/router";
import qs from "qs";
import React, { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { usePageFolderByName } from "src/api/usePageFolderByName";
import useSWR from "swr";
import { Post } from "types/postTypes";
import Card from "src/components/Card";
import Pagination from "src/components/Pagination/Pagination";
import PostsLoading from "src/components/PostsLoading/PostsLoading";

import styles from "./Posts.module.css";

type Props = { postsParams?: object; fallbackData: any };

const PAGE_SIZE = 50;

export const Posts = ({ fallbackData, postsParams }: Props) => {
  const router = useRouter();

  const page = router.query.page ?? 0;

  const { data: pageFolder } = usePageFolderByName(
    (router.query.folder as string) ?? null
  );

  const requestParams = qs.stringify({
    pageNumber: page,
    pageSize: PAGE_SIZE,
    ...postsParams,
  });

  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  const { data: postsData } = useSWR<{ posts: Post[]; total: number }>(
    pageFolder?._id
      ? `${process.env.NEXT_PUBLIC_API_URL}/post/public/${pageFolder?._id}?${requestParams}`
      : null,
    { fallbackData: hasMounted.current ? undefined : fallbackData }
  );

  const handlePage = (page: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page },
      },
      undefined,
      { shallow: true }
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!postsData) {
    return <PostsLoading />;
  }

  return (
    <>
      <Masonry
        breakpointCols={{
          default: 5,
          1800: 4,
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
                folder={router.query.folder as string}
                slug={slug}
                title={title}
                categories={categories}
                image={image}
              />
            </div>
          )
        )}
      </Masonry>
      <Pagination
        className={styles["Pagination"]}
        siblingCount={3}
        arrowHeight={8}
        arrowWidth={5}
        pageSize={PAGE_SIZE}
        totalCount={postsData.total}
        currentPage={+page}
        onChange={handlePage}
      />
    </>
  );
};
