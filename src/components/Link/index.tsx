import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

import { makeUrl, Route } from "../../services/routing";

type Props<Params> =
  | {
      route: Route<Params>;
      params: Params;
      children: React.ReactNode;
    }
  | {
      route: Route<void>;
      children: React.ReactNode;
    };

export default function <Params>(props: Props<Params>): JSX.Element {
  const { children } = props;
  let url: string;
  if ("params" in props) {
    url = makeUrl(props.route, props.params);
  } else {
    url = props.route.path;
  }
  return <ReactRouterLink to={url}>{children}</ReactRouterLink>;
}
