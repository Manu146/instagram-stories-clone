import React from "react";
import styled from "styled-components";
import DynamicComponent from "./DynamicComponent";

const Container = styled.div`
  position: relative;
  width: 100%;
  width: 358.88px;
  height: 638px;
  background-color: black;
  margin: 0 auto;
  margin-top: 0.5rem;
`;
const Storie = React.forwardRef(({ storie, children }, ref) => {
  return (
    <Container ref={ref}>
      {children}
      {DynamicComponent(storie)}
    </Container>
  );
});

export default Storie;
