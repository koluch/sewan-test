import React from "react";

import * as ar from "../../../helpers/asyncResource";

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
        return <>{children(lastState)}</>;
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
