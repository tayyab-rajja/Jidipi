import { Posts } from "types/postTypes";

export const changePostsData = (posts: []): Posts[] | [] => {
  if (!posts || !posts.length) {
    return [];
  }

  const newPosts: Posts[] = posts.map((post: any) => {
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
        const categoty = {
          title: "",
          type: "",
        };
        post[key].forEach(
          ({ title, type }: { title: string; type: string }, index: number) => {
            categoty.type = type;
            categoty.title +=
              index === post[key].length - 1 ? title : `${title}, `;
          }
        );
        newPost.categories.push(categoty);
      }
      if (key === "companyId" && post[key]) {
        newPost.categories.push({
          title: post[key].companyName,
          type: "COMPANY",
        });
      }
    }

    return newPost;
  });

  return newPosts;
};
