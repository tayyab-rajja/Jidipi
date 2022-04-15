import styles from "./Sidebar.module.css";
import Categories from "src/components/Categories";

interface Props {}

export const Sidebar = ({}: Props) => {
  return (
    <div className={styles["Sidebar"]}>
      {/* <input
        className={styles["Sidebar-SearchInput"]}
        type="text"
        // value={searchValue}
        // onChange={handleSearch}
        placeholder="Search"
      /> */}
      <Categories />
    </div>
  );
};
