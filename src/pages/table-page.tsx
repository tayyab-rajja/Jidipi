import Head from "next/head";

import Layout from "src/components/Layout";
import Sidebar from "src/components/Sidebar";

import FavoratePost from "src/components/FavoratePost/FavoratePost";
import UserPanelData from "src/components/UserPanelData/UserPanelData";
import PanelTable from "src/components/PanelTable/PanelTable";
import SidebarWithAvatar from "src/components/SidebarWithAvatar/SidebarWithAvatar";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout SidebarComponent={<SidebarWithAvatar />} pageFolders={[]}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <UserPanelData />
          <PanelTable />
        </div>
      </Layout>
    </div>
  );
};

export default Home;