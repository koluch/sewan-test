import cn from "clsx";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useQueryResource } from "../../../helpers/graphql/hooks";
import { ROUTES } from "../../../services/routing";
import Link from "../../Link";
import AsyncResourceRenderer from "../kit/AsyncResourceRenderer";

import {
  CHARACTER_QUERY,
  CharacterQuery,
  CharacterQueryVariables,
} from "./graphql";
import { ReactComponent as FemaleIcon } from "./icons/female.svg";
import { ReactComponent as HomeIcon } from "./icons/home.svg";
import { ReactComponent as LocationIcon } from "./icons/location.svg";
import { ReactComponent as MaleIcon } from "./icons/male.svg";

const Root = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  transition: filter 200ms;

  &::before,
  &::after {
    content: " ";
    display: block;
    position: absolute;
    opacity: 0;
    transition: opacity 200ms;
  }

  &::after {
    width: 100%;
    height: 100%;
    border: 10px solid black;
    top: 0;
    left: 0;
  }

  &::before {
    content: " ";
    display: block;
    position: absolute;
    width: 100%;
    height: 20px;
    bottom: 60px;
    background: black;
    z-index: 1;
    transform: rotate(-45deg);
    transform-origin: right top;
    right: 0px;
  }

  &.isDead:not(:hover) {
    filter: sepia(1);

    &::before,
    &::after {
      opacity: 1;
    }
  }
`;
const Image = styled.img`
  object-fit: cover;
`;

const Name = styled.h1`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

const Gender = styled.div`
  display: inline-flex;
  margin-left: 0.25rem;
  width: 20px;
  height: 20px;

  > svg {
    color: #ff51d9;
  }

  &.isMale {
    > svg {
      color: #518eff;
    }
  }
`;

const Species = styled.div`
  font-size: 0.8rem;
`;

const Place = styled.div`
  display: flex;
  align-items: center;

  > svg {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
    color: var(--color-1);
  }
`;

const EpisodesTitle = styled.div`
  font-weight: bold;
`;

const Episodes = styled.div`
  display: grid;
  grid-gap: 0.75rem;
`;

const Episode = styled.div``;

const Body = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

const Info = styled.div`
  > *:not(:first-child) {
    margin-top: 1rem;
  }
`;

const LeftRight = styled.div`
  display: flex;

  > *:not(:first-child) {
    margin-left: 2rem;
  }
`;

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
        {({ character }) => {
          const isDead = character?.status === "Dead";
          return (
            <>
              <Body>
                <LeftRight>
                  <ImageWrapper
                    title={
                      (character?.name || "Unknown") + (isDead ? " (dead)" : "")
                    }
                    className={cn(isDead && "isDead")}
                  >
                    <Image src={character?.image || ""} />
                  </ImageWrapper>
                  <Info>
                    <Name>
                      {character?.name}
                      <Gender
                        className={cn(character?.gender === "Male" && "isMale")}
                      >
                        {character?.gender === "Male" && <MaleIcon />}
                        {character?.gender === "Female" && <FemaleIcon />}
                      </Gender>
                    </Name>

                    <Species>
                      {[character?.species, character?.type]
                        .filter((x) => x != "" && x != null)
                        .join(" / ")}
                    </Species>
                    <Place>
                      <HomeIcon title={"Origin"} />
                      {[
                        // character?.origin?.type,
                        character?.origin?.name,
                        // character?.origin?.dimension,
                      ]
                        .filter((x) => x !== "" && x != null)
                        .join(" / ")}
                    </Place>
                    <Place>
                      <LocationIcon title={"Location"} />
                      {[
                        // character?.location?.type,
                        character?.location?.name,
                        // character?.location?.dimension,
                      ]
                        .filter((x) => x !== "" && x != null)
                        .join(" / ")}
                    </Place>
                    <Episodes>
                      <EpisodesTitle>Episodes:</EpisodesTitle>
                      {character?.episode?.map((episode) => (
                        <Episode key={episode?.id}>
                          {episode?.episode} - {episode?.name}
                        </Episode>
                      ))}
                    </Episodes>
                  </Info>
                </LeftRight>
              </Body>
            </>
          );
        }}
      </AsyncResourceRenderer>
    </Root>
  );
}
