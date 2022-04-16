import { FC } from "react";

import ActionPostButtons from "src/components/ActionPostButtons/ActionPostButtons";

import { ContentInfoPages } from "types/companyInfoPages";

interface InfoTabProps {
  content: ContentInfoPages;
}

export const InfoTab: FC<InfoTabProps> = ({ content }) => {
  const { description, language, languages, _id } = content;
  return (
    <div>
      <ActionPostButtons
        language={language}
        postId={_id}
        languages={languages}
        // className={styles["CardDetails-Buttons"]}
      />
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};
