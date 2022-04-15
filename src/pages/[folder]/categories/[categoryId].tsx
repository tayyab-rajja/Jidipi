import { changePostsData } from "helpers/changePostsData";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { fetchPageFolders } from "src/api/fetchPageFolders";
import { fetchPosts } from "src/api/fetchPosts";
import Card from "src/components/Card";
import Layout from "src/components/Layout";
import Sidebar from "src/components/Sidebar";
import { Post } from "types/postTypes";
import qs from "qs";
import { PageFolder } from "types/pageFolderType";
import Masonry from "react-masonry-css";

interface ICategoryIdProps {
  pageFolders: PageFolder[];
  posts: {
    posts: [] | Post[];
    total: number;
  };
  sidebarCategories: any;
}

const CategoryId = ({
  pageFolders,
  posts,
  sidebarCategories,
}: ICategoryIdProps) => {
  const postsData: Post[] = posts?.posts ?? [];
  const { query } = useRouter();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout sidebarComponent={<Sidebar />}>
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
          {postsData.map(({ title, categories, image, id, slug }) => (
            <div key={id}>
              <Card
                folder={query.folder as string}
                slug={slug}
                title={title}
                categories={categories}
                image={image}
                id={id}
              />
            </div>
          ))}
        </Masonry>
      </Layout>
    </div>
  );
};
export default CategoryId;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
  query,
}) => {
  let pageFolders: PageFolder[] = [];
  let posts = {};
  let sidebarCategories = [];

  try {
    pageFolders = await fetchPageFolders();
  } catch (e) {
    console.log(e);
  }

  const currentPageFolder = pageFolders.find(
    (pageFolder) => pageFolder.subDomain === params?.folder
  );

  const postsFromApi = await fetchPosts(
    currentPageFolder?._id,
    qs.stringify(query)
  );

  posts = {
    posts: changePostsData(postsFromApi.posts),
  };

  return {
    notFound: !currentPageFolder,
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
      posts,
      pageFolders,
    },
  };
};
