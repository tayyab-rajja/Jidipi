import React from "react";
import Head from "next/head";
import Script from "next/script";
import { GetServerSideProps } from "next/types";

import Layout from "src/components/Layout";
import CardDetails from "src/components/CardDetails/CardDetails";
import CompanyProfile from "src/components/CompanyProfile/CompanyProfile";
import Sidebar from "src/components/Sidebar";

import { fetchPageFolders } from "src/api/fetchPageFolders";
import { fetchPost } from "src/api/fetchPost";
import { fetchCategoriesList } from "src/api/fetchCategoriesList";

import { getPostCategories } from "helpers/changePostsData";

import { PageFolder } from "types/pageFolderType";

type Props = {
  post: any;
  pageFolders: PageFolder[];
  sidebarCategories: any;
};

const Post = ({ post, sidebarCategories, pageFolders }: Props) => {
  const categories = getPostCategories(post, "oldCategories");
  const companyImg = post?.companyId?.avatar || null;
  const title = post.title;

  console.log(post);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        pageFolders={pageFolders}
        SidebarComponent={<Sidebar sidebarCategories={sidebarCategories} />}
      >
        <CardDetails
          categories={categories}
          companyImg={companyImg}
          languages={post?.languages}
          language={post.language}
          title={title}
        >
          <div dangerouslySetInnerHTML={{ __html: post.description }} />
        </CardDetails>
        <CompanyProfile comnanyInfo={post?.companyId} companyImg={companyImg} />
      </Layout>
      <Script src={process.env.NEXT_PUBLIC_SETKA_SCRIPTS_URL}></Script>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let post = {};
  let sidebarCategories = [];
  let pageFolders: PageFolder[] = [];
  //@ts-ignore
  const postId = query?.post[0];
  const folder = query?.folder;

  try {
    pageFolders = await fetchPageFolders();
  } catch (e) {
    console.log(e);
  }

  const currentPageFolder = pageFolders.find(
    (pageFolder) => pageFolder.subDomain === folder
  );

  try {
    const sidebarCategoriesFromApi = await fetchCategoriesList(
      currentPageFolder?._id
    );

    const postFromApi = await fetchPost(postId);

    post = postFromApi;
    sidebarCategories = sidebarCategoriesFromApi;
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      notFound: !currentPageFolder,
      post,
      sidebarCategories,
      pageFolders,
    },
  };
};

export default Post;
