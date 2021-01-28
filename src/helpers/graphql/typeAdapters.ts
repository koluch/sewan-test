import { PaginatedData } from "./pagination";

export type Unnullify<V> = V extends infer T | null ? T : never;
export type ArrayItem<V> = V extends (infer T)[] ? T : never;
export type PaginatedResultItem<Data> = Data extends PaginatedData<infer Item>
  ? Item
  : never;
