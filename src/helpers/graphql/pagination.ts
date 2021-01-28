import * as ar from "../asyncResource";

export interface PaginationInfo {
  count: number | null;
  pages: number | null;
  next: number | null;
  prev: number | null;
}

export type PaginatedData<Item> = {
  info: PaginationInfo | null;
  results: (Item | null)[] | null;
};

export interface PaginatedVariables {
  page: number;
}

export interface PaginatedResponse<Item> {
  resource: ar.AsyncResource<PaginatedData<Item> | null>;
  pagination: {
    goToPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
  };
}
