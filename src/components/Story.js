import React, { useEffect, useState } from "react";
import styled from "styled-components";
//import DynamicComponent from "./DynamicComponent";
import ProgressiveImg from "./ProgressiveImg";
import Spinner from "./layout/Spinner";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: black;
  margin: 0;
  @media (min-width: 1040px) {
    width: 30vw;
    max-width: 345px;
    height: calc(30vw * 1.777);
    max-height: 610.7px;
  }
  @media (min-width: 640px) {
    width: 40vw;
    height: calc(40vw * 1.777);
    margin: 0 auto;
    margin-top: 0.5rem;
  }
`;
const Storie = React.forwardRef(({ story, children, setPause }, ref) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setPause(true);
  }, [story]);
  return (
    <Container ref={ref}>
      {children}
      {loading && <Spinner />}
      <ProgressiveImg
        story={story}
        callback={() => {
          setLoading(false);
          setPause(false);
        }}
      />
    </Container>
  );
});

export default Storie;
