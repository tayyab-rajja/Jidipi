import { useRouter } from "next/router";
import React from "react";

type Props = {};

const Post = (props: Props) => {
  const { query } = useRouter();

  console.log(query);

  return <div>Post</div>;
};

export default Post;
