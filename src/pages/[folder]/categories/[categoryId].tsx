import { useRouter } from "next/router";
import React from "react";

type Props = {};

const CategoryId = (props: Props) => {
  const { query } = useRouter();

  return <div>CategoryId - {query?.categoryId}</div>;
};

export default CategoryId;
