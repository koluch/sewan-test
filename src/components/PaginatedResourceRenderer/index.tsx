import React from "react";
import styled from "styled-components";

import { PaginatedResponse } from "../../helpers/graphql/pagination";
import AsyncResourceRenderer from "../AsyncResourceRenderer";
import Button from "../kit/Button";

interface Props<Item> {
  response: PaginatedResponse<Item>;
  children: (items: Item[]) => JSX.Element;
}

const Root = styled.div`
  display: grid;
  grid-gap: 2rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;

  > *:not(:first-child) {
    margin-left: 0.25rem;
  }
`;

const Items = styled.div``;

export default function <Item>(props: Props<Item>): JSX.Element {
  // todo: implement actual layout
  const { response, children } = props;
  return (
    <>
      <AsyncResourceRenderer resource={response.resource}>
        {(data) => {
          if (data == null) {
            return <></>;
          }
          const { info, results } = data;

          if (results == null) {
            return <></>;
          }

          const pages = info?.pages || 1;
          const next = info?.next || null;

          const currentPage = next != null ? next - 1 : pages;
          return (
            <Root>
              <Items>
                {children(
                  results.filter(
                    (item: Item | null): item is Item => item != null
                  )
                )}
              </Items>
              {pages > 1 && (
                <Pagination>
                  {[...new Array(pages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={i}
                        variant={currentPage === page ? "SECONDARY" : "PRIMARY"}
                        onClick={() => response.pagination.goToPage(page)}
                      >
                        {`${page}`}
                      </Button>
                    );
                  })}
                </Pagination>
              )}
            </Root>
          );
        }}
      </AsyncResourceRenderer>
    </>
  );
}
