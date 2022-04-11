export interface Categories {
  title: string;
  type: string;
}
export interface Post {
  title: string;
  image: string;
  id: string;
  categories: Categories[];
  slug: string;
}
