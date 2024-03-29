import { changePostsData } from "helpers/changePostsData";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { fetchPageFolders } from "src/api/fetchPageFolders";
import Card from "src/components/Card";
import Layout from "src/components/Layout";
import Sidebar from "src/components/Sidebar";
import { PageFolder } from "types/pageFolderType";
import { Post } from "types/postTypes";
import { fetchPosts } from "src/api/fetchPosts";
import qs from "qs";
import Masonry from "react-masonry-css";
import Pagination from "src/components/Pagination/Pagination";
import Posts from "src/components/Posts";
import { SWRConfig } from "swr";

interface Props {
  // pageFolders: PageFolder[];
  posts: {
    posts: [] | Post[];
    total: number;
  };
  fallback: any;
}

const FolderPage = ({ posts }: Props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>JIDIPI - {router.query?.folder}</title>
        <meta name="description" content={`JIDIPI - ${router.query?.folder}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Posts fallbackData={posts} />
    </>
  );
};

FolderPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout sidebarComponent={<Sidebar />}>{page}</Layout>;
};

export default FolderPage;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
  query,
}) => {
  let pageFolders: PageFolder[] = [];

  try {
    pageFolders = await fetchPageFolders();
  } catch (e) {
    console.log(e);
  }

  const currentPageFolder = pageFolders.find(
    (pageFolder) => pageFolder.subDomain === params?.folder
  );

  const parameters = qs.stringify({
    pageSize: 50,
    pageNumber: query.page ?? 0,
  });

  const posts = await fetchPosts(currentPageFolder?._id, parameters);

  return {
    notFound: !currentPageFolder,
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
      posts,
      fallback: {
        [`${process.env.NEXT_PUBLIC_API_URL}/post/public/${currentPageFolder?._id}?${parameters}`]:
          posts,
      },
    },
  };
};
