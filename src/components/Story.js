import React, { useEffect } from "react";
import styled from "styled-components";
//import DynamicComponent from "./DynamicComponent";
import ProgressiveImg from "./ProgressiveImg";
import Spinner from "./layout/Spinner";
//import useEventListener from "../custom-hooks/useEventListener";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`;
const Story = ({ story, toggleLoading, isLoading, handleMouseEvnts }) => {
  useEffect(() => {
    toggleLoading(true);
  }, [story]);
  return (
    <Container onMouseDown={handleMouseEvnts} onMouseUp={handleMouseEvnts}>
      {isLoading && <Spinner />}
      <ProgressiveImg
        preview={story.preview}
        src={story.src}
        callback={() => toggleLoading(false)}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default Story;
