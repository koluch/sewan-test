import React from "react";
import styled from "styled-components";

const Root = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-1);
  border-radius: 0.5rem;

  &.type-PRIMARY {
    background: var(--color-1);
    color: white;
  }

  &.type-SECONDARY {
    background: transparent;
    color: var(--color-1);
  }
`;

interface Props {
  variant?: "PRIMARY" | "SECONDARY";
  children: string;
  onClick?: () => void;
}

export default function (props: Props): JSX.Element {
  const { onClick, variant = "PRIMARY", children } = props;
  return (
    <Root className={`type-${variant}`} onClick={onClick}>
      {children}
    </Root>
  );
}
