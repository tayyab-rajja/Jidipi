import React, { useState, ReactElement } from "react";
import Head from "next/head";
import Script from "next/script";
import { GetServerSideProps } from "next/types";

import Layout from "src/components/Layout";
import CardDetails from "src/components/CardDetails/CardDetails";
import CompanyProfile from "src/components/CompanyProfile/CompanyProfile";
import Sidebar from "src/components/Sidebar";

import { fetchPost } from "src/api/fetchPost";

import { getPostCategories } from "helpers/changePostsData";

import { PageFolder } from "types/pageFolderType";
import { SideBarProvider } from "src/providers/SidebarProvider/SidebarProvider";
import SaveInFolderSidebar from "src/components/SaveInFolderSidebar";

type Props = {
  post: any;
  pageFolders: PageFolder[];
  sidebarCategories: any;
  currentPageFolder: PageFolder;
};

const Post = ({ post }: Props) => {
  const categories = getPostCategories(post, "oldCategories");
  const companyImg = post?.companyId?.avatar || null;
  const companies = post.companies;
  const title = post.title;

  const [showSaveBar, setShowSaveBar] = useState(false);
  const handleOpen = () => {
    setShowSaveBar(true);
  }
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Layout sidebarComponent={<Sidebar />}> */}
      <CardDetails
        postId={post._id}
        categories={categories}
        companyImg={companyImg}
        handleOpen={handleOpen}
        languages={post?.languages}
        language={post.language}
        title={title}
      >
        <div dangerouslySetInnerHTML={{ __html: post.description }} />
      </CardDetails>
      <div style={{ marginTop: 20, width: "100%" }}>
        <CompanyProfile companyInfo={post?.companyId} />
      </div>
      {companies.map((comnanyInfo: any) => (
        <div key={comnanyInfo._id} style={{ marginTop: 20, width: "100%" }}>
          <CompanyProfile companyInfo={comnanyInfo} />
        </div>
      ))}
      {/* </Layout> */}
      <SideBarProvider
        isOpen={showSaveBar}
        close={() => setShowSaveBar(false)}
      >
        <SaveInFolderSidebar postId={post.postId} />
      </SideBarProvider>
      <Script src={process.env.NEXT_PUBLIC_SETKA_SCRIPTS_URL} />
    </>
  );
};

Post.getLayout = function getLayout(page: ReactElement) {
  return <Layout sidebarComponent={<Sidebar />}>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let post = {};
  //@ts-ignore
  const postId = query?.post[0];

  try {
    const postFromApi = await fetchPost(postId);
    post = postFromApi;
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      post,
    },
  };
};

export default Post;
