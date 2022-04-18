import useSWR from "swr";

import { changePostsData } from "helpers/changePostsData";

export const useCompanyPosts = (pageFolderId: string, partnerId: string) => {
  const { data, error, isValidating } = useSWR(
    pageFolderId && partnerId
      ? `${process.env.NEXT_PUBLIC_API_URL}/post/public/${pageFolderId}?pageNumber=0&pageSize=100&language=EN&partnerId=${partnerId}`
      : null
  );

  const posts = changePostsData(data?.posts);

  return { data: posts, error, isValidating };
};
