import useSWR from "swr";

import { changePostsData } from "helpers/changePostsData";

export const useCompanyPosts = (pageFolderId: string) => {
  const { data, error } = useSWR(
    pageFolderId
      ? `${process.env.NEXT_PUBLIC_API_URL}/post/public/${pageFolderId}?pageNumber=0&pageSize=100&language=EN&partnerId=8e9-4m8`
      : null
  );

  const posts = changePostsData(data?.posts);

  return { data: posts, error };
};
