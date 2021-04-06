import React, { useRef } from "react";
import styled from "styled-components";
import Story from "./Story";
import { ReactComponent as LeftArrow } from "../svgs/arrow-left.svg";
import { ReactComponent as RightArrow } from "../svgs/arrow-right.svg";
import { ReactComponent as CloseIcon } from "../svgs/close.svg";
import LoadingBarArray from "./LoadingBarArray";
import useSwipeMobile from "../custom-hooks/useSwipeMobile";
import StoryFooter from "./StoryFooter";
import ReplyForm from "./ReplyForm";
import StoryHeader from "./StoryHeader";
import useStory from "../custom-hooks/useStory";

const Wrapper = styled.div`
  position: absolute;
  z-index: 3;
  top: 40%;
  transform: translate(-50%, -40%);
  left: 50%;
  transform: translateX();
`;

const StoryContainer = styled.div`
  border-radius: 8px;
  height: 100vh;
  width: calc(0.5625 * 100vh);
  @media (min-width: 481px) {
    height: 95vh;
    width: calc(0.5625 * 95vh);
  }
  background-color: #3b3b3b;
  margin: 0 auto;
  position: relative;
`;

const ArrowContainer = styled.button`
  position: absolute;
  display: none;
  ${(props) => (props.dir === "left" ? "left: -2.5rem" : "right: -2.5rem")};
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(84, 84, 84, 0.7);
  border-radius: 50%;
  max-width: 24px;
  max-height: 24px;
  border: none;
  padding: 0;
  cursor: pointer;
  @media (min-width: 640px) {
    display: block;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  z-index: 5;
  top: 1rem;
  right: 0.5rem;
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

export default function StorySlider({ stories, user, closeFn }) {
  const [state, dispatch] = useStory(stories.length);
  const storyRef = useRef();
  useSwipeMobile(storyRef, [
    () => dispatch({ type: "NEXT_STORY" }),
    () => dispatch({ type: "PREV_STORY" }),
  ]);
  const currentStory = stories[state.currentIndex];
  return (
    <Wrapper>
      <StoryContainer ref={storyRef}>
        <StoryHeader user={user}>
          <LoadingBarArray
            currentIndex={state.currentIndex}
            endCallback={() => dispatch({ type: "NEXT_STORY" })}
            stories={stories}
            isPaused={state.isPaused}
            isLoading={state.isLoading}
            duration={currentStory.duration || 5000}
          />
        </StoryHeader>
        <CloseButton onClick={closeFn}>
          <CloseIcon />
        </CloseButton>
        <ArrowContainer
          dir="left"
          onClick={() => dispatch({ type: "PREV_STORY" })}
        >
          <LeftArrow />
        </ArrowContainer>
        <ArrowContainer
          dir="right"
          onClick={() => dispatch({ type: "NEXT_STORY" })}
        >
          <RightArrow />
        </ArrowContainer>
        <Story
          story={currentStory}
          toggleLoading={(payload) =>
            dispatch({ type: "TOGGLE_LOADING", payload: payload })
          }
          isLoading={state.isLoading}
          handleMouseEvnts={() => dispatch({ type: "TOGGLE_PAUSE" })}
        />
        <StoryFooter>
          <ReplyForm handleOnFocus={() => dispatch({ type: "TOGGLE_PAUSE" })} />
        </StoryFooter>
      </StoryContainer>
    </Wrapper>
  );
}
