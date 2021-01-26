import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { ROUTES } from "../../../services/routing";
import Link from "../../Link";

const Root = styled.div``;

export default function (): JSX.Element {
  const params = useParams<{ id: string }>();
  return (
    <Root>
      <div>Character #{params.id}</div>
      <Link route={ROUTES.episodeList} params={null}>
        Episode list
      </Link>
    </Root>
  );
}
