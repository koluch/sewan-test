import React from "react";
import styled from "styled-components";

import { Episode } from "../graphql";

import Character from "./Character";

const Root = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
`;

const EpisodeNumber = styled.span`
  font-weight: bold;
`;

const AirDate = styled.h2`
  font-size: 0.9rem;
`;

const Characters = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

interface Props {
  episode: Episode | null;
}

export default function (props: Props): JSX.Element {
  const { episode } = props;
  return (
    <Root>
      <Title>
        <EpisodeNumber>{episode?.episode}</EpisodeNumber> — {episode?.name}
      </Title>
      <AirDate>{episode?.air_date}</AirDate>
      <Characters>
        {episode?.characters?.map((character) => (
          <Character key={character?.id} character={character} />
        ))}
      </Characters>
    </Root>
  );
}
