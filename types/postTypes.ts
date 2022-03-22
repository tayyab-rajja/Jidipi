export interface Posts {
  title: string;
  image: string;
  categories: {
    title: string;
    type: string;
  }[];
}
