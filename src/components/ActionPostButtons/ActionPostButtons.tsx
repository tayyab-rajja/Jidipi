import clsx from "clsx";
import { postsActionSvG } from "constant/postsActionSvG";
import { useTranslation } from "next-i18next";
import { FC } from "react";
import styles from "./ActionPostButtons.module.css";

interface ActionPostButtonsProps {
  language: string;
  languages?: [];
  postId: string;
  className?: string;
}

const ActionPostButtons: FC<ActionPostButtonsProps> = ({
  language,
  languages,
  postId,
  className,
}) => {
  const { t } = useTranslation();

  return (
    <div className={clsx(styles["ActionPostButtons"], className)}>
      {/* TODO: added logic to change post language */}
      {languages ? (
        languages.map(({ language: languageFromArray, _id }) => (
          <button
            key={_id}
            className={clsx(
              styles["ActionPostButtons-Button"],
              languageFromArray === language && styles["Active"]
            )}
          >
            {t(languageFromArray)}
          </button>
        ))
      ) : (
        <button
          className={clsx(styles["ActionPostButtons-Button"], styles["Active"])}
        >
          {t(language)}
        </button>
      )}
      <a
        href={`${process.env.NEXT_PUBLIC_API_URL}/post/${postId}/gallery/download`}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(styles["ActionPostButtons-Button"])}
      >
        {postsActionSvG["DOWNLOAD"]}
      </a>
      <button className={clsx(styles["ActionPostButtons-Button"])}>
        {postsActionSvG["SHARE"]}
      </button>
      <button className={clsx(styles["ActionPostButtons-Button"])}>
        {postsActionSvG["FAVORITE"]}
      </button>
    </div>
  );
};

export default ActionPostButtons;
