import React, { ReactElement } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "src/components/Layout";
import CompanyProfile from "src/components/CompanyProfile/CompanyProfile";

import { useCompanyInfo } from "src/api/useCompanyInfo";
import { CompanyBoard } from "src/components/CompanyBoard/CompanyBoard";

interface Props {}

const FolderPage = ({}: Props) => {
  const { data, isValidating } = useCompanyInfo("8e9-4m8");

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ backgroundColor: "#fff", width: "100%" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", minHeight: 300 }}>
          {isValidating ? (
            "Loading..."
          ) : (
            <CompanyProfile companyInfo={data.company} />
          )}
        </div>
      </div>

      <CompanyBoard tabs={data.pages} content={data.content} />
    </>
  );
};

FolderPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default FolderPage;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};
