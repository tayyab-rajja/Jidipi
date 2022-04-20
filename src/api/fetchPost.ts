export const fetchPost = async (postId: string, language: string = "en") => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/public/${postId}/${language}`
  );
  const data = await response.json();

  return data;
};
