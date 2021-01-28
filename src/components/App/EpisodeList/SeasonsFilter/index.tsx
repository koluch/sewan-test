import React from "react";
import styled from "styled-components";

import { ROUTES } from "../../../../services/routing";
import Link from "../../../Link";

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 1.5rem;
  gap: 1rem;
`;

const Option = styled(Link)`
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
  current: number | null;
  seasonsCount: number;
}

export default function (props: Props): JSX.Element {
  const { current, seasonsCount } = props;
  return (
    <Root>
      <Option
        route={ROUTES.episodeList}
        params={null}
        className={current == null ? "isActive" : undefined}
      >
        All episodes
      </Option>
      {[...new Array(seasonsCount)].map((_, i) => {
        const seasonNumber = i + 1;
        return (
          <Option
            key={i}
            route={ROUTES.episodeListBySeason}
            params={{
              season: seasonNumber,
            }}
            className={current == seasonNumber ? "isActive" : undefined}
          >
            Season {seasonNumber}
          </Option>
        );
      })}
    </Root>
  );
}
