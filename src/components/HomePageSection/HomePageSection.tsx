import { FC } from "react";

import { Cards } from "./Cards";
import { Caregories } from "./Caregories";

import styles from "./HomePageSection.module.css";

interface Props {
  pageFolderId: string;
  pageName: string;
}

const HomePageSection: FC<Props> = ({ pageFolderId, pageName }) => {
  return (
    <section className={styles["HomePageSection"]}>
      <section className={styles["HomePageSection-Content"]}>
        <div className={styles["HomePageSection-TitleWrapper"]}>
          <h1 className={styles["HomePageSection-Title"]}>{pageName}</h1>
        </div>
        <Cards pageFolderId={pageFolderId} pageName={pageName} />
      </section>
      <section>
        <Caregories pageFolderId={pageFolderId} pageName={pageName} />
      </section>
    </section>
  );
};

export default HomePageSection;
