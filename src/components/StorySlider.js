import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Story from "./Story";
//import LoadingBar from "./LoadingBar";
import LoadingBarArray from "./LoadingBarArray";
import useEventListener from "../custom-hooks/useEventListener";
import useSwipeMobile from "../custom-hooks/useSwipeMobile";
import StoryHeader from "./StoryHeader";
import useStory from "../custom-hooks/useStory";

const Wrapper = styled.div`
  position: absolute;
  z-index: 3;
  top: 40%;
  transform: translate(-50%, -40%);
  left: 50%;
  transform: translateX();
  //background-color: rgba(84, 84, 84, 0.7);
`;

const StoryContainer = styled.div`
  border-radius: 8px;
  height: 95vh;
  width: calc(0.5625 * 95vh);
  background-color: #3b3b3b;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;

const ArrowContainer = styled.button`
  position: absolute;
  ${(props) => (props.dir === "left" ? "left: 0.25rem" : "right: 0.25rem")};
  top: calc(50% - 0.75rem);
  background-color: #dedede;
  color: rgba(84, 84, 84, 0.7);
  border-radius: 50%;
  max-width: 24px;
  max-height: 24px;
  border: none;
  padding: 0;
  z-index: 3;
  cursor: pointer;
  @media (min-width: 640px) {
    ${(props) => (props.dir === "left" ? "left: -2.5rem" : "right: -2.5rem")};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.25rem;
  color: #dedede;
  font-size: 2rem;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  @media (min-width: 640px) {
    top: 0;
    right: -2.5rem;
  }
`;

function Arrow({ dir, onClick }) {
  return (
    <ArrowContainer onClick={onClick} dir={dir}>
      <i className="material-icons">
        {dir === "left" ? "navigate_before" : "navigate_next"}
      </i>
    </ArrowContainer>
  );
}

export default function StorySlider({ stories, user }) {
  const [state, dispatch] = useStory(stories.length);
  const currentStory = stories[state.currentIndex];
  return (
    <Wrapper>
      <StoryContainer>
        <StoryHeader user={user}>
          <LoadingBarArray
            currentIndex={state.currentIndex}
            endCallback={() => dispatch({ type: "NEXT_STORY" })}
            stories={stories}
            isPaused={state.isPaused}
            duration={currentStory.duration || 5000}
          />
        </StoryHeader>
        <CloseButton className="material-icons">close</CloseButton>
        <Arrow dir="left" onClick={() => dispatch({ type: "PREV_STORY" })} />
        <Arrow dir="right" onClick={() => dispatch({ type: "NEXT_STORY" })} />
        <Story
          story={currentStory}
          toggleLoading={(payload) =>
            dispatch({ type: "TOGGLE_LOADING", payload: payload })
          }
          isLoading={state.isLoading}
        />
      </StoryContainer>
    </Wrapper>
  );
}
