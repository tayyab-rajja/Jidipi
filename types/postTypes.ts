export interface Categories {
  title: string;
  type: string;
}
export interface Posts {
  title: string;
  image: string;
  id: string;
  categories: Categories[];
}
