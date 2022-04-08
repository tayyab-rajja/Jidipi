import Layout from "src/components/Layout";
import SidebarWithAvatar from "src/components/SidebarWithAvatar/SidebarWithAvatar";
import SaveInFolderSidebar from "src/components/SaveInFolderSidebar";

const LeftSideBar = () => {
  return (
    <Layout SidebarComponent={<SaveInFolderSidebar />}>
      <div></div>
    </Layout>
  );
};

export default LeftSideBar;
