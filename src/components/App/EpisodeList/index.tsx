import React from "react";
import styled from "styled-components";

import { ROUTES } from "../../../services/routing";
import Link from "../../Link";

const Root = styled.div``;
const Row = styled.div``;

export default function (): JSX.Element {
  return (
    <Root>
      <Row>
        <Link route={ROUTES.character} params={{ id: "morty" }}>
          Morty
        </Link>
      </Row>
      <Row>
        {" "}
        <Link route={ROUTES.character} params={{ id: "rick" }}>
          Rick
        </Link>
      </Row>
    </Root>
  );
}
