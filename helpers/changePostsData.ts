import { Posts } from "types/postTypes";

export const changePostsData = (posts: []): Posts[] | [] => {
  if (!posts || !posts.length) {
    return [];
  }

  const newPosts: Posts[] = [];

  posts.forEach((post: any) => {
    const newPost = {
      title: post.title,
      image: post.featuredImage?.liveURL,
      categories: [
        {
          title: new Date(post.publishedDate).toDateString(),
          type: "DATE",
        },
      ],
    };

    for (const key in post) {
      if (key.toLocaleLowerCase().includes("categories")) {
        post[key].forEach(
          ({ title, type }: { title: string; type: string }) => {
            newPost.categories.push({
              title,
              type,
            });
          }
        );
      } else if (key === "companyId" && post[key]) {
        newPost.categories.push({
          title: post[key].title,
          type: "",
        });
      }
    }

    newPosts.push(newPost);
  });

  return newPosts;
};
