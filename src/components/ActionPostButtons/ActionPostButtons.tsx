import { FC } from "react";
import clsx from "clsx";

import { postsActionSvG } from "constant/postsActionSvG";

import styles from "./ActionPostButtons.module.css";

interface ActionPostButtonsProps {
  postId: string;
  className?: string;
  favoriteButton?: () => void;
}

const ActionPostButtons: FC<ActionPostButtonsProps> = ({
  postId,
  className,
  favoriteButton,
  children,
}) => {
  return (
    <div className={clsx(styles["ActionPostButtons"], className)}>
      {/* TODO: added logic to change post language */}
      {children}
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
      <button
        className={clsx(styles["ActionPostButtons-Button"])}
        onClick={favoriteButton}
      >
        {postsActionSvG["FAVORITE"]}
      </button>
    </div>
  );
};

export default ActionPostButtons;
