import React, { useEffect, useState } from "react";
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
const Storie = React.forwardRef(({ storie, children, activeSlide }, ref) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
  }, [activeSlide]);
  return (
    <Container ref={ref}>
      {children}

      <DynamicComponent
        component={storie}
        onLoad={() => setLoading(false)}
        loading={loading}
      ></DynamicComponent>
    </Container>
  );
});

export default Storie;
