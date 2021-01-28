import { useQuery } from "@apollo/client";
import { OperationVariables } from "@apollo/client/core";
import { QueryHookOptions } from "@apollo/client/react/types/types";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useEffect, useState } from "react";

import * as ar from "../asyncResource";
import { useDeepCompareValue } from "../hooks";

import {
  PaginatedData,
  PaginatedResponse,
  PaginatedVariables,
} from "./pagination";

export function useQueryResource<Data, Variables = OperationVariables>(
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

export function usePaginatedQuery<
  Data,
  Item,
  Variables extends PaginatedVariables
>(
  query: TypedDocumentNode<Data, Variables>,
  getPaginatedData: (data: Data) => PaginatedData<Item> | null,
  options: QueryHookOptions<Data, Variables> = {}
): PaginatedResponse<Item> {
  const [page, setPage] = useState<number>(1);
  const newVariables = useDeepCompareValue(
    options.variables != null
      ? {
          ...options.variables,
          page,
        }
      : {
          page,
        }
  );

  const newOptions = {
    ...options,
    variables: newVariables,
  };
  const { resource, fetchMore } = useQueryResource(query, newOptions);

  useEffect(() => {
    fetchMore({
      ...newVariables,
      page,
    });
  }, [newVariables, fetchMore, page]);

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
