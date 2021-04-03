import React from "react";
import { LoadBar, LoadBarWrapper } from "./LoadingBar";
import styled from "styled-components";
import useProgress from "../custom-hooks/useProgress";

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 0.5rem;
  & > div {
    margin-right: 0.375rem;
  }

  & > div:last-child {
    margin-right: 0;
  }
`;

export default function LoadingBarArray({
  stories,
  currentIndex,
  endCallback,
  isPaused,
  duration,
}) {
  const progress = useProgress(currentIndex, duration, endCallback, isPaused);

  let bars = stories.map((_, index) => {
    let activeState = index === currentIndex ? 1 : index < currentIndex ? 2 : 0;
    return (
      <LoadBarWrapper width={1 / stories.length}>
        <LoadBar
          activeState={activeState}
          progress={activeState === 1 ? progress : 0}
        />
      </LoadBarWrapper>
    );
  });

  return <Container>{bars}</Container>;
}
