import type { GetServerSideProps } from "next";
import { fetchPageFolders } from "src/api/fetchPageFolders";

import { Post } from "types/postTypes";
import { PageFolder } from "types/pageFolderType";
interface Props {
  pageFolders: PageFolder[];
  posts: {
    posts: [] | Post[];
    total: number;
  };
  sidebarCategories: any;
}

const Home = ({ pageFolders, posts, sidebarCategories }: Props) => {
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
