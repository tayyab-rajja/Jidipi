import React, { ReactElement } from "react";
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

type Props = {
  post: any;
  pageFolders: PageFolder[];
  sidebarCategories: any;
};

const Post = ({ post }: Props) => {
  const categories = getPostCategories(post, "oldCategories");
  const companyImg = post?.companyId?.avatar || null;
  const companies = post.companies;
  const title = post.title;

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
        languages={post?.languages}
        language={post.language}
        title={title}
      >
        <div dangerouslySetInnerHTML={{ __html: post.description }} />
      </CardDetails>
      <div style={{ marginTop: 20, width: "100%" }}>
        <CompanyProfile comnanyInfo={post?.companyId} />
      </div>
      {companies.map((comnanyInfo: any) => (
        <div key={comnanyInfo._id} style={{ marginTop: 20, width: "100%" }}>
          <CompanyProfile comnanyInfo={comnanyInfo} />
        </div>
      ))}
      {/* </Layout> */}
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
