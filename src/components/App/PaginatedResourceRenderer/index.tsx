import React from "react";
import styled from "styled-components";

import { PaginatedResponse } from "../../../helpers/graphql/pagination";
import AsyncResourceRenderer from "../AsyncResourceRenderer";

interface Props<Item> {
  response: PaginatedResponse<Item>;
  children: (items: Item[]) => JSX.Element;
}

const Root = styled.div`
  display: grid;
  grid-gap: 2rem;
`;

const Pagination = styled.div``;

const Items = styled.div``;

const PageButton = styled.button``;

export default function <Item>(props: Props<Item>): JSX.Element {
  // todo: implement actual layout
  const { response, children } = props;
  return (
    <>
      <AsyncResourceRenderer resource={response.resource}>
        {(data) => {
          if (data == null || data.results == null) {
            return <></>;
          }
          return (
            <Root>
              <Items>
                {children(
                  data.results.filter(
                    (item: Item | null): item is Item => item != null
                  )
                )}
              </Items>
              <Pagination>
                {[...new Array(data?.info?.pages)].map((_, i) => (
                  <PageButton
                    key={i}
                    onClick={() => response.pagination.goToPage(i + 1)}
                  >
                    {i + 1}
                  </PageButton>
                ))}
              </Pagination>
            </Root>
          );
        }}
      </AsyncResourceRenderer>
    </>
  );
}
