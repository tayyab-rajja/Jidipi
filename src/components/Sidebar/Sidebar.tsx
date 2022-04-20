import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { createOption, SearchInput } from "src/components/Input/SearchInput";
import Categories from "src/components/Categories";

import { SearchInputValue } from "types/searcInputTypes";

import styles from "./Sidebar.module.css";

interface Props {}

export const Sidebar = ({}: Props) => {
  const { push, query } = useRouter();
  const [search, setSearch] = useState<SearchInputValue>([]);

  const handleSearch = (value: SearchInputValue) => {
    setSearch(value);
    const searchKeys = value.map(({ value }) => value).join(" ");

    if (searchKeys) {
      push(
        {
          pathname: `/[folder]/search/[searchKeys]`,
          query: { folder: query.folder, searchKeys },
        },
        undefined,
        { shallow: true }
      );
    } else {
      push(
        {
          pathname: `/[folder]`,
          query: { folder: query.folder },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  useEffect(() => {
    if (query.searchKeys) {
      const searchKeys = query.searchKeys as string;
      const value = searchKeys.split(" ").map(createOption);

      setSearch(value);
    }
  }, []);

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
