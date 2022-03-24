export interface Posts {
  title: string;
  image: string;
  id: string;
  categories: {
    title: string;
    type: string;
  }[];
}
