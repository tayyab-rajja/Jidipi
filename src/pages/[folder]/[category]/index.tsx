import type { GetServerSideProps } from "next";
import { fetchPageFolders } from "src/api/fetchPageFolders";

import { PageFolder } from "types/pageFolderType";

const Home = () => {
  return <></>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  let pageFolders: PageFolder[] = [];

  try {
    pageFolders = await fetchPageFolders();
  } catch (e) {
    console.log(e);
  }

  return {
    redirect: {
      permanent: false,
      destination: `/${pageFolders[0].subDomain}`,
    },
  };
};
