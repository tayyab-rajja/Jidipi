import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

import { useTranslation } from "next-i18next";

import Card from "src/components/Card";
import Layout from "src/components/Layout";

import { changePostsData } from "helpers/changePostsData";
import FavoratePost from "src/components/FavoratePost/FavoratePost";
import UserPanelData from "src/components/UserPanelData/UserPanelData";
import PanelTable from "src/components/PanelTable/PanelTable";

interface Props {
  posts: any;
}

const Home = ({ posts }: Props) => {
  const { t } = useTranslation();

  const data = changePostsData(posts.posts);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div style={{ width: "100%" }}>
          <UserPanelData />
          <PanelTable />
        </div>
      </Layout>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const responsePosts = await fetch(
    "https://api.jidipi.com/api/v1/post/public/603dc78958c5c6279bc2ed9b?pageNumber=0&pageSize=100&language=EN"
  );

  const responseSidebarCategories = await fetch(
    "https://api.jidipi.com/api/v1/category?pageFolderId=603ce60958c5c6279bc2ed96"
  );

  const posts = await responsePosts.json();
  const sidebarCategories = await responseSidebarCategories.json();

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
      posts: posts,
      sidebarCategories: sidebarCategories,
    },
  };
};
