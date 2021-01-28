import { useQuery } from "@apollo/client";
import { QueryHookOptions } from "@apollo/client/react/types/types";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useEffect, useState } from "react";

import * as ar from "../asyncResource";
import { useDeepCompareEffect, useDeepCompareValue } from "../hooks";

import {
  PaginatedData,
  PaginatedResponse,
  PaginatedVariables,
} from "./pagination";

export function useQueryResource<Data, Variables>(
  query: TypedDocumentNode<Data, Variables>,
  options?: QueryHookOptions<Data, Variables>
): {
  resource: ar.AsyncResource<Data>;
  fetchMore: (variables: Variables) => void;
} {
  const result = useQuery<Data, Variables>(query, options);
  let resource: ar.AsyncResource<Data>;
  if (result.loading) {
    resource = ar.loading(result.previousData);
  } else if (result.error) {
    resource = ar.failed(result.error.message);
  } else {
    if (result.data == null) {
      throw new Error(
        `If query is not loading and not in error state, data should not be null`
      );
    }
    resource = ar.success(result.data);
  }
  return {
    resource,
    fetchMore: result.fetchMore,
  };
}

type VariablesWithoutPagination<Variables> = Omit<Variables, "page">;

export function usePaginatedQuery<
  Data,
  Item,
  Variables extends PaginatedVariables
>(
  query: TypedDocumentNode<Data, Variables>,
  getPaginatedData: (data: Data) => PaginatedData<Item> | null,
  variables: VariablesWithoutPagination<Variables>,
  options: QueryHookOptions<Data, Variables> = {}
): PaginatedResponse<Item> {
  type FullVariables = VariablesWithoutPagination<Variables> & {
    page: number;
  };

  const [page, setPage] = useState<number>(1);

  useDeepCompareEffect(() => {
    setPage(1);
  }, [variables]);

  const fullVariables: FullVariables = useDeepCompareValue({
    ...variables,
    page,
  });

  const { resource, fetchMore } = useQueryResource(query, {
    ...options,
    variables: fullVariables,
  });

  useEffect(() => {
    fetchMore(fullVariables);
  }, [fullVariables, fetchMore]);

  return {
    resource: ar.map(resource, getPaginatedData),
    pagination: {
      goToPage: (page) => {
        setPage(page);
      },
      nextPage: () => {
        setPage((page) => page + 1);
      },
      prevPage: () => {
        setPage((page) => (page < 2 ? 1 : page - 1));
      },
    },
  };
}
