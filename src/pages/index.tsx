import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

import { fetchPageFolders } from "src/api/fetchPageFolders";

import Layout from "src/components/Layout";
import HomePageSection from "src/components/HomePageSection/HomePageSection";
import HomePageFooter from "src/components/HomePageFooter/HomePageFooter";

import { PageFolder } from "types/pageFolderType";

interface Props {
    pageFolders: PageFolder[];
}

const Home = ({ pageFolders }: Props) => {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <>
                {/* TDOD: add home page header component  */}
                {pageFolders.map(({ title, _id }) => (
                    <HomePageSection key={_id} pageFolderId={_id} pageName={title} />
                ))}
                <HomePageFooter />
            </>
        </>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    // // use process.env.current domain for testing in local,
    // // once online, should judge the subdomain from url
    // const currentDomain = process.env.CURRENT_DOMAIN ? process.env.CURRENT_DOMAIN.toString() : '';
    // let redirectToPath = `/`;
    // if (["partner.jidipi.com", "judge.jidipi.com"].includes(currentDomain)) {
    //     //If not login, redirect to login page
    //     redirectToPath = `/user/login`;
    // }else{
    return <Layout style={{ padding: 0 }}>{page}</Layout>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    let pageFolders: PageFolder[] = [];

    try {
        pageFolders = await fetchPageFolders();
    } catch (e) {
        console.log(e);
    }

    pageFolders = pageFolders.filter(
        ({ pageType }) => pageType === "PRODUCT" || pageType === "PROJECT"
    );

    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["common"])),
            pageFolders,
        },
    };
};
