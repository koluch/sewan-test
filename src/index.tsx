import React from "react";
import { render } from "react-dom";
import styled from "styled-components";

const Title = styled.h1`
  color: red;
`;

render(<Title>hi!</Title>, document.getElementById("root"));
