import React from "react";
import styled from "styled-components";

import * as ar from "../../../helpers/asyncResource";

const FadeOut = styled.div`
  opacity: 0.5;
`;

interface Props<T> {
  resource: ar.AsyncResource<T>;
  children: (value: T) => React.ReactNode;
  renderInit?: () => React.ReactNode;
  renderLoading?: (value: T | null) => React.ReactNode;
  renderFailed?: (message: string) => React.ReactNode;
}

export default function <T>(props: Props<T>): JSX.Element {
  // todo: implement actual layout
  const {
    resource,
    children,
    renderInit = () => <></>,
    renderLoading = (lastState: T | null) => {
      if (lastState != null) {
        return <FadeOut>{children(lastState)}</FadeOut>;
      }
      return <>Loading...</>;
    },
    renderFailed = (reason) => {
      return <>Error: {reason}</>;
    },
  } = props;
  return (
    <>
      {ar.match(resource, {
        init: renderInit,
        loading: renderLoading,
        success: children,
        failed: renderFailed,
      })}
    </>
  );
}
