import { Posts } from "types/postTypes";

export const getPostCategories = (post: any, withoutCategory?: string) => {
  const categories = [
    {
      title: new Date(post.publishedDate).toDateString(),
      type: "DATE",
    },
  ];

  for (const key in post) {
    if (
      withoutCategory &&
      key.toLocaleLowerCase().includes(withoutCategory.toLocaleLowerCase())
    ) {
      continue;
    }

    if (key.toLocaleLowerCase().includes("categories")) {
      post[key].forEach(({ title, type }: { title: string; type: string }) => {
        categories.push({
          title,
          type,
        });
      });
    }

    if (key === "companyId" && post[key]) {
      categories.push({
        title: post[key].companyName,
        type: "COMPANY",
      });
    }
  }

  return categories;
};

export const changePostsData = (posts: []): Posts[] | [] => {
  if (!posts || !posts.length) {
    return [];
  }

  const newPosts: Posts[] = posts.map((post: any) => {
    const newPost = {
      title: post.title,
      image: post.featuredImage?.liveURL,
      id: post.postUniqueId,
      categories: getPostCategories(post),
    };

    return newPost;
  });

  return newPosts;
};
