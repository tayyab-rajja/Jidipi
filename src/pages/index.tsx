import type { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

import { useTranslation } from "next-i18next";

import SampleComponent from "src/components/SampleComponent";
import { Navbar } from "src/components/Navbar/Navbar";

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        <h1>
          {t("welcome", "Welcome to")}{" "}
          <SampleComponent>
            <a href="https://nextjs.org">Next.js!</a>
          </SampleComponent>
        </h1>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
