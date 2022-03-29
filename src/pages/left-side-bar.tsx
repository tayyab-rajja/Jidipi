import FavoriteHeader from "src/components/FavoriteHeader/FavoriteHeader";
import Layout from "src/components/Layout";
import SidebarWithAvatar from "src/components/SidebarWithAvatar/SidebarWithAvatar";

const LeftSideBar = () => {
  return (
    <Layout SidebarComponent={SidebarWithAvatar}>
      <FavoriteHeader />
    </Layout>
  )
}

export default LeftSideBar;