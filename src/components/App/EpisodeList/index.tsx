import React from "react";
import styled from "styled-components";

import { useQueryResource } from "../../../helpers/graphql";
import AsyncResourceRenderer from "../AsyncResourceRenderer";

import EpisodeListItem from "./EpisodeListItem";
import { EPISODES_QUERY, EpisodesQuery } from "./graphql";

const Root = styled.div`
  display: grid;
  grid-gap: 2rem;
`;

export default function (): JSX.Element {
  const resultRes = useQueryResource<EpisodesQuery>(EPISODES_QUERY);

  return (
    <Root>
      <AsyncResourceRenderer resource={resultRes}>
        {({ episodes }) =>
          episodes?.results?.map((episode) => (
            <EpisodeListItem key={episode?.id} episode={episode} />
          ))
        }
      </AsyncResourceRenderer>
    </Root>
  );
}
