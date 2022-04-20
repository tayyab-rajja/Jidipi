export interface Label {
  _id: string;
  colour: string;
  label: string;
  pageType: string;
  createdBy: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LabelBody {
  _id?: string;
  colour: string;
  label: string;
  pageType?: string;
  createdBy?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}
