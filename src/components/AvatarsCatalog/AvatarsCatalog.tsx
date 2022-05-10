import { FC, useState, useEffect } from "react";
import Image from "next/image";

import clsx from "clsx";

import styles from "./AvatarsCatalog.module.css";

const avatarsDefault = [
  { url: "/images/avatars-icons/reader-w-01.png", choosed: false },
  { url: "/images/avatars-icons/reader-w-02.png", choosed: false },
  { url: "/images/avatars-icons/reader-w-03.png", choosed: false },
  { url: "/images/avatars-icons/reader-w-05.png", choosed: false },
  { url: "/images/avatars-icons/reader-w-07.png", choosed: false },
  { url: "/images/avatars-icons/reader-m-31.png", choosed: false },
  { url: "/images/avatars-icons/reader-m-43.png", choosed: false },
  { url: "/images/avatars-icons/reader-m-44.png", choosed: false },
  { url: "/images/avatars-icons/reader-m-45.png", choosed: false },
  { url: "/images/avatars-icons/reader-m-46.png", choosed: false },
];

interface Props {
  chooseAvatar: (url: string) => void;
  currentAvatar: string | File | null;
}

const AvatarsCatalog: FC<Props> = ({ chooseAvatar, currentAvatar }) => {
  const [avatars, setAvatars] = useState(avatarsDefault);

  return (
    <div>
      <p className={clsx(styles["Text"], styles["Body-Text"])}>
        Or select an avatar from our template
      </p>

      <div className={clsx(styles["Container"], styles["Body-Container"])}>
        {avatars.map((avatar, index) => {
          return (
            <div
              key={index}
              className={clsx(styles["AvatarWrapper"])}
              data-choosed={avatar.url === currentAvatar}
              onClick={() => {
                chooseAvatar(avatar.url);
              }}
            >
              <Image src={avatar.url} alt="avatar" width={80} height={80} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvatarsCatalog;
