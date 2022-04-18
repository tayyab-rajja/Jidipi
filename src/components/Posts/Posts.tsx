import { changePostsData } from "helpers/changePostsData";
import { useRouter } from "next/router";
import qs from "qs";
import React, { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { usePageFolderByName } from "src/api/usePageFolderByName";
import useSWR from "swr";
import { Post } from "types/postTypes";
import Card from "../Card";
import Pagination from "../Pagination/Pagination";

type Props = { fallbackData: any };

const PAGE_SIZE = 50;

export const Posts = ({ fallbackData }: Props) => {
  const router = useRouter();

  const page = router.query.page ?? 0;

  const { data: pageFolder, isValidating } = usePageFolderByName(
    (router.query.folder as string) ?? null
  );

  const requestParams = qs.stringify({
    pageNumber: page,
    pageSize: PAGE_SIZE,
  });

  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  const { data: postsData } = useSWR<{ posts: Post[]; total: 17795 }>(
    pageFolder?._id
      ? `${process.env.NEXT_PUBLIC_API_URL}/post/public/${pageFolder?._id}?${requestParams}`
      : null,
    { fallbackData: hasMounted.current ? undefined : fallbackData }
  );

  if (!postsData) {
    return <p>loading...</p>;
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
                // folder={query.folder as string}
                folder={"sss"}
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
        siblingCount={3}
        pageSize={PAGE_SIZE}
        totalCount={postsData.total}
        currentPage={+page + 1}
        onChange={(page) => {
          router.push(
            {
              pathname: `/${router.query.folder}`,
              query: { page: page - 1 },
            },
            undefined,
            { shallow: true }
          );
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </>
  );
};
