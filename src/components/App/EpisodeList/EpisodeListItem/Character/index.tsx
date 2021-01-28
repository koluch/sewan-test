import React from "react";
import styled from "styled-components";

import { ROUTES } from "../../../../../services/routing";
import Link from "../../../../Link";
import { Character } from "../../graphql";

const Root = styled(Link)`
  width: 80px;
  height: 80px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 0.5rem;
`;

interface Props {
  character: Character | null;
}

export default function (props: Props): JSX.Element {
  const { character } = props;
  return (
    <Root
      title={character?.name || ""}
      style={{ backgroundImage: `url("${character?.image}")` }}
      route={ROUTES.character}
      params={{ id: character?.id }}
    />
  );
}
