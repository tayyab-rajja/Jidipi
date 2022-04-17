import Head from "next/head";
import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "src/components/Layout";

import UserPanelData from "src/components/UserPanelData/UserPanelData";
import PanelTable from "src/components/PanelTable/PanelTable";
import SidebarWithAvatar from "src/components/SidebarWithAvatar/SidebarWithAvatar";

import { fetchPageFolders } from "src/api/fetchPageFolders";
import { useFavoratePosts } from "src/api/useFavoratePosts";

import { getTableData } from "helpers/getTableData";
import { PageFolder } from "types/pageFolderType";

interface TablePageProps {
  tabs: PageFolder[];
}

const TablePage: FC<TablePageProps> = ({ tabs }) => {
  const {
    data: { tableColumns, tableData },
    params,
    setParams,
  } = useFavoratePosts();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout sidebarComponent={<SidebarWithAvatar />}>
        <div
          style={{
            maxWidth: "1200px",
            minWidth: "840px",
            margin: "-20px auto 0 auto",
          }}
        >
          <UserPanelData />
          <PanelTable
            tabs={tabs}
            tableData={tableData}
            tableColumns={tableColumns}
            params={params}
            setParams={(params) =>
              setParams((prev) => ({ ...prev, ...params }))
            }
          />
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  let pageFolders: PageFolder[] = [];
  let tabs: PageFolder[] = [];

  try {
    pageFolders = await fetchPageFolders();
  } catch (e) {
    console.log(e);
  }

  tabs = pageFolders.filter(
    ({ pageType }) => pageType === "PRODUCT" || pageType === "PROJECT"
  );

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
      tabs,
      pageFolders,
    },
  };
};

export default TablePage;
