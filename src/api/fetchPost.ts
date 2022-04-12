export const fetchPost = async (postId: string) => {
  const response = await await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/public/${postId}/en`
  );
  const data = await response.json();

  return data;
};
