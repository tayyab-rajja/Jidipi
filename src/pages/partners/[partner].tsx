import React, { ReactElement } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "src/components/Layout";
import CompanyProfile from "src/components/CompanyProfile/CompanyProfile";

import { useCompanyInfo } from "src/api/useCompanyInfo";
import { CompanyBoard } from "src/components/CompanyBoard/CompanyBoard";

interface Props {
  partnerId: string;
}

const PartnerPage = ({ partnerId }: Props) => {
  const {
    data: { cardPages, company, infoPages },
    isValidating,
  } = useCompanyInfo(partnerId);

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
            <CompanyProfile companyInfo={company} />
          )}
        </div>
      </div>

      <CompanyBoard pages={{ cardPages, infoPages }} />
    </>
  );
};

PartnerPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PartnerPage;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale,
}) => {
  return {
    notFound: !query.partner,
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
      partnerId: query.partner,
    },
  };
};
