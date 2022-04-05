import { infoBlockSvgs } from "constant/infoBlockSvgs";
import { FC } from "react";
import styles from "./InfoBlock.module.css";

interface InfoBlockProps {
  title: string;
  text: string;
  type: string;
}

const InfoBlock: FC<InfoBlockProps> = ({ text, title, type }) => {
  return (
    <div className={styles["InfoBlock"]}>
      <div className={styles["InfoBlock-ImgWrapper"]}>
        {infoBlockSvgs[type]}
      </div>
      <div className={styles["InfoBlock-Hero"]}>
        <h4>{title}</h4>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default InfoBlock;
