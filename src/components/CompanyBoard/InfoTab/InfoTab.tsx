import { FC } from "react";

interface InfoTabProps {
  content: {};
}

export const InfoTab: FC<InfoTabProps> = ({ content }) => {
  console.log(content);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content?.description }} />
    </div>
  );
};
