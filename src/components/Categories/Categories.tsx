import styles from "./Categories.module.css";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import { useRouter } from "next/router";
import { usePageFolderByName } from "src/api/usePageFolderByName";
import {
  ICategoriesResponse,
  ICategory,
  ICategoryTab,
} from "types/categoryTypes";
import { useCategories } from "./useCategories";
import { CategoriesList } from "./CategoriesList";
import { CompaniesList } from "./CompaniesList";
import { categoriesSvg } from "constant/categoriesSvg";

type Props = {};

interface CategoriesTabData {
  id: string;
  label: string;
  content: ICategoryTab;
}
const convertCategoriesToTabsData = (
  categories: ICategoryTab[]
): CategoriesTabData[] => {
  return categories.map((category) => ({
    id: category._id,
    label: category.type,
    content: category,
  }));
};

export const Categories = (props: Props) => {
  const { query } = useRouter();

  const { data: pageFolder } = usePageFolderByName(
    (query.folder as string) ?? null
  );

  const { categories } = useCategories((pageFolder?._id as string) ?? null);

  if (!query.folder) {
    console.warn("no page folder provided in url to render Categories");

    return null;
  }

  return categories ? (
    <>
      <Tabs className={styles.Tabs}>
        <TabList>
          <Tab>
            {categoriesSvg["DATE"]}
            <span>DATE</span>
          </Tab>
          {convertCategoriesToTabsData(categories.categories).map((item) => (
            <Tab key={item.id}>
              {categoriesSvg[item.label]}
              <span>{item.label}</span>
            </Tab>
          ))}
          <Tab>
            {
              categoriesSvg[
                query.folder === "architectures" ? "ARCHITECTS" : "BRAND"
              ]
            }
            <span>
              {query.folder === "architectures" ? "ARCHITECT" : "BRAND"}
            </span>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>DATE</TabPanel>
          {convertCategoriesToTabsData(categories.categories).map((item) => (
            <TabPanel key={item.id}>
              <CategoriesList category={item.content} />
            </TabPanel>
          ))}
          <TabPanel>
            <CompaniesList
              companies={categories?.companies}
              companiesCount={categories?.companiesCount}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  ) : (
    <p>Loading</p>
  );
};
