import React from "react";
import styled from "styled-components";

const Root = styled.div`
  padding: 1rem;
  border: 1px solid #ff9393;
  border-radius: 0.25rem;
  background: #ffd0d0;
  color: #9c0000;
`;

interface Props {
  type: "ERROR";
  children: string;
}

export default function (props: Props): JSX.Element {
  return <Root {...props}>{props.children}</Root>;
}
