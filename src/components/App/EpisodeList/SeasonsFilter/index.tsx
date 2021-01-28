import React from "react";
import styled from "styled-components";

import { ROUTES } from "../../../../services/routing";
import Link from "../../../Link";

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 1.5rem;
  line-height: 1.5em;
`;

const Option = styled(Link)`
  &:not(:first-child) {
    margin-left: 1em;
  }

  &.isActive {
    font-weight: bold;
    text-decoration: none;
  }

  &,
  &:hover,
  &:active,
  &:visited {
    color: black;
  }
`;

interface Props {
  seasonsCount: number;
}

export default function (props: Props): JSX.Element {
  const { seasonsCount } = props;
  return (
    <Root>
      <Option route={ROUTES.episodeList} params={null} className="isActive">
        All episodes
      </Option>
      {[...new Array(seasonsCount)].map((_, i) => (
        <Option key={i} route={ROUTES.episodeList} params={null}>
          Season {i + 1}
        </Option>
      ))}
    </Root>
  );
}
