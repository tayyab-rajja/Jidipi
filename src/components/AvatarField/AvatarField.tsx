import { FC, useState, useEffect } from "react";
import clsx from "clsx";

import styles from "./AvatarField.module.css";

import AvatarCurrent from "src/components/AvatarCurrent";
import AvatarsCatalog from "src/components/AvatarsCatalog";
import ButtonUserData from "src/components/ButtonUserData";

import { usePutUserData } from "src/api/usePutUserData";

const AvatarField: FC = () => {
  const { data: serverData, error, isValidating, putData } = usePutUserData();

  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
  console.log(currentAvatar);

  useEffect(() => {
    if (serverData?.user.avatar) setCurrentAvatar(serverData.user.avatar);
  }, [serverData?.user.avatar]);

  const chooseAvatar = (url: string | null): void => {
    setCurrentAvatar(url);
  };

  return (
    <div className={clsx(styles["Container"], styles["Body-Container"])}>
      <AvatarCurrent
        currentAvatar={currentAvatar}
        chooseAvatar={chooseAvatar}
      />
      <AvatarsCatalog
        chooseAvatar={chooseAvatar}
        currentAvatar={currentAvatar}
      />

      <ButtonUserData
        label="Save Change"
        action={() =>
          putData({
            avatar: currentAvatar,
          })
        }
        className={styles["Container-Button"]}
      />
    </div>
  );
};

export default AvatarField;
