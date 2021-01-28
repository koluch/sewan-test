import React from "react";
import styled from "styled-components";

import { usePaginatedQuery } from "../../../helpers/graphql/hooks";
import PaginatedResourceRenderer from "../PaginatedResourceRenderer";

import EpisodeListItem from "./EpisodeListItem";
import SeasonsFilter from "./SeasonsFilter";
import {
  Episode,
  EPISODES_QUERY,
  EpisodesQuery,
  EpisodesQueryVariables,
} from "./graphql";

const Root = styled.div`
  display: grid;
  grid-gap: 3rem;
`;

const Episodes = styled.div`
  display: grid;
  grid-gap: 3rem;
`;

export default function (): JSX.Element {
  const response = usePaginatedQuery<
    EpisodesQuery,
    Episode,
    EpisodesQueryVariables
  >(EPISODES_QUERY, (queryData) => queryData.episodes);

  return (
    <Root>
      <SeasonsFilter seasonsCount={4} />

      <PaginatedResourceRenderer response={response}>
        {(episodes: Episode[]) => (
          <Episodes>
            {episodes.map((episode: Episode) => (
              <EpisodeListItem key={episode.id} episode={episode} />
            ))}
          </Episodes>
        )}
      </PaginatedResourceRenderer>
    </Root>
  );
}
