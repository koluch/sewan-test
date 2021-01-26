import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

import { makeUrl, Route } from "../../services/routing";

interface Props<Params> extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  route: Route<Params>;
  params: Params;
  children?: React.ReactNode;
}

export default function <Params>(props: Props<Params>): JSX.Element {
  const { route, params, children, ...rest } = props;
  const url = params != null ? makeUrl(route, params) : route.path;
  return (
    <ReactRouterLink to={url} {...rest}>
      {children}
    </ReactRouterLink>
  );
}
