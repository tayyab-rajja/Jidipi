import { FC } from "react";

import ActionPostButtons from "src/components/ActionPostButtons/ActionPostButtons";

import { ContentInfoPages } from "types/companyInfoPages";

import styles from "./InfoTab.module.css";

interface InfoTabProps {
  content: ContentInfoPages;
}

export const InfoTab: FC<InfoTabProps> = ({ content }) => {
  const { description, language, languages, _id } = content;
  return (
    <div className={styles["InfoTab"]}>
      <div className={styles["InfoTab-Wrapper"]}>
        <ActionPostButtons
          language={language}
          postId={_id}
          languages={languages}
          className={styles["InfoTab-Buttons"]}
        />
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};
