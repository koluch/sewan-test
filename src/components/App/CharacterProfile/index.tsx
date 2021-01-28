import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useQueryResource } from "../../../helpers/graphql/hooks";
import { ROUTES } from "../../../services/routing";
import Link from "../../Link";
import AsyncResourceRenderer from "../AsyncResourceRenderer";

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
  const { resource } = useQueryResource<
    CharacterQuery,
    CharacterQueryVariables
  >(CHARACTER_QUERY, {
    variables: {
      id: params.id,
    },
  });
  return (
    <Root>
      <Link route={ROUTES.episodeList} params={null}>
        Back to episode list
      </Link>
      <AsyncResourceRenderer resource={resource}>
        {({ character }) => (
          <>
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
            </Episodes>{" "}
          </>
        )}
      </AsyncResourceRenderer>
    </Root>
  );
}
