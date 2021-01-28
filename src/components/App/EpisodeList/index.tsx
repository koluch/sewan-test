import React from "react";
import styled from "styled-components";

import { usePaginatedQuery } from "../../../helpers/graphql/hooks";
import PaginatedResourceRenderer from "../PaginatedResourceRenderer";

import EpisodeListItem from "./EpisodeListItem";
import {
  Episode,
  EPISODES_QUERY,
  EpisodesQuery,
  EpisodesQueryVariables,
} from "./graphql";

const Root = styled.div`
  display: grid;
  grid-gap: 2rem;
`;

export default function (): JSX.Element {
  const response = usePaginatedQuery<
    EpisodesQuery,
    Episode,
    EpisodesQueryVariables
  >(EPISODES_QUERY, (queryData) => queryData.episodes);

  return (
    <Root>
      <PaginatedResourceRenderer response={response}>
        {(episodes: Episode[]) => (
          <>
            {episodes.map((episode: Episode) => (
              <EpisodeListItem key={episode.id} episode={episode} />
            ))}
          </>
        )}
      </PaginatedResourceRenderer>
    </Root>
  );
}
