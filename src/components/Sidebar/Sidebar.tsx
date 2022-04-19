import { useState } from "react";
import qs from "qs";

import { SearchInput } from "src/components/Input/SearchInput";
import { useRouter } from "next/router";
import Categories from "src/components/Categories";

import { SearchInputValue } from "types/searcInputTypes";

import styles from "./Sidebar.module.css";

interface Props {}

export const Sidebar = ({}: Props) => {
  const { push, pathname, query } = useRouter();
  const [search, setSearch] = useState<SearchInputValue>([]);

  const handleSearch = (value: SearchInputValue) => {
    setSearch(value);
    let searchKey = value.map(({ value }) => value).join(" ");

    push(
      {
        pathname,
        query: { ...query, searchKey },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className={styles["Sidebar"]}>
      <SearchInput
        className={styles["Sidebar-SearchInput"]}
        value={search}
        onChange={handleSearch}
      />
      <Categories />
    </div>
  );
};
