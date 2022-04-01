import Layout from "src/components/Layout";
import SidebarWithAvatar from "src/components/SidebarWithAvatar/SidebarWithAvatar";

const LeftSideBar = () => {
  return (
    <Layout SidebarComponent={<SidebarWithAvatar />}>
      <div></div>
    </Layout>
  );
};

export default LeftSideBar;
