export interface SearchInputOption {
  readonly label: string;
  readonly value: string;
}

export type SearchInputValue = readonly SearchInputOption[] | [];
