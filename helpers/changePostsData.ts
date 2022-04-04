import { Post } from "types/postTypes";

export const getPostCategories = (post: any, withoutCategory?: string) => {
  if (!post) {
    return [];
  }
  const categories = [
    {
      title: new Date(post.publishedDate).toDateString(),
      type: "DATE",
    },
  ];

  for (const key in post) {
    const isWithoutCategory =
      withoutCategory &&
      key.toLocaleLowerCase().includes(withoutCategory.toLocaleLowerCase());

    if (isWithoutCategory) {
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

export const changePostsData = (posts: []): Post[] | [] => {
  if (!posts || !posts.length) {
    return [];
  }

  const newPosts: Post[] = posts.map((post: any) => ({
    title: post.title,
    image: post.featuredImage?.liveURL || null,
    id: post.postUniqueId,
    categories: getPostCategories(post),
    slug: post.slug,
  }));

  return newPosts;
};
