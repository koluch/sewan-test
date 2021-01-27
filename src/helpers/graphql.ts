import { useQuery } from "@apollo/client";
import { OperationVariables } from "@apollo/client/core";
import { QueryHookOptions } from "@apollo/client/react/types/types";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { DocumentNode } from "graphql";

import * as ar from "./asyncResource";

export type Unnullify<V> = V extends infer T | null ? T : never;

export type ArrayItem<V> = V extends (infer T)[] ? T : never;

export type PaginatedResultItem<PaginatedResult> = PaginatedResult extends {
  results: (infer Item | null)[] | null;
}
  ? Item
  : never;

export function useQueryResource<TData, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>
): ar.AsyncResource<TData> {
  const result = useQuery<TData, TVariables>(query, options);
  if (result.loading) {
    return ar.loading(result.previousData);
  }
  if (result.error) {
    return ar.failed(result.error.message);
  }
  if (result.data == null) {
    throw new Error(
      `If query is not loading and not in error state, data should not be null`
    );
  }
  return ar.success(result.data);
}
