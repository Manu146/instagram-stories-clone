import React, { useEffect, useState } from "react";
import styled from "styled-components";
//import DynamicComponent from "./DynamicComponent";
import ProgressiveImg from "./ProgressiveImg";
import Spinner from "./layout/Spinner";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Story = ({ story, toggleLoading, isLoading }) => {
  useEffect(() => {
    toggleLoading(true);
  }, [story]);
  return (
    <Container>
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
