import React from "react";
import styled from "styled-components";

import * as ar from "../../../../helpers/asyncResource";
import Alert from "../Alert";
import Spinner from "../Spinner";

const FadeOut = styled.div`
  position: relative;
  opacity: 0.5;
`;

const SpinnerWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 2rem;
  transform: translateX(-50%);
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
        return (
          <FadeOut>
            <SpinnerWrap>
              <Spinner />
            </SpinnerWrap>
            {children(lastState)}
          </FadeOut>
        );
      }
      return <Spinner />;
    },
    renderFailed = (reason) => {
      return <Alert type="ERROR">{reason}</Alert>;
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
