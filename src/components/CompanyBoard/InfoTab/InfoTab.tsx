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
        <ActionPostButtons postId={_id} className={styles["InfoTab-Buttons"]}>
          {/* TODO: add languages buttons */}
          {/* {languages ? (
            languages.map(({ language: languageFromArray, _id }) => (
              <Link
                key={_id}
                href={{
                  pathname: `${pathname}/[language]`,
                  query: {
                    folder: query.folder,
                    post: [...query?.post?.slice(0, 2)],
                    language: languageFromArray.toLocaleLowerCase(),
                  },
                }}
              >
                <a
                  className={clsx(
                    styles["CardDetails-LanguageLink"],
                    languageFromArray === language && styles["Active"]
                  )}
                >
                  {languageFromArray}
                </a>
              </Link>
            ))
          ) : (
            <Link
              href={{
                pathname: `${pathname}/[language]`,
                query: {
                  ...query,
                  language,
                },
              }}
            >
              <a
                className={clsx(
                  styles["CardDetails-LanguageLink"],
                  styles["Active"]
                )}
              >
                {language}
              </a>
            </Link>
          )} */}
        </ActionPostButtons>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};
