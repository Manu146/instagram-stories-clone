import React from "react";
import styled from "styled-components";
import useStoriesCntx from "../custom-hooks/useStoriesCntx";
import StorySlider from "./StorySlider";

const BlurredContainer = styled.div`
  background-color: #1a1a1a;
  position: absolute;
  opacity: 95%;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
`;

export default function SliderWrapper() {
  const { stories, setUser, setOpen, isOpen, user } = useStoriesCntx();
  if (isOpen) {
    return (
      <>
        <BlurredContainer />
        <StorySlider
          stories={stories[user.username]}
          user={user}
          closeFn={() => {
            setOpen(false);
            setUser({});
          }}
        />
      </>
    );
  } else return <></>;
}
