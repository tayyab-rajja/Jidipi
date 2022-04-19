export interface ContentInfoPages {
  _id: string;
  language: string;
  languages?: [];
  description: string;
}

export interface infoPages {
  title: string;
  content: ContentInfoPages;
}
