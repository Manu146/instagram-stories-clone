import React, { useEffect, useState } from "react";
import styled from "styled-components";
//import DynamicComponent from "./DynamicComponent";
import ProgressiveImg from "./ProgressiveImg";
import Spinner from "./layout/Spinner";

const Container = styled.div`
  position: relative;
  width: 358.88px;
  height: 638px;
  background-color: black;
  margin: 0 auto;
  margin-top: 0.5rem;
`;
const Storie = React.forwardRef(({ storie, children, active }, ref) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
  }, [active]);
  return (
    <Container ref={ref}>
      {children}
      {loading && <Spinner />}
      <ProgressiveImg storie={storie} callback={() => setLoading(false)} />
    </Container>
  );
});

export default Storie;
