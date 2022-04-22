import React, { ReactElement } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import qs from "qs";

import { fetchPageFolders } from "src/api/fetchPageFolders";
import { fetchPosts } from "src/api/fetchPosts";

import Layout from "src/components/Layout";
import Sidebar from "src/components/Sidebar";
import Posts from "src/components/Posts";

import { PageFolder } from "types/pageFolderType";
import { Post } from "types/postTypes";

interface Props {
  // pageFolders: PageFolder[];
  posts: {
    posts: [] | Post[];
    total: number;
  };
  fallback: any;
}

const FolderPage = ({ posts }: Props) => {
  const { query } = useRouter();

  const params = {
    searchKey: query.searchKeys,
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Posts fallbackData={posts} postsParams={params} />
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

  const searchParams = {
    searchKey: query.searchKeys,
  };

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
