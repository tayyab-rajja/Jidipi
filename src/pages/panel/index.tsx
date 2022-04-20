import type { GetServerSideProps } from "next";

const Home = () => {
  return <></>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: `/panel/post`,
    },
  };
};
