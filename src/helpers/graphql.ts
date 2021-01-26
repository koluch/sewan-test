export type Unnullify<V> = V extends infer T | null ? T : never;

export type ArrayItem<V> = V extends (infer T)[] ? T : never;

export type PaginatedResultItem<PaginatedResult> = PaginatedResult extends {
  results: (infer Item | null)[] | null;
}
  ? Item
  : never;
