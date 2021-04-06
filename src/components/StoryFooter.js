import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
`;

export default function StoryFooter({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
