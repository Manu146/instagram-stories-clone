import React, { useEffect, useState } from "react";
import styled from "styled-components";
//import DynamicComponent from "./DynamicComponent";
import ProgressiveImg from "./ProgressiveImg";
import Spinner from "./layout/Spinner";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const Story = React.forwardRef(({ story, children, setPause }, ref) => {
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

export default Story;
