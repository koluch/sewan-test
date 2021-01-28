import React from "react";
import styled from "styled-components";

import { ROUTES } from "../../../../../services/routing";
import Link from "../../../../Link";
import { Character } from "../../graphql";

const Root = styled(Link)`
  width: 100%;
  padding-bottom: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 0.5rem;
  transition: transform 300ms, filter 300ms;
  position: relative;

  @media (hover: hover) {
    filter: brightness(70%);

    &:hover {
      transform: scale(1.1);
      filter: brightness(100%);
      z-index: 1;

      > * {
        opacity: 1;
        transition-delay: 400ms;
      }
    }
  }
`;

const Name = styled.div`
  opacity: 0;
  transition: opacity 300ms;
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  text-align: center;
  background: black;
  color: white;
  font-size: 0.8rem;
  border-radius: 0.2rem;
  padding: 0.2rem 0.4rem;
`;

interface Props {
  character: Character | null;
}

export default function (props: Props): JSX.Element {
  const { character } = props;
  return (
    <Root
      style={{ backgroundImage: `url("${character?.image}")` }}
      route={ROUTES.character}
      params={{ id: character?.id }}
    >
      <Name>{character?.name || ""}</Name>
    </Root>
  );
}
