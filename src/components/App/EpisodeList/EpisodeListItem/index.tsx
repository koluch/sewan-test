import React from "react";
import styled from "styled-components";

import { Episode } from "../graphql";

import Character from "./Character";

const Title = styled.h1`
  font-size: 1.5rem;
`;

const Root = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

const Characters = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, 80px);
  grid-auto-rows: 80px;
`;

interface Props {
  episode: Episode | null;
}

export default function (props: Props): JSX.Element {
  const { episode } = props;
  return (
    <Root>
      <Title>
        {episode?.episode} - {episode?.name}
      </Title>
      <Characters>
        {episode?.characters?.map((character) => (
          <Character key={character?.id} character={character} />
        ))}
      </Characters>
    </Root>
  );
}
