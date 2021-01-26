import { useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";

import EpisodeListItem from "./EpisodeListItem";
import { EPISODES_QUERY, EpisodesQuery } from "./graphql";

const Root = styled.div`
  display: grid;
  grid-gap: 2rem;
`;

export default function (): JSX.Element {
  const { loading, error, data } = useQuery<EpisodesQuery>(EPISODES_QUERY);

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error != null) {
    return <h1>Error</h1>;
  }
  return (
    <Root>
      {data?.episodes?.results?.map((episode) => (
        <EpisodeListItem key={episode?.id} episode={episode} />
      ))}
    </Root>
  );
}
