import FavouriteHeader from "src/components/FavoriteHeader/FavoriteHeader";
import Navbar from "src/components/Navbar";
import SidebarWithAvatar from "src/components/SidebarWithAvatar/SidebarWithAvatar";
import styles from '../components/Layout/Layout.module.css';

const LeftSideBar = () => {
  return (
    <>
      <Navbar />
      <main className={styles["Layout-Container"]}>
        <SidebarWithAvatar />
        <div className={styles["Layout-Content"]} style={{padding: "0px"}}>
          <FavouriteHeader />
        </div>
      </main>
  </>
  );
};

export default LeftSideBar;