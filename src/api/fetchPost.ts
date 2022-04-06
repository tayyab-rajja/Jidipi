export const fetchPost = async (postId: string) => {
  const response = await await fetch(
    `https://api.jidipi.com/api/v1/post/public/${postId}/en`
  );
  const data = await response.json();

  return data;
};
