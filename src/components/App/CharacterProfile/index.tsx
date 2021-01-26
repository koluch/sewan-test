import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { ROUTES } from "../../../services/routing";
import Link from "../../Link";

import {
  CHARACTER_QUERY,
  CharacterQuery,
  CharacterQueryVariables,
} from "./graphql";

const Root = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

const Name = styled.h1`
  font-size: 1.5rem;
`;

const Image = styled.img`
  max-height: 200px;
`;

const Gender = styled.div``;

const Status = styled.div``;

const Species = styled.div``;

const Type = styled.div``;

const Origin = styled.div``;

const Location = styled.div``;

const EpisodesTitle = styled.div`
  font-weight: bold;
`;

const Episodes = styled.div`
  display: grid;
  grid-gap: 0.5rem;
`;

const Episode = styled.div``;

export default function (): JSX.Element {
  const params = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<
    CharacterQuery,
    CharacterQueryVariables
  >(CHARACTER_QUERY, {
    variables: {
      id: params.id,
    },
  });

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error != null) {
    return <h1>Error</h1>;
  }

  const character = data?.character;

  return (
    <Root>
      <Link route={ROUTES.episodeList} params={null}>
        Back to episode list
      </Link>
      <Name>{character?.name}</Name>
      <Image src={character?.image || ""} />
      <Gender>{character?.gender}</Gender>
      <Status>Status: {character?.status}</Status>
      <Species>Species: {character?.species}</Species>
      <Type>Type: {character?.type}</Type>
      <Origin>Origin: {character?.origin?.name}</Origin>
      <Location>Location: {character?.location?.name}</Location>
      <EpisodesTitle>Episodes:</EpisodesTitle>
      <Episodes>
        {character?.episode?.map((episode) => (
          <Episode key={episode?.id}>
            {episode?.episode} - {episode?.name}
          </Episode>
        ))}
      </Episodes>
    </Root>
  );
}
