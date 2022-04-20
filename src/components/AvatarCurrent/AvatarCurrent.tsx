import { FC, useEffect, useState } from "react";
import Image from "next/image";

import { useDropzone } from "react-dropzone";
import clsx from "clsx";

import styles from "./AvatarCurrent.module.css";

import cloudIcon from "public/icon-cloud.svg";
interface Props {
  currentAvatar: string | null;
  chooseAvatar: (arg: null | string) => void;
}

const AvatarCurrent: FC<Props> = ({ currentAvatar, chooseAvatar }) => {
  const { getRootProps, open } = useDropzone({
    accept: "image/jpeg,image/png",
    noClick: true,
    multiple: false,
    onDropAccepted: (acceptedFiles) => chooseAvatar(acceptedFiles[0]),
  });

  const content = currentAvatar ? (
    <>
      <Image
        src={
          typeof currentAvatar === "string"
            ? currentAvatar
            : URL.createObjectURL(currentAvatar)
        }
        alt="avatar"
        objectFit="cover"
        layout="fill"
        className={styles["Avatar"]}
      />
      <span
        className={styles["Container-DeleteAvatar"]}
        onClick={() => chooseAvatar(null)}
      >
        x
      </span>
    </>
  ) : (
    <>
      <Image src={cloudIcon} alt="cloud icon" width={14.03} height={11.36} />

      <p className={clsx(styles["Text_Gray"], styles["Container-TextToDo"])}>
        Drag and Drop or <br />
        <span className={styles["Container-TextBrowse"]} onClick={open}>
          Browse
        </span>
        to upload
      </p>

      <p className={clsx(styles["Text_Gray"], styles["Container-TextSize"])}>
        min 250 x 250px / max 1mb
      </p>
    </>
  );

  const classContainer = clsx(
    styles["Container"],
    styles["Body-Container"],
    currentAvatar && styles["Body-ContainerWithImage"]
  );

  return <div {...getRootProps({ className: classContainer })}>{content}</div>;
};

export default AvatarCurrent;
