import React, { useState, ReactElement } from "react";
import Head from "next/head";
import Script from "next/script";
import { GetServerSideProps } from "next/types";

import Layout from "src/components/Layout";
import PostDetails from "src/components/PostDetails/PostDetails";
import CompanyProfile from "src/components/CompanyProfile/CompanyProfile";
import Sidebar from "src/components/Sidebar";
import SaveInFolderSidebar from "src/components/SaveInFolderSidebar";
import ShareSidebar from "src/components/ShareSidebar/ShareSidebar";
import SidebarLoginRegister from "src/components/SidebarLoginRegister";

import { fetchPost } from "src/api/fetchPost";

import { getPostCategories } from "helpers/changePostsData";

import { PageFolder } from "types/pageFolderType";
import { SidebarType } from 'types/sidebarType';

import { SideBarProvider } from "src/providers/SidebarProvider/SidebarProvider";
import { useAuth } from "src/providers/AuthProvider/AuthProvider";

type Props = {
  post: any;
  pageFolders: PageFolder[];
  sidebarCategories: any;
  currentPageFolder: PageFolder;
};

const Post = ({ post }: Props) => {

  const {
    session: { status },
  } = useAuth();
  
  const categories = getPostCategories(post, "oldCategories");
  const companyImg = post?.companyId?.avatar || null;
  const companies = post.companies || [];
  const title = post.title;

  const [sidebarType, setSidebarType] = useState<SidebarType>('');

  const handleOpen = (sidebarType: SidebarType) => {
    if (status === "unauthenticated" && sidebarType === "saveInFolder") {
      setSidebarType("loginRegister");
      return;
    }
    setSidebarType(sidebarType);
  }

  const handleClose = () => {
    setSidebarType("");
  }

  return (
    <>
      <Head>
        <title>{post.title} - JIDIPI</title>
        <meta name="description" content={post.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Layout sidebarComponent={<Sidebar />}> */}
      <PostDetails
        postId={post._id}
        categories={categories}
        companyImg={companyImg}
        handleOpen={handleOpen}
        languages={post?.languages}
        language={post.language}
        title={title}
      >
        <div dangerouslySetInnerHTML={{ __html: post.description }} />
      </PostDetails>
      <div style={{ marginTop: 20, width: "100%" }}>
        <CompanyProfile companyInfo={post?.companyId} />
      </div>
      {companies.map((comnanyInfo: any) => (
        <div key={comnanyInfo._id} style={{ marginTop: 20, width: "100%" }}>
          <CompanyProfile companyInfo={comnanyInfo} />
        </div>
      ))}
      {/* </Layout> */}
      {sidebarType && (<SideBarProvider isOpen={!!sidebarType} close={() => setSidebarType('')}>
        {sidebarType === "share" && <ShareSidebar shareImage={post.featuredImage?.liveURL} />}
        {sidebarType === "saveInFolder" && <SaveInFolderSidebar postId={post._id} handleClose={handleClose} />}
        {sidebarType === "loginRegister" && <SidebarLoginRegister />}
      </SideBarProvider>)}
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
  //@ts-ignore
  const language = query.post[1];

  try {
    const postFromApi = await fetchPost(postId, language);
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
